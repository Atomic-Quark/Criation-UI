/**
 * Criation UI — Fluent English Workflow Builder
 * 
 * Provides an expressive, type-safe API for defining state machines and business workflows.
 */

export interface WorkflowStepDefinition {
  name: string;
  type: string;
  handler?: (...args: any[]) => any;
}

export class FluentWorkflowBuilder {
  private _name: string;
  private _steps: WorkflowStepDefinition[] = [];

  constructor(name: string) {
    this._name = name;
  }

  /**
   * "When the user changes a product's quantity"
   */
  whenQuantityChanges(description: string = "Update matching item, remove if zero") {
    this._steps.push({
      name: "QuantityChangeRule",
      type: "QUANTITY_CHANGE",
      handler: () => description,
    });
    return this;
  }

  /**
   * "When the user removes a product from the cart"
   */
  whenItemRemoved(description: string = "Remove matching product from cart") {
    this._steps.push({
      name: "RemoveItemRule",
      type: "REMOVE_ITEM",
      handler: () => description,
    });
    return this;
  }

  /**
   * "When the user proceeds to checkout"
   */
  whenCheckoutBegins(description: string = "Close cart; prompt login if unauthenticated; else open checkout") {
    this._steps.push({
      name: "CheckoutBeginRule",
      type: "PROCEED_CHECKOUT",
      handler: () => description,
    });
    return this;
  }

  /**
   * "When authentication succeeds"
   */
  whenAuthenticated(description: string = "Store user, load orders, resume checkout if cart not empty") {
    this._steps.push({
      name: "AuthSuccessRule",
      type: "AUTH_SUCCESS",
      handler: () => description,
    });
    return this;
  }

  /**
   * "When the user logs out"
   */
  whenLoggedOut(description: string = "Log out from auth service, wipe user state, return to store") {
    this._steps.push({
      name: "LogoutRule",
      type: "LOGOUT",
      handler: () => description,
    });
    return this;
  }

  /**
   * "When payment succeeds"
   */
  whenPaymentSucceeds(description: string = "Close checkout, empty cart, display receipt, refresh orders") {
    this._steps.push({
      name: "PaymentSuccessRule",
      type: "PAYMENT_SUCCESS",
      handler: () => description,
    });
    return this;
  }

  build() {
    return {
      name: this._name,
      stepCount: this._steps.length,
      steps: [...this._steps],
    };
  }
}

/**
 * Factory for creating a fluent workflow builder in English.
 */
export function workflow(name: string = "ApplicationWorkflow"): FluentWorkflowBuilder {
  return new FluentWorkflowBuilder(name);
}
