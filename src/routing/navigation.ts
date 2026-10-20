import type { NavigationDirection, NavigationOptions } from "./routeTypes";

/**
 * Reusable routing & navigation controller
 */
export const navigation = {
  navigate: (to: string, options?: NavigationOptions) => {
    if (typeof window === "undefined") return;

    if (options?.replace) {
      window.history.replaceState(options.state || null, "", to);
    } else {
      window.history.pushState(options?.state || null, "", to);
    }
    window.dispatchEvent(new PopStateEvent("popstate"));
  },

  back: () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  },

  forward: () => {
    if (typeof window !== "undefined") {
      window.history.forward();
    }
  },

  getPathDirection: (prevPath: string, nextPath: string): NavigationDirection => {
    if (nextPath.length > prevPath.length) return "forward";
    if (nextPath.length < prevPath.length) return "backward";
    return "replace";
  },
};
