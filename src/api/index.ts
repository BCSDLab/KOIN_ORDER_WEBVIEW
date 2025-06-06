const BASE_URL = import.meta.env.VITE_API_PATH;

if (!BASE_URL) {
  throw new Error('API 경로 환경변수가 설정되지 않았습니다.');
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
  headers?: Record<string, string>;
  body?: unknown;
}

export const apiClient = {
  get: <T = unknown>(endPoint: string, options: FetchOptions = {}) =>
    sendRequest<T>(endPoint, { ...options, method: 'GET' }),
  post: <T = unknown>(endPoint: string, options: FetchOptions = {}) =>
    sendRequest<T>(endPoint, { ...options, method: 'POST' }),
  put: <T = unknown>(endPoint: string, options: FetchOptions = {}) =>
    sendRequest<T>(endPoint, { ...options, method: 'PUT' }),
  delete: <T = unknown>(endPoint: string, options: FetchOptions = {}) =>
    sendRequest<T>(endPoint, { ...options, method: 'DELETE' }),
  patch: <T = unknown>(endPoint: string, options: FetchOptions = {}) =>
    sendRequest<T>(endPoint, { ...options, method: 'PATCH' }),
};

async function sendRequest<T = unknown>(
  endPoint: string,
  options: FetchOptions = {},
  timeout: number = 10000,
): Promise<T> {
  const { headers, body, method, ...restOptions } = options;

  if (!method) {
    throw new Error('HTTP method가 설정되지 않았습니다.');
  }
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, timeout);

  const isJsonBody = body !== undefined && body !== null && !(body instanceof FormData);

  try {
    const fetchOptions: RequestInit = {
      headers: {
        ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      method,
      signal: abortController.signal,
      ...restOptions,
    };

    if (body !== undefined && body !== null && !['GET', 'HEAD'].includes(method)) {
      fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : (body as BodyInit);
    }

    const response = await fetch(`${BASE_URL}/${endPoint}`, fetchOptions);

    if (!response.ok) {
      const errorMessage = await parseResponseText(response);
      const error = new Error(errorMessage || 'API 요청 실패');
      Object.assign(error, {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      throw error;
    }

    return parseResponse<T>(response);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function parseResponse<T = unknown>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return {} as T;
    }
  } else if (contentType.includes('text')) {
    return (await response.text()) as unknown as T;
  } else {
    return null as unknown as T;
  }
}

async function parseResponseText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return '서버로부터 응답을 받지 못했습니다.';
  }
}
