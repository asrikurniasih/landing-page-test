"use client";

import Image from "next/image";
import { useState } from "react";
import { TextField, Button } from '@mui/material';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });

  // Validation functions
  const validateField = (field: string, value: any) => {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    
    switch (field) {
      case 'name':
        return value.trim().length < 3;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value);
      case 'phone':
        // Validasi nomor telepon Indonesia: 08xx-xxxx-xxxx atau +628xx-xxxx-xxxx
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        return !phoneRegex.test(value.replace(/\s/g, ''));
      case 'message':
        return value.trim().length < 10;
      default:
        return false;
    }
  };

  const getErrorMessage = (field: string, value?: any) => {
    if (value === '' || value === null || value === undefined) {
      switch (field) {
        case 'name':
          return 'Nama wajib diisi';
        case 'email':
          return 'Email wajib diisi';
        case 'phone':
          return 'Nomor telepon wajib diisi';
        case 'message':
          return 'Pesan wajib diisi';
        default:
          return `${field.charAt(0).toUpperCase() + field.slice(1)} wajib diisi`;
      }
    }
    
    switch (field) {
      case 'name':
        return 'Nama minimal 3 karakter';
      case 'email':
        return 'Format email tidak valid';
      case 'phone':
        return 'Format nomor telepon tidak valid. Gunakan format: 08xx-xxxx-xxxx atau +628xx-xxxx-xxxx';
      case 'message':
        return 'Pesan minimal 10 karakter';
      default:
        return `${field.charAt(0).toUpperCase() + field.slice(1)} tidak valid`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation for specific fields
    if (['name', 'email', 'phone', 'message'].includes(name)) {
      const isValid = !validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: !isValid }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const validationErrors: any = {};
    
    Object.keys(formData).forEach(field => {
      const value = formData[field as keyof typeof formData];
      const isValid = validateField(field, value);
      if (isValid) {
        validationErrors[field] = true;
      }
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({ name: false, email: false, phone: false, message: false });
  };

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-sm font-medium">Hubungi Kami</span>
              </div>
              
              <div className="text-2xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Kontak 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  & Bantuan
                </span>
              </div>
              
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Punya pertanyaan atau ingin berdiskusi lebih lanjut? 
                <span className="block mt-2 text-white/80">
                  Tim customer service kami siap membantu Anda 24/7.
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Hubungi Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hubungi kami melalui:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Email Contact */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Kirim email kepada kami untuk pertanyaan umum atau informasi lebih lanjut.
              </p>
              <a 
                href="mailto:namaemail@domain.com" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                namaemail@domain.com
              </a>
            </div>

            {/* WhatsApp Contact */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Chat langsung dengan tim kami untuk mendapatkan respons cepat.
              </p>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <span className="mr-2">Klik untuk Chat</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Formulir Kontak
            </h2>
            <p className="text-lg text-gray-600">
              Atau isi formulir di bawah ini, tim kami akan segera menghubungi Anda.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-0 p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Lengkap */}
                <div className="md:col-span-2">
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </div>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={handleInputChange}
                    name="name"
                    required
                    error={errors.name}
                    helperText={errors.name ? getErrorMessage('name', formData.name) : ''}
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        fontSize: 14,
                        minHeight: 40,
                        backgroundColor: errors.name ? '#fef2f2' : (formData.name && !errors.name) ? '#f0fdf4' : '#f9fafb',
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
                    type="email"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    required
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

                {/* Phone Number - Adding a phone field to match pengajuan form structure */}
                <div>
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </div>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Masukkan nomor telepon"
                    value={formData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    error={errors.phone}
                    helperText={errors.phone ? getErrorMessage('phone', formData.phone) : 'Contoh: 08123456789 atau +628123456789'}
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        fontSize: 14,
                        minHeight: 40,
                        backgroundColor: errors.phone ? '#fef2f2' : (formData.phone && !errors.phone) ? '#f0fdf4' : '#f9fafb',
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

                {/* Pesan */}
                <div className="md:col-span-2">
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Pesan Anda <span className="text-red-500">*</span>
                  </div>
                  <TextField
                    size="small"
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    value={formData.message}
                    onChange={handleInputChange}
                    name="message"
                    required
                    error={errors.message}
                    helperText={errors.message ? getErrorMessage('message', formData.message) : ''}
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        fontSize: 14,
                        backgroundColor: errors.message ? '#fef2f2' : (formData.message && !errors.message) ? '#f0fdf4' : '#f9fafb',
                        '&.Mui-focused': {
                          backgroundColor: '#fff',
                        },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: 12,
                        marginTop: '4px',
                      },
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
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
                  }}
                >
                  Kirim Pesan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-2 shadow-2xl">
                <Image
                  src="/foto-bangunan/gedung-dari-bawah.jpeg"
                  alt="Rusun Pasar Jaya"
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Tim Kami Siap Membantu
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tim customer service kami beroperasi dari Senin hingga Jumat, pukul 08:00 - 17:00 WIB. 
                Kami berkomitmen untuk merespons setiap pertanyaan dan permintaan Anda dengan cepat dan profesional.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Respons cepat dalam 24 jam</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Konsultasi gratis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Bantuan lengkap dari awal hingga akhir</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
