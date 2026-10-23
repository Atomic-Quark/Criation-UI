#!/usr/bin/env node

/**
 * Criation UI CLI - Rapid Scaffolding and Developer Productivity Tool
 * Version: 0.3.0-beta
 * Author: Divyanshu Kumar (@Atomic-Quark)
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const command = args[0];

function printBanner() {
  console.log(`
  ======================================================
     🚀 CRIATION UI CLI — DEVELOPER PRODUCTIVITY TOOL
     Version: 0.3.0-beta (Developer Preview)
  ======================================================
  `);
}

function printHelp() {
  printBanner();
  console.log(`  Usage:
    criation <command> [options]

  Commands:
    init [project-name]       Scaffold a new Criation UI React + Vite application
    generate <prompt|file>   Generate an editable React application from plain English
    compile <dsl-file>        Compile Mode B structured DSL into an editable React app
    add <recipe>              Add a ready-to-use high-level workflow template
                              Available recipes: form, dashboard, crud, auth, api
    benchmark                 Run automated performance and bundle size benchmark
    audit                     Run complete accessibility and typecheck verification
    help                      Show this help message

  Examples:
    npx criation generate "Create a page called Members. Show all members in a table." --out my-app
    npx criation compile spec.dsl --out my-app
    npx criation init my-saas-app
    npx criation add crud
`);
}

function handleInit(projectName = "criation-app") {
  printBanner();
  const targetDir = path.resolve(process.cwd(), projectName);
  console.log(`📦 Initializing new Criation UI project in: ${targetDir}\n`);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const pkgJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      preview: "vite preview",
    },
    dependencies: {
      react: "^18.3.1",
      "react-dom": "^18.3.1",
      "@criation/ui": "^0.2.0",
      "lucide-react": "^1.16.0",
    },
    devDependencies: {
      "@types/react": "^18.3.18",
      "@types/react-dom": "^18.3.5",
      "@vitejs/plugin-react": "^4.3.4",
      typescript: "^5.7.3",
      vite: "^6.1.0",
    },
  };

  fs.writeFileSync(path.join(targetDir, "package.json"), JSON.stringify(pkgJson, null, 2), "utf-8");

  const appTsx = `import React from "react";
import { ThemeProvider, Button, Input, Card, Stack, Heading, Badge } from "@criation/ui";
import "@criation/ui/styles.css";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <Card variant="glass" padding="xl" style={{ maxWidth: 480, width: "100%" }}>
          <Stack direction="column" gap="md">
            <Badge variant="success">Developer Preview</Badge>
            <Heading level={1} gradient>Welcome to Criation UI</Heading>
            <p style={{ color: "#94a3b8" }}>Rapid UI development with zero CSS runtime overhead.</p>
            <Input placeholder="Enter email address..." fullWidth />
            <Button variant="primary" size="lg" onClick={() => alert("Welcome!")}>
              Get Started
            </Button>
          </Stack>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
`;

  const srcDir = path.join(targetDir, "src");
  fs.mkdirSync(srcDir, { recursive: true });
  fs.writeFileSync(path.join(srcDir, "App.tsx"), appTsx, "utf-8");

  console.log(`✅ Successfully initialized project: ${projectName}`);
  console.log(`
  Next steps:
    cd ${projectName}
    npm install
    npm run dev
`);
}

function handleAdd(recipe) {
  printBanner();
  if (!recipe) {
    console.error("❌ Please specify a workflow recipe to add (e.g. form, dashboard, crud, auth, api).");
    process.exit(1);
  }

  const recipes = {
    form: {
      file: "RegistrationForm.tsx",
      content: `import React from "react";
import { useForm, Input, Button, Card, Stack, Heading, Alert } from "@criation/ui";

export function RegistrationForm() {
  const form = useForm({
    initialValues: { email: "", username: "", password: "" },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.email.includes("@")) errors.email = "Valid email is required";
      if (!values.username) errors.username = "Username cannot be empty";
      if (values.password.length < 8) errors.password = "Password must be at least 8 characters";
      return errors;
    },
    onSubmit: async (values) => {
      console.log("Form Submitted Successfully:", values);
      alert("Registration completed!");
    },
  });

  return (
    <Card variant="default" padding="lg" style={{ maxWidth: 440 }}>
      <form onSubmit={form.handleSubmit}>
        <Stack direction="column" gap="md">
          <Heading level={2}>Create Account</Heading>
          {form.submitError && <Alert variant="danger">{form.submitError}</Alert>}
          <Input
            placeholder="Work email"
            value={form.values.email}
            onChange={(e) => form.handleChange("email", e.target.value)}
            error={form.errors.email}
          />
          <Input
            placeholder="Username"
            value={form.values.username}
            onChange={(e) => form.handleChange("username", e.target.value)}
            error={form.errors.username}
          />
          <Input
            type="password"
            placeholder="Password (min 8 chars)"
            value={form.values.password}
            onChange={(e) => form.handleChange("password", e.target.value)}
            error={form.errors.password}
          />
          <Button type="submit" variant="primary" loading={form.isSubmitting}>
            Submit Registration
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
`,
    },
    dashboard: {
      file: "AnalyticsDashboard.tsx",
      content: `import React from "react";
import { DashboardLayout, StatCard, Table, Grid, Badge, Button } from "@criation/ui";

const sampleColumns = [
  { key: "id", header: "Order ID" },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount" },
  { key: "status", header: "Status", render: (val: string) => <Badge variant={val === "Paid" ? "success" : "warning"}>{val}</Badge> },
];

const sampleData = [
  { id: "ORD-101", customer: "Acme Corp", amount: "$1,250.00", status: "Paid" },
  { id: "ORD-102", customer: "Starlight Inc", amount: "$840.00", status: "Pending" },
  { id: "ORD-103", customer: "Nexus Labs", amount: "$3,100.00", status: "Paid" },
];

export function AnalyticsDashboard() {
  return (
    <DashboardLayout
      brand="Criation Analytics"
      user={{ name: "Alex Rivers", email: "alex@example.com" }}
      navigationItems={[
        { label: "Overview", href: "#overview", active: true },
        { label: "Transactions", href: "#transactions" },
        { label: "Settings", href: "#settings" },
      ]}
    >
      <Grid columns="repeat(auto-fit, minmax(240px, 1fr))" gap="lg" style={{ marginBottom: "2rem" }}>
        <StatCard title="Total Revenue" value="$48,290" change="+14.2%" trend="up" />
        <StatCard title="Active Subscriptions" value="1,429" change="+8.1%" trend="up" />
        <StatCard title="Pending Invoices" value="18" change="-3.4%" trend="down" />
      </Grid>

      <Table columns={sampleColumns} data={sampleData} />
    </DashboardLayout>
  );
}
`,
    },
    crud: {
      file: "UserCrudWorkflow.tsx",
      content: `import React from "react";
import { useCrudWorkflow, Table, Button, Modal, Input, Stack, Heading, Badge } from "@criation/ui";

interface UserItem {
  id: string;
  name: string;
  role: string;
}

export function UserCrudWorkflow() {
  const crud = useCrudWorkflow<UserItem>({
    resourceName: "Users",
    initialItems: [
      { id: "1", name: "Sarah Connor", role: "Administrator" },
      { id: "2", name: "John Doe", role: "Developer" },
    ],
    fetchList: async () => [
      { id: "1", name: "Sarah Connor", role: "Administrator" },
      { id: "2", name: "John Doe", role: "Developer" },
    ],
    createItem: async (data) => ({ id: String(Date.now()), ...data }),
    deleteItem: async (id) => console.log("Deleted user:", id),
  });

  return (
    <div>
      <Stack direction="row" justify="space-between" style={{ marginBottom: "1rem" }}>
        <Heading level={2}>User Management</Heading>
        <Button variant="primary" onClick={crud.openCreate}>Add User</Button>
      </Stack>

      <Table
        columns={[
          { key: "id", header: "ID" },
          { key: "name", header: "Name" },
          { key: "role", header: "Role", render: (r: string) => <Badge>{r}</Badge> },
          {
            key: "actions",
            header: "Actions",
            render: (_: any, row: UserItem) => (
              <Button variant="danger" size="sm" onClick={() => crud.handleDelete(row.id)}>
                Delete
              </Button>
            ),
          },
        ]}
        data={crud.items}
      />
    </div>
  );
}
`,
    },
  };

  const selected = recipes[recipe.toLowerCase()];
  if (!selected) {
    console.error(`❌ Unknown recipe: "${recipe}". Available: form, dashboard, crud, auth, api`);
    process.exit(1);
  }

  const dest = path.join(process.cwd(), selected.file);
  fs.writeFileSync(dest, selected.content, "utf-8");
  console.log(`✅ Scaffolded workflow recipe: ${selected.file}`);
}

function handleBenchmark() {
  const benchScript = path.join(rootDir, "scripts", "benchmark.js");
  if (fs.existsSync(benchScript)) {
    execSync(`node "${benchScript}"`, { stdio: "inherit" });
  } else {
    console.error("❌ Benchmark runner script not found:", benchScript);
  }
}

function handleAudit() {
  console.log("🔍 Running TypeScript validation...");
  execSync("npx tsc --noEmit", { cwd: rootDir, stdio: "inherit" });
  console.log("🧪 Running automated test & accessibility suite...");
  execSync("node scripts/test-suite.js", { cwd: rootDir, stdio: "inherit" });
  console.log("✅ All quality gates passed!");
}

async function handleGenerate(promptArg, outArg = "generated-app") {
  printBanner();
  if (!promptArg) {
    console.error("❌ Please provide a prompt or path to a text file containing the application description.");
    console.log("   Example: npx criation generate \"Create a page called Members. Show all members in a searchable table.\" --out my-app");
    process.exit(1);
  }

  let prompt = promptArg;
  if (fs.existsSync(promptArg)) {
    prompt = fs.readFileSync(promptArg, "utf-8");
  }

  let outDir = outArg;
  const outFlagIndex = args.indexOf("--out");
  if (outFlagIndex !== -1 && args[outFlagIndex + 1]) {
    outDir = args[outFlagIndex + 1];
  } else if (outDir.startsWith("--")) {
    outDir = "generated-app";
  }

  const targetDir = path.resolve(process.cwd(), outDir);
  console.log(`🤖 Compiling Plain-English description into editable React application...`);
  console.log(`📂 Target directory: ${targetDir}\n`);

  const { compileEnglishToReact } = await import("../dist/index.js");
  const result = compileEnglishToReact(prompt);

  if (result.errors && result.errors.length > 0) {
    console.error("❌ Compilation errors in application model:");
    result.errors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }

  console.log(`✨ Application Model compiled successfully!`);
  console.log(`   Resources: ${result.summary.resourceCount}`);
  console.log(`   Pages:     ${result.summary.pageCount}`);
  console.log(`   Files:     ${result.summary.fileCount}\n`);

  for (const file of result.files) {
    const fullPath = path.join(targetDir, file.path);
    const parentDir = path.dirname(fullPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(fullPath, file.content, "utf-8");
    console.log(`   📄 Created ${file.path}`);
  }

  console.log(`\n🎉 Application successfully generated in: ${targetDir}`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${outDir}`);
  console.log(`  npm install`);
  console.log(`  npm run dev\n`);
}

async function handleCompile(dslFile, outArg = "generated-app") {
  printBanner();
  if (!dslFile || !fs.existsSync(dslFile)) {
    console.error("❌ Please provide a valid path to a structured DSL file.");
    process.exit(1);
  }

  const dslContent = fs.readFileSync(dslFile, "utf-8");
  let outDir = outArg;
  const outFlagIndex = args.indexOf("--out");
  if (outFlagIndex !== -1 && args[outFlagIndex + 1]) {
    outDir = args[outFlagIndex + 1];
  } else if (outDir.startsWith("--")) {
    outDir = "generated-app";
  }

  const targetDir = path.resolve(process.cwd(), outDir);
  console.log(`⚙️ Compiling Mode B Structured DSL into editable React application...`);
  console.log(`📂 Target directory: ${targetDir}\n`);

  const { compileStructuredToReact } = await import("../dist/index.js");
  const result = compileStructuredToReact(dslContent);

  if (result.errors && result.errors.length > 0) {
    console.error("❌ Compilation errors in application model:");
    result.errors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }

  for (const file of result.files) {
    const fullPath = path.join(targetDir, file.path);
    const parentDir = path.dirname(fullPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(fullPath, file.content, "utf-8");
    console.log(`   📄 Created ${file.path}`);
  }

  console.log(`\n🎉 Application successfully compiled in: ${targetDir}`);
}

async function runCli() {
  switch (command) {
    case "generate":
      await handleGenerate(args[1], args[2]);
      break;
    case "compile":
      await handleCompile(args[1], args[2]);
      break;
    case "init":
      handleInit(args[1]);
      break;
    case "add":
      handleAdd(args[1]);
      break;
    case "benchmark":
      handleBenchmark();
      break;
    case "audit":
      handleAudit();
      break;
    case "help":
    case "--help":
    case "-h":
    default:
      printHelp();
      break;
  }
}

runCli().catch((err) => {
  console.error("CLI Execution Error:", err);
  process.exit(1);
});
