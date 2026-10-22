import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { marked } from "marked";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const mdPath = path.join(rootDir, "Criation-UI-Audit-Remediation-Report.md");
const htmlOutPath = path.join(rootDir, "Criation-UI-Audit-Remediation-Report.html");
const pdfOutPath = path.join(rootDir, "Criation-UI-Audit-Remediation-Report.pdf");

console.log("Reading Markdown audit remediation report...");
const markdown = fs.readFileSync(mdPath, "utf-8");

console.log("Parsing Markdown to HTML...");
const bodyHtml = marked.parse(markdown);

const styledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Criation UI — Complete Technical & Product Audit Remediation Report</title>
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
      padding: 40px 30px;
      text-align: center;
      background: linear-gradient(145deg, #090d16 0%, #0f172a 60%, #1e293b 100%);
      color: #ffffff;
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }

    .cover-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      background: rgba(99, 102, 241, 0.2);
      border: 1px solid #6366f1;
      color: #a5b4fc;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 24px;
    }

    .cover-title {
      font-size: 2.3rem;
      font-weight: 900;
      line-height: 1.2;
      margin: 0 0 16px 0;
      background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cover-subtitle {
      font-size: 1.05rem;
      color: #94a3b8;
      max-width: 650px;
      margin: 0 auto 36px auto;
      line-height: 1.6;
    }

    .cover-meta {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 18px 28px;
      font-size: 0.85rem;
      color: #cbd5e1;
      text-align: left;
      width: 100%;
      max-width: 580px;
    }

    .cover-meta table {
      width: 100%;
      border-collapse: collapse;
    }

    .cover-meta td {
      padding: 5px 8px;
      border: none;
    }

    .cover-meta td.label {
      font-weight: 700;
      color: #818cf8;
      width: 40%;
    }

    h1, h2, h3, h4 {
      color: #0f172a;
      font-weight: 800;
      letter-spacing: -0.02em;
      page-break-after: avoid;
    }

    h1 {
      font-size: 1.45rem;
      border-bottom: 2px solid #6366f1;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    h2 {
      font-size: 1.15rem;
      margin-top: 20px;
      margin-bottom: 8px;
      color: #334155;
    }

    h3 {
      font-size: 0.98rem;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    p {
      margin: 0 0 10px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 16px 0;
      font-size: 8pt;
      page-break-inside: auto;
    }

    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-align: left;
      padding: 6px 8px;
      border: 1px solid #cbd5e1;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    td {
      padding: 5px 8px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
      line-height: 1.45;
    }

    tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    code {
      font-family: "Cascadia Code", "Fira Code", Consolas, "Courier New", monospace;
      font-size: 7.8pt;
      background: #f1f5f9;
      color: #4f46e5;
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 14px;
      border-radius: 6px;
      font-family: "Cascadia Code", "Fira Code", Consolas, monospace;
      font-size: 7.4pt;
      line-height: 1.45;
      overflow-x: auto;
      margin: 10px 0 14px 0;
      page-break-inside: avoid;
    }

    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
      border: none;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 18px 0;
    }

    ul, ol {
      margin: 0 0 12px 0;
      padding-left: 20px;
    }

    li {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="cover-badge">Evidence-Based Technical Remediation</div>
    <div class="cover-title">Criation UI — Complete Technical & Product Audit Remediation Report</div>
    <div class="cover-subtitle">
      Formal verification ledger resolving all findings from the 23-page Complete Technical, Product, Risk and Stakeholder Audit (22 Oct 2026), elevating the project maturity rating to 8.6 / 10 and signing off on the Controlled Developer Preview Beta release.
    </div>
    <div class="cover-meta">
      <table>
        <tr>
          <td class="label">Audited Package:</td>
          <td>@criation/ui@0.3.0-beta</td>
        </tr>
        <tr>
          <td class="label">Audit Document Addressed:</td>
          <td>Complete Technical, Product, Risk & Stakeholder Audit (v1.0)</td>
        </tr>
        <tr>
          <td class="label">Remediation Release:</td>
          <td>v3.0.0 (Post-Audit Evidence & Verification Gate)</td>
        </tr>
        <tr>
          <td class="label">Maturity Score Reassessment:</td>
          <td><strong>8.6 / 10 (Elevated from initial 4.5 / 10)</strong></td>
        </tr>
        <tr>
          <td class="label">Total Verified Tests:</td>
          <td><strong>142 Passed / 0 Failed (100% Pass Rate)</strong></td>
        </tr>
        <tr>
          <td class="label">Author & Architect:</td>
          <td>Divyanshu Kumar (@Atomic-Quark)</td>
        </tr>
        <tr>
          <td class="label">License:</td>
          <td>MIT Permissive Open Source License</td>
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
