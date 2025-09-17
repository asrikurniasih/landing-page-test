"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function UnitPage() {
  const [selectedUnit, setSelectedUnit] = useState<{
    id: string;
    name: string;
    size: string;
    bedrooms: number;
    bathrooms: number;
    features: string[];
    images: string[];
    denah: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unitTypes = [
    {
      id: 'standar',
      name: 'Unit Tipe Standar',
      size: '36m²',
      bedrooms: 1,
      bathrooms: 1,
      features: ['1 Kamar Tidur', '1 Kamar Mandi', 'Dapur & Ruang Tamu', 'Balkon', 'Luas 36m²'],
      images: ['/foto-unit/kamar.jpeg', '/foto-unit/ruang-tamu.jpeg', '/foto-unit/dapur.jpeg', '/foto-unit/kamar-mandi.jpeg'],
      denah: '/foto-unit/STANDART-36m2.png'
    },
    {
      id: 'hook1',
      name: 'Unit Tipe Hook 1',
      size: '38m²',
      bedrooms: 2,
      bathrooms: 1,
      features: ['2 Kamar Tidur', '1 Kamar Mandi', 'Dapur, Ruang Tamu & Gudang', 'Balkon', 'Luas 38m²'],
      images: ['/foto-unit/kamar.jpeg', '/foto-unit/kamar-2.jpeg', '/foto-unit/ruang-tamu.jpeg', '/foto-unit/dapur.jpeg', '/foto-unit/gudang.jpeg', '/foto-unit/kamar-mandi.jpeg'],
      denah: '/foto-unit/HOOK-1-38m2.png'
    },
    {
      id: 'hook2',
      name: 'Unit Tipe Hook 2',
      size: '38m²',
      bedrooms: 2,
      bathrooms: 1,
      features: ['2 Kamar Tidur', '1 Kamar Mandi', 'Dapur, Ruang Tamu & Gudang', 'Balkon', 'Luas 38m²'],
      images: ['/foto-unit/kamar.jpeg', '/foto-unit/kamar-2.jpeg', '/foto-unit/ruang-tamu.jpeg', '/foto-unit/dapur.jpeg', '/foto-unit/gudang.jpeg', '/foto-unit/kamar-mandi.jpeg'],
      denah: '/foto-unit/HOOK-2-38m2.png'
    }
  ];

  const openModal = (unitType: {
    id: string;
    name: string;
    size: string;
    bedrooms: number;
    bathrooms: number;
    features: string[];
    images: string[];
    denah: string;
  }) => {
    console.log('Opening modal for unit:', unitType);
    setSelectedUnit(unitType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedUnit(null);
  };

  // Debug useEffect
  useEffect(() => {
    console.log('Modal state changed:', { isModalOpen, selectedUnit });
  }, [isModalOpen, selectedUnit]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image
            src="/foto-bangunan/gedung-4.jpeg"
            alt="Rusunawa Pasar Rumput"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
              Tipe Unit Rusunawa
            </h1>
            <p className="text-sm lg:text-base text-white max-w-3xl mx-auto leading-relaxed">
             Pilih tipe unit yang sesuai dengan kebutuhan Anda di Rusunawa Pasar Jaya
            </p>
          </div>
        </div>
      </section>

      {/* Unit Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pilihan Unit Tersedia</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Setiap unit dirancang dengan baik untuk memberikan kenyamanan maksimal bagi penghuni
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Unit Type 1 - Standar */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-56 relative">
                <Image
                  src="/foto-unit/ruang-tamu.jpeg"
                  alt="Unit Tipe Standar"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg" style={{backgroundColor: '#09893c'}}>
                  Tipe Standar
                </div>
                <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-bold bg-black/50">
                  36m²
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Unit Tipe Standar</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">1 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Dapur & Ruang Tamu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Balkon</span>
                  </div>
                </div>
                <button 
                  className="w-full text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer font-semibold" 
                  style={{backgroundColor: '#f8971d'}} 
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e8850a'} 
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8971d'}
                  onClick={() => openModal(unitTypes[0])}
                >
                  Lihat Detail
                </button>
              </div>
            </div>
            
            {/* Unit Type 2 - Hook 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-56 relative">
                <Image
                  src="/foto-unit/kamar.jpeg"
                  alt="Unit Tipe Hook 1"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg" style={{backgroundColor: '#f8971d'}}>
                  Tipe Hook 1
                </div>
                <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-bold bg-black/50">
                  38m²
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Unit Tipe Hook 1</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">2 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Dapur, Ruang Tamu & Gudang</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Balkon</span>
                  </div>
                </div>
                <button 
                  className="w-full text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer font-semibold" 
                  style={{backgroundColor: '#f8971d'}} 
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e8850a'} 
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8971d'}
                  onClick={() => openModal(unitTypes[1])}
                >
                  Lihat Detail
                </button>
              </div>
            </div>
            
            {/* Unit Type 3 - Hook 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-56 relative">
                <Image
                  src="/foto-unit/kamar-2.jpeg"
                  alt="Unit Tipe Hook 2"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg" style={{backgroundColor: '#f8971d'}}>
                  Tipe Hook 2
                </div>
                <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-bold bg-black/50">
                  38m²
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Unit Tipe Hook 2</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">2 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Dapur, Ruang Tamu & Gudang</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Balkon</span>
                  </div>
                </div>
                <button 
                  className="w-full text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer font-semibold" 
                  style={{backgroundColor: '#f8971d'}} 
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e8850a'} 
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8971d'}
                  onClick={() => openModal(unitTypes[2])}
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Fasilitas & Keunggulan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nikmati berbagai fasilitas dan keunggulan yang tersedia di Rusunawa Pasar Jaya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Unit Berkualitas</h3>
              <p className="text-sm text-gray-600">Unit dengan desain modern dan fasilitas lengkap untuk kenyamanan maksimal</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Harga Terjangkau</h3>
              <p className="text-sm text-gray-600">Harga sewa yang kompetitif dan terjangkau untuk semua kalangan</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Lokasi Strategis</h3>
              <p className="text-sm text-gray-600">Berada di lokasi strategis dengan akses mudah ke berbagai fasilitas</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Dukungan 24/7</h3>
              <p className="text-sm text-gray-600">Tim customer service siap membantu Anda kapan saja</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Detail Modal */}
      {isModalOpen && selectedUnit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-3 border-b">
              <div>
                <div className="text-xl font-bold text-gray-800">{selectedUnit?.name} ({selectedUnit?.size})</div>
              </div>
              <button 
                onClick={closeModal}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-0"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Side - Denah */}
                <div className="xl:col-span-1">
                  <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 h-full">
                    <Image
                      src={selectedUnit?.denah}
                      alt={`Denah ${selectedUnit?.name}`}
                      fill
                      className="object-contain bg-gray-50"
                    />
                  </div>
                </div>

                {/* Middle - Images Gallery */}
                <div className="xl:col-span-1">
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative h-64 rounded-xl overflow-hidden shadow-sm">
                      <Image
                        src={selectedUnit?.images[0]}
                        alt={`${selectedUnit?.name} - Main Image`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    <div className="grid grid-cols-4 gap-2">
                      {selectedUnit?.images.slice(1, 5).map((image: string, index: number) => (
                        <div key={index} className="relative h-20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                          <Image
                            src={image}
                            alt={`${selectedUnit?.name} - Thumbnail ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="xl:col-span-1 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedUnit?.name} ({selectedUnit?.size})</h3>
                    <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                    
                    <div className="space-y-3">
                      {selectedUnit?.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
