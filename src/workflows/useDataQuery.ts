import { useState, useEffect, useCallback, useRef } from "react";

export interface DataQueryOptions<T> {
  enabled?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (err: Error) => void;
  retryCount?: number;
}

export interface DataQueryResult<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<T | undefined>;
}

/**
 * useDataQuery:
 * High-level reactive data querying hook with mount safety, retry capabilities,
 * and declarative loading/error states.
 */
export function useDataQuery<T = any>(
  queryFn: () => Promise<T>,
  deps: any[] = [],
  options: DataQueryOptions<T> = {}
): DataQueryResult<T> {
  const { enabled = true, initialData, onSuccess, onError, retryCount = 1 } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);

  const isMountedRef = useRef(true);
  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);

    let attempts = 0;
    while (attempts <= retryCount) {
      try {
        const result = await queryFnRef.current();
        if (isMountedRef.current) {
          setData(result);
          setIsLoading(false);
          onSuccess?.(result);
        }
        return result;
      } catch (err: any) {
        attempts++;
        if (attempts > retryCount) {
          if (isMountedRef.current) {
            const errorObj = err instanceof Error ? err : new Error(String(err));
            setError(errorObj);
            setIsLoading(false);
            onError?.(errorObj);
          }
          return undefined;
        }
      }
    }
  }, [retryCount, onSuccess, onError]);

  useEffect(() => {
    if (enabled) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return {
    data,
    error,
    isLoading,
    isError: error !== null,
    isSuccess: data !== undefined && error === null,
    refetch: execute,
  };
}
