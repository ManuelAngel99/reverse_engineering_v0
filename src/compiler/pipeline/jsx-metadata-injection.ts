/**
 * JSX Metadata Injection
 *
 * Injects metadata into JSX elements for the visual editor.
 * This enables click-to-code mapping, className editing, and component tracking.
 *
 * Original: Lines 6484-7013 from module_448763
 */

import { Node, type SourceFile, SyntaxKind, ts } from "ts-morph";
import MagicString from "magic-string";

// Regex to detect uppercase component names (React components)
const IS_COMPONENT = /^[A-Z]/;

// UI component path prefix
const UI_COMPONENT_PREFIX = "@/components/ui/";

// UI component prop mappings for special tracking
const UI_COMPONENT_PROPS: Record<string, string[]> = {
  "badge/Badge": ["variant"],
  "button/Button": ["variant"],
  "alert/Alert": ["variant"],
  "toggle/Toggle": ["variant", "size"],
  "sidebar/SidebarMenuButton": ["variant", "size"],
  "sidebar/SidebarMenuSubButton": ["size"],
  "input/Input": ["type"],
  "select/SelectContent": ["side", "align"],
  "avatar/AvatarImage": [],
};

// UI components that should have placeholder className tracking
const UI_COMPONENTS: Record<string, string[]> = {
  button: ["Button"],
  card: [
    "Card",
    "CardTitle",
    "CardHeader",
    "CardDescription",
    "CardContent",
    "CardFooter",
  ],
  sidebar: [
    "Sidebar",
    "SidebarContent",
    "SidebarGroup",
    "SidebarGroupLabel",
    "SidebarGroupContent",
    "SidebarMenu",
    "SidebarMenuItem",
    "SidebarMenuAction",
    "SidebarMenuButton",
    "SidebarMenuSub",
    "SidebarMenuSubItem",
    "SidebarMenuSubButton",
    "SidebarInput",
    "SidebarInset",
    "SidebarRail",
    "SidebarTrigger",
    "SidebarHeader",
    "SidebarFooter",
  ],
  dialog: [
    "DialogContent",
    "DialogHeader",
    "DialogFooter",
    "DialogTitle",
    "DialogDescription",
  ],
  label: ["Label"],
  input: ["Input"],
  toggle: ["Toggle"],
  switch: ["Switch"],
  textarea: ["Textarea"],
  form: ["FormItem", "FormLabel", "FormDescription", "FormMessage"],
  accordion: ["AccordionItem", "AccordionTrigger", "AccordionContent"],
  badge: ["Badge"],
  tabs: ["TabsList", "TabsTrigger", "TabsContent"],
  "dropdown-menu": [
    "DropdownMenuLabel",
    "DropdownMenuShortcut",
    "DropdownMenuSubTrigger",
    "DropdownMenuSubContent",
    "DropdownMenuContent",
    "DropdownMenuItem",
    "DropdownMenuCheckboxItem",
    "DropdownMenuRadioItem",
    "DropdownMenuTrigger",
  ],
  menubar: [
    "Menubar",
    "MenubarTrigger",
    "MenubarSubTrigger",
    "MenubarSubContent",
    "MenubarContent",
    "MenubarItem",
    "MenubarCheckboxItem",
    "MenubarRadioItem",
    "MenubarLabel",
    "MenubarSeparator",
    "MenubarShortcut",
  ],
  collapsible: ["CollapsibleTrigger", "CollapsibleContent"],
  breadcrumb: [
    "Breadcrumb",
    "BreadcrumbList",
    "BreadcrumbItem",
    "BreadcrumbLink",
    "BreadcrumbPage",
    "BreadcrumbSeparator",
    "BreadcrumbEllipsis",
  ],
  select: [
    "Select",
    "SelectTrigger",
    "SelectValue",
    "SelectScrollUpButton",
    "SelectScrollDownButton",
    "SelectContent",
    "SelectLabel",
    "SelectItem",
    "SelectSeparator",
  ],
  avatar: ["Avatar", "AvatarImage", "AvatarFallback"],
};

interface ComponentImportInfo {
  name: string;
  source: string;
  singleRef: boolean;
  declStart: number;
  declEnd: number;
  openAt: number;
  closeAt?: number;
}

interface ElementMetadata {
  start: number;
  end: number;
  name: string;
  jsxRoot: boolean;
  lib?: ComponentImportInfo & { props: Record<string, [string, number]> };
}

interface ClassNameInfo {
  line: number;
  column: number;
  value: string;
}

/**
 * Inject JSX metadata into a source file
 * @param sourceFile - ts-morph SourceFile to process
 * @param magicString - MagicString instance for code modifications
 * @param originalCode - Original source code for reference counting
 */
export function injectJSXMetadata(
  sourceFile: SourceFile,
  magicString: MagicString,
  originalCode: string
): void {
  const filePath = sourceFile.getFilePath();
  const modifications: Array<() => void> = [];

  // Cache for import specifier lookups
  const importSpecifierCache: Record<string, Node | null> = {};

  // Cache for single reference detection (Lucide optimization)
  const singleRefCache: Record<string, boolean> = {};

  /**
   * Check if a node is inside another JSX element (not a root)
   */
  function isInsideJSX(node: Node | undefined): boolean {
    let parent = node?.getParent();

    while (parent) {
      const kind = parent.getKind();
      if (
        kind === SyntaxKind.JsxElement ||
        kind === SyntaxKind.JsxSelfClosingElement
      ) {
        return true;
      }
      if (
        kind === SyntaxKind.Block ||
        kind === SyntaxKind.SourceFile ||
        kind === SyntaxKind.FunctionDeclaration ||
        kind === SyntaxKind.ArrowFunction ||
        kind === SyntaxKind.FunctionExpression
      ) {
        break;
      }
      parent = parent.getParent();
    }

    return false;
  }

  /**
   * Find the import specifier for a component name
   */
  function findImportSpecifier(
    componentName: string,
    tagNode: Node
  ): Node | null {
    if (importSpecifierCache[componentName] !== undefined) {
      return importSpecifierCache[componentName];
    }

    const symbol = tagNode.getSymbol();
    if (symbol) {
      const declarations = symbol.getDeclarations();
      if (declarations.length > 0) {
        const [decl] = declarations;
        if (decl && Node.isImportSpecifier(decl)) {
          importSpecifierCache[componentName] = decl;
          return decl;
        }
      }
    }

    importSpecifierCache[componentName] = null;
    return null;
  }

  /**
   * Check if a Lucide React icon has a single reference (optimization candidate)
   */
  function isSingleRefLucideIcon(
    componentName: string,
    tagNode: Node,
    expectedCount: number
  ): boolean {
    if (singleRefCache[componentName] !== undefined) {
      return singleRefCache[componentName];
    }

    // Count occurrences in original code
    const occurrences = countOccurrences(originalCode, componentName);
    if (occurrences === expectedCount) {
      singleRefCache[componentName] = true;
      return true;
    }

    // Check references
    let jsxUsageCount = 0;
    let hasNonJSXUsage = false;

    if (Node.isIdentifier(tagNode)) {
      for (const refSymbol of tagNode.findReferences()) {
        const refNode = getFirstReference(refSymbol);
        if (refNode?.getSourceFile().getFilePath() === filePath) {
          const parent = refNode.getParent();
          if (parent) {
            if (
              Node.isJsxSelfClosingElement(parent) ||
              Node.isJsxOpeningElement(parent)
            ) {
              if (++jsxUsageCount > 1) {
                break;
              }
            } else if (!Node.isImportSpecifier(parent)) {
              hasNonJSXUsage = true;
              break;
            }
          }
        }
      }
    }

    const result = jsxUsageCount === 1 && !hasNonJSXUsage;
    singleRefCache[componentName] = result;
    return result;
  }

  /**
   * Get the first reference node from a reference symbol
   */
  function getFirstReference(refSymbol: any): Node | undefined {
    const isAlias =
      refSymbol.getDefinition().getKind() === ts.ScriptElementKind.alias;
    const references = refSymbol.getReferences();

    for (let i = 0; i < references.length; i++) {
      const ref = references[i];
      if (ref && (isAlias || !ref.isDefinition() || i > 0)) {
        return ref.getNode();
      }
    }
  }

  /**
   * Count occurrences of a string in text
   */
  function countOccurrences(text: string, search: string): number {
    let count = 0;
    let pos = text.indexOf(search);

    while (pos !== -1) {
      count++;
      pos = text.indexOf(search, pos + search.length);
    }

    return count;
  }

  /**
   * Get special props to track for UI library components
   */
  function getTrackedPropsForComponent(
    source: string | undefined,
    componentName: string
  ): string[] | null {
    if (source === "lucide-react") {
      return [];
    }

    if (source?.startsWith(UI_COMPONENT_PREFIX)) {
      const componentPath = source.slice(UI_COMPONENT_PREFIX.length);
      const key = `${componentPath}/${componentName}`;
      return UI_COMPONENT_PROPS[key] ?? null;
    }

    // Special cases for native elements
    if (source === undefined && componentName === "input") {
      return ["type"];
    }

    return null;
  }

  /**
   * Check if a component should have placeholder className tracking
   */
  function shouldHavePlaceholderClassName(
    source: string | undefined,
    componentName: string
  ): boolean {
    if (!source) return false;

    if (
      source === "lucide-react" ||
      source === "next/image" ||
      source === "next/link"
    ) {
      return true;
    }

    if (source.startsWith(UI_COMPONENT_PREFIX)) {
      const componentPath = source.slice(UI_COMPONENT_PREFIX.length);
      const components = UI_COMPONENTS[componentPath];
      return components ? components.includes(componentName) : false;
    }

    return false;
  }

  /**
   * Extract className information from various expression types
   */
  function extractClassNames(
    classNameAttr: Node,
    magicString: MagicString
  ): {
    classes: ClassNameInfo[];
    hasStatic: boolean;
    type: number;
    start: number;
    end: number;
  } | null {
    const initializer = Node.isJsxAttribute(classNameAttr)
      ? classNameAttr.getInitializer()
      : null;

    if (!initializer) {
      return null;
    }

    const classes: ClassNameInfo[] = [];
    let hasStatic = false;
    let type = -1;

    // String literal: className="..."
    if (Node.isStringLiteral(initializer)) {
      type = 0;
      hasStatic = true;
      classes.push({
        line: initializer.getStartLineNumber(true),
        column: initializer.getStart() - initializer.getStartLinePos(true) + 1,
        value: initializer.getLiteralValue(),
      });
    }
    // JSX expression: className={...}
    else if (Node.isJsxExpression(initializer)) {
      type = 1;
      const expr = initializer.getExpression();

      if (expr) {
        // Call expression: className={cn(...)}
        if (Node.isCallExpression(expr)) {
          const args = expr.getArguments();
          for (const arg of args) {
            if (Node.isStringLiteral(arg)) {
              hasStatic = true;
              classes.push({
                line: arg.getStartLineNumber(true),
                column: arg.getStart() - arg.getStartLinePos(true) + 1,
                value: arg.getLiteralValue(),
              });
            }
          }
        }
        // Binary expression: className={"a" + "b"}
        else if (Node.isBinaryExpression(expr)) {
          extractFromBinaryExpression(expr, classes);
          hasStatic = classes.length > 0;
        }
        // String literal: className={"..."}
        else if (Node.isStringLiteral(expr)) {
          hasStatic = true;
          classes.push({
            line: expr.getStartLineNumber(true),
            column: expr.getStart() - expr.getStartLinePos(true) + 1,
            value: expr.getLiteralValue(),
          });
        }
        // Template literal: className={`...`}
        else if (Node.isNoSubstitutionTemplateLiteral(expr)) {
          hasStatic = true;
          classes.push({
            line: expr.getStartLineNumber(true),
            column: expr.getStart() - expr.getStartLinePos(true) + 1,
            value: expr.getLiteralText(),
          });
        }
        // Template expression: className={`... ${x} ...`}
        else if (Node.isTemplateExpression(expr)) {
          extractFromTemplateExpression(expr, classes);
          hasStatic = classes.length > 0;
        }
      }
    }

    if (type !== -1) {
      return {
        classes,
        hasStatic,
        type,
        start: initializer.getStart(false),
        end: initializer.getEnd(),
      };
    }

    return null;
  }

  /**
   * Extract class names from binary expressions (string concatenation)
   */
  function extractFromBinaryExpression(
    expr: Node,
    classes: ClassNameInfo[]
  ): void {
    function unwrapParens(node: Node): Node {
      while (Node.isParenthesizedExpression(node)) {
        node = node.getExpression();
      }
      return node;
    }

    function tryExtract(node: Node): boolean {
      if (
        Node.isStringLiteral(node) ||
        Node.isNoSubstitutionTemplateLiteral(node)
      ) {
        classes.push({
          line: node.getStartLineNumber(true),
          column: node.getStart() - node.getStartLinePos(true) + 1,
          value: Node.isStringLiteral(node)
            ? node.getLiteralValue()
            : node.getLiteralText(),
        });
        return true;
      }
      return false;
    }

    let current = expr;
    while (
      Node.isBinaryExpression(current) &&
      current.getOperatorToken().getText() === "+"
    ) {
      const left = unwrapParens(current.getLeft());
      tryExtract(unwrapParens(current.getRight()));

      if (tryExtract(left)) {
        break;
      }

      if (
        Node.isBinaryExpression(left) &&
        left.getOperatorToken().getText() === "+"
      ) {
        current = left;
      } else {
        break;
      }
    }
  }

  /**
   * Extract class names from template expressions
   */
  function extractFromTemplateExpression(
    expr: Node,
    classes: ClassNameInfo[]
  ): void {
    if (!Node.isTemplateExpression(expr)) return;

    const head = expr.getHead();
    const headText = head.getLiteralText();

    if (headText.trim() !== "") {
      classes.push({
        line: head.getStartLineNumber(true),
        column: head.getStart() - head.getStartLinePos(true) + 1,
        value: headText,
      });
    }

    for (const span of expr.getTemplateSpans()) {
      const literal = span.getLiteral();
      if (Node.isTemplateMiddle(literal) || Node.isTemplateTail(literal)) {
        const text = literal.getLiteralText();
        if (text.trim() !== "") {
          classes.push({
            line: literal.getStartLineNumber(true),
            column: literal.getStart() - literal.getStartLinePos(true) + 1,
            value: text,
          });
        }
      }
    }
  }

  /**
   * Process a JSX element and inject metadata
   */
  function processJSXElement(element: Node, isRoot: boolean): void {
    const isSelfClosing = Node.isJsxSelfClosingElement(element);
    const tagNode = isSelfClosing
      ? element.getTagNameNode()
      : Node.isJsxElement(element)
      ? element.getOpeningElement().getTagNameNode()
      : null;

    if (!tagNode) return;

    const componentName = tagNode.getText();
    if (!componentName.length) return;

    let importInfo: ComponentImportInfo | undefined;

    // Check if it's a component (starts with uppercase)
    const firstChar = componentName[0];
    if (firstChar && IS_COMPONENT.test(firstChar)) {
      const importSpec = findImportSpecifier(componentName, tagNode);

      if (importSpec && Node.isImportSpecifier(importSpec)) {
        const importDecl = importSpec.getParent()?.getParent()?.getParent();

        if (importDecl && Node.isImportDeclaration(importDecl)) {
          const moduleSpecifier = importDecl
            .getModuleSpecifier()
            .getLiteralValue();
          if (!moduleSpecifier) return;

          const importName = importSpec.getName();
          const singleRef =
            moduleSpecifier === "lucide-react" &&
            isSingleRefLucideIcon(
              componentName,
              tagNode,
              isSelfClosing ? 2 : 3
            );

          importInfo = {
            name: importName,
            source: moduleSpecifier,
            singleRef,
            declStart: importDecl.getStart(false),
            declEnd: importDecl.getEnd(),
            openAt: tagNode.getStart(false),
            closeAt: isSelfClosing
              ? undefined
              : Node.isJsxElement(element)
              ? element.getClosingElement()?.getStart(false)
              : undefined,
          };
        }
      }
    }

    // Build element metadata
    const metadata: ElementMetadata = {
      start: element.getStart(true),
      end: element.getEnd(),
      name: componentName,
      jsxRoot: isRoot,
    };

    // Track special props for UI components
    const trackedProps = getTrackedPropsForComponent(
      importInfo?.source,
      componentName
    );
    if (trackedProps !== null && importInfo) {
      const props: Record<string, [string, number]> = {};
      const openingElement = isSelfClosing
        ? element
        : Node.isJsxElement(element)
        ? element.getOpeningElement()
        : null;

      if (openingElement) {
        for (const propName of trackedProps) {
          const attr = openingElement.getAttribute(propName);
          if (attr && Node.isJsxAttribute(attr)) {
            const init = attr.getInitializer();
            if (init) {
              if (Node.isStringLiteral(init)) {
                props[propName] = [init.getText(true), init.getStart(true)];
              } else {
                props[propName] = ["__v0_dynamic", -1];
              }
            }
          }
        }
      }

      metadata.lib = { ...importInfo, props };
    }

    // Inject __v0_e metadata
    const tagEnd = tagNode.getEnd();
    modifications.push(() => {
      magicString.appendRight(tagEnd, ` __v0_e={${JSON.stringify(metadata)}}`);
    });

    // Process className attribute
    const openingElement = isSelfClosing
      ? element
      : Node.isJsxElement(element)
      ? element.getOpeningElement()
      : null;

    if (openingElement) {
      const classNameAttr = openingElement.getAttribute("className");

      if (classNameAttr && Node.isJsxAttribute(classNameAttr)) {
        const classInfo = extractClassNames(classNameAttr, magicString);

        if (classInfo) {
          const attrEnd = classNameAttr.getEnd();
          const rangeInfo = [classInfo.type, classInfo.start, classInfo.end];

          modifications.push(() => {
            magicString.appendRight(
              attrEnd,
              ` __v0_r={${JSON.stringify(rangeInfo)}}`
            );

            if (classInfo.hasStatic) {
              const classData = classInfo.classes.map((c) => [
                c.line,
                c.column,
                c.value,
              ]);
              magicString.appendRight(
                attrEnd,
                ` __v0_c={${JSON.stringify(classData)}}`
              );
            }
          });
        }
      }
      // Add placeholder className tracking for native elements and special components
      else if (!classNameAttr && componentName.length) {
        const firstChar = componentName[0];
        const isNativeElement = firstChar && /^[a-z]$/.test(firstChar);
        const isSpecialComponent =
          importInfo &&
          shouldHavePlaceholderClassName(importInfo.source, componentName);

        if (isNativeElement || isSpecialComponent) {
          const tagEnd = tagNode.getEnd();
          const placeholderClass = [
            [
              tagNode.getStartLineNumber(true),
              tagNode.getEnd() - tagNode.getStartLinePos(true) + 1,
              "",
            ],
          ];

          modifications.push(() => {
            magicString.appendRight(
              tagEnd,
              ` __v0_m="1" __v0_c={${JSON.stringify(placeholderClass)}}`
            );
          });
        }
      }
    }

    // Process text content for single-child elements
    if (Node.isJsxElement(element)) {
      processTextContent(element, magicString, modifications);
    }
  }

  /**
   * Process text content in JSX elements
   */
  function processTextContent(
    element: Node,
    magicString: MagicString,
    modifications: Array<() => void>
  ): void {
    if (!Node.isJsxElement(element)) return;

    const childList = element.getChildSyntaxList();
    if (!childList) return;

    const children = childList.getChildren();
    const textNodes: Node[] = [];

    for (const child of children) {
      if (Node.isJsxText(child) && child.getText().trim() !== "") {
        textNodes.push(child);
      } else if (Node.isJsxExpression(child)) {
        const expr = child.getExpression();
        if (
          expr &&
          (Node.isStringLiteral(expr) ||
            Node.isNoSubstitutionTemplateLiteral(expr))
        ) {
          textNodes.push(expr);
        }
      }
    }

    // Only process if there's exactly one text node
    if (textNodes.length === 1) {
      const [textNode] = textNodes;
      const openingElement = element.getOpeningElement();
      const tagEnd = openingElement.getEnd();

      // Determine text type: 0=JsxText, 1=StringLiteral, 2=NoSubstitutionTemplateLiteral
      let textType: number;
      let textValue: string;
      let columnOffset: number;

      if (Node.isJsxText(textNode)) {
        textType = 0;
        textValue = textNode.getText().trim();
        columnOffset = textNode.getStart() - textNode.getStartLinePos(true) + 1;
      } else if (Node.isStringLiteral(textNode)) {
        textType = 1;
        textValue = textNode.getText();
        columnOffset = textNode.getStart() - textNode.getStartLinePos(true) + 2;
      } else if (Node.isNoSubstitutionTemplateLiteral(textNode)) {
        textType = 2;
        textValue = textNode.getText();
        columnOffset = textNode.getStart() - textNode.getStartLinePos(true) + 2;
      } else {
        return;
      }

      // Format: "type:line:column:text"
      const textInfo = `${textType}:${textNode.getStartLineNumber(
        true
      )}:${columnOffset}:${textValue}`;

      modifications.push(() => {
        magicString.appendRight(
          tagEnd,
          ` __v0_i={${JSON.stringify(textInfo)}}`
        );
      });
    }
  }

  // Traverse all JSX elements in the file
  sourceFile.forEachDescendant((node) => {
    if (Node.isJsxElement(node)) {
      processJSXElement(node, !isInsideJSX(node));
    } else if (Node.isJsxSelfClosingElement(node)) {
      processJSXElement(node, !isInsideJSX(node));
    }
  });

  // Apply all modifications
  for (const modify of modifications) {
    modify();
  }
}
