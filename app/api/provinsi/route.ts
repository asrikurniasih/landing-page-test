import { NextResponse } from 'next/server';
import { callApi } from '@/lib/apiRef';

// Helper untuk fallback status
function getResponseStatus(result: { status?: number } | null, fallbackStatus = 200) {
  return result?.status && typeof result.status === 'number' ? result.status : fallbackStatus;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryString = searchParams.toString();

    const { result, response } = await callApi(`/ref/province`);

    return NextResponse.json(result, {
      status: getResponseStatus(result, response.status),
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}
