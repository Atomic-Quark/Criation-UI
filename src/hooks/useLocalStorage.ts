import { useState, useEffect, useCallback } from "react";

/**
 * In-memory fallback map for environments where window.localStorage is blocked,
 * quota is exceeded, or running in restricted iframes/private browsing modes.
 */
const memoryStorageFallback = new Map<string, string>();

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item) as T;
      }
      if (memoryStorageFallback.has(key)) {
        return JSON.parse(memoryStorageFallback.get(key)!) as T;
      }
      return initialValue;
    } catch (error) {
      // Graceful fallback to memory storage on SecurityError or corrupted JSON
      if (memoryStorageFallback.has(key)) {
        try {
          return JSON.parse(memoryStorageFallback.get(key)!) as T;
        } catch {
          return initialValue;
        }
      }
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (val: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = val instanceof Function ? val(prev) : val;
        const serialized = JSON.stringify(valueToStore);

        // Always update memory fallback
        memoryStorageFallback.set(key, serialized);

        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, serialized);
            // Emit storage event for same-window cross-component synchronization
            window.dispatchEvent(
              new StorageEvent("storage", {
                key,
                newValue: serialized,
              })
            );
          } catch (writeError) {
            // QuotaExceededError or SecurityError - memory fallback already holds the value
            console.warn(`[useLocalStorage] Storage restricted for key "${key}", retained in memory fallback.`, writeError);
          }
        }
        return valueToStore;
      });
    },
    [key]
  );

  useEffect(() => {
    setStoredValue(readValue());

    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          // Ignore parse errors for non-matching payloads
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}
