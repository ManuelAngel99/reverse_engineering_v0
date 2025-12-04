# TypeScript Compilation Pipeline

This directory contains the core TypeScript compilation system for v0, which transforms user code into executable modules with HMR support.

## Overview

The compilation pipeline takes raw TypeScript/JSX files and produces:

- Compiled JavaScript with React Refresh (HMR) support
- Source maps for debugging
- Module blobs for dynamic import
- JSX tracking metadata for DevTools

## Architecture

```
User Files (TS/TSX)
       ↓
   ts-morph Project (in-memory)
       ↓
   Code Transformers
       ↓
   React Refresh Transformer
       ↓
   Compiled JS + Source Maps
       ↓
   HMR Runtime Wrapper
       ↓
   Module Blobs (Blob URLs)
```

## Components

### ✅ react-refresh.ts (COMPLETED)

React Refresh (HMR) runtime wrapper generation.

**Functions:**

- `generateReactRefreshWrapper()` - Wrap code with HMR runtime
- `needsReactRefresh()` - Detect if code needs React Refresh
- `generateHMRAccept()` - Generate HMR accept code
- `generateRefreshTrigger()` - Trigger component refresh

### 🔄 transformers.ts (TODO)

Code transformations applied during compilation.

**Transformations:**

1. **document.cookie → \_\_v0_cookie_doc.cookie**

   - Replace all `document.cookie` references
   - Use sandboxed cookie document

2. **Import Path Resolution**

   - Resolve relative paths (./file, ../file)
   - Resolve absolute paths (@/components)
   - Apply tsconfig.json paths
   - Resolve node_modules packages

3. **"use server" Directive Handling**

   - Detect `"use server"` at file or function level
   - Wrap server functions with `__v0_createServerRef()`
   - Generate client-side stubs

4. **CommonJS to ESM Conversion**

   - Convert `module.exports` to `export default`
   - Convert `exports.foo` to `export const foo`
   - Convert top-level `require()` to `import`

5. **JSX Tracking Metadata Injection**
   - Add `__v0_e` (element info)
   - Add `__v0_c` (className locations)
   - Add `__v0_m` (missing className marker)
   - Add `__v0_i` (inner text locations)
   - Add `__v0_r` (ranges)

### 🔄 compiler.ts (TODO)

Main compilation orchestrator (IV function).

**Responsibilities:**

- Create ts-morph Project with in-memory filesystem
- Add React type shims (`__v0.d.ts`)
- Process each file through transformers
- Emit with React Refresh transformer
- Generate source maps
- Wrap with HMR runtime
- Create module blobs

**Configuration:**

```typescript
{
  target: ScriptTarget.ESNext,
  jsx: JsxEmit.ReactJSXDev,
  jsxImportSource: "__v0__",
  paths: tsconfig.compilerOptions?.paths || { "@/*": ["./*"] },
  isolatedModules: true,
  useInMemoryFileSystem: true
}
```

### 🔄 source-maps.ts (TODO)

Source map generation and encoding.

**Functions:**

- `generateSourceMap()` - Create source map from compilation
- `encodeSourceMap()` - Encode using @jridgewell/sourcemap-codec
- `inlineSourceMap()` - Create inline source map comment

## Dependencies

### Required Packages

```json
{
  "ts-morph": "^21.0.0",
  "@ts-morph/common": "^0.22.0",
  "react-refresh-typescript": "^2.0.0",
  "@jridgewell/sourcemap-codec": "^1.4.15",
  "magic-string": "^0.30.0"
}
```

### Internal Dependencies

- `src/compiler/modules/registry.ts` - Module registration
- `src/compiler/features/featureFlags.ts` - Feature flags
- `src/compiler/jsx-runtime/jsxDevRuntime.tsx` - Custom JSX runtime

## Usage Example

```typescript
import { compileFiles } from "./compiler";

const files = new Map([
  [
    "page.tsx",
    { data: "export default function Page() { return <div>Hello</div> }" },
  ],
  [
    "layout.tsx",
    {
      data: "export default function Layout({ children }) { return <html><body>{children}</body></html> }",
    },
  ],
]);

const result = await compileFiles({
  files,
  defaultPath: "page.tsx",
  createdAt: Date.now(),
  tsconfigPaths: {
    "@/*": ["./*"],
  },
});

// result.modules - Compiled modules with HMR
// result.entryModules - Entry points
// result.staticFiles - Static assets
```

## Transformation Examples

### 1. document.cookie Replacement

**Input:**

```typescript
const cookies = document.cookie;
document.cookie = "session=abc";
```

**Output:**

```typescript
const cookies = __v0_cookie_doc.cookie;
__v0_cookie_doc.cookie = "session=abc";
```

### 2. Import Path Resolution

**Input:**

```typescript
import { Button } from "@/components/ui/button";
import { utils } from "../lib/utils";
```

**Output:**

```typescript
import { Button } from "./components/ui/button";
import { utils } from "../lib/utils";
```

### 3. "use server" Handling

**Input:**

```typescript
"use server";

export async function createUser(data: FormData) {
  // Server-side code
  return { success: true };
}
```

**Output:**

```typescript
async function __v0_createUser_internal(data: FormData) {
  // Server-side code
  return { success: true };
}

export const createUser = __v0_createServerRef(__v0_createUser_internal);
```

### 4. JSX Tracking Metadata

**Input:**

```tsx
<Button className="bg-blue-500" onClick={handleClick}>
  Click me
</Button>
```

**Output:**

```tsx
<Button
  className="bg-blue-500"
  onClick={handleClick}
  __v0_e={{ name: "Button", start: 123, end: 456 }}
  __v0_c={[[1, 10, "bg-blue-500"]]}
>
  Click me
</Button>
```

## Error Handling

### Fatal Syntax Errors

Error codes that cause compilation to fail:

- 1381 - Unexpected token
- 1382 - Invalid syntax
- 1179 - Parse error

When a fatal error occurs:

1. Replace file content with error throw
2. Add default exports to prevent cascade failures
3. Show error context with line/column info

### Non-Fatal Warnings

- Type errors (continue compilation)
- Missing imports (resolve at runtime)
- Unused variables (ignore)

## Performance Optimizations

1. **Incremental Compilation**

   - Reuse existing ts-morph project
   - Only recompile changed files
   - Cache resolved imports

2. **Lazy Evaluation**

   - Don't compile unused files
   - Defer heavy transformations
   - Stream results

3. **Parallel Processing**
   - Process independent files in parallel
   - Use worker threads for large projects

## Testing Strategy

```typescript
describe("Compilation Pipeline", () => {
  it("should compile TypeScript to JavaScript", async () => {
    const result = await compileFiles({
      files: new Map([["test.ts", { data: "const x: number = 1;" }]]),
    });
    expect(result.modules[0].code).toContain("const x = 1;");
  });

  it("should replace document.cookie", async () => {
    const result = await compileFiles({
      files: new Map([["test.ts", { data: 'document.cookie = "test"' }]]),
    });
    expect(result.modules[0].code).toContain("__v0_cookie_doc.cookie");
  });

  it("should wrap with React Refresh", async () => {
    const result = await compileFiles({
      files: new Map([["test.tsx", { data: "export default () => <div/>" }]]),
    });
    expect(result.modules[0].runtime).toContain("__v0_$RefreshReg$");
  });
});
```

## Next Steps

1. Implement `transformers.ts` with all code transformations
2. Implement `compiler.ts` main orchestrator
3. Implement `source-maps.ts` for debugging support
4. Add comprehensive tests
5. Optimize for performance
6. Add error recovery mechanisms

## References

- **Source**: module_448763 (Lines 37,400-38,800)
- **ts-morph**: https://ts-morph.com/
- **React Refresh**: https://github.com/facebook/react/tree/main/packages/react-refresh
- **Source Maps**: https://sourcemaps.info/spec.html
