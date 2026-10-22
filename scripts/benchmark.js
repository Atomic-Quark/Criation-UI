/**
 * Criation UI — Performance & Bundle Size Benchmark Harness
 * Repeatable, empirical measurements for bundle weights and execution throughput.
 */

import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

function getFileSize(filePath) {
  if (!fs.existsSync(filePath)) return { raw: 0, gzip: 0 };
  const buffer = fs.readFileSync(filePath);
  const raw = buffer.length;
  const gzip = zlib.gzipSync(buffer).length;
  return {
    raw,
    gzip,
    rawKb: (raw / 1024).toFixed(2),
    gzipKb: (gzip / 1024).toFixed(2),
  };
}

console.log("\n=======================================================");
console.log("   CRIATION UI — EMPIRICAL PERFORMANCE BENCHMARK HARNESS");
console.log("   Runtime: Node.js " + process.version + " • " + process.platform + " " + process.arch);
console.log("=======================================================\n");

// 1. Bundle Size Measurements
console.log("1. Distribution Bundle Weight Measurements:");
console.log("------------------------------------------------------------------");
console.log(
  "Artifact".padEnd(34) +
  "Raw Size".padStart(14) +
  "Gzipped".padStart(14)
);
console.log("------------------------------------------------------------------");

const artifacts = [
  { name: "Full Stylesheet (dist/styles.css)", path: path.join(distDir, "styles.css") },
  { name: "Full ESM Bundle (dist/index.js)", path: path.join(distDir, "index.js") },
  { name: "Full UMD Bundle (dist/index.umd.cjs)", path: path.join(distDir, "index.umd.cjs") },
  { name: "Type Declarations (dist/index.d.ts)", path: path.join(distDir, "index.d.ts") },
  { name: "Form Hook Typings (dist/forms/useForm.d.ts)", path: path.join(distDir, "forms", "useForm.d.ts") },
  { name: "CRUD Workflow Typings (dist/workflows/createCrudWorkflow.d.ts)", path: path.join(distDir, "workflows", "createCrudWorkflow.d.ts") },
];

const bundleResults = [];

for (const art of artifacts) {
  const size = getFileSize(art.path);
  bundleResults.push({ name: art.name, rawKb: size.rawKb, gzipKb: size.gzipKb, rawBytes: size.raw });
  console.log(
    art.name.padEnd(34) +
    `${size.rawKb} kB`.padStart(14) +
    `${size.gzipKb} kB`.padStart(14)
  );
}

console.log("------------------------------------------------------------------\n");

// 2. Execution Throughput Benchmarks
console.log("2. Execution Speed & Throughput Benchmarks (10,000 iterations):");
console.log("------------------------------------------------------------------");
console.log(
  "Benchmark Target".padEnd(36) +
  "Duration".padStart(12) +
  "Throughput (ops/sec)".padStart(20)
);
console.log("------------------------------------------------------------------");

// Import core utilities dynamically
const { formatDate } = await import("../dist/index.js");
const { formatFileSize } = await import("../dist/index.js");
const { formatNumber } = await import("../dist/index.js");
const { validateEmail } = await import("../dist/index.js");
const { ui } = await import("../dist/index.js");
const { describe } = await import("../dist/index.js");

const ITERATIONS = 10000;

function bench(name, fn) {
  // Warmup
  for (let i = 0; i < 500; i++) fn();

  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    fn();
  }
  const end = performance.now();
  const durationMs = end - start;
  const opsPerSec = Math.round((ITERATIONS / durationMs) * 1000);

  console.log(
    name.padEnd(36) +
    `${durationMs.toFixed(2)} ms`.padStart(12) +
    `${opsPerSec.toLocaleString()} ops/s`.padStart(20)
  );

  return { name, durationMs: Number(durationMs.toFixed(2)), opsPerSec };
}

const speedResults = [];

speedResults.push(bench("Utility: formatFileSize()", () => {
  formatFileSize(1048576);
}));

speedResults.push(bench("Utility: formatNumber()", () => {
  formatNumber(1250000, "currency");
}));

speedResults.push(bench("Utility: formatDate()", () => {
  formatDate("2026-10-22T12:00:00Z");
}));

speedResults.push(bench("Validator: validateEmail()", () => {
  validateEmail("developer@example.com");
}));

speedResults.push(bench("Fluent Builder: ui.button().build()", () => {
  ui.button("Submit").variant("primary").size("14px 28px").build();
}));

speedResults.push(bench("Fluent Builder: ui.heading().build()", () => {
  ui.heading("Dashboard").level(2).gradient().build();
}));

speedResults.push(bench("DSL Parser: describe()", () => {
  describe("button Proceed primary large");
}));

console.log("------------------------------------------------------------------\n");

// Summary & Output JSON
const benchmarkOutput = {
  timestamp: new Date().toISOString(),
  environment: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
  },
  bundleMetrics: bundleResults,
  throughputMetrics: speedResults,
};

const outJsonPath = path.join(rootDir, "BENCHMARK-REPORT.json");
fs.writeFileSync(outJsonPath, JSON.stringify(benchmarkOutput, null, 2), "utf-8");
console.log("✅ Benchmark report written to: BENCHMARK-REPORT.json\n");
