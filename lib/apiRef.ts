// lib/api.ts
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const AUTH = process.env.NEXT_PUBLIC_API_AUTH || '';

async function callApiWithRetry(
  endpoint: string,
  options: RequestInit = {},
  customHeaders: Record<string, string> = {},
  retries = 2
) {
  const token = (await cookies()).get('token')?.value || '';

  const headers: Record<string, string> = {
    Authorization: AUTH,
    token,
    'Content-Type': 'application/json',
    ...customHeaders,
    ...(options.headers as Record<string, string>),
  };

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Reduce to 5 second timeout

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { result, response };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - server tidak merespons dalam 15 detik');
    }
    
    if ((error as any).code === 'UND_ERR_CONNECT_TIMEOUT') {
      throw new Error('Koneksi timeout - tidak dapat terhubung ke server');
    }
    
    // Retry logic for network errors
    if (retries > 0 && ((error as any).code === 'UND_ERR_CONNECT_TIMEOUT' || (error instanceof Error && error.name === 'AbortError'))) {
      console.log(`Retrying API call to ${endpoint}, ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
      return callApiWithRetry(endpoint, options, customHeaders, retries - 1);
    }
    
    throw new Error(`API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function callApi(
  endpoint: string,
  options: RequestInit = {},
  customHeaders: Record<string, string> = {}
) {
  return callApiWithRetry(endpoint, options, customHeaders);
}
