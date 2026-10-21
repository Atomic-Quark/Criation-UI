import { useState, useCallback, useRef, useEffect } from "react";

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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (typeof navigator === "undefined" || !navigator?.clipboard) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        if (timerRef.current) clearTimeout(timerRef.current);
        setHasCopied(true);
        timerRef.current = setTimeout(() => {
          setHasCopied(false);
          timerRef.current = null;
        }, timeout);
        return true;
      } catch {
        setHasCopied(false);
        return false;
      }
    },
    [timeout]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { hasCopied, copy };
}
