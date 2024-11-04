'use server';

export interface IFetchOption {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: unknown;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  headers?: HeadersInit;
}

// 封裝API請求
export async function request<T>(
  url: string,
  options: IFetchOption
): Promise<T> {
  try {
    const headers = new Headers({
      'Accept-Version': 'v1',
      'Content-Type': 'application/json',
      ...options.headers,
    });

    const config: RequestInit = {
      method: options.method,
      headers,
      cache: options.cache,
      next: options.next,
    };

    if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
