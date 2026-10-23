import { strict as assert } from "assert";
import {
  parseEnglishWorkflow,
  compileEnglishWorkflowToTypeScript,
  workflow,
} from "../dist/index.js";

console.log("\n=======================================================");
console.log("   CRIATION UI — COMMERCE & WORKFLOW ENGINE TESTS     ");
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
// 1. Natural Language English Workflow Parser Tests
// ----------------------------------------------------
console.log("1. Natural Language English Workflow Parser Tests:");

const sampleEnglish = `
When the user changes a product's quantity:
  Update the matching cart item.
  If its quantity becomes zero:
    Remove it from the cart.

When the user removes a product from the cart:
  Remove the matching product from the cart.

When the user proceeds to checkout:
  Close the shopping cart.
  If the user is not logged in:
    Open the authentication window.
  Otherwise:
    Open the checkout window.

When authentication succeeds:
  Set the current user to the authenticated user.
  Load that user's orders.
  If the cart contains products:
    Open the checkout window.

When the user logs out:
  Log the user out through the authentication service.
  Clear the current user.
  Clear the user's orders from the current application state.
  Navigate to the store page.

When payment succeeds:
  Close the checkout window.
  Clear the cart.
  If the result contains an order:
    Show the order receipt.
    Include the order and transaction details.
    Refresh the current user's order history.
`;

test("parses plain-English description into 6 distinct workflow rules", () => {
  const spec = parseEnglishWorkflow(sampleEnglish);
  assert.equal(spec.name, "CommerceWorkflow");
  assert.equal(spec.rules.length, 6, "Expected 6 workflow rules");
});

test("identifies QUANTITY_CHANGE trigger and auto-removal rule", () => {
  const spec = parseEnglishWorkflow(sampleEnglish);
  const rule = spec.rules.find((r) => r.trigger === "QUANTITY_CHANGE");
  assert.ok(rule, "QUANTITY_CHANGE rule should exist");
  assert.equal(rule.steps[0].action, "UPDATE_CART_ITEM");
  assert.equal(rule.steps[1].action, "REMOVE_FROM_CART");
  assert.equal(rule.steps[1].condition.operator, "is_zero");
});

test("identifies REMOVE_ITEM trigger", () => {
  const spec = parseEnglishWorkflow(sampleEnglish);
  const rule = spec.rules.find((r) => r.trigger === "REMOVE_ITEM");
  assert.ok(rule, "REMOVE_ITEM rule should exist");
  assert.equal(rule.steps[0].action, "REMOVE_MATCHING_ITEM");
});

test("identifies PROCEED_CHECKOUT trigger and conditional login requirement", () => {
  const spec = parseEnglishWorkflow(sampleEnglish);
  const rule = spec.rules.find((r) => r.trigger === "PROCEED_CHECKOUT");
  assert.ok(rule, "PROCEED_CHECKOUT rule should exist");
  assert.equal(rule.steps[0].action, "CLOSE_CART_DRAWER");
  assert.equal(rule.steps[1].action, "OPEN_AUTH_WINDOW");
  assert.equal(rule.steps[1].condition.field, "currentUser");
  assert.equal(rule.steps[1].condition.operator, "is_null");
  assert.equal(rule.steps[1].fallbackAction, "OPEN_CHECKOUT_WINDOW");
});

test("identifies AUTH_SUCCESS trigger, order loading, and checkout resume", () => {
  const spec = parseEnglishWorkflow(sampleEnglish);
  const rule = spec.rules.find((r) => r.trigger === "AUTH_SUCCESS");
  assert.ok(rule, "AUTH_SUCCESS rule should exist");
  assert.equal(rule.steps[0].action, "SET_CURRENT_USER");
  assert.equal(rule.steps[1].action, "LOAD_USER_ORDERS");
  assert.equal(rule.steps[2].action, "OPEN_CHECKOUT_WINDOW");
  assert.equal(rule.steps[2].condition.operator, "has_items");
});

test("identifies LOGOUT trigger, service cleanup, and store redirection", () => {
  const spec = parseEnglishWorkflow(sampleEnglish);
  const rule = spec.rules.find((r) => r.trigger === "LOGOUT");
  assert.ok(rule, "LOGOUT rule should exist");
  assert.equal(rule.steps[0].action, "LOGOUT_AUTH_SERVICE");
  assert.equal(rule.steps[1].action, "CLEAR_CURRENT_USER");
  assert.equal(rule.steps[2].action, "CLEAR_ORDERS");
  assert.equal(rule.steps[3].action, "NAVIGATE_TO");
  assert.equal(rule.steps[3].params.route, "store");
});

test("identifies PAYMENT_SUCCESS trigger, receipt display, and order refresh", () => {
  const spec = parseEnglishWorkflow(sampleEnglish);
  const rule = spec.rules.find((r) => r.trigger === "PAYMENT_SUCCESS");
  assert.ok(rule, "PAYMENT_SUCCESS rule should exist");
  assert.equal(rule.steps[0].action, "CLOSE_CHECKOUT_WINDOW");
  assert.equal(rule.steps[1].action, "CLEAR_CART");
  assert.equal(rule.steps[2].action, "SHOW_ORDER_RECEIPT");
  assert.equal(rule.steps[3].action, "REFRESH_ORDER_HISTORY");
});

// ----------------------------------------------------
// 2. English Workflow Code Generator Tests
// ----------------------------------------------------
console.log("\n2. English Workflow Code Generator Tests:");

test("compiles plain-English workflow into clean React TypeScript code", () => {
  const code = compileEnglishWorkflowToTypeScript(sampleEnglish);
  assert.ok(code.includes("export function useStoreWorkflow"), "Must export useStoreWorkflow");
  assert.ok(code.includes("handleUpdateQuantity"), "Must generate handleUpdateQuantity");
  assert.ok(code.includes("handleRemoveFromCart"), "Must generate handleRemoveFromCart");
  assert.ok(code.includes("handleProceedToCheckout"), "Must generate handleProceedToCheckout");
  assert.ok(code.includes("handleAuthSuccess"), "Must generate handleAuthSuccess");
  assert.ok(code.includes("handleLogout"), "Must generate handleLogout");
  assert.ok(code.includes("handlePaymentSuccess"), "Must generate handlePaymentSuccess");
  assert.ok(code.includes("nextQ > 0"), "Must generate quantity boundary check");
});

// ----------------------------------------------------
// 3. Fluent English Builder API Tests
// ----------------------------------------------------
console.log("\n3. Fluent English Builder API Tests:");

test("builds complete workflow with fluent chaining", () => {
  const built = workflow("Store Checkout Flow")
    .whenQuantityChanges()
    .whenItemRemoved()
    .whenCheckoutBegins()
    .whenAuthenticated()
    .whenLoggedOut()
    .whenPaymentSucceeds()
    .build();

  assert.equal(built.name, "Store Checkout Flow");
  assert.equal(built.stepCount, 6);
  assert.equal(built.steps[0].type, "QUANTITY_CHANGE");
  assert.equal(built.steps[1].type, "REMOVE_ITEM");
  assert.equal(built.steps[2].type, "PROCEED_CHECKOUT");
  assert.equal(built.steps[3].type, "AUTH_SUCCESS");
  assert.equal(built.steps[4].type, "LOGOUT");
  assert.equal(built.steps[5].type, "PAYMENT_SUCCESS");
});

// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log("\n-------------------------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("-------------------------------------------------------\n");

if (failed > 0) {
  process.exit(1);
}
