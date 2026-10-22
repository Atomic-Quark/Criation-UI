import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { marked } from "marked";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const mdPath = path.join(rootDir, "docs", "CRIATION-UI-SPECIFICATION-AND-USER-MANUAL.md");
const htmlOutPath = path.join(rootDir, "docs", "specification-manual.html");
const pdfOutPath = path.join(rootDir, "Criation-UI-Specification-and-User-Manual.pdf");

console.log("Reading Markdown specification...");
const markdown = fs.readFileSync(mdPath, "utf-8");

console.log("Parsing Markdown to HTML...");
const bodyHtml = marked.parse(markdown);

const styledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Criation UI — Architectural Specification & User Manual</title>
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
      font-size: 9.5pt;
      line-height: 1.55;
      color: #1e293b;
      margin: 0;
      padding: 0;
    }

    .cover-page {
      page-break-after: always;
      padding: 40px 30px;
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
      padding: 5px 14px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid #38bdf8;
      border-radius: 20px;
      color: #38bdf8;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 24px;
    }

    .cover-title {
      font-size: 32pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0 0 10px 0;
      background: linear-gradient(90deg, #ffffff, #93c5fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cover-subtitle {
      font-size: 13pt;
      font-weight: 400;
      color: #94a3b8;
      max-width: 600px;
      margin: 0 auto 30px auto;
      line-height: 1.4;
    }

    .cover-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      max-width: 540px;
      margin: 0 auto 30px auto;
      text-align: left;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 8px;
      padding: 18px 22px;
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
      margin-top: 25px;
      padding: 12px 20px;
      background: rgba(234, 179, 8, 0.1);
      border: 1px solid rgba(234, 179, 8, 0.4);
      border-radius: 8px;
      font-size: 8.5pt;
      color: #fef08a;
      display: inline-block;
    }

    h1 {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 6px;
      margin-top: 28pt;
      margin-bottom: 12pt;
      page-break-after: avoid;
    }

    h2 {
      font-size: 14pt;
      font-weight: 700;
      color: #1e293b;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 22pt;
      margin-bottom: 8pt;
      page-break-after: avoid;
    }

    h3 {
      font-size: 11pt;
      font-weight: 600;
      color: #334155;
      margin-top: 16pt;
      margin-bottom: 6pt;
      page-break-after: avoid;
    }

    h4 {
      font-size: 10pt;
      font-weight: 600;
      color: #475569;
      margin-top: 12pt;
      margin-bottom: 4pt;
      page-break-after: avoid;
    }

    p, ul, ol {
      margin-top: 0;
      margin-bottom: 10pt;
    }

    li {
      margin-bottom: 4pt;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 18pt 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }

    th {
      background: #0f172a;
      color: #ffffff;
      padding: 7px 10px;
      font-weight: 600;
      border: 1px solid #334155;
      text-align: left;
    }

    td {
      padding: 6px 10px;
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
      padding: 10px 14px;
      font-family: "Consolas", "Monaco", "Courier New", monospace;
      font-size: 8pt;
      line-height: 1.45;
      overflow-x: auto;
      margin: 10pt 0 14pt 0;
      page-break-inside: avoid;
    }

    code {
      font-family: "Consolas", "Monaco", "Courier New", monospace;
      font-size: 8.5pt;
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
      font-size: 8pt;
    }

    blockquote {
      margin: 12pt 0;
      padding: 8px 14px;
      background: #f0f9ff;
      border-left: 4px solid #0284c7;
      color: #0369a1;
      border-radius: 0 6px 6px 0;
      font-size: 8.5pt;
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
      font-size: 8pt;
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
    <div class="cover-badge">Enterprise Architectural Specification & User Manual</div>
    <div class="cover-title">Criation UI</div>
    <div class="cover-subtitle">A Unified React 18+ Design System, Fluent English Chaining DSL, and Enterprise Component Framework</div>
    
    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <div class="cover-meta-label">System Release</div>
        <div class="cover-meta-value">v0.2.1 (Production Ready)</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Author & Proprietor</div>
        <div class="cover-meta-value">Divyanshu Kumar (@Atomic-Quark)</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Contact & Inquiries</div>
        <div class="cover-meta-value">143479650+Atomic-Quark@users.noreply.github.com</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Repository</div>
        <div class="cover-meta-value">https://github.com/Atomic-Quark/Criation-UI</div>
      </div>
    </div>

    <div class="cover-seal">
      🛡️ <strong>MIT OPEN SOURCE LICENSE • DIVYANSHU KUMAR</strong><br>
      Criation UI is released under the permissive MIT License. Full commercial and private developer rights granted.
    </div>
  </div>

  ${bodyHtml}

  <div class="footer-note">
    Criation UI v0.2.1 • Official Technical Specification & User Manual • Licensed under MIT • Copyright © 2026 Divyanshu Kumar.
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
  if (fs.existsSync(htmlOutPath)) {
    fs.unlinkSync(htmlOutPath);
    console.log("Cleaned up intermediate HTML file: " + htmlOutPath);
  }
} catch (err) {
  console.error("Failed to generate PDF via Edge:", err);
  process.exit(1);
}
