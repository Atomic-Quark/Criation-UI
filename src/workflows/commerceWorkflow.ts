import { useState, useCallback, useMemo } from "react";

export interface WorkflowProduct {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
}

export interface WorkflowCartItem<T extends WorkflowProduct = WorkflowProduct> {
  product: T;
  quantity: number;
}

export interface WorkflowUser {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

export interface WorkflowOrder {
  id: string;
  userId?: string;
  items: WorkflowCartItem[];
  total: number;
  createdAt: string;
  [key: string]: any;
}

export interface CommerceWorkflowConfig<
  P extends WorkflowProduct = WorkflowProduct,
  U extends WorkflowUser = WorkflowUser,
  O extends WorkflowOrder = WorkflowOrder
> {
  initialProducts?: P[];
  initialUser?: U | null;
  initialCart?: WorkflowCartItem<P>[];
  taxRate?: number; // default: 0.08 (8%)
  loadOrders?: (userId: string) => O[] | Promise<O[]>;
  onLogoutService?: () => void | Promise<void>;
  onNavigate?: (view: "store" | "orders") => void;
  confirmPaymentWithBackend?: (paymentResult: any) => Promise<boolean> | boolean;
}

export interface CommerceWorkflowResult<
  P extends WorkflowProduct = WorkflowProduct,
  U extends WorkflowUser = WorkflowUser,
  O extends WorkflowOrder = WorkflowOrder
> {
  // --- Reactive State ---
  cartItems: WorkflowCartItem<P>[];
  currentUser: U | null;
  orders: O[];
  currentView: "store" | "orders";
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;

  // --- Modal Dialog States ---
  isCartOpen: boolean;
  isAuthOpen: boolean;
  isCheckoutOpen: boolean;
  isReceiptOpen: boolean;
  activeReceiptOrder: O | null;
  activeReceiptTxn: any | null;

  // --- Natural English Flow Handlers ---
  /**
   * Plain-English Rule:
   * "When the user adds a product to the cart:
   *  If it already exists in the cart, increase its quantity.
   *  Otherwise, add it as a new cart item."
   */
  addToCart: (product: P, quantity?: number) => void;

  /**
   * Plain-English Rule:
   * "When the user changes a product's quantity:
   *  Find the product in the cart.
   *  Add the requested quantity change.
   *  If the new quantity is greater than zero, update the cart item.
   *  Otherwise, remove the item from the cart."
   */
  updateQuantity: (productId: string, delta: number) => void;

  /**
   * Plain-English Rule:
   * "When the user removes a product from the cart:
   *  Remove the matching product from the cart."
   */
  removeFromCart: (productId: string) => void;

  /**
   * Plain-English Rule:
   * "Clear all items from the shopping cart."
   */
  clearCart: () => void;

  /**
   * Plain-English Rule:
   * "When the user proceeds to checkout:
   *  Close the shopping cart.
   *  If the user is not logged in:
   *    Open the authentication window.
   *  Otherwise:
   *    Open the checkout window."
   */
  proceedToCheckout: () => void;

  /**
   * Plain-English Rule:
   * "When authentication succeeds:
   *  Set the current user to the authenticated user.
   *  Load that user's orders.
   *  If the cart contains products:
   *    Open the checkout window."
   */
  handleAuthSuccess: (user: U) => Promise<void>;

  /**
   * Plain-English Rule:
   * "When the user logs out:
   *  Log the user out through the authentication service.
   *  Clear the current user.
   *  Clear the user's orders from the current application state.
   *  Navigate to the store page."
   */
  handleLogout: () => Promise<void>;

  /**
   * Plain-English Rule:
   * "When payment succeeds:
   *  Close the checkout window.
   *  Clear the cart.
   *  If the result contains an order:
   *    Show the order receipt.
   *    Include the order and transaction details.
   *    Refresh the current user's order history."
   */
  handlePaymentSuccess: (result: { order?: O; transaction?: any; [key: string]: any }) => Promise<void>;

  // --- Modal Visibility Controls ---
  openCart: () => void;
  closeCart: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openReceipt: () => void;
  closeReceipt: () => void;
  viewReceipt: (order: O, txn?: any) => void;
  navigateTo: (view: "store" | "orders") => void;
}

/**
 * useCommerceWorkflow:
 * High-level, English-sentence-driven state and workflow engine for Criation UI.
 * Eliminates all manual React event handling for carts, checkout, auth, and payments.
 */
export function useCommerceWorkflow<
  P extends WorkflowProduct = WorkflowProduct,
  U extends WorkflowUser = WorkflowUser,
  O extends WorkflowOrder = WorkflowOrder
>(config: CommerceWorkflowConfig<P, U, O> = {}): CommerceWorkflowResult<P, U, O> {
  const {
    initialUser = null,
    initialCart = [],
    taxRate = 0.08,
    loadOrders,
    onLogoutService,
    onNavigate,
    confirmPaymentWithBackend,
  } = config;

  // 1. Core State
  const [cartItems, setCartItems] = useState<WorkflowCartItem<P>[]>(initialCart);
  const [currentUser, setCurrentUser] = useState<U | null>(initialUser);
  const [orders, setOrders] = useState<O[]>([]);
  const [currentView, setCurrentView] = useState<"store" | "orders">("store");

  // 2. Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<O | null>(null);
  const [activeReceiptTxn, setActiveReceiptTxn] = useState<any | null>(null);

  // 3. Computed Totals
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const cartTax = useMemo(() => {
    return Math.round(cartSubtotal * taxRate * 100) / 100;
  }, [cartSubtotal, taxRate]);

  const cartTotal = useMemo(() => {
    return Math.round((cartSubtotal + cartTax) * 100) / 100;
  }, [cartSubtotal, cartTax]);

  // 4. Modal Handlers
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openAuth = useCallback(() => setIsAuthOpen(true), []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);
  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);
  const openReceipt = useCallback(() => setIsReceiptOpen(true), []);
  const closeReceipt = useCallback(() => {
    setIsReceiptOpen(false);
    setActiveReceiptOrder(null);
    setActiveReceiptTxn(null);
  }, []);

  const viewReceipt = useCallback((order: O, txn: any = null) => {
    setActiveReceiptOrder(order);
    setActiveReceiptTxn(txn);
    setIsReceiptOpen(true);
  }, []);

  const navigateTo = useCallback(
    (view: "store" | "orders") => {
      setCurrentView(view);
      if (onNavigate) {
        onNavigate(view);
      }
    },
    [onNavigate]
  );

  // 5. Plain-English Workflow Handlers

  // "When the user adds a product to the cart"
  const addToCart = useCallback((product: P, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  // "When the user changes a product's quantity"
  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQ = item.quantity + delta;
            return nextQ > 0 ? { ...item, quantity: nextQ } : null;
          }
          return item;
        })
        .filter(Boolean) as WorkflowCartItem<P>[];
    });
  }, []);

  // "When the user removes a product from the cart"
  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // "When the user proceeds to checkout"
  const proceedToCheckout = useCallback(() => {
    setIsCartOpen(false);
    if (!currentUser) {
      setIsAuthOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  }, [currentUser]);

  // "When authentication succeeds"
  const handleAuthSuccess = useCallback(
    async (user: U) => {
      setCurrentUser(user);
      setIsAuthOpen(false);

      if (loadOrders) {
        const userOrders = await Promise.resolve(loadOrders(user.id));
        setOrders(userOrders);
      }

      // If user had items in cart when they logged in, transition straight to checkout
      setCartItems((currentCart) => {
        if (currentCart.length > 0) {
          setIsCheckoutOpen(true);
        }
        return currentCart;
      });
    },
    [loadOrders]
  );

  // "When the user logs out"
  const handleLogout = useCallback(async () => {
    if (onLogoutService) {
      await Promise.resolve(onLogoutService());
    }
    setCurrentUser(null);
    setOrders([]);
    navigateTo("store");
  }, [onLogoutService, navigateTo]);

  // "When payment succeeds"
  const handlePaymentSuccess = useCallback(
    async (result: { order?: O; transaction?: any; [key: string]: any }) => {
      if (confirmPaymentWithBackend) {
        const confirmed = await Promise.resolve(confirmPaymentWithBackend(result));
        if (!confirmed) {
          throw new Error("Payment validation failed: provider could not confirm settlement.");
        }
      }

      setIsCheckoutOpen(false);
      setCartItems([]);

      if (result.order) {
        setActiveReceiptOrder(result.order);
        setActiveReceiptTxn(result.transaction || null);
        setIsReceiptOpen(true);

        if (loadOrders && currentUser) {
          const updatedOrders = await Promise.resolve(loadOrders(currentUser.id));
          setOrders(updatedOrders);
        }
      }
    },
    [confirmPaymentWithBackend, loadOrders, currentUser]
  );

  return {
    cartItems,
    currentUser,
    orders,
    currentView,
    cartCount,
    cartSubtotal,
    cartTax,
    cartTotal,
    isCartOpen,
    isAuthOpen,
    isCheckoutOpen,
    isReceiptOpen,
    activeReceiptOrder,
    activeReceiptTxn,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    proceedToCheckout,
    handleAuthSuccess,
    handleLogout,
    handlePaymentSuccess,
    openCart,
    closeCart,
    openAuth,
    closeAuth,
    openCheckout,
    closeCheckout,
    openReceipt,
    closeReceipt,
    viewReceipt,
    navigateTo,
  };
}
