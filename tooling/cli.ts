#!/usr/bin/env node
import { extractTurbopackModules } from "./extractor";
import { writeModulesToDisk } from "./writer";
import path from "path";
import fs from "fs";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: decompile <path/to/file.js> [--output <dir>]");
    process.exit(1);
  }

  const inputFile = args[0];
  const outputIdx = args.indexOf("--output");
  const outputDir =
    outputIdx !== -1 && args[outputIdx + 1]
      ? args[outputIdx + 1]
      : path.join(path.dirname(inputFile), "decompiled_modules");

  if (!fs.existsSync(inputFile)) {
    console.error(`File not found: ${inputFile}`);
    process.exit(1);
  }

  console.log(`Reading ${inputFile}...`);
  const code = fs.readFileSync(inputFile, "utf-8");

  console.log(`Parsing and extracting modules...`);
  const modules = extractTurbopackModules(code);

  console.log(`Found ${modules.length} modules`);

  if (modules.length === 0) {
    console.error("No modules found. Is this a Turbopack bundle?");
    process.exit(1);
  }

  console.log(`Writing modules to ${outputDir}...`);
  await writeModulesToDisk(modules, outputDir);

  console.log(`Done! Extracted ${modules.length} modules.`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
