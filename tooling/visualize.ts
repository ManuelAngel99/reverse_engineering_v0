#!/usr/bin/env node
import fs from "fs";
import path from "path";

interface ModuleInfo {
  id: number | string;
  file: string;
  exports: string[];
  imports: string[];
  lines: { start: number; end: number };
}

interface GraphNode {
  id: string;
  exports: string[];
  imports: string[];
  size: number;
  importedBy: string[];
}

function loadManifest(manifestPath: string): ModuleInfo[] {
  const content = fs.readFileSync(manifestPath, "utf-8");
  return JSON.parse(content);
}

function buildGraph(modules: ModuleInfo[]): Map<string, GraphNode> {
  const graph = new Map<string, GraphNode>();

  // Initialize all nodes
  for (const mod of modules) {
    const id = String(mod.id);
    graph.set(id, {
      id,
      exports: mod.exports,
      imports: mod.imports,
      size: mod.lines.end - mod.lines.start,
      importedBy: [],
    });
  }

  // Build reverse dependencies (importedBy)
  for (const mod of modules) {
    const id = String(mod.id);
    for (const imp of mod.imports) {
      const target = graph.get(imp);
      if (target) {
        target.importedBy.push(id);
      }
    }
  }

  return graph;
}

function findRoots(graph: Map<string, GraphNode>): string[] {
  // Roots are modules that are not imported by anyone
  const roots: string[] = [];
  for (const [id, node] of graph) {
    if (node.importedBy.length === 0) {
      roots.push(id);
    }
  }
  return roots;
}

function findLeaves(graph: Map<string, GraphNode>): string[] {
  // Leaves are modules that don't import anything
  const leaves: string[] = [];
  for (const [id, node] of graph) {
    if (node.imports.length === 0) {
      leaves.push(id);
    }
  }
  return leaves;
}

function generateStats(graph: Map<string, GraphNode>): string {
  const lines: string[] = [];
  const modules = Array.from(graph.values());

  lines.push("# Module Dependency Analysis\n");

  // Basic stats
  lines.push("## Overview\n");
  lines.push(`- **Total modules**: ${modules.length}`);
  lines.push(
    `- **Modules with exports**: ${
      modules.filter((m) => m.exports.length > 0).length
    }`
  );
  lines.push(
    `- **Total exports**: ${modules.reduce(
      (acc, m) => acc + m.exports.length,
      0
    )}`
  );
  lines.push(
    `- **Total import relationships**: ${modules.reduce(
      (acc, m) => acc + m.imports.length,
      0
    )}`
  );

  // Find roots and leaves
  const roots = findRoots(graph);
  const leaves = findLeaves(graph);

  lines.push(`\n## Dependency Structure\n`);
  lines.push(
    `- **Root modules** (entry points, not imported by others): ${roots.length}`
  );
  lines.push(`- **Leaf modules** (don't import anything): ${leaves.length}`);

  // Largest modules by code size
  lines.push(`\n## Largest Modules (by lines)\n`);
  const bySize = [...modules].sort((a, b) => b.size - a.size).slice(0, 10);
  for (const mod of bySize) {
    const exportsStr =
      mod.exports.length > 0
        ? ` - exports: ${mod.exports.slice(0, 3).join(", ")}${
            mod.exports.length > 3 ? "..." : ""
          }`
        : "";
    lines.push(`- **${mod.id}**: ${mod.size} lines${exportsStr}`);
  }

  // Most imported modules
  lines.push(`\n## Most Imported Modules\n`);
  const byImportedBy = [...modules]
    .sort((a, b) => b.importedBy.length - a.importedBy.length)
    .slice(0, 10);
  for (const mod of byImportedBy) {
    if (mod.importedBy.length === 0) continue;
    const exportsStr =
      mod.exports.length > 0
        ? ` - exports: ${mod.exports.slice(0, 5).join(", ")}${
            mod.exports.length > 5 ? "..." : ""
          }`
        : "";
    lines.push(
      `- **${mod.id}**: imported by ${mod.importedBy.length} modules${exportsStr}`
    );
  }

  // Modules with most imports
  lines.push(`\n## Modules with Most Dependencies\n`);
  const byImports = [...modules]
    .sort((a, b) => b.imports.length - a.imports.length)
    .slice(0, 10);
  for (const mod of byImports) {
    if (mod.imports.length === 0) continue;
    const exportsStr =
      mod.exports.length > 0
        ? ` - exports: ${mod.exports.slice(0, 3).join(", ")}${
            mod.exports.length > 3 ? "..." : ""
          }`
        : "";
    lines.push(
      `- **${mod.id}**: imports ${mod.imports.length} modules${exportsStr}`
    );
  }

  // Key modules (with named exports)
  lines.push(`\n## Key Modules (with named exports)\n`);
  const withExports = modules
    .filter((m) => m.exports.length > 0)
    .sort((a, b) => b.exports.length - a.exports.length);
  for (const mod of withExports) {
    lines.push(`\n### Module ${mod.id}`);
    lines.push(`- Size: ${mod.size} lines`);
    lines.push(`- Imports: ${mod.imports.length} modules`);
    lines.push(`- Imported by: ${mod.importedBy.length} modules`);
    lines.push(`- Exports (${mod.exports.length}):`);
    // Group exports by prefix if many
    if (mod.exports.length > 20) {
      const grouped = groupByPrefix(mod.exports);
      for (const [prefix, items] of Object.entries(grouped)) {
        if (items.length > 1) {
          lines.push(`  - ${prefix}*: ${items.join(", ")}`);
        } else {
          lines.push(`  - ${items[0]}`);
        }
      }
    } else {
      for (const exp of mod.exports) {
        lines.push(`  - \`${exp}\``);
      }
    }
  }

  return lines.join("\n");
}

function groupByPrefix(items: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};

  for (const item of items) {
    // Find common prefixes (e.g., "Arrow", "Calendar", "Sidebar")
    const match = item.match(/^([A-Z][a-z]+)/);
    const prefix = match ? match[1] : "_other";

    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push(item);
  }

  // Only keep groups with multiple items, others go to _single
  const result: Record<string, string[]> = {};
  const singles: string[] = [];

  for (const [prefix, items] of Object.entries(groups)) {
    if (items.length >= 3) {
      result[prefix] = items;
    } else {
      singles.push(...items);
    }
  }

  if (singles.length > 0) {
    result["_other"] = singles;
  }

  return result;
}

function generateMermaidDiagram(graph: Map<string, GraphNode>): string {
  const lines: string[] = ["```mermaid", "flowchart TD"];

  // Only include modules with exports or significant connections
  const significant = new Set<string>();
  for (const [id, node] of graph) {
    if (
      node.exports.length > 0 ||
      node.importedBy.length > 3 ||
      node.imports.length > 5
    ) {
      significant.add(id);
    }
  }

  // Add nodes
  for (const id of significant) {
    const node = graph.get(id)!;
    const label =
      node.exports.length > 0
        ? `${id}[${id}<br/>${node.exports.slice(0, 2).join(", ")}${
            node.exports.length > 2 ? "..." : ""
          }]`
        : `${id}((${id}))`;
    lines.push(`  ${label}`);
  }

  // Add edges (only between significant nodes)
  for (const id of significant) {
    const node = graph.get(id)!;
    for (const imp of node.imports) {
      if (significant.has(imp)) {
        lines.push(`  ${id} --> ${imp}`);
      }
    }
  }

  lines.push("```");
  return lines.join("\n");
}

function generateHTMLVisualization(
  graph: Map<string, GraphNode>,
  outputPath: string
): void {
  const nodes = Array.from(graph.values()).map((n) => ({
    id: n.id,
    label:
      n.exports.length > 0
        ? `${n.id}\n${n.exports.slice(0, 3).join("\n")}${
            n.exports.length > 3 ? "\n..." : ""
          }`
        : n.id,
    exports: n.exports,
    imports: n.imports,
    importedBy: n.importedBy,
    size: n.size,
    group: n.exports.length > 0 ? 1 : n.importedBy.length > 5 ? 2 : 3,
  }));

  const edges: { from: string; to: string }[] = [];
  for (const [id, node] of graph) {
    for (const imp of node.imports) {
      if (graph.has(imp)) {
        edges.push({ from: id, to: imp });
      }
    }
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Turbopack Module Dependencies</title>
  <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <style>
    body { margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    #container { display: flex; height: 100vh; }
    #graph { flex: 1; border-right: 1px solid #ccc; }
    #sidebar { width: 350px; padding: 16px; overflow-y: auto; background: #f5f5f5; }
    #sidebar h2 { margin-top: 0; }
    #search { width: 100%; padding: 8px; margin-bottom: 16px; box-sizing: border-box; }
    .stat { margin-bottom: 8px; }
    .stat-label { font-weight: bold; }
    #details { margin-top: 16px; padding-top: 16px; border-top: 1px solid #ccc; }
    .export-list { max-height: 200px; overflow-y: auto; font-size: 12px; }
    .export-item { padding: 2px 4px; background: #e0e0e0; margin: 2px; display: inline-block; border-radius: 3px; }
  </style>
</head>
<body>
  <div id="container">
    <div id="graph"></div>
    <div id="sidebar">
      <h2>Module Dependencies</h2>
      <input type="text" id="search" placeholder="Search modules or exports...">
      <div class="stat"><span class="stat-label">Total modules:</span> ${
        nodes.length
      }</div>
      <div class="stat"><span class="stat-label">Total edges:</span> ${
        edges.length
      }</div>
      <div class="stat"><span class="stat-label">Modules with exports:</span> ${
        nodes.filter((n) => n.exports.length > 0).length
      }</div>
      <div id="details">
        <p>Click a node to see details</p>
      </div>
    </div>
  </div>
  <script>
    const nodesData = ${JSON.stringify(nodes)};
    const edgesData = ${JSON.stringify(edges)};
    
    const nodes = new vis.DataSet(nodesData.map(n => ({
      id: n.id,
      label: n.id,
      title: n.exports.length > 0 ? 'Exports: ' + n.exports.slice(0, 10).join(', ') : 'No exports',
      size: Math.min(30, 10 + Math.sqrt(n.size) / 10),
      color: n.exports.length > 0 ? '#4CAF50' : n.importedBy.length > 5 ? '#2196F3' : '#9E9E9E',
      font: { size: 10 }
    })));
    
    const edges = new vis.DataSet(edgesData.map((e, i) => ({
      id: i,
      from: e.from,
      to: e.to,
      arrows: 'to',
      color: { opacity: 0.3 }
    })));
    
    const container = document.getElementById('graph');
    const data = { nodes, edges };
    const options = {
      physics: {
        stabilization: { iterations: 100 },
        barnesHut: { gravitationalConstant: -2000, springLength: 150 }
      },
      interaction: { hover: true },
      nodes: { shape: 'dot' }
    };
    
    const network = new vis.Network(container, data, options);
    
    const nodeMap = {};
    nodesData.forEach(n => nodeMap[n.id] = n);
    
    network.on('click', function(params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = nodeMap[nodeId];
        const details = document.getElementById('details');
        details.innerHTML = \`
          <h3>Module \${node.id}</h3>
          <div class="stat"><span class="stat-label">Size:</span> \${node.size} lines</div>
          <div class="stat"><span class="stat-label">Imports:</span> \${node.imports.length} modules</div>
          <div class="stat"><span class="stat-label">Imported by:</span> \${node.importedBy.length} modules</div>
          \${node.exports.length > 0 ? \`
            <div class="stat"><span class="stat-label">Exports (\${node.exports.length}):</span></div>
            <div class="export-list">\${node.exports.map(e => '<span class="export-item">' + e + '</span>').join('')}</div>
          \` : '<p>No named exports</p>'}
          <div class="stat" style="margin-top:12px"><span class="stat-label">Import IDs:</span></div>
          <div style="font-size:11px;word-break:break-all">\${node.imports.join(', ') || 'None'}</div>
        \`;
      }
    });
    
    document.getElementById('search').addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      if (!query) {
        nodes.forEach(n => nodes.update({ id: n.id, hidden: false }));
        return;
      }
      nodesData.forEach(n => {
        const matches = n.id.toLowerCase().includes(query) || 
                       n.exports.some(exp => exp.toLowerCase().includes(query));
        nodes.update({ id: n.id, hidden: !matches, color: matches ? '#FF5722' : undefined });
      });
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, html);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(
      "Usage: bun run src/visualize.ts <path/to/_manifest.json> [--html]"
    );
    process.exit(1);
  }

  const manifestPath = args[0];
  const generateHtml = args.includes("--html");

  if (!fs.existsSync(manifestPath)) {
    console.error(`File not found: ${manifestPath}`);
    process.exit(1);
  }

  console.log(`Loading manifest from ${manifestPath}...`);
  const modules = loadManifest(manifestPath);

  console.log(`Building dependency graph for ${modules.length} modules...`);
  const graph = buildGraph(modules);

  // Generate markdown stats
  const stats = generateStats(graph);
  const outputDir = path.dirname(manifestPath);
  const statsPath = path.join(outputDir, "_dependency_analysis.md");
  fs.writeFileSync(statsPath, stats);
  console.log(`Written analysis to ${statsPath}`);

  // Generate HTML if requested
  if (generateHtml) {
    const htmlPath = path.join(outputDir, "_dependency_graph.html");
    generateHTMLVisualization(graph, htmlPath);
    console.log(`Written interactive graph to ${htmlPath}`);
  }

  // Print summary to console
  console.log("\n" + "=".repeat(50));
  console.log("SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total modules: ${modules.length}`);
  console.log(
    `Modules with exports: ${
      modules.filter((m) => m.exports.length > 0).length
    }`
  );
  console.log(`Root modules: ${findRoots(graph).length}`);
  console.log(`Leaf modules: ${findLeaves(graph).length}`);

  const mostImported = [...graph.values()]
    .sort((a, b) => b.importedBy.length - a.importedBy.length)
    .slice(0, 5);
  console.log("\nMost imported modules:");
  for (const m of mostImported) {
    console.log(`  ${m.id}: ${m.importedBy.length} dependents`);
  }
}

main().catch(console.error);
