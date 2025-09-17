"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
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
  
  const bannerSlides = [
    {
      type: "full-image",
      src: "/foto-bangunan/gedung-2.jpeg",
      alt: "Rusunawa Pasar Rumput",
      title: "Rusunawa Pasar Rumput",
      description: "Hunian Berkualitas dengan Fasilitas Lengkap untuk Masyarakat Jakarta"
    },
    {
      type: "image-left-text-right",
      src: "/foto-bangunan/gedung.jpeg",
      alt: "Rusunawa Pasar Jaya",
      title: "Rusunawa Pasar Jaya",
      description: "Rumah Susun Sewa Terjangkau di Jakarta - Dikelola Perumda Pasar Jaya"
    },
    {
      type: "text-left-image-right",
      src: "/foto-bangunan/gedung-3.jpeg",
      alt: "Hunian Terjangkau Jakarta",
      title: "Hunian Terjangkau Jakarta",
      description: "Solusi Perumahan untuk Masyarakat Jakarta dengan Harga Sewa Terjangkau"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      {/* Hero Slider Banner */}
      <section className="relative h-[600px] overflow-hidden bg-white">
        {/* Background Images - Only for full-image slide */}
        <div className="absolute inset-0">
          {bannerSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide && slide.type === "full-image" ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.type === "full-image" && (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={() => console.error('Error loading image:', slide.src)}
                  onLoad={() => console.log('Image loaded successfully:', slide.src)}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {bannerSlides[currentSlide].type === "image-left-text-right" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left - Image */}
                <div className="order-2 lg:order-1">
                  <div className="bg-white rounded-2xl p-2 shadow-2xl">
                    <Image
                      src={bannerSlides[currentSlide].src}
                      alt={bannerSlides[currentSlide].alt}
                      width={800}
                      height={600}
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  </div>
                </div>
                
                {/* Right - Content */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    {bannerSlides[currentSlide].title}
                  </h1>
                  <p className="text-md lg:text-ld text-gray-600 mb-8 leading-relaxed">
                    {/* {bannerSlides[currentSlide].description} */}
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                  
                  {/* CTA Buttons */}
                  {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl" style={{backgroundColor: '#f8971d'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e8850a'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8971d'}>
                      Lihat Unit
                    </button>
                    <button className="border-2 px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg" style={{borderColor: '#09893c', color: '#09893c'}} onMouseEnter={(e) => {(e.target as HTMLButtonElement).style.backgroundColor = '#09893c'; (e.target as HTMLButtonElement).style.color = 'white'}} onMouseLeave={(e) => {(e.target as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.target as HTMLButtonElement).style.color = '#09893c'}}>
                      Daftar Sewa
                    </button>
                  </div> */}
                </div>
              </div>
            )}

            {bannerSlides[currentSlide].type === "text-left-image-right" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left - Content */}
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    {bannerSlides[currentSlide].title}
                  </h1>
                  <p className="text-md lg:text-ld text-gray-600 mb-8 leading-relaxed">
                    {/* {bannerSlides[currentSlide].description} */}
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                  
                  {/* CTA Buttons */}
                  {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl" style={{backgroundColor: '#f8971d'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e8850a'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8971d'}>
                      Lihat Unit
                    </button>
                    <button className="border-2 px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg" style={{borderColor: '#09893c', color: '#09893c'}} onMouseEnter={(e) => {(e.target as HTMLButtonElement).style.backgroundColor = '#09893c'; (e.target as HTMLButtonElement).style.color = 'white'}} onMouseLeave={(e) => {(e.target as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.target as HTMLButtonElement).style.color = '#09893c'}}>
                      Daftar Sewa
                    </button>
                  </div> */}
                </div>
                
                {/* Right - Image */}
                <div className="order-first lg:order-last">
                  <div className="bg-white rounded-2xl p-2 shadow-2xl">
                    <Image
                      src={bannerSlides[currentSlide].src}
                      alt={bannerSlides[currentSlide].alt}
                      width={800}
                      height={600}
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white p-3 rounded-full transition-all"
          style={{backgroundColor: '#09893c', opacity: 0.8}}
          onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '1'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '0.8'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white p-3 rounded-full transition-all"
          style={{backgroundColor: '#09893c', opacity: 0.8}}
          onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '1'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '0.8'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'scale-125' 
                  : 'hover:opacity-75'
              }`}
              style={{
                backgroundColor: index === currentSlide ? '#f8971d' : '#09893c',
                opacity: index === currentSlide ? '1' : '0.5'
              }}
            />
          ))}
        </div>
        
        {/* Slide Counter */}
        {/* <div className="absolute bottom-8 right-8 z-20 bg-gray-800 bg-opacity-80 text-white px-4 py-2 rounded-full text-sm">
          {currentSlide + 1} / {bannerSlides.length}
        </div> */}
      </section>

      {/* Unit Types Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Tipe Unit Rusunawa</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Pilih tipe unit yang sesuai dengan kebutuhan Anda di Rusunawa Pasar Jaya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Unit Type 1 - Standar */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="/foto-unit/ruang-tamu.jpeg"
                  alt="Unit Tipe Standar"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg" style={{backgroundColor: '#09893c'}}>
                  Tipe Standar
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Unit Tipe Standar (36m²)</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">1 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Dapur & Ruang Tamu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Balkon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Luas 36m²</span>
                  </div>
                </div>
                <button 
                  className="w-full text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer" 
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="/foto-unit/kamar.jpeg"
                  alt="Unit Tipe Hook 1"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg" style={{backgroundColor: '#f8971d'}}>
                  Tipe Hook 1
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Unit Tipe Hook 1 (38m²)</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">2 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Dapur, Ruang Tamu & Gudang</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Balkon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Luas 38m²</span>
                  </div>
                </div>
                <button 
                  className="w-full text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer" 
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="/foto-unit/kamar-2.jpeg"
                  alt="Unit Tipe Hook 2"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg" style={{backgroundColor: '#f8971d'}}>
                  Tipe Hook 2
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Unit Tipe Hook 2 (38m²)</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">2 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Dapur, Ruang Tamu & Gudang</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Balkon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-600">Luas 38m²</span>
                  </div>
                </div>
                <button 
                  className="w-full text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer" 
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

      {/* Complete Service Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-3xl font-bold text-gray-900 mb-2">
             Mari Lihat Apa yang Anda Cari
            </div>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Apakah Anda sedang mencari hunian yang cocok untuk Anda dan keluarga? Rusunawa Pasar Jaya punya berbagai opsi yang bisa disesuaikan dengan kebutuhan dan anggaran Anda.
            </p>
          </div>
          
          {/* Service Options - 3 Cards Layout */}
          <div className="mb-12">

            {/* Sewa Rumah */}
            <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src="/foto-bangunan/gedung.jpeg"
                    alt="Gedung Rusunawa"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Text Section */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="w-16 h-16 bg-green-100 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sewa Rumah</h3>
                  <p className="text-gray-600 mb-6 text-base">
                    Unit sewa dengan biaya terjangkau, fleksibilitas kontrak, fasilitas lengkap. Ideal jika Anda belum siap membeli atau ingin mencoba tinggal di area tertentu dulu.
                  </p>
                  <button className="text-green-600 font-semibold hover:text-green-700 transition-colors text-left">
                    Temukan Rumah Anda →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* How to Get Started Section */}
          {/* <div className="bg-gray-50 p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bagaimana cara memulai?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-orange-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Pilih Kategori</h4>
                  <p className="text-xs text-gray-600">Pilih kategori yang paling sesuai dengan kebutuhan Anda di atas (Beli / Sewa / Jual).</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Klik Tombol</h4>
                  <p className="text-xs text-gray-600">Klik tombol "Temukan Rumah Anda" pada kategori yang Anda pilih.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Dapatkan Bantuan</h4>
                  <p className="text-xs text-gray-600">Tim kami akan membantu Anda dengan informasi detail, foto unit, dan proses berikutnya.</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Why Choose Us Section */}
          <div className="bg-gray-50 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Kenapa Memilih Kami?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Platform Terpercaya</h4>
                <p className="text-sm text-gray-600">Kami sudah membantu banyak penghuni menemukan hunian yang tepat dan agen properti menjual propertinya.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Semua dalam Genggaman</h4>
                <p className="text-sm text-gray-600">Dari pencarian awal, pengajuan aplikasi, hingga kontrak, semuanya bisa dilakukan online.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Dukungan Penuh</h4>
                <p className="text-sm text-gray-600">Kami siap membantu tiap langkahnya: dari konsultasi, melihat unit, hingga proses legal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Made Easy Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              Sewa Jadi Mudah untuk Penghuni dan Pengelola Properti
            </div>
            <p className="text-base text-gray-600 max-w-4xl mx-auto">
              Nikmati proses sewa yang praktis, transparan, dan aman. Baik Anda seorang penghuni yang mencari hunian nyaman, atau pengelola properti yang ingin mengelola unit lebih efisien — semuanya bisa dilakukan dalam satu platform.
            </p>
          </div>
          
          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Top Left - Text - Untuk Penghuni */}
            <div className="flex flex-col justify-center p-8 px-0">
              <div className="flex items-center mb-4">
                <h3 className="text-[18px] font-bold text-gray-900">
                  Untuk Penghuni
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Cari & Temukan Cepat</h4>
                  <p className="text-[14px] text-gray-600">Akses ratusan unit sesuai kebutuhan dan anggaran.</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Proses Online</h4>
                  <p className="text-[14px] text-gray-600">Dari pengajuan, pembayaran, hingga kontrak, semua tanpa ribet.</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Aman & Terpercaya</h4>
                  <p className="text-[14px] text-gray-600">Data dan transaksi Anda dijamin aman.</p>
                </div>
              </div>
            </div>

            {/* Top Right - Image */}
            <div className="relative border border-gray-200">
              <Image
                src="/foto-bangunan/gedung-2.jpeg"
                alt="Gedung Rusunawa"
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Bottom Left - Composite Image */}
            <div className="relative border border-gray-200">
              <Image
                src="/foto-bangunan/gedung-3.jpeg"
                alt="Gedung Rusunawa"
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Bottom Right - Text - Untuk Pengelola Properti */}
            <div className="flex flex-col justify-center p-8">
              <div className="flex items-center mb-4">
                <h3 className="text-[18px] font-bold text-gray-900">
                  Untuk Pengelola Properti
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Manajemen Mudah</h4>
                  <p className="text-[14px] text-gray-600">Pantau unit, sewa, dan penghuni dalam satu dashboard.</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Pembayaran Tepat Waktu</h4>
                  <p className="text-[14px] text-gray-600">Sistem otomatis memudahkan proses penagihan.</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Eksposur Luas</h4>
                  <p className="text-[14px] text-gray-600">Unit Anda mudah ditemukan calon penyewa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}

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
