import axios from 'axios'

export interface BaseApiRequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: object
  signal?: AbortSignal
  params?: string[][] | Record<string, string> | string | URLSearchParams
  headers?: Record<string, string>
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
  signal,
  params,
  headers: addedHeaders,
}: BaseApiRequestOptions): Promise<T> => {
  const urlParams = new URLSearchParams(params)
  const headers: Record<string, string> = {
    ...addedHeaders,
  }
  const response = await axios({
    method,
    url,
    params: urlParams,
    data,
    headers,
    signal,
  })
  return response.data
}