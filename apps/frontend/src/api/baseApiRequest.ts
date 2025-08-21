import axios, { AxiosRequestConfig } from 'axios';

export interface BaseApiRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: object;
  signal?: AbortSignal;
  params?: string[][] | Record<string, string> | string | URLSearchParams;
  headers?: Record<string, string>;
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
  signal,
  params,
  headers: addHeaders,
}: BaseApiRequestOptions): Promise<T> => {
  const urlParams = new URLSearchParams(params);
  const token = localStorage.getItem('accessToken');
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...addHeaders,
  };
  const response = await axios({
    baseURL: import.meta.env.VITE_API_URL,
    method,
    url,
    params: urlParams,
    data,
    headers,
    signal,
  });
  return response.data;
};
