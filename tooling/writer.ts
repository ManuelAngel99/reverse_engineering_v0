import fs from "fs";
import path from "path";
import type { ExtractedModule } from "./extractor";

export async function writeModulesToDisk(
  modules: ExtractedModule[],
  outputDir: string
): Promise<void> {
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write each module to its own file
  for (const mod of modules) {
    const safeId = String(mod.id).replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `module_${safeId}.js`;
    const filePath = path.join(outputDir, fileName);

    const header = generateHeader(mod);
    const content = `${header}\n\n${formatModuleCode(mod.code)}`;

    fs.writeFileSync(filePath, content, "utf-8");
  }

  // Write an index file with all modules
  const indexContent = generateIndex(modules);
  fs.writeFileSync(path.join(outputDir, "_index.md"), indexContent, "utf-8");

  // Write a JSON manifest
  const manifest = modules.map((m) => ({
    id: m.id,
    file: `module_${String(m.id).replace(/[^a-zA-Z0-9_-]/g, "_")}.js`,
    exports: m.exports,
    imports: m.imports,
    lines: { start: m.startLine, end: m.endLine },
  }));
  fs.writeFileSync(
    path.join(outputDir, "_manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
}

function generateHeader(mod: ExtractedModule): string {
  const lines = [
    `/**`,
    ` * Module ID: ${mod.id}`,
    ` * Original lines: ${mod.startLine}-${mod.endLine}`,
    ` *`,
  ];

  if (mod.exports.length > 0) {
    lines.push(` * Exports: ${mod.exports.join(", ")}`);
  }

  if (mod.imports.length > 0) {
    lines.push(` * Imports modules: ${mod.imports.join(", ")}`);
  }

  lines.push(` */`);

  return lines.join("\n");
}

function formatModuleCode(code: string): string {
  // The code is a function expression, wrap it for readability
  return `// Module factory function\nexport default ${code}`;
}

function generateIndex(modules: ExtractedModule[]): string {
  const lines = [
    "# Extracted Turbopack Modules",
    "",
    `Total modules: ${modules.length}`,
    "",
    "## Modules with named exports",
    "",
  ];

  const withExports = modules.filter((m) => m.exports.length > 0);
  for (const mod of withExports) {
    const safeId = String(mod.id).replace(/[^a-zA-Z0-9_-]/g, "_");
    lines.push(`### Module ${mod.id}`);
    lines.push(`- File: \`module_${safeId}.js\``);
    lines.push(`- Exports: ${mod.exports.map((e) => `\`${e}\``).join(", ")}`);
    if (mod.imports.length > 0) {
      lines.push(`- Imports: ${mod.imports.join(", ")}`);
    }
    lines.push("");
  }

  lines.push("## All modules", "");
  lines.push("| ID | Exports | Imports |");
  lines.push("|---|---|---|");

  for (const mod of modules) {
    const exportStr = mod.exports.slice(0, 3).join(", ");
    const moreExports = mod.exports.length > 3 ? "..." : "";
    const importStr = mod.imports.slice(0, 3).join(", ");
    const moreImports = mod.imports.length > 3 ? "..." : "";
    lines.push(
      `| ${mod.id} | ${exportStr}${moreExports} | ${importStr}${moreImports} |`
    );
  }

  return lines.join("\n");
}
