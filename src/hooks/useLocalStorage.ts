import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (val: T | ((prev: T) => T)) => {
      if (typeof window === "undefined") return;
      try {
        setStoredValue((prev) => {
          const valueToStore = val instanceof Function ? val(prev) : val;
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            // Emit storage event for same-window cross-component synchronization
            window.dispatchEvent(
              new StorageEvent("storage", {
                key,
                newValue: JSON.stringify(valueToStore),
              })
            );
          } catch (writeError) {
            console.warn(`Error setting localStorage key "${key}":`, writeError);
          }
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error updating localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  useEffect(() => {
    setStoredValue(readValue());

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          // Ignore JSON parse errors for non-matching payloads
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
