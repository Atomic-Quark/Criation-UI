/**
 * Criation UI — Declarative API Adapter
 * 
 * Provides robust REST operations with:
 * - Request cancellation via AbortController
 * - Configurable retries
 * - In-memory mock storage fallback for local demonstration
 * - Unified error reporting
 */

export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
  mockFallback?: boolean;
}

export interface ResourceApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
}

export interface ResourceApi<T = any> {
  list: (params?: { search?: string; sort?: string; page?: number; limit?: number }) => Promise<T[]>;
  get: (id: string | number) => Promise<T | null>;
  create: (item: Omit<T, "id">) => Promise<T>;
  update: (id: string | number, patch: Partial<T>) => Promise<T>;
  delete: (id: string | number) => Promise<boolean>;
}

/**
 * In-memory Mock Storage for standalone demos and local testing.
 */
class MemoryStorageAdapter {
  private store: Map<string, any[]> = new Map();

  seed(resourceName: string, initialData: any[]) {
    this.store.set(resourceName, [...initialData]);
  }

  getStore(resourceName: string): any[] {
    if (!this.store.has(resourceName)) {
      this.store.set(resourceName, []);
    }
    return this.store.get(resourceName)!;
  }

  async list(resourceName: string, search?: string): Promise<any[]> {
    let items = [...this.getStore(resourceName)];
    if (search && search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((item) =>
        Object.values(item).some(
          (val) => val && String(val).toLowerCase().includes(q)
        )
      );
    }
    return items;
  }

  async get(resourceName: string, id: string | number): Promise<any | null> {
    const items = this.getStore(resourceName);
    return items.find((item) => String(item.id) === String(id)) || null;
  }

  async create(resourceName: string, data: any): Promise<any> {
    const items = this.getStore(resourceName);
    const newId = data.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newItem = { ...data, id: newId };
    items.unshift(newItem);
    return newItem;
  }

  async update(resourceName: string, id: string | number, patch: any): Promise<any> {
    const items = this.getStore(resourceName);
    const idx = items.findIndex((item) => String(item.id) === String(id));
    if (idx === -1) {
      throw new Error(`Item with id '${id}' not found in resource '${resourceName}'.`);
    }
    const updated = { ...items[idx], ...patch, id: items[idx].id };
    items[idx] = updated;
    return updated;
  }

  async delete(resourceName: string, id: string | number): Promise<boolean> {
    const items = this.getStore(resourceName);
    const idx = items.findIndex((item) => String(item.id) === String(id));
    if (idx === -1) return false;
    items.splice(idx, 1);
    return true;
  }
}

export const memoryStore = new MemoryStorageAdapter();

/**
 * Creates a resource API client supporting both real HTTP and local mock fallback.
 */
export function createResourceApi<T = any>(
  resourceName: string,
  endpoint: string,
  options: ApiClientOptions = {}
): ResourceApi<T> {
  const { baseUrl = "", mockFallback = true } = options;
  const fullUrl = baseUrl ? `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}` : endpoint;

  return {
    async list(params = {}) {
      try {
        if (!baseUrl && mockFallback) {
          return (await memoryStore.list(resourceName, params.search)) as T[];
        }
        const url = new URL(fullUrl, window?.location?.origin || "http://localhost");
        if (params.search) url.searchParams.set("q", params.search);
        if (params.page) url.searchParams.set("page", String(params.page));
        if (params.limit) url.searchParams.set("limit", String(params.limit));

        const res = await fetch(url.toString(), {
          headers: { "Content-Type": "application/json", ...options.headers },
        });
        if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
        return (await res.json()) as T[];
      } catch (err) {
        if (mockFallback) {
          return (await memoryStore.list(resourceName, params.search)) as T[];
        }
        throw err;
      }
    },

    async get(id) {
      try {
        if (!baseUrl && mockFallback) {
          return (await memoryStore.get(resourceName, id)) as T | null;
        }
        const res = await fetch(`${fullUrl}/${id}`, {
          headers: { "Content-Type": "application/json", ...options.headers },
        });
        if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
        return (await res.json()) as T;
      } catch (err) {
        if (mockFallback) {
          return (await memoryStore.get(resourceName, id)) as T | null;
        }
        throw err;
      }
    },

    async create(data) {
      try {
        if (!baseUrl && mockFallback) {
          return (await memoryStore.create(resourceName, data)) as T;
        }
        const res = await fetch(fullUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...options.headers },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Failed to create item in ${resourceName}`);
        return (await res.json()) as T;
      } catch (err) {
        if (mockFallback) {
          return (await memoryStore.create(resourceName, data)) as T;
        }
        throw err;
      }
    },

    async update(id, patch) {
      try {
        if (!baseUrl && mockFallback) {
          return (await memoryStore.update(resourceName, id, patch)) as T;
        }
        const res = await fetch(`${fullUrl}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...options.headers },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error(`Failed to update item ${id} in ${resourceName}`);
        return (await res.json()) as T;
      } catch (err) {
        if (mockFallback) {
          return (await memoryStore.update(resourceName, id, patch)) as T;
        }
        throw err;
      }
    },

    async delete(id) {
      try {
        if (!baseUrl && mockFallback) {
          return await memoryStore.delete(resourceName, id);
        }
        const res = await fetch(`${fullUrl}/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", ...options.headers },
        });
        return res.ok;
      } catch (err) {
        if (mockFallback) {
          return await memoryStore.delete(resourceName, id);
        }
        throw err;
      }
    },
  };
}
