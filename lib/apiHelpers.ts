// lib/apiHelpers.ts - Reusable API helper functions

interface ApiResponse<T = any> {
  results?: {
    data: T[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  status?: number;
  message?: string;
  error?: string;
}

interface ApiError {
  error: string;
  message?: string;
}

// GET API Helper
export async function fetchApiData<T = any>(
  url: string,
  options: {
    search?: string;
    onError?: (message: string) => void;
    [key: string]: any;
  } = {}
): Promise<{
  data: T[];
  pagination?: any;
  error?: string;
}> {
  try {
    // Build query string
    let query = '';
    if (options.search?.trim()) {
      query += `?search=${encodeURIComponent(options.search.trim())}`;
    }
    
    // Add other query parameters
    Object.entries(options).forEach(([key, value]) => {
      if (key !== 'search' && key !== 'onError' && value !== undefined && value !== null && value !== '') {
        const separator = query ? '&' : '?';
        query += `${separator}${key}=${encodeURIComponent(value)}`;
      }
    });

    const response = await fetch(`${url}${query}`);
    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      const errorMessage = result.error || result.message || "Gagal memuat data";
      if (options.onError) {
        options.onError(errorMessage);
      }
      return {
        data: [],
        error: errorMessage
      };
    }

    return {
      data: result.results?.data || [],
      pagination: result.results?.pagination,
    };
  } catch (error: any) {
    console.error('API GET Error:', error);
    const errorMessage = error.message || 'Terjadi kesalahan saat mengambil data';
    if (options.onError) {
      options.onError(errorMessage);
    }
    return {
      data: [],
      error: errorMessage
    };
  }
}

// POST API Helper
export async function postApiData<T = any>(
  url: string,
  data: any,
  options: {
    onSuccess?: (result: T) => void;
    onError?: (error: string) => void;
    showAlert?: boolean;
  } = {}
): Promise<{
  success: boolean;
  data?: T;
  error?: string;
}> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.error || result.message || 'Gagal mengirim data';
      
      if (options.onError) {
        options.onError(errorMessage);
      }
      
      if (options.showAlert) {
        alert(errorMessage);
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }

    if (options.onSuccess) {
      options.onSuccess(result);
    }

    return {
      success: true,
      data: result
    };
  } catch (error: any) {
    console.error('API POST Error:', error);
    const errorMessage = 'Terjadi kesalahan jaringan';
    
    if (options.onError) {
      options.onError(errorMessage);
    }
    
    if (options.showAlert) {
      alert(errorMessage);
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

// Specific API functions for your app
export const api = {
  // GET functions
  async getKecamatan(cityId: string, search?: string, onError?: (message: string) => void) {
    return fetchApiData(`/api/kecamatan?city_id=${cityId}`, { search, onError });
  },

  async getKabupaten(provinceId?: string, search?: string, onError?: (message: string) => void) {
    const params: any = { onError };
    if (provinceId) params.province_id = provinceId;
    if (search) params.search = search;
    
    return fetchApiData('/api/kabupaten', params);
  },

  async getKelurahan(subdistrictId: string, search?: string, onError?: (message: string) => void) {
    return fetchApiData(`/api/kelurahan?subdistrict_id=${subdistrictId}`, { search, onError });
  },

  async getProvinsi(search?: string, onError?: (message: string) => void) {
    return fetchApiData('/api/provinsi', { search, onError });
  },

  async getPrograms(search?: string, onError?: (message: string) => void) {
    return fetchApiData('/api/program', { search, onError });
  },

  // POST functions
  async submitPengajuan(formData: any) {
    return postApiData('/api/pengajuan', formData, {
      showAlert: true,
      onSuccess: (result) => {
        console.log('Pengajuan berhasil:', result);
      },
      onError: (error) => {
        console.error('Pengajuan gagal:', error);
      }
    });
  },

  async registerUser(userData: any) {
    return postApiData('/api/register', userData, {
      onSuccess: (result) => {
        console.log('Registrasi berhasil:', result);
      },
      onError: (error) => {
        console.error('Registrasi gagal:', error);
      }
    });
  }
};
