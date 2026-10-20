import { useState, useCallback } from "react";

export interface UseClipboardOptions {
  timeout?: number;
}

export interface UseClipboardReturn {
  hasCopied: boolean;
  copy: (text: string) => Promise<boolean>;
}

export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
  const { timeout = 2000 } = options;
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), timeout);
        return true;
      } catch {
        setHasCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { hasCopied, copy };
}
