'use server';

export interface IFetchOption {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: unknown;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  headers?: HeadersInit;
}
export interface IApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 封裝API請求
export async function request<T>(
  url: string,
  options: IFetchOption
): Promise<IApiResponse<T>> {
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
      return {
        status: response.status,
        message: response.statusText,
        data: null as T,
      };
    }

    const data = await response.json();

    return {
      status: 200,
      message: 'success',
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
