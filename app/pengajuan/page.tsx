'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TextField, Button, Autocomplete, InputAdornment, IconButton } from '@mui/material'
import UploadFile from '../components/ui/UploadFile'
import { api } from '../../lib/apiHelpers'
import { useNotification } from '../components/layout/notification-provider'

export default function Pengajuan() {
  const { notify } = useNotification();
  
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);
  
  const [formData, setFormData] = useState({
    program_id: '',
    nama: '',
    email: '',
    mobilephone: '',
    nik: '',
    kk: '',
    gaji: '',
    alamat: '',
    gender: '',
    job: '',
    province_id: '',
    city_id: '',
    subdistrict_id: '',
    village_id: '',
    unit_type: '',
    unit_id: '0',
    doc_array: []
  })

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: any}>({})

  const [errors, setErrors] = useState({
    program_id: false,
    nama: false,
    email: false,
    mobilephone: false,
    nik: false,
    kk: false,
    gaji: false,
    alamat: false,
    gender: false,
    unit_type: false
  })

  const [isLoading, setIsLoading] = useState(false)
  const [province, setProvince] = useState<any[]>([])
  const [city, setCity] = useState<any[]>([])
  const [subdistrict, setSubdistrict] = useState<any[]>([])
  const [village, setVillage] = useState<any[]>([])
  const [filteredCity, setFilteredCity] = useState<any[]>([])
  const [filteredSubdistrict, setFilteredSubdistrict] = useState<any[]>([])
  const [filteredVillage, setFilteredVillage] = useState<any[]>([])

  const unitTypes = [
    { id: 'standar', name: 'Unit Tipe Standar (36m²)', size: '36m²' },
    { id: 'hook1', name: 'Unit Tipe Hook 1 (38m²)', size: '38m²' },
    { id: 'hook2', name: 'Unit Tipe Hook 2 (38m²)', size: '38m²' }
  ]

  // Thousand separator formatting functions
  const formatNumberWithSeparator = (value: string | number) => {
    if (!value) return '';
    const numValue = typeof value === 'string' ? value.replace(/\D/g, '') : value.toString();
    if (!numValue) return '';
    return parseInt(numValue).toLocaleString('id-ID');
  };

  const handleNumberInputChange = (field: string, value: string) => {
    const rawValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [field]: rawValue }));
  };

  useEffect(() => {
    fetchDataProvince()
    fetchDataPrograms()
  }, [])

  const fetchDataPrograms = async () => {
    setIsLoadingPrograms(true);
    try {
      const { data, error } = await api.getPrograms(undefined, (errorMessage) => {
        notify(errorMessage, 'error');
      });
      if (error) {
        console.error('Error fetching programs data:', error);
        return;
      }
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs data:', error);
      notify('Terjadi kesalahan saat mengambil data program', 'error');
    } finally {
      setIsLoadingPrograms(false);
    }
  }

  const fetchDataProvince = async () => {
    try {
      const { data, error } = await api.getProvinsi(undefined, (errorMessage) => {
        notify(errorMessage, 'error');
      });
      if (error) {
        console.error('Error fetching province data:', error);
        return;
      }
      setProvince(data);
    } catch (error) {
      console.error('Error fetching province data:', error);
      notify('Terjadi kesalahan saat mengambil data provinsi', 'error');
    }
  }

  const fetchDataCity = async (provinceId?: string) => {
    try {
      const { data, error } = await api.getKabupaten(provinceId, undefined, (errorMessage) => {
        notify(errorMessage, 'error');
      });
      if (error) {
        console.error('Error fetching city data:', error);
        return;
      }

      setCity(data);
      
      if (provinceId) {
        setFilteredCity(data);
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
      notify('Terjadi kesalahan saat mengambil data kabupaten', 'error');
    }
  }

  const fetchDataSubdistrict = async (cityId?: string) => {
    try {
      if (!cityId) return;
      
      const { data, error } = await api.getKecamatan(cityId, undefined, (errorMessage) => {
        notify(errorMessage, 'error');
      });
      if (error) {
        console.error('Error fetching subdistrict data:', error);
        return;
      }

      setSubdistrict(data);
      setFilteredSubdistrict(data);
    } catch (error) {
      console.error('Error fetching subdistrict data:', error);
      notify('Terjadi kesalahan saat mengambil data kecamatan', 'error');
    }
  }

  const fetchDataVillage = async (subdistrictId?: string) => {
    try {
      if (!subdistrictId) return;
      
      const { data, error } = await api.getKelurahan(subdistrictId, undefined, (errorMessage) => {
        notify(errorMessage, 'error');
      });
      if (error) {
        console.error('Error fetching village data:', error);
        return;
      }

      setVillage(data);
      setFilteredVillage(data);
    } catch (error) {
      console.error('Error fetching village data:', error);
      notify('Terjadi kesalahan saat mengambil data kelurahan', 'error');
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle program selection
    if (field === 'program_id') {
      const selectedProgramData = programs.find(p => p.id === value);
      setSelectedProgram(selectedProgramData);
    }
    
    // Real-time validation for specific fields
    if (['mobilephone', 'nik', 'kk'].includes(field)) {
      const isValid = !validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: !isValid }));
    } else {
      // Clear error when user starts typing for other fields
      if (errors[field as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [field]: false }));
      }
    }

    // Handle cascading dropdowns for address fields
    if (field === 'province_id') {
      const selectedProvince = province.find(p => p.id === value);
      setFormData(prev => ({ 
        ...prev, 
        province_id: value,
        city_id: '',
        subdistrict_id: '',
        village_id: ''
      }));
      
      if (value) {
        fetchDataCity(value);
      } else {
        setFilteredCity([]);
      }
      setFilteredSubdistrict([]);
      setFilteredVillage([]);
    }
    
    if (field === 'city_id') {
      const selectedCity = filteredCity.find(c => c.id === value);
      setFormData(prev => ({ 
        ...prev, 
        city_id: value,
        subdistrict_id: '',
        village_id: ''
      }));
      
      if (value) {
        fetchDataSubdistrict(value);
      } else {
        setFilteredSubdistrict([]);
      }
      setFilteredVillage([]);
    }
    
    if (field === 'subdistrict_id') {
      const selectedSubdistrict = filteredSubdistrict.find(s => s.id === value);
      setFormData(prev => ({ 
        ...prev, 
        subdistrict_id: value,
        village_id: ''
      }));
      
      if (value) {
        fetchDataVillage(value);
      } else {
        setFilteredVillage([]);
      }
    }
  };

  // Validation functions
  const validateField = (field: string, value: any) => {
    if (field === 'job') return false; // Job is optional
    
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    
    switch (field) {
      case 'program_id':
        return !value;
      case 'nama':
        return value.trim().length < 3;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value);
      case 'mobilephone':
        // Validasi nomor telepon Indonesia: 08xx-xxxx-xxxx atau +628xx-xxxx-xxxx
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        return !phoneRegex.test(value.replace(/\s/g, ''));
      case 'nik':
        // Validasi NIK: 16 digit angka
        const nikValue = value.replace(/\D/g, '');
        return nikValue.length !== 16 || !/^\d{16}$/.test(nikValue);
      case 'kk':
        // Validasi KK: 16 digit angka
        const kkValue = value.replace(/\D/g, '');
        return kkValue.length !== 16 || !/^\d{16}$/.test(kkValue);
      case 'gaji':
        return isNaN(value) || parseInt(value) < 1000000;
      case 'alamat':
        return value.trim().length < 10;
      case 'gender':
        return !['Laki-Laki', 'Perempuan'].includes(value);
      case 'unit_type':
        return !value;
      default:
        return false;
    }
  };

  const getErrorMessage = (field: string, value?: any) => {
    if (value === '' || value === null || value === undefined) {
      switch (field) {
        case 'program_id':
          return 'Program wajib dipilih';
        case 'nama':
          return 'Nama wajib diisi';
        case 'email':
          return 'Email wajib diisi';
        case 'mobilephone':
          return 'Nomor telepon wajib diisi';
        case 'nik':
          return 'NIK wajib diisi';
        case 'kk':
          return 'Nomor KK wajib diisi';
        case 'gaji':
          return 'Gaji wajib diisi';
        case 'alamat':
          return 'Alamat wajib diisi';
        case 'gender':
          return 'Jenis kelamin wajib dipilih';
        case 'unit_type':
          return 'Tipe unit wajib dipilih';
        default:
          return `${field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')} wajib diisi`;
      }
    }
    
    switch (field) {
      case 'nama':
        return 'Nama minimal 3 karakter';
      case 'email':
        return 'Format email tidak valid';
      case 'mobilephone':
        return 'Format nomor telepon tidak valid. Gunakan format: 08xx-xxxx-xxxx atau +628xx-xxxx-xxxx';
      case 'nik':
        return 'NIK harus 16 digit angka tanpa spasi atau karakter lain';
      case 'kk':
        return 'Nomor KK harus 16 digit angka tanpa spasi atau karakter lain';
      case 'gaji':
        return 'Gaji minimal Rp 1.000.000';
      case 'alamat':
        return 'Alamat minimal 10 karakter';
      case 'gender':
        return 'Pilih jenis kelamin';
      case 'unit_type':
        return 'Pilih tipe unit';
      default:
        return `${field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')} wajib diisi`;
    }
  };

  const handleSubmit = async () => {
    // Validate all required fields
    const validationErrors: any = {};
    
    Object.keys(formData).forEach(field => {
      if (field !== 'job' && field !== 'doc_array' && field !== 'unit_id' && field !== 'unit_type') {
        const value = formData[field as keyof typeof formData];
        const isValid = validateField(field, value);
        if (isValid) {
          validationErrors[field] = true;
        }
      }
    });

    // Validate required documents
    if (selectedProgram?.category_array) {
      const requiredDocs = selectedProgram.category_array
        .filter((category: any) => category.type === 'doc' && category.is_used);
      
      const missingDocs = requiredDocs.filter((category: any) => 
        !uploadedFiles[category.label] || !uploadedFiles[category.label].fileuri
      );

      console.log('requiredDocs', requiredDocs);

      console.log('uploadedFiles', uploadedFiles);

      console.log('missingDocs', missingDocs);
      
      if (missingDocs.length > 0) {
        notify('Mohon upload semua dokumen yang diperlukan', 'error');
        return;
      }
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Structure doc_array properly
      const getDocumentName = (label: string) => {
        const labelMap: { [key: string]: string } = {
          'formulir_permohonan_sewa_hunian': 'Formulir Permohonan Sewa Hunian',
          'surat_kebenaran_data_dan_keabsahan_dokumen': 'Surat Kebenaran Data dan Keabsahan Dokumen',
          'dokumen_ktp': 'KTP',
          'dokumen_kk': 'KK',
          'surat_rekomendasi_instansi': 'Surat Rekomendasi Instansi',
          'surat_keterangan_penghasilan': 'Surat Keterangan Penghasilan',
          'surat_keterangan_belum_memiliki_rumah': 'Surat Keterangan Belum Memiliki Rumah'
        };
        return labelMap[label] || label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      };

      const docArray = Object.entries(uploadedFiles)
        .filter(([key, value]) => value && value.fileuri)
        .map(([key, value]) => ({
          name: getDocumentName(key),
          url: value.fileuri,
          type: value.fileuri.match(/\.(jpg|jpeg|png|gif)$/i) ? 'image' : 
                value.fileuri.match(/\.pdf$/i) ? 'pdf' : 
                value.fileuri.match(/\.(xlsx|xls)$/i) ? 'excel' : 
                value.fileuri.match(/\.(docx|doc)$/i) ? 'doc' : 'file'
        }));

      const formDataSubmit = {
        category_id: formData.program_id,
        name: formData.nama,
        email: formData.email,
        mobilephone: formData.mobilephone,
        nik: formData.nik,
        kk: formData.kk,
        salary: formData.gaji,
        address: formData.alamat,
        province_id: formData.province_id,
        city_id: formData.city_id,
        subdistrict_id: formData.subdistrict_id,
        village_id: formData.village_id,
        gender: formData.gender,
        job: formData.job,
        unit_type: formData.unit_type,
        unit_id: '0',
        doc_array: docArray,
        pengajuan_status: 'Pengajuan',
        village_name: village.find(v => v.id === formData.village_id)?.name,
        city_name: city.find(c => c.id === formData.city_id)?.name,
        subdistrict_name: subdistrict.find(s => s.id === formData.subdistrict_id)?.name,
        province_name: province.find(p => p.id === formData.province_id)?.name
      };
      
      const result = await api.submitPengajuan(formDataSubmit);
      
      if (result.success) {
        notify('Pengajuan berhasil dikirim', 'success');
        // Reset form
        setFormData({
          program_id: '',
          nama: '',
          email: '',
          mobilephone: '',
          nik: '',
          kk: '',
          gaji: '',
          alamat: '',
          gender: '',
          job: '',
          province_id: '',
          city_id: '',
          subdistrict_id: '',
          village_id: '',
          unit_type: '',
          unit_id: '0',
          doc_array: []
        });
        setSelectedProgram(null);
        setUploadedFiles({});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      notify('Terjadi kesalahan saat mengirim pengajuan', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section with Enhanced Design */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/foto-bangunan/gedung-4.jpeg"
            alt="Rusun Pasar Jaya"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                </svg>
                <span className="text-white text-sm font-medium">Form Pengajuan</span>
              </div>
              
              <div className="text-2xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Pengajuan Sewa 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Rusun
                </span>
              </div>
              
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Isi form di bawah ini untuk mengajukan sewa unit Rusun Pasar Jaya. 
                <span className="block mt-2 text-white/80">
                  Tim kami akan menghubungi Anda untuk proses selanjutnya.
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Form Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-0 p-8">
            {/* Program Selection */}
            <div className="mb-8">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Pilih Program <span className="text-red-500">*</span>
              </div>
              <Autocomplete
                size="small"
                fullWidth
                options={programs}
                getOptionLabel={(option) => option.title || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={programs.find(program => program.id === formData.program_id) || null}
                onChange={(_, newValue) => handleChange('program_id', newValue?.id || '')}
                loading={isLoadingPrograms}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    placeholder="Pilih Program"
                    error={errors.program_id}
                    helperText={errors.program_id ? getErrorMessage('program_id', formData.program_id) : ''}
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        fontSize: 14,
                        minHeight: 40,
                        backgroundColor: errors.program_id ? '#fef2f2' : (formData.program_id && !errors.program_id) ? '#f0fdf4' : '#f9fafb',
                        '&.Mui-focused': {
                          backgroundColor: '#fff',
                        },
                      },
                      '& .MuiInputBase-input': {
                        padding: '8px 12px',
                        fontSize: 14,
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: 12,
                        marginTop: '4px',
                      },
                    }} 
                  />
                )}
              />
            </div>

            {/* Conditional Form Fields - Only show after program is selected */}
            {selectedProgram && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama */}
                  <div className="md:col-span-2">
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Masukkan nama lengkap"
                      value={formData.nama}
                      onChange={(e) => handleChange('nama', e.target.value)}
                      error={errors.nama}
                      helperText={errors.nama ? getErrorMessage('nama', formData.nama) : ''}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          minHeight: 40,
                          backgroundColor: errors.nama ? '#fef2f2' : (formData.nama && !errors.nama) ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          fontSize: 14,
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: 12,
                          marginTop: '4px',
                        },
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="contoh@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                      helperText={errors.email ? getErrorMessage('email', formData.email) : ''}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          minHeight: 40,
                          backgroundColor: errors.email ? '#fef2f2' : (formData.email && !errors.email) ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          fontSize: 14,
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: 12,
                          marginTop: '4px',
                        },
                      }}
                    />
                  </div>

                  {/* Nomor Telepon */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Masukkan nomor telepon"
                      value={formData.mobilephone}
                      onChange={(e) => handleChange('mobilephone', e.target.value)}
                      error={errors.mobilephone}
                      helperText={errors.mobilephone ? getErrorMessage('mobilephone', formData.mobilephone) : 'Contoh: 08123456789 atau +628123456789'}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          minHeight: 40,
                          backgroundColor: errors.mobilephone ? '#fef2f2' : (formData.mobilephone && !errors.mobilephone) ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          fontSize: 14,
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: 12,
                          marginTop: '4px',
                        },
                      }}
                    />
                  </div>

                  {/* NIK */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      NIK <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Masukkan 16 digit NIK"
                      value={formData.nik}
                      onChange={(e) => handleChange('nik', e.target.value)}
                      error={errors.nik}
                      helperText={errors.nik ? getErrorMessage('nik', formData.nik) : 'Contoh: 1234567890123456'}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          minHeight: 40,
                          backgroundColor: errors.nik ? '#fef2f2' : (formData.nik && !errors.nik) ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          fontSize: 14,
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: 12,
                          marginTop: '4px',
                        },
                      }}
                    />
                  </div>

                  {/* KK */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Nomor KK <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Masukkan 16 digit nomor KK"
                      value={formData.kk}
                      onChange={(e) => handleChange('kk', e.target.value)}
                      error={errors.kk}
                      helperText={errors.kk ? getErrorMessage('kk', formData.kk) : 'Contoh: 1234567890123456'}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          minHeight: 40,
                          backgroundColor: errors.kk ? '#fef2f2' : (formData.kk && !errors.kk) ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          fontSize: 14,
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: 12,
                          marginTop: '4px',
                        },
                      }}
                    />
                  </div>

                  {/* Gaji */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Gaji/Bulan <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Rp 0"
                      value={formatNumberWithSeparator(formData.gaji)}
                      onChange={(e) => handleNumberInputChange('gaji', e.target.value)}
                      error={errors.gaji}
                      helperText={errors.gaji ? getErrorMessage('gaji', formData.gaji) : ''}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          minHeight: 40,
                          backgroundColor: errors.gaji ? '#fef2f2' : (formData.gaji && !errors.gaji) ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          fontSize: 14,
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: 12,
                          marginTop: '4px',
                        },
                      }}
                    />
                  </div>

                  {/* Jenis Kelamin */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </div>
                    <Autocomplete
                      size="small"
                      fullWidth
                      options={[
                        { id: 'Laki-Laki', name: 'Laki-laki' },
                        { id: 'Perempuan', name: 'Perempuan' }
                      ]}
                      getOptionLabel={(option) => option.name || ''}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      value={formData.gender ? { id: formData.gender, name: formData.gender === 'Laki-Laki' ? 'Laki-laki' : 'Perempuan' } : null}
                      onChange={(_, newValue) => handleChange('gender', newValue?.id || '')}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          placeholder="Pilih Jenis Kelamin"
                          error={errors.gender}
                          helperText={errors.gender ? getErrorMessage('gender', formData.gender) : ''}
                          sx={{
                            '& .MuiInputBase-root': {
                              borderRadius: 1,
                              fontSize: 14,
                              minHeight: 40,
                              backgroundColor: errors.gender ? '#fef2f2' : (formData.gender && !errors.gender) ? '#f0fdf4' : '#f9fafb',
                              '&.Mui-focused': {
                                backgroundColor: '#fff',
                              },
                            },
                            '& .MuiInputBase-input': {
                              padding: '8px 12px',
                              fontSize: 14,
                            },
                            '& .MuiFormHelperText-root': {
                              fontSize: 12,
                              marginTop: '4px',
                            },
                          }} 
                        />
                      )}
                    />
                  </div>

                  {/* Pekerjaan */}
                  <div className="col-span-2">
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Pekerjaan
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Masukkan pekerjaan"
                      value={formData.job}
                      onChange={(e) => handleChange('job', e.target.value)}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          minHeight: 40,
                          backgroundColor: formData.job ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          fontSize: 14,
                        },
                      }}
                    />
                  </div>

                  {/* Tipe Unit */}
                  {/* <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Tipe Unit <span className="text-red-500">*</span>
                    </div>
                    <Autocomplete
                      size="small"
                      fullWidth
                      options={unitTypes}
                      getOptionLabel={(option) => option.name || ''}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      value={unitTypes.find(unit => unit.id === formData.unit_type) || null}
                      onChange={(_, newValue) => handleChange('unit_type', newValue?.id || '')}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          placeholder="Pilih Tipe Unit"
                          error={errors.unit_type}
                          helperText={errors.unit_type ? getErrorMessage('unit_type', formData.unit_type) : ''}
                          sx={{
                            '& .MuiInputBase-root': {
                              borderRadius: 1,
                              fontSize: 14,
                              minHeight: 40,
                              backgroundColor: errors.unit_type ? '#fef2f2' : (formData.unit_type && !errors.unit_type) ? '#f0fdf4' : '#f9fafb',
                              '&.Mui-focused': {
                                backgroundColor: '#fff',
                              },
                            },
                            '& .MuiInputBase-input': {
                              padding: '8px 12px',
                              fontSize: 14,
                            },
                            '& .MuiFormHelperText-root': {
                              fontSize: 12,
                              marginTop: '4px',
                            },
                          }} 
                        />
                      )}
                    />
                  </div> */}

                  {/* Alamat */}
                  <div className="md:col-span-2">
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Masukkan alamat lengkap"
                      value={formData.alamat}
                      onChange={(e) => handleChange('alamat', e.target.value)}
                      error={errors.alamat}
                      helperText={errors.alamat ? getErrorMessage('alamat', formData.alamat) : ''}
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 1,
                          fontSize: 14,
                          backgroundColor: errors.alamat ? '#fef2f2' : (formData.alamat && !errors.alamat) ? '#f0fdf4' : '#f9fafb',
                          '&.Mui-focused': {
                            backgroundColor: '#fff',
                          },
                        },
                        '& .MuiInputBase-input': {
                          // padding: '8px 12px',
                          fontSize: 14,
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: 12,
                          marginTop: '4px',
                        },
                      }}
                    />
                  </div>

                  {/* Address Fields */}
                  <div className="md:col-span-2">
                    <div className="mb-4 text-sm font-medium text-gray-700">
                      Detail Alamat <span className="text-red-500">*</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Province */}
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Provinsi <span className="text-red-500">*</span>
                        </div>
                        <Autocomplete
                          size="small"
                          fullWidth
                          options={province}
                          getOptionLabel={(option) => option.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={province.find(p => p.id === formData.province_id) || null}
                          onChange={(_, newValue) => handleChange('province_id', newValue?.id || '')}
                          renderInput={(params) => (
                            <TextField 
                              {...params} 
                              placeholder="Pilih Provinsi"
                              sx={{
                                '& .MuiInputBase-root': {
                                  borderRadius: 1,
                                  fontSize: 14,
                                  minHeight: 40,
                                  backgroundColor: formData.province_id ? '#f0fdf4' : '#f9fafb',
                                  '&.Mui-focused': {
                                    backgroundColor: '#fff',
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  padding: '8px 12px',
                                  fontSize: 14,
                                },
                              }} 
                            />
                          )}
                        />
                      </div>

                      {/* City */}
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Kota/Kabupaten <span className="text-red-500">*</span>
                        </div>
                        <Autocomplete
                          size="small"
                          fullWidth
                          options={filteredCity}
                          getOptionLabel={(option) => option.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={filteredCity.find(c => c.id === formData.city_id) || null}
                          onChange={(_, newValue) => handleChange('city_id', newValue?.id || '')}
                          disabled={!formData.province_id}
                          renderInput={(params) => (
                            <TextField 
                              {...params} 
                              placeholder={formData.province_id ? "Pilih Kota/Kabupaten" : "Pilih Provinsi terlebih dahulu"}
                              sx={{
                                '& .MuiInputBase-root': {
                                  borderRadius: 1,
                                  fontSize: 14,
                                  minHeight: 40,
                                  backgroundColor: formData.city_id ? '#f0fdf4' : '#f9fafb',
                                  '&.Mui-focused': {
                                    backgroundColor: '#fff',
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  padding: '8px 12px',
                                  fontSize: 14,
                                },
                              }} 
                            />
                          )}
                        />
                      </div>

                      {/* Subdistrict */}
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Kecamatan <span className="text-red-500">*</span>
                        </div>
                        <Autocomplete
                          size="small"
                          fullWidth
                          options={filteredSubdistrict}
                          getOptionLabel={(option) => option.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={filteredSubdistrict.find(s => s.id === formData.subdistrict_id) || null}
                          onChange={(_, newValue) => handleChange('subdistrict_id', newValue?.id || '')}
                          disabled={!formData.city_id}
                          renderInput={(params) => (
                            <TextField 
                              {...params} 
                              placeholder={formData.city_id ? "Pilih Kecamatan" : "Pilih Kota/Kabupaten terlebih dahulu"}
                              sx={{
                                '& .MuiInputBase-root': {
                                  borderRadius: 1,
                                  fontSize: 14,
                                  minHeight: 40,
                                  backgroundColor: formData.subdistrict_id ? '#f0fdf4' : '#f9fafb',
                                  '&.Mui-focused': {
                                    backgroundColor: '#fff',
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  padding: '8px 12px',
                                  fontSize: 14,
                                },
                              }} 
                            />
                          )}
                        />
                      </div>

                      {/* Village */}
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Desa/Kelurahan <span className="text-red-500">*</span>
                        </div>
                        <Autocomplete
                          size="small"
                          fullWidth
                          options={filteredVillage}
                          getOptionLabel={(option) => option.name || ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          value={filteredVillage.find(v => v.id === formData.village_id) || null}
                          onChange={(_, newValue) => handleChange('village_id', newValue?.id || '')}
                          disabled={!formData.subdistrict_id}
                          renderInput={(params) => (
                            <TextField 
                              {...params} 
                              placeholder={formData.subdistrict_id ? "Pilih Desa/Kelurahan" : "Pilih Kecamatan terlebih dahulu"}
                              sx={{
                                '& .MuiInputBase-root': {
                                  borderRadius: 1,
                                  fontSize: 14,
                                  minHeight: 40,
                                  backgroundColor: formData.village_id ? '#f0fdf4' : '#f9fafb',
                                  '&.Mui-focused': {
                                    backgroundColor: '#fff',
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  padding: '8px 12px',
                                  fontSize: 14,
                                },
                              }} 
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="md:col-span-2 border-t border-gray-200 mt-6">
                  <div className="mb-4 mt-5 text-sm font-semibold text-gray-700">
                    Upload Dokumen Pendukung
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProgram?.category_array
                      ?.filter((category: any) => category.type === 'doc' && category.is_used)
                      ?.map((category: any, index: number) => {
                        const getDocumentLabel = (label: string) => {
                          const labelMap: { [key: string]: string } = {
                            'formulir_permohonan_sewa_hunian': 'Formulir Permohonan Sewa Hunian',
                            'surat_kebenaran_data_dan_keabsahan_dokumen': 'Surat Kebenaran Data dan Keabsahan Dokumen',
                            'dokumen_ktp': 'Dokumen KTP',
                            'dokumen_kk': 'Dokumen Kartu Keluarga',
                            'surat_rekomendasi_instansi': 'Surat Rekomendasi Instansi',
                            'surat_keterangan_penghasilan': 'Surat Keterangan Penghasilan',
                            'surat_keterangan_belum_memiliki_rumah': 'Surat Keterangan Belum Memiliki Rumah'
                          };
                          return labelMap[label] || label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        };

                        return (
                          <div key={index}>
                            <div className="mb-2 text-sm font-medium text-gray-700">
                              {getDocumentLabel(category.label)} <span className="text-red-500">*</span>
                            </div>
                            <UploadFile
                              onUploaded={(result: any) => {
                                setUploadedFiles(prev => ({ ...prev, [category.label]: result }))
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    sx={{
                      fontSize: 16,
                      textTransform: 'none',
                      borderRadius: 2,
                      minHeight: 48,
                      minWidth: 200,
                      backgroundColor: '#f8971d',
                      '&:hover': {
                        backgroundColor: '#e8850a',
                      },
                      '&:disabled': {
                        backgroundColor: '#d1d5db',
                      },
                    }}
                  >
                    {isLoading ? 'Mengirim...' : 'Kirim Pengajuan'}
                  </Button>
                </div>
              </>
            )}

            {/* Message when no program is selected */}
            {!selectedProgram && (
              <div className="flex justify-center items-center my-16">
                <div>
                  <Image src="/info.svg" alt="no-category" width={500} height={500} />
                  <div className="text-center flex flex-col items-center mt-4">
                    <div className="text-black text-lg font-medium mb-2">
                      Pilih program terlebih dahulu
                    </div>
                    <div className="text-gray-400 text-sm">
                      Form akan muncul setelah Anda memilih program
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}