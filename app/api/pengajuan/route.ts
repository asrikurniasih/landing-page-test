import { NextResponse } from 'next/server';
import { callApi } from '@/lib/api';

// Helper untuk fallback status
function getResponseStatus(result: any, fallbackStatus = 200) {
  return result?.status && typeof result.status === 'number' ? result.status : fallbackStatus;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryString = searchParams.toString();

    const { result, response } = await callApi(`/sites/tenant/data?${queryString}`);

    return NextResponse.json(result, {
      status: getResponseStatus(result, response.status),
    });
  } catch (error: any) {
    console.error('GET error:', error);
    
    // Return fallback data instead of 500 error
    return NextResponse.json({
      results: {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0
        }
      },
      message: 'Pengajuan tidak tersedia saat ini',
      error: error.message || 'Gagal mengambil data banner'
    }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { result, response } = await callApi('/sites/tenant/add', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    console.log('result', result);
    console.log('response', response);
    return NextResponse.json(result, { status: getResponseStatus(result, response.status) });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Gagal menambahkan data' }, { status: 500 });
  }
}
