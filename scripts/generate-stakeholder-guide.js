import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { marked } from "marked";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const mdPath = path.join(rootDir, "Criation-UI-Complete-Stakeholder-and-Flaw-Improvement-Guide.md");
const htmlOutPath = path.join(rootDir, "Criation-UI-Complete-Stakeholder-and-Flaw-Improvement-Guide.html");
const pdfOutPath = path.join(rootDir, "Criation-UI-Complete-Stakeholder-and-Flaw-Improvement-Guide.pdf");

console.log("Reading Markdown guide from: " + mdPath);
const markdown = fs.readFileSync(mdPath, "utf-8");

console.log("Parsing Markdown to HTML...");
const bodyHtml = marked.parse(markdown);

const styledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Criation UI — Master Project Reference, Stakeholder Guide & Flaw Improvement Manual</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 14mm 18mm 14mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 9pt;
      line-height: 1.55;
      color: #1e293b;
      margin: 0;
      padding: 0;
    }

    .cover-page {
      page-break-after: always;
      padding: 50px 36px;
      text-align: center;
      background: linear-gradient(145deg, #090d16 0%, #0f172a 60%, #1e293b 100%);
      color: #ffffff;
      border-radius: 12px;
      margin-bottom: 30px;
      border: 1px solid #334155;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    .cover-badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid #38bdf8;
      border-radius: 20px;
      color: #38bdf8;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      margin-bottom: 24px;
    }

    .cover-title {
      font-size: 26pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0 0 12px 0;
      background: linear-gradient(90deg, #ffffff, #93c5fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cover-subtitle {
      font-size: 11.5pt;
      font-weight: 400;
      color: #94a3b8;
      max-width: 650px;
      margin: 0 auto 30px auto;
      line-height: 1.45;
    }

    .cover-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      max-width: 580px;
      margin: 0 auto 30px auto;
      text-align: left;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 8px;
      padding: 18px 24px;
    }

    .cover-meta-item {
      font-size: 8.5pt;
    }

    .cover-meta-label {
      color: #64748b;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .cover-meta-value {
      color: #f1f5f9;
      font-weight: 600;
    }

    .cover-seal {
      margin-top: 20px;
      padding: 12px 20px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 8px;
      font-size: 8pt;
      color: #e0f2fe;
      display: inline-block;
      text-align: left;
      max-width: 580px;
    }

    h1 {
      font-size: 16pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 6px;
      margin-top: 26pt;
      margin-bottom: 12pt;
      page-break-after: avoid;
    }

    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #1e293b;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 20pt;
      margin-bottom: 8pt;
      page-break-after: avoid;
    }

    h3 {
      font-size: 10.5pt;
      font-weight: 600;
      color: #334155;
      margin-top: 15pt;
      margin-bottom: 6pt;
      page-break-after: avoid;
    }

    h4 {
      font-size: 9.5pt;
      font-weight: 600;
      color: #475569;
      margin-top: 12pt;
      margin-bottom: 4pt;
      page-break-after: avoid;
    }

    p, ul, ol {
      margin-top: 0;
      margin-bottom: 9pt;
    }

    li {
      margin-bottom: 3pt;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 16pt 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0 14pt 0;
      font-size: 8pt;
      page-break-inside: avoid;
    }

    th {
      background: #0f172a;
      color: #ffffff;
      padding: 6px 8px;
      font-weight: 600;
      border: 1px solid #334155;
      text-align: left;
    }

    td {
      padding: 5px 8px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    pre {
      background: #090d16;
      color: #f8fafc;
      border: 1px solid #1e293b;
      border-radius: 6px;
      padding: 10px 12px;
      font-family: "Consolas", "Monaco", "Courier New", monospace;
      font-size: 7.5pt;
      line-height: 1.45;
      overflow-x: auto;
      margin: 9pt 0 12pt 0;
      page-break-inside: avoid;
    }

    code {
      font-family: "Consolas", "Monaco", "Courier New", monospace;
      font-size: 8pt;
      background: #f1f5f9;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      padding: 1px 4px;
      border-radius: 4px;
    }

    pre code {
      background: transparent;
      color: inherit;
      border: none;
      padding: 0;
      font-size: 7.5pt;
    }

    blockquote {
      margin: 10pt 0;
      padding: 8px 12px;
      background: #f0f9ff;
      border-left: 4px solid #0284c7;
      color: #0369a1;
      border-radius: 0 6px 6px 0;
      font-size: 8pt;
      page-break-inside: avoid;
    }

    blockquote p {
      margin: 0;
    }

    .footer-note {
      margin-top: 30pt;
      padding-top: 10pt;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 7.5pt;
      color: #64748b;
    }

    a {
      color: #2563eb;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <div class="cover-page">
    <div class="cover-badge">Multidisciplinary Engineering Master Guide</div>
    <div class="cover-title">Criation UI</div>
    <div class="cover-subtitle">Master Project Reference, Stakeholder Guide & Flaw Improvement Manual</div>
    
    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <div class="cover-meta-label">Document Release</div>
        <div class="cover-meta-value">v1.1.0 (Master Stakeholder Guide)</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Audit & Review Date</div>
        <div class="cover-meta-value">22 October 2026</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Product Base</div>
        <div class="cover-meta-value">@criation/ui@0.2.0 (PR 14 Baseline)</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Author / Maintainer</div>
        <div class="cover-meta-value">Divyanshu Kumar (@Atomic-Quark)</div>
      </div>
    </div>

    <div class="cover-seal">
      <strong>360-DEGREE STAKEHOLDER & REMEDIATION PLAYBOOK:</strong><br>
      Provides unified points of reference for Developers, Engineering Managers, Customers, and End Users. Includes complete code diffs and step-by-step procedures to easily improve and correct all known flaws.
    </div>
  </div>

  ${bodyHtml}

  <div class="footer-note">
    Criation UI Master Stakeholder Guide • Version 1.1.0 • Published 22 October 2026 • Copyright © 2026 Divyanshu Kumar.
  </div>

</body>
</html>`;

fs.writeFileSync(htmlOutPath, styledHtml, "utf-8");
console.log("Generated HTML: " + htmlOutPath);

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
console.log("Printing HTML to PDF via Microsoft Edge...");

const args = [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdfOutPath}`,
  `file:///${htmlOutPath.replace(/\\/g, "/")}`
];

try {
  execFileSync(edgePath, args, { stdio: "inherit" });
  console.log("Successfully generated PDF: " + pdfOutPath);
  const stats = fs.statSync(pdfOutPath);
  console.log(`PDF Size: ${(stats.size / 1024).toFixed(1)} KB`);
} catch (err) {
  console.error("Failed to generate PDF via Edge:", err);
  process.exit(1);
}
