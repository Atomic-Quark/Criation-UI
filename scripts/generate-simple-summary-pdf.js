import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { marked } from "marked";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const mdPath = path.join(rootDir, "Criation-UI-Simple-Summary-and-Evolution-Report.md");
const htmlOutPath = path.join(rootDir, "Criation-UI-Simple-Summary-and-Evolution-Report.html");
const pdfOutPath = path.join(rootDir, "Criation-UI-Simple-Summary-and-Evolution-Report.pdf");

console.log("Reading Markdown summary report...");
const markdown = fs.readFileSync(mdPath, "utf-8");

console.log("Parsing Markdown to HTML...");
const bodyHtml = marked.parse(markdown);

const styledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Criation UI — Simple Project Guide & Evolution Report</title>
  <style>
    @page {
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.6;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    .cover-page {
      page-break-after: always;
      padding: 50px 30px;
      text-align: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
      color: #ffffff;
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      margin-bottom: 20px;
    }

    .cover-badge {
      display: inline-block;
      padding: 6px 18px;
      border-radius: 30px;
      background: rgba(129, 140, 248, 0.2);
      border: 1px solid #818cf8;
      color: #c7d2fe;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 24px;
    }

    .cover-title {
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 1.2;
      margin: 0 0 16px 0;
      background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cover-subtitle {
      font-size: 1.1rem;
      color: #cbd5e1;
      max-width: 650px;
      margin: 0 auto 36px auto;
      line-height: 1.6;
    }

    .cover-meta {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      padding: 20px 32px;
      font-size: 0.9rem;
      color: #e2e8f0;
      text-align: left;
      width: 100%;
      max-width: 580px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }

    .cover-meta table {
      width: 100%;
      border-collapse: collapse;
      border: none;
      margin: 0;
    }

    .cover-meta td {
      padding: 6px 0;
      border: none;
      background: transparent !important;
    }

    .cover-meta td.label {
      font-weight: 600;
      color: #a5b4fc;
      width: 45%;
    }

    .content {
      padding: 0 10px;
    }

    h1 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 28px;
      margin-bottom: 14px;
      page-break-after: avoid;
    }

    h2 {
      font-size: 1.35rem;
      font-weight: 700;
      color: #1e1b4b;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #312e81;
      margin-top: 18px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 10px 0;
      text-align: justify;
    }

    ul, ol {
      margin: 0 0 12px 0;
      padding-left: 24px;
    }

    li {
      margin-bottom: 4px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 8.5pt;
      page-break-inside: auto;
    }

    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }

    tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }

    code {
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 8.5pt;
      background-color: #f1f5f9;
      color: #4338ca;
      padding: 2px 5px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre {
      background-color: #0f172a;
      color: #f8fafc;
      padding: 12px 14px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 8pt;
      line-height: 1.45;
      margin: 12px 0;
      page-break-inside: avoid;
      border: 1px solid #1e293b;
    }

    pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      border: none;
      font-size: inherit;
    }

    blockquote {
      border-left: 4px solid #6366f1;
      margin: 14px 0;
      padding: 8px 14px;
      background-color: #eef2ff;
      color: #312e81;
      border-radius: 0 6px 6px 0;
      font-size: 9pt;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 22px 0;
    }

    a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
    }

    .badge-success {
      background-color: #dcfce7;
      color: #15803d;
      border: 1px solid #bbf7d0;
    }
  </style>
</head>
<body>

  <div class="cover-page">
    <div class="cover-badge">Official Architecture & Evolution Report</div>
    <div class="cover-title">Criation UI</div>
    <div class="cover-subtitle">
      A simple, plain-English summary of what Criation UI is, the side-by-side comparison between the original version and today, and the complete version-by-version bug fix history.
    </div>

    <div class="cover-meta">
      <table>
        <tr>
          <td class="label">Project:</td>
          <td><strong>Criation UI (@criation/ui)</strong></td>
        </tr>
        <tr>
          <td class="label">Target Readability:</td>
          <td>Simple English (Accessible to high-schoolers & beginners)</td>
        </tr>
        <tr>
          <td class="label">Current Version:</td>
          <td>v0.3.0-beta (Controlled Developer Preview)</td>
        </tr>
        <tr>
          <td class="label">Original vs. New Score:</td>
          <td><strong>4.5 / 10 &rarr; 8.6 / 10 (+91% Quality Increase)</strong></td>
        </tr>
        <tr>
          <td class="label">Verified Test Suite:</td>
          <td><strong>142 / 142 Tests Passed (100% Pass Rate)</strong></td>
        </tr>
        <tr>
          <td class="label">License:</td>
          <td>MIT Permissive Open Source License (100% Free)</td>
        </tr>
        <tr>
          <td class="label">Architect & Creator:</td>
          <td>Divyanshu Kumar (@Atomic-Quark)</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="content">
    ${bodyHtml}
  </div>

</body>
</html>`;

fs.writeFileSync(htmlOutPath, styledHtml, "utf-8");
console.log(`Generated styled HTML: ${htmlOutPath}`);

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  process.env.LOCALAPPDATA + "\\Microsoft\\Edge\\Application\\msedge.exe",
];

const edgeBin = edgePaths.find((p) => fs.existsSync(p));

if (!edgeBin) {
  console.error("Microsoft Edge binary not found.");
  process.exit(1);
}

console.log("Printing HTML to PDF via Microsoft Edge...");
try {
  execFileSync(
    edgeBin,
    [
      "--headless",
      "--disable-gpu",
      "--run-all-compositor-stages-before-draw",
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfOutPath}`,
      htmlOutPath,
    ],
    { stdio: "inherit" }
  );

  const stats = fs.statSync(pdfOutPath);
  console.log(`Successfully generated PDF: ${pdfOutPath}`);
  console.log(`PDF Size: ${(stats.size / 1024).toFixed(1)} KB`);

  // Clean up intermediate HTML file
  if (fs.existsSync(htmlOutPath)) {
    fs.unlinkSync(htmlOutPath);
    console.log(`Cleaned up intermediate HTML file: ${htmlOutPath}`);
  }
} catch (err) {
  console.error("Failed to generate PDF:", err);
  process.exit(1);
}
