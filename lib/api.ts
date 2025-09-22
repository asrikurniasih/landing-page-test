// lib/api.ts
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const AUTH = process.env.NEXT_PUBLIC_API_AUTH || '';

// Validate API_BASE_URL
if (!API_BASE) {
  console.warn('NEXT_PUBLIC_API_BASE_URL is not defined. API calls will fail.');
}

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
    // Ensure API_BASE_URL is defined
    if (!API_BASE) {
      throw new Error('API_BASE_URL is not configured');
    }
    
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
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - server tidak merespons dalam 15 detik');
    }
    
    if (error.code === 'UND_ERR_CONNECT_TIMEOUT') {
      throw new Error('Koneksi timeout - tidak dapat terhubung ke server');
    }
    
    // Retry logic for network errors
    if (retries > 0 && (error.code === 'UND_ERR_CONNECT_TIMEOUT' || error.name === 'AbortError')) {
      console.log(`Retrying API call to ${endpoint}, ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
      return callApiWithRetry(endpoint, options, customHeaders, retries - 1);
    }
    
    throw new Error(`API Error: ${error.message}`);
  }
}

export async function callApi(
  endpoint: string,
  options: RequestInit = {},
  customHeaders: Record<string, string> = {}
) {
  return callApiWithRetry(endpoint, options, customHeaders);
}
