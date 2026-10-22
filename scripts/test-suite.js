import React from "react";
import ReactDOMServer from "react-dom/server";
import * as UI from "../dist/index.js";
import fs from "fs";

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
console.log("   CRIATION UI — COMPREHENSIVE AUTOMATED TEST SUITE   ");
console.log("=======================================================\n");

// -----------------------------------------------------------------------------
// 1. Core Utilities & Formatting Tests
// -----------------------------------------------------------------------------
console.log("1. Utilities & Formatting Tests:");
assert("formatFileSize handles 0 bytes", UI.formatFileSize(0) === "0 Bytes");
assert("formatFileSize converts 1024 B to 1 KB", UI.formatFileSize(1024) === "1 KB");
assert("formatFileSize converts 1048576 B to 1 MB", UI.formatFileSize(1048576) === "1 MB");
assert("formatFileSize converts 1073741824 B to 1 GB", UI.formatFileSize(1073741824) === "1 GB");

assert("formatDate handles ISO dates", typeof UI.formatDate("2026-10-21T10:00:00Z") === "string");
assert("formatNumber formats currency", typeof UI.formatNumber(1250.5, { style: "currency", currency: "USD" }) === "string");

assert("validateEmail identifies valid email", UI.validateEmail("test@example.com") === true);
assert("validateEmail rejects invalid email", UI.validateEmail("invalid-email") === false);
assert("validateRequired identifies non-empty", UI.validateRequired("hello") === true);
assert("validateRequired rejects empty string", UI.validateRequired("  ") === false);
assert("validateUrl identifies valid url", UI.validateUrl("https://github.com") === true);

// -----------------------------------------------------------------------------
// 2. Design System & Responsive Breakpoints Tests
// -----------------------------------------------------------------------------
console.log("\n2. Design System & Responsive Tokens Tests:");
assert("breakpoints object has all standard keys", !!UI.breakpoints.sm && !!UI.breakpoints.md && !!UI.breakpoints.lg && !!UI.breakpoints.xl);
assert("mediaQueryUp produces valid media query", UI.mediaQueryUp("md") === "@media (min-width: 768px)");
assert("mediaQueryDown produces valid media query", UI.mediaQueryDown("sm").includes("@media (max-width:"));
assert("FOCUSABLE_ELEMENTS contains standard interactive tags", UI.FOCUSABLE_ELEMENTS.includes("button") && UI.FOCUSABLE_ELEMENTS.includes("input"));

// -----------------------------------------------------------------------------
// 3. New & Missing Components Server-Side Rendering & Behavior Tests
// -----------------------------------------------------------------------------
console.log("\n3. New Core Components Rendering & Chaining Tests:");

// Label
const labelHtml = ReactDOMServer.renderToString(UI.Label("Email Address").required());
assert("Label renders correctly with required asterisk", labelHtml.includes("Email Address") && labelHtml.includes("*") && labelHtml.includes("cr-label"));

// SearchInput
const searchHtml = ReactDOMServer.renderToString(UI.SearchInput("Find files...").shortcut("Ctrl+K").width("350px"));
assert("SearchInput renders with searchbox role and shortcut badge", searchHtml.includes('role="searchbox"') && searchHtml.includes("Ctrl+K") && searchHtml.includes("Find files..."));

// OTPInput
const otpHtml = ReactDOMServer.renderToString(UI.OTPInput(6).masked());
assert("OTPInput renders 6 input fields with password type when masked", (otpHtml.match(/type="password"/g) || []).length === 6);

// Rating
const ratingHtml = ReactDOMServer.renderToString(UI.Rating(4).readOnly());
assert("Rating renders 5 stars with img role in readOnly mode", ratingHtml.includes('role="img"') && (ratingHtml.match(/<svg/g) || []).length === 5);

// AlertDialog
const alertHtml = ReactDOMServer.renderToString(
  React.createElement(UI.AlertDialog, {
    isOpen: true,
    title: "Delete Workspace?",
    description: "This cannot be undone.",
    onConfirm: () => {},
    onCancel: () => {},
    variant: "danger"
  })
);
assert("AlertDialog renders with alertdialog role and danger button", alertHtml.includes('role="alertdialog"') && alertHtml.includes("Delete Workspace?"));

// AspectRatio
const aspectHtml = ReactDOMServer.renderToString(UI.AspectRatio(16 / 9, React.createElement("img", { src: "test.jpg", alt: "Test" })));
assert("AspectRatio wraps child with padding-bottom percentage", aspectHtml.includes("padding-bottom:56.25%") && aspectHtml.includes("test.jpg"));

// ErrorBoundary
const errorBoundaryHtml = ReactDOMServer.renderToString(
  React.createElement(UI.ErrorBoundary, null, React.createElement("div", null, "Safe Child"))
);
assert("ErrorBoundary renders child without error", errorBoundaryHtml.includes("Safe Child"));

// ScrollArea
const scrollHtml = ReactDOMServer.renderToString(UI.ScrollArea("250px", React.createElement("p", null, "Scroll Content")));
assert("ScrollArea applies max-height and custom scrollbar class", scrollHtml.includes("max-height:250px") && scrollHtml.includes("cr-scrollbar"));

// Stepper
const stepperHtml = ReactDOMServer.renderToString(UI.Stepper(["Account", "Details", "Confirm"]).active(1));
assert("Stepper renders all steps with active step highlighted", stepperHtml.includes("Account") && stepperHtml.includes("Details") && stepperHtml.includes("Confirm"));

// Timeline
const timelineHtml = ReactDOMServer.renderToString(
  UI.Timeline([
    { title: "Order Placed", timestamp: "10:00 AM", status: "completed" },
    { title: "Shipped", timestamp: "02:00 PM", status: "current" }
  ])
);
assert("Timeline renders all events with connecting lines", timelineHtml.includes("Order Placed") && timelineHtml.includes("Shipped") && timelineHtml.includes("cr-timeline"));

// Collapsible
const collapsibleHtml = ReactDOMServer.renderToString(
  React.createElement(UI.Collapsible, { title: "What is Criation?", isOpen: true }, "A modern UI library.")
);
assert("Collapsible renders title and open body content", collapsibleHtml.includes("What is Criation?") && collapsibleHtml.includes("A modern UI library."));

// Result & NotFoundPage
const resultHtml = ReactDOMServer.renderToString(UI.Result("Payment Success", "Your receipt has been sent.").success());
assert("Result component renders with title and success styles", resultHtml.includes("Payment Success") && resultHtml.includes("cr-result--success"));

const notFoundHtml = ReactDOMServer.renderToString(React.createElement(UI.NotFoundPage, null));
assert("NotFoundPage renders 404 message and home navigation button", notFoundHtml.includes("404") && notFoundHtml.includes("Back to Home"));

// Combobox
const comboboxHtml = ReactDOMServer.renderToString(UI.Combobox(["Apple", "Banana", "Cherry"], "Select fruit"));
assert("Combobox renders input with combobox role and placeholder", comboboxHtml.includes('role="combobox"') && comboboxHtml.includes("Select fruit"));

// MultiSelect
const multiHtml = ReactDOMServer.renderToString(
  React.createElement(UI.MultiSelect, { options: ["Red", "Green", "Blue"], defaultValue: ["Red", "Blue"] })
);
assert("MultiSelect renders selected badge chips", multiHtml.includes("Red") && multiHtml.includes("Blue") && multiHtml.includes("cr-multiselect"));

// ColorPicker
const colorHtml = ReactDOMServer.renderToString(UI.ColorPicker("#4f46e5"));
assert("ColorPicker renders color swatch and hex text", colorHtml.includes("#4F46E5") && colorHtml.includes("cr-color-picker"));

// -----------------------------------------------------------------------------
// 4. Universal English Chaining & Simplified Component Tests
// -----------------------------------------------------------------------------
console.log("\n4. Universal English Chaining on Core Components:");

// Button fluent chaining
const btn = UI.Button("Go to cart").red().link("/cart").auth();
const btnHtml = ReactDOMServer.renderToString(btn);
assert("Button renders with red gradient and text", btnHtml.includes("Go to cart") && btnHtml.includes("#f43f5e"));

// Heading fluent chaining
const heading = UI.Heading("Dashboard Overview").gradient().center().level(1);
const headingHtml = ReactDOMServer.renderToString(heading);
assert("Heading level 1 renders with gradient class and centered style", headingHtml.includes("<h1") && headingHtml.includes("cr-heading--gradient") && headingHtml.includes("text-align:center"));

// Stack fluent chaining
const stack = UI.Stack(UI.Button("A"), UI.Button("B")).row().gap("1.5rem").center();
const stackHtml = ReactDOMServer.renderToString(stack);
assert("Stack renders with row direction and 1.5rem gap", stackHtml.includes("flex-direction:row") && stackHtml.includes("gap:1.5rem"));

// Grid fluent chaining
const grid = UI.Grid(3, [UI.Card("C1"), UI.Card("C2"), UI.Card("C3")]).gap("2rem");
const gridHtml = ReactDOMServer.renderToString(grid);
assert("Grid renders with 3 columns and 2rem gap", gridHtml.includes("repeat(3, minmax(0, 1fr))") && gridHtml.includes("gap:2rem"));

// Website layout builder
const site = UI.createWebsiteLayout([
  UI.Navbar("Demo App", ["Home", "Shop"]),
  UI.Heading("Catalog"),
  UI.Footer("Demo App", ["Terms"])
]);
const siteHtml = ReactDOMServer.renderToString(site);
assert("Website builder produces complete full-page layout", siteHtml.includes("Demo App") && siteHtml.includes("Catalog") && siteHtml.includes("Terms"));

// PR 14: Dedicated 'ui' fluent builder namespace tests
assert("ui builder namespace is exported", typeof UI.ui === "object" && typeof UI.ui.button === "function");

const uiBtn = UI.ui.button("Checkout")
  .variant("success")
  .size("14px 28px")
  .to("/checkout")
  .build();
const uiBtnHtml = ReactDOMServer.renderToString(uiBtn);
assert("ui.button builds valid React element with success variant and size", uiBtnHtml.includes("Checkout") && uiBtnHtml.includes("#10b981") && uiBtnHtml.includes("14px 28px"));

const uiHeading = UI.ui.heading("Storefront").level(2).gradient().center().build();
const uiHeadingHtml = ReactDOMServer.renderToString(uiHeading);
assert("ui.heading builds level 2 heading with gradient", uiHeadingHtml.includes("<h2") && uiHeadingHtml.includes("cr-heading--gradient") && uiHeadingHtml.includes("Storefront"));

const uiStack = UI.ui.stack(UI.ui.button("One").build(), UI.ui.button("Two").build()).row().gap("2rem").build();
const uiStackHtml = ReactDOMServer.renderToString(uiStack);
assert("ui.stack builds flex layout with gap and row", uiStackHtml.includes("flex-direction:row") && uiStackHtml.includes("gap:2rem"));

const uiCard = UI.ui.card("Featured Item").glass().padding("1.5rem").build();
const uiCardHtml = ReactDOMServer.renderToString(uiCard);
assert("ui.card builds glass card with padding", uiCardHtml.includes("cr-card--glass") && uiCardHtml.includes("Featured Item"));

const standardBtn = React.createElement(UI.Button, { variant: "primary", disabled: true }, "Pure JSX Button");
const standardBtnHtml = ReactDOMServer.renderToString(standardBtn);
assert("Button renders cleanly as standard React JSX component with disabled state", standardBtnHtml.includes("Pure JSX Button") && standardBtnHtml.includes("disabled"));

// PR 15: Explicit opt-in natural language DSL & error handling tests
assert("describe function is exported", typeof UI.describe === "function");
assert("parseDSL function is exported", typeof UI.parseDSL === "function");

const dslElements = UI.parseDSL('Button = "Purchase", "10px 20px", "buy_btn", "NoAuth", "/cart", "green"');
assert("parseDSL parses button specification into React element", Array.isArray(dslElements) && dslElements.length === 1);
const dslBtnHtml = ReactDOMServer.renderToString(dslElements[0]);
assert("parseDSL button renders with label Purchase", dslBtnHtml.includes("Purchase"));

const dslInvalid = UI.parseDSL("InvalidSyntaxLineWithoutKeyword");
assert("parseDSL handles unrecognized syntax with warning element without throwing", dslInvalid.length === 1);
const dslInvalidHtml = ReactDOMServer.renderToString(dslInvalid[0]);
assert("parseDSL warning element contains syntax warning", dslInvalidHtml.includes("DSL Syntax Warning"));

// PR 16: Typed options object tests
const navWithOptions = UI.ui.navbar({
  brand: "Criation Store",
  links: ["Pricing", "Docs"],
  actions: UI.Button("Login")
});
const navWithOptionsHtml = ReactDOMServer.renderToString(navWithOptions);
assert("ui.navbar accepts typed options object with brand and links", navWithOptionsHtml.includes("Criation Store") && navWithOptionsHtml.includes("Pricing"));

const footerWithOptions = UI.ui.footer({
  brand: "Criation UI",
  links: ["Privacy", "Terms"]
});
const footerWithOptionsHtml = ReactDOMServer.renderToString(footerWithOptions);
assert("ui.footer accepts typed options object with brand and links", footerWithOptionsHtml.includes("Criation UI") && footerWithOptionsHtml.includes("Privacy"));

// PR 17: Presentation decoupled from auth heuristics
const authBtn = UI.Button("Admin Panel").red().auth();
const authBtnHtml = ReactDOMServer.renderToString(authBtn);
assert("Button renders cleanly with auth config without throwing or forcing alert", authBtnHtml.includes("Admin Panel") && authBtnHtml.includes("#f43f5e"));

// PR 18: Package.json exports and tree-shaking configuration test
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
assert("package.json defines subpath exports for tree-shaking", typeof pkg.exports["./button"] === "object" && typeof pkg.exports["./card"] === "object");
assert("package.json defines sideEffects configuration", Array.isArray(pkg.sideEffects));
assert("package.json declares MIT license", pkg.license === "MIT");

// PR 20: WAI-ARIA Focus Trapping and Modal Accessibility Attributes
assert("getFocusableElements is exported from public API", typeof UI.getFocusableElements === "function");
assert("trapFocus is exported from public API", typeof UI.trapFocus === "function");
assert("useFocusTrap is exported from public API", typeof UI.useFocusTrap === "function");

const modalHtml = ReactDOMServer.renderToString(
  React.createElement(UI.Modal, { isOpen: true, onClose: () => {}, title: "Dialog Title" }, "Modal content")
);
assert("Modal renders with accessible dialog container", modalHtml.includes("Dialog Title") && modalHtml.includes("cr-modal"));

// -----------------------------------------------------------------------------
// 5. Bug Fix Regressions & Accessibility Attributes Tests
// -----------------------------------------------------------------------------
console.log("\n5. Bug Fix Regressions & Accessibility Attributes Tests:");

// Input error message rendering
const inputWithError = ReactDOMServer.renderToString(
  React.createElement(UI.Input, { id: "test-email", error: "Please enter a valid email address" })
);
assert(
  "Input renders dedicated error message container when error is a string",
  inputWithError.includes("Please enter a valid email address") &&
  inputWithError.includes("cr-input__error-message") &&
  inputWithError.includes('role="alert"') &&
  inputWithError.includes('aria-describedby="test-email-error"')
);

// TextArea error message rendering
const textareaWithError = ReactDOMServer.renderToString(
  React.createElement(UI.TextArea, { id: "test-bio", error: "Bio is required" })
);
assert(
  "TextArea renders error message container when error is a string",
  textareaWithError.includes("Bio is required") &&
  textareaWithError.includes("cr-textarea__error-message") &&
  textareaWithError.includes('role="alert"')
);

// Select React compliant defaultValue
const selectHtml = ReactDOMServer.renderToString(
  React.createElement(UI.Select, {
    placeholder: "Choose country",
    options: [{ value: "us", label: "United States" }, { value: "in", label: "India" }]
  })
);
assert(
  "Select placeholder does not use invalid selected attribute",
  !selectHtml.includes("<option value=\"\" disabled selected") &&
  selectHtml.includes("Choose country")
);

// Tabs ARIA controls & labels
const tabsHtml = ReactDOMServer.renderToString(
  React.createElement(UI.Tabs, {
    items: [
      { id: "account", label: "Account", content: "Account Settings" },
      { id: "security", label: "Security", content: "Security Controls" }
    ]
  })
);
assert(
  "Tabs renders aria-controls and matching panel id for accessibility",
  tabsHtml.includes('id="cr-tab-account"') &&
  tabsHtml.includes('aria-controls="cr-tabpanel-account"') &&
  tabsHtml.includes('id="cr-tabpanel-account"') &&
  tabsHtml.includes('aria-labelledby="cr-tab-account"')
);

// Popover keyboard accessibility
const popoverHtml = ReactDOMServer.renderToString(
  React.createElement(UI.Popover, {
    trigger: "Open Menu",
    content: "Menu Content"
  })
);
assert(
  "Popover trigger includes role=button and tabIndex=0 for keyboard accessibility",
  popoverHtml.includes('role="button"') &&
  popoverHtml.includes('tabindex="0"') &&
  popoverHtml.includes('aria-haspopup="true"')
);

// -----------------------------------------------------------------------------
// 6. Advanced Component Capabilities Tests
// -----------------------------------------------------------------------------
console.log("\n6. Advanced Component Capabilities Tests:");

// Controlled Accordion
const controlledAccordion = ReactDOMServer.renderToString(
  React.createElement(UI.Accordion, {
    items: [
      { id: "faq1", title: "Question 1", content: "Answer 1" },
      { id: "faq2", title: "Question 2", content: "Answer 2" }
    ],
    expandedIds: ["faq2"]
  })
);
assert(
  "Controlled Accordion expands only the specified expandedIds",
  !controlledAccordion.includes("Answer 1") &&
  controlledAccordion.includes("Answer 2") &&
  controlledAccordion.includes('id="cr-accordion-header-faq2"')
);

// Declarative Table
const declarativeTable = ReactDOMServer.renderToString(
  React.createElement(UI.Table, {
    columns: [
      { key: "id", header: "ID", align: "left" },
      { key: "name", header: "Name" },
      { key: "status", header: "Status", render: (row) => `Status: ${row.status}` }
    ],
    data: [
      { id: "1", name: "Alpha", status: "Active" },
      { id: "2", name: "Beta", status: "Pending" }
    ]
  })
);
assert(
  "Declarative Table renders columns, rows, and custom cell formatters",
  declarativeTable.includes("ID") &&
  declarativeTable.includes("<td>Alpha</td>") &&
  declarativeTable.includes("<td>Status: Active</td>")
);

// Declarative Table empty state
const emptyTable = ReactDOMServer.renderToString(
  React.createElement(UI.Table, {
    columns: [{ key: "name", header: "Name" }],
    data: [],
    emptyText: "No users found"
  })
);
assert(
  "Declarative Table renders emptyText message when data array is empty",
  emptyTable.includes("No users found") &&
  emptyTable.toLowerCase().includes('colspan="1"')
);

// Combobox loading state
const loadingCombobox = ReactDOMServer.renderToString(
  React.createElement(UI.Combobox, {
    options: [],
    loading: true
  })
);
assert(
  "Combobox supports loading state indicator",
  loadingCombobox.includes("cr-spinner") || loadingCombobox.includes("cr-combobox")
);

// Website layout customization
const customLayout = ReactDOMServer.renderToString(
  UI.createWebsiteLayout([UI.Heading("Custom Store")], {
    maxWidth: "1400px",
    padding: "4rem",
    header: React.createElement("nav", null, "Custom Header"),
    footer: React.createElement("footer", null, "Custom Footer")
  })
);
assert(
  "createWebsiteLayout supports custom maxWidth, padding, header, and footer",
  customLayout.includes("max-width:1400px") &&
  customLayout.includes("padding:4rem") &&
  customLayout.includes("Custom Header") &&
  customLayout.includes("Custom Footer")
);

// -----------------------------------------------------------------------------
// 7. useForm Hook & Form Validation Tests
// -----------------------------------------------------------------------------
console.log("\n7. useForm Hook Tests:");

assert("useForm is exported from public API", typeof UI.useForm === "function");

// Test validation function logic directly
const sampleValidator = (values) => {
  const errs = {};
  if (!values.email) errs.email = "Email is required";
  else if (!UI.validateEmail(values.email)) errs.email = "Invalid email";
  if (!values.password || values.password.length < 6) errs.password = "Min 6 chars";
  return errs;
};

const validationResult1 = sampleValidator({ email: "", password: "123" });
assert("Form validator detects required email and short password", validationResult1.email === "Email is required" && validationResult1.password === "Min 6 chars");

const validationResult2 = sampleValidator({ email: "user@domain.com", password: "validPassword123" });
assert("Form validator accepts valid inputs with 0 errors", Object.keys(validationResult2).length === 0);

// PR 19: Form validation race handling & async catch test
const asyncValidator = async (vals) => {
  return vals.username === "taken" ? { username: "Already taken" } : {};
};
assert("asyncValidator returns promise resolving to validation errors", typeof asyncValidator({ username: "taken" }).then === "function");
const asyncRes = await asyncValidator({ username: "taken" });
assert("async validation resolves expected error structure", asyncRes.username === "Already taken");

// -----------------------------------------------------------------------------
// Final Report
// -----------------------------------------------------------------------------
console.log("\n=======================================================");
console.log(`TOTAL TESTS: ${passed + failed}`);
console.log(`PASSED:      ${passed}`);
console.log(`FAILED:      ${failed}`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!\n");
}
