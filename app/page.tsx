"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
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

  const openModal = (unitType: any) => {
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
      <Header />

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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tipe Unit Rusunawa</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih tipe unit yang sesuai dengan kebutuhan Anda di Rusunawa Pasar Jaya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Unit Type 1 - Standar */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 relative">
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
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unit Tipe Standar (36m²)</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">1 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Dapur & Ruang Tamu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Balkon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Luas 36m²</span>
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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 relative">
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
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unit Tipe Hook 1 (38m²)</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">2 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Dapur, Ruang Tamu & Gudang</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Balkon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Luas 38m²</span>
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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 relative">
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
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unit Tipe Hook 2 (38m²)</h3>
                <p className="text-gray-600 mb-4">Rusunawa Pasar Jaya, Jakarta</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">2 Kamar Tidur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">1 Kamar Mandi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Dapur, Ruang Tamu & Gudang</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Balkon</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#09893c'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Luas 38m²</span>
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

      {/* Let's See What You Are Looking For Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              MARI LIHAT APA YANG ANDA CARI
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Buy a Home */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Beli Rumah</h3>
                <p className="text-gray-600 text-sm mb-4">Temukan rumah impian Anda dengan berbagai pilihan terbaik</p>
                <a href="#" className="text-orange-500 font-medium flex items-center">
                  Temukan Rumah Anda
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              {/* Rent a Home */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sewa Rumah</h3>
                <p className="text-gray-600 text-sm mb-4">Temukan properti sewa dengan harga terjangkau</p>
                <a href="#" className="text-orange-500 font-medium flex items-center">
                  Temukan Rumah Anda
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              {/* Sell a Home */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Jual Rumah</h3>
                <p className="text-gray-600 text-sm mb-4">Jual properti Anda dengan harga terbaik</p>
                <a href="#" className="text-orange-500 font-medium flex items-center">
                  Temukan Rumah Anda
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right Illustration */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500 rounded-lg mx-auto mb-4"></div>
                  <p className="text-gray-600">Platform Terpercaya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Properties Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gray-100 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Properti Sekitar</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Property 1 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Gedung Modern</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">216 Jakarta Pusat</span>
              </div>
            </div>
            
            {/* Property 2 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Apartemen</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">141 Surabaya</span>
              </div>
            </div>
            
            {/* Property 3 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Rusunawa</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">212 Bandung</span>
              </div>
            </div>
            
            {/* Property 4 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Kawasan</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">183 Medan</span>
              </div>
            </div>
            
            {/* Property 5 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-teal-200 to-teal-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Residensial</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">112 Yogyakarta</span>
              </div>
            </div>
            
            {/* Property 6 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Kompleks</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">95 Semarang</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Renting Made Easy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Sewa Jadi Mudah untuk Penghuni dan Pengelola Properti
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Advertise Your Rental */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Iklankan Sewa Anda</h3>
              <p className="text-gray-600 mb-6">
                Terhubung dengan penyewa menggunakan platform pemasaran kami yang canggih. 
                Dapatkan visibilitas maksimal untuk properti Anda.
              </p>
              <a href="#" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                Daftarkan Properti Anda
              </a>
              <div className="mt-8">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-lg mx-auto mb-4"></div>
                    <p className="text-gray-600">Gedung Apartemen</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Lease 100% Online */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sewa 100% Online</h3>
              <p className="text-gray-600 mb-6">
                Terima aplikasi, proses pembayaran, dan tanda tangani sewa digital. 
                Semua proses dapat dilakukan secara online dengan mudah dan aman.
              </p>
              <a href="#" className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                Kelola Properti Anda
              </a>
              <div className="mt-8">
                <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-teal-500 rounded-lg mx-auto mb-4"></div>
                    <p className="text-gray-600">Rusunawa Modern</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Sewa memang bagus, tapi mungkin Anda berpikir untuk membeli rumah. Kami ingin Anda menemukan tempat yang tepat. 
              Itulah mengapa platform kami dirancang untuk membantu Anda menemukan rumah impian, bahkan jika Anda pembeli pertama kali.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">260+</div>
              <div className="text-gray-600">Total Konstruksi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">110+</div>
              <div className="text-gray-600">Review Agen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">190+</div>
              <div className="text-gray-600">Apartemen Terjual</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">560+</div>
              <div className="text-gray-600">Total Penjualan</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

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
