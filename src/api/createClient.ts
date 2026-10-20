import { request } from "./request";
import type { ApiClientConfig, ApiRequestOptions, ApiResponse } from "./apiTypes";

export function createApiClient(config: ApiClientConfig) {
  const { baseUrl, defaultHeaders = {}, getAuthToken, timeoutMs } = config;

  const buildHeaders = async (customHeaders?: HeadersInit): Promise<Record<string, string>> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };

    if (getAuthToken) {
      const token = await getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }

    return headers;
  };

  return {
    get: async <T = any>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> => {
      const headers = await buildHeaders(options.headers);
      return request<T>(`${baseUrl}${endpoint}`, {
        ...options,
        method: "GET",
        headers,
        timeoutMs,
      });
    },

    post: async <T = any>(
      endpoint: string,
      body?: any,
      options: ApiRequestOptions = {}
    ): Promise<ApiResponse<T>> => {
      const headers = await buildHeaders(options.headers);
      return request<T>(`${baseUrl}${endpoint}`, {
        ...options,
        method: "POST",
        headers,
        body: body ? JSON.stringify(body) : undefined,
        timeoutMs,
      });
    },

    put: async <T = any>(
      endpoint: string,
      body?: any,
      options: ApiRequestOptions = {}
    ): Promise<ApiResponse<T>> => {
      const headers = await buildHeaders(options.headers);
      return request<T>(`${baseUrl}${endpoint}`, {
        ...options,
        method: "PUT",
        headers,
        body: body ? JSON.stringify(body) : undefined,
        timeoutMs,
      });
    },

    delete: async <T = any>(
      endpoint: string,
      options: ApiRequestOptions = {}
    ): Promise<ApiResponse<T>> => {
      const headers = await buildHeaders(options.headers);
      return request<T>(`${baseUrl}${endpoint}`, {
        ...options,
        method: "DELETE",
        headers,
        timeoutMs,
      });
    },
  };
}
