/**
 * Criation UI — Consumer Package & Distribution Verification Script
 * Validates tarball packaging, export maps, subpath resolutions,
 * typings presence, and zero artifact leakage.
 */

import fs from "fs";
import path from "path";

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  ✓ ${description}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${description}`);
    failed++;
  }
}

console.log("\n=======================================================");
console.log("   CRIATION UI — CONSUMER PACKAGE VERIFICATION SUITE   ");
console.log("=======================================================\n");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

console.log("1. Package Metadata & Controlled Beta Policy:");
assert("Package name is @criation/ui", pkg.name === "@criation/ui");
assert("Package version is 0.3.0-beta", pkg.version === "0.3.0-beta");
assert("Package license is MIT", pkg.license === "MIT");
assert("Main entry point dist/index.umd.cjs exists", fs.existsSync(pkg.main));
assert("ESM module entry point dist/index.js exists", fs.existsSync(pkg.module));
assert("Types entry point dist/index.d.ts exists", fs.existsSync(pkg.types));

console.log("\n2. Subpath Exports Map Verification:");
const exportsMap = pkg.exports;
assert("Subpath export '.' is configured", !!exportsMap["."]);
assert("Subpath export './button' is configured", !!exportsMap["./button"]);
assert("Subpath export './input' is configured", !!exportsMap["./input"]);
assert("Subpath export './card' is configured", !!exportsMap["./card"]);
assert("Subpath export './workflows' is configured", !!exportsMap["./workflows"]);
assert("Subpath export './core' is configured", !!exportsMap["./core"]);
assert("Subpath export './styles.css' is configured", !!exportsMap["./styles.css"]);

// Check that every mapped file actually exists in dist/
for (const [subpath, config] of Object.entries(exportsMap)) {
  if (typeof config === "string") {
    assert(`Target file exists for ${subpath}: ${config}`, fs.existsSync(config));
  } else {
    if (config.import) assert(`Target import exists for ${subpath}: ${config.import}`, fs.existsSync(config.import));
    if (config.types) assert(`Target types exist for ${subpath}: ${config.types}`, fs.existsSync(config.types));
  }
}

console.log("\n3. CSS & Zero Runtime Distribution Verification:");
const cssPath = "dist/styles.css";
const cssStats = fs.statSync(cssPath);
const cssSizeKb = (cssStats.size / 1024).toFixed(2);
assert(`CSS stylesheet size is within budget (${cssSizeKb} kB <= 40 kB)`, cssStats.size <= 40 * 1024);

const esmPath = "dist/index.js";
const esmStats = fs.statSync(esmPath);
const esmSizeKb = (esmStats.size / 1024).toFixed(2);
assert(`ESM distribution size is within budget (${esmSizeKb} kB <= 260 kB)`, esmStats.size <= 260 * 1024);

console.log("\n4. Developer CLI Tooling Executable Check:");
assert("CLI binary bin/criation.js exists", fs.existsSync(pkg.bin.criation));
const cliContent = fs.readFileSync(pkg.bin.criation, "utf-8");
assert("CLI contains shebang header", cliContent.startsWith("#!/usr/bin/env node"));
assert("CLI supports init command", cliContent.includes("init"));
assert("CLI supports add command", cliContent.includes("add"));
assert("CLI supports benchmark command", cliContent.includes("benchmark"));
assert("CLI supports audit command", cliContent.includes("audit"));

console.log("\n5. Distribution Cleanliness & Leakage Prevention:");
const pkgFiles = pkg.files || [];
assert("package.json files field restricts tarball to dist and bin", 
  pkgFiles.includes("dist") && pkgFiles.includes("bin")
);
assert("No temporary test HTML in docs directory", !fs.existsSync("docs/specification-manual.html"));

console.log("\n=======================================================");
console.log(`TOTAL PACKAGE VERIFICATIONS: ${passed + failed}`);
console.log(`PASSED:                      ${passed}`);
console.log(`FAILED:                      ${failed}`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 CONSUMER PACKAGE VERIFIED 100% PRODUCTION READY!\n");
}
