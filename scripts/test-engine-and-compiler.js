import { strict as assert } from "assert";
import {
  parseEnglishDescription,
  parseStructuredDSL,
  compileEnglishToReact,
  compileStructuredToReact,
  generateReactApplication,
  validateApplicationModel,
  createResourceApi,
  memoryStore,
  validateFieldValue,
} from "../dist/index.js";

console.log("\n=======================================================");
console.log("   CRIATION UI — COMPILER & ENGINE AUTOMATED TEST SUITE   ");
console.log("=======================================================\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error("   ", err.message);
    failed++;
  }
}

// ----------------------------------------------------
// 1. Application Model Validation Tests
// ----------------------------------------------------
console.log("1. Application Model Validation Tests:");

test("validates complete ApplicationModel with 0 errors", () => {
  const model = {
    name: "TestApp",
    title: "Test Application",
    resources: {
      User: {
        name: "User",
        singular: "User",
        plural: "Users",
        endpoint: "/api/users",
        fields: [{ name: "name", label: "Full Name", type: "string" }],
      },
    },
    pages: [
      {
        id: "page-users",
        name: "Users",
        title: "User Directory",
        path: "/users",
        views: [{ id: "v1", title: "Users Table", type: "table", resourceName: "User" }],
        actions: [],
      },
    ],
    api: {
      baseUrl: "",
      resources: { User: "/api/users" },
    },
  };

  const errors = validateApplicationModel(model);
  assert.equal(errors.length, 0);
});

test("detects missing resources in ApplicationModel", () => {
  const invalidModel = {
    name: "InvalidApp",
    title: "Invalid",
    resources: {},
    pages: [],
    api: { baseUrl: "", resources: {} },
  };

  const errors = validateApplicationModel(invalidModel);
  assert.ok(errors.some((e) => e.includes("must define at least one Resource")));
});

test("detects unknown resource reference in page views", () => {
  const invalidModel = {
    name: "InvalidApp",
    title: "Invalid",
    resources: {
      Product: {
        name: "Product",
        singular: "Product",
        plural: "Products",
        endpoint: "/api/products",
        fields: [{ name: "title", label: "Title", type: "string" }],
      },
    },
    pages: [
      {
        id: "page-1",
        name: "Test",
        title: "Test",
        path: "/test",
        views: [{ id: "v1", title: "Orders", type: "table", resourceName: "Order" }],
        actions: [],
      },
    ],
    api: { baseUrl: "", resources: {} },
  };

  const errors = validateApplicationModel(invalidModel);
  assert.ok(errors.some((e) => e.includes("references unknown resource 'Order'")));
});

// ----------------------------------------------------
// 2. Declarative API & Memory Storage Tests
// ----------------------------------------------------
console.log("\n2. Declarative API & Memory Storage Tests:");

test("creates and lists resources in memoryStore", async () => {
  const api = createResourceApi("TestMember", "/api/test-members", { mockFallback: true });

  const created = await api.create({ name: "Alice Wonderland", email: "alice@example.com", role: "Admin" });
  assert.ok(created.id);
  assert.equal(created.name, "Alice Wonderland");

  const list = await api.list();
  assert.ok(list.some((item) => item.name === "Alice Wonderland"));
});

test("filters records via in-memory search query", async () => {
  const api = createResourceApi("SearchItem", "/api/search-items", { mockFallback: true });
  await api.create({ name: "Alpha Widget", tag: "hardware" });
  await api.create({ name: "Beta App", tag: "software" });

  const filtered = await api.list({ search: "Alpha" });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].name, "Alpha Widget");
});

test("updates and deletes records in memoryStore", async () => {
  const api = createResourceApi("Task", "/api/tasks", { mockFallback: true });
  const item = await api.create({ title: "Fix bug", done: false });

  const updated = await api.update(item.id, { done: true });
  assert.equal(updated.done, true);

  const deleted = await api.delete(item.id);
  assert.equal(deleted, true);

  const found = await api.get(item.id);
  assert.equal(found, null);
});

// ----------------------------------------------------
// 3. Schema Form Validation Rules
// ----------------------------------------------------
console.log("\n3. Schema Form Validation Rules:");

test("validateFieldValue enforces required fields", () => {
  const field = { name: "email", label: "Email", type: "string", validation: { required: true } };
  assert.ok(validateFieldValue(field, ""));
  assert.ok(validateFieldValue(field, null));
  assert.equal(validateFieldValue(field, "valid value"), null);
});

test("validateFieldValue validates email format", () => {
  const emailField = { name: "email", label: "Email", type: "email", validation: { required: true } };
  assert.ok(validateFieldValue(emailField, "not-an-email"));
  assert.equal(validateFieldValue(emailField, "test@domain.com"), null);
});

test("validateFieldValue enforces number min and max bounds", () => {
  const numField = { name: "age", label: "Age", type: "number", validation: { min: 18, max: 65 } };
  assert.ok(validateFieldValue(numField, 16));
  assert.ok(validateFieldValue(numField, 70));
  assert.equal(validateFieldValue(numField, 25), null);
});

// ----------------------------------------------------
// 4. Structured DSL Parser (Mode B) Tests
// ----------------------------------------------------
console.log("\n4. Structured DSL Parser (Mode B) Tests:");

test("parses structured DSL into valid ApplicationModel", () => {
  const dsl = `
    page "Members"
    resource "Member"
      endpoint "/api/members"
      field "name" as text required
      field "email" as email required
      field "role" as select options ["Admin", "Student", "Teacher"]
    table "Member" searchable
    action "create" for "Member"
    action "delete" for "Member" confirm
  `;

  const model = parseStructuredDSL(dsl);
  assert.ok(model.resources.Member);
  assert.equal(model.resources.Member.fields.length, 3);
  assert.equal(model.resources.Member.fields[1].type, "email");
  assert.equal(model.resources.Member.fields[2].options?.length, 3);
  assert.equal(model.pages[0].name, "Members");

  const errors = validateApplicationModel(model);
  assert.equal(errors.length, 0);
});

// ----------------------------------------------------
// 5. Plain-English Natural Language Parser (Mode A) Tests
// ----------------------------------------------------
console.log("\n5. Plain-English Natural Language Parser (Mode A) Tests:");

test("parses user benchmark prompt into complete ApplicationModel", () => {
  const englishPrompt = `
    Create a page called Members.
    Show all members in a searchable table.
    Add a button called Add Member.
    When clicked, open a form with Name, Email, and Role.
    Require all fields and validate the email.
    When the form is submitted, save the member using the Members API.
    Show a confirmation dialog before deleting a member.
  `;

  const model = parseEnglishDescription(englishPrompt);

  assert.equal(model.pages[0].name, "Members");
  assert.ok(model.resources.Member);
  assert.equal(model.resources.Member.singular, "Member");
  assert.equal(model.resources.Member.plural, "Members");

  const fields = model.resources.Member.fields;
  assert.ok(fields.some((f) => f.name === "name"));
  assert.ok(fields.some((f) => f.name === "email" && f.type === "email"));
  assert.ok(fields.some((f) => f.name === "role" && f.type === "select"));

  // Check actions
  const actions = model.pages[0].actions;
  assert.ok(actions.some((a) => a.type === "create"));
  assert.ok(actions.some((a) => a.type === "delete" && a.requiresConfirmation));

  const errors = validateApplicationModel(model);
  assert.equal(errors.length, 0);
});

// ----------------------------------------------------
// 6. Deterministic React Code Generator Tests
// ----------------------------------------------------
console.log("\n6. Deterministic React Code Generator Tests:");

test("compiles ApplicationModel to complete React application files", () => {
  const prompt = `
    Create a page called Members.
    Show all members in a searchable table.
    Add a button called Add Member.
    When clicked, open a form with Name, Email, and Role.
    Require all fields and validate the email.
  `;

  const result = compileEnglishToReact(prompt);

  assert.equal(result.errors.length, 0);
  assert.ok(result.files.length >= 7);

  const typesFile = result.files.find((f) => f.path.includes("resources.ts"));
  assert.ok(typesFile);
  assert.ok(typesFile.content.includes("export interface Member"));
  assert.ok(typesFile.content.includes("email: string;"));

  const pageFile = result.files.find((f) => f.path.includes("MembersPage.tsx"));
  assert.ok(pageFile);
  assert.ok(pageFile.content.includes("export function MembersPage()"));
  assert.ok(pageFile.content.includes("<ResourcePage"));

  const appFile = result.files.find((f) => f.path.includes("App.tsx"));
  assert.ok(appFile);
  assert.ok(appFile.content.includes("export function App()"));
  assert.ok(appFile.content.includes("<MembersPage />"));

  const pkgFile = result.files.find((f) => f.path.includes("package.json"));
  assert.ok(pkgFile);
  assert.ok(pkgFile.content.includes("@criation/ui"));
});

// ----------------------------------------------------
// Final Summary
// ----------------------------------------------------
console.log("\n=======================================================");
console.log(`TOTAL TESTS: ${passed + failed}`);
console.log(`PASSED:      ${passed}`);
console.log(`FAILED:      ${failed}`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL ENGINE & COMPILER TESTS PASSED!\n");
}
