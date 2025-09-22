"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Banner type definition
// - Image: Full background image with optional overlay text
// - ImageText: Image on left, text content on right
// - TextImage: Text content on left, image on right
interface BannerSlide {
  id?: string;
  mode: 'Image' | 'ImageText' | 'TextImage';
  src: string;
  alt: string;
  title: string;
  description?: string;
  link?: string;
  buttonText?: string;
  isActive?: boolean;
}

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
  const [bannerSlides, setBannerSlides] = useState<BannerSlide[]>([]);
  const [isLoadingBanner, setIsLoadingBanner] = useState(true);

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

  // Fetch banner data from API
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setIsLoadingBanner(true);
        const response = await fetch('/api/banner');
        const data = await response.json();
        
        if (data.results && data.results.data && Array.isArray(data.results.data)) {
          // Map API data to BannerSlide format
          const mappedSlides: BannerSlide[] = data.results.data
            .filter((item: any) => item.isActive !== false) // Only show active banners
            .map((item: any) => ({
              id: item.id,
              mode: item.mode || 'Image', // Default to 'Image' if type not specified
              src: item.image_url || '/foto-bangunan/gedung-2.jpeg',
              alt: item.alt || item.title || 'Banner Image',
              title: item.title || 'Default Title',
              description: item.description || '',
              link: item.link,
              buttonText: item.buttonText,
              isActive: item.isActive !== false
            }));
          
          setBannerSlides(mappedSlides);
        } else {
          // Fallback to default slides if API fails
          setBannerSlides([
            {
              mode: "Image",
              src: "/foto-bangunan/gedung-2.jpeg",
              alt: "Rusun Pasar Rumput",
              title: "Rusun Pasar Rumput",
              description: "Hunian Berkualitas dengan Fasilitas Lengkap untuk Masyarakat Jakarta"
            },
            {
              mode: "ImageText",
              src: "/foto-bangunan/gedung.jpeg",
              alt: "Rusun Pasar Jaya",
              title: "Rusun Pasar Jaya",
              description: "Rumah Susun Sewa Terjangkau di Jakarta - Dikelola Perumda Pasar Jaya"
            },
            {
              mode: "TextImage",
              src: "/foto-bangunan/gedung-3.jpeg",
              alt: "Hunian Terjangkau Jakarta",
              title: "Hunian Terjangkau Jakarta",
              description: "Solusi Perumahan untuk Masyarakat Jakarta dengan Harga Sewa Terjangkau"
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
        // Fallback to default slides on error
        setBannerSlides([
          {
            mode: "Image",
            src: "/foto-bangunan/gedung-2.jpeg",
            alt: "Rusun Pasar Rumput",
            title: "Rusun Pasar Rumput",
            description: "Hunian Berkualitas dengan Fasilitas Lengkap untuk Masyarakat Jakarta"
          },
          {
            mode: "ImageText",
            src: "/foto-bangunan/gedung.jpeg",
            alt: "Rusun Pasar Jaya",
            title: "Rusun Pasar Jaya",
            description: "Rumah Susun Sewa Terjangkau di Jakarta - Dikelola Perumda Pasar Jaya"
          },
          {
            mode: "TextImage",
            src: "/foto-bangunan/gedung-3.jpeg",
            alt: "Hunian Terjangkau Jakarta",
            title: "Hunian Terjangkau Jakarta",
            description: "Solusi Perumahan untuk Masyarakat Jakarta dengan Harga Sewa Terjangkau"
          }
        ]);
      } finally {
        setIsLoadingBanner(false);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    if (bannerSlides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [bannerSlides.length]);

  // Reset currentSlide if it exceeds bannerSlides length
  useEffect(() => {
    if (bannerSlides.length > 0 && currentSlide >= bannerSlides.length) {
      setCurrentSlide(0);
    }
  }, [bannerSlides.length, currentSlide]);

  const nextSlide = () => {
    if (bannerSlides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }
  };

  const prevSlide = () => {
    if (bannerSlides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    }
  };

  const goToSlide = (index: number) => {
    if (bannerSlides.length > 0 && index >= 0 && index < bannerSlides.length) {
      setCurrentSlide(index);
    }
  };

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const buildingImages = [
    "/foto-bangunan/gedung-2.jpeg",
    "/foto-bangunan/gedung-3.jpeg",
    "/foto-bangunan/gedung-4.jpeg",
    "/foto-bangunan/gedung.jpeg",
    "/foto-bangunan/gedung-dari-bawah.jpeg",
    "/foto-bangunan/proses-pembangunan-gedung.jpeg",
    "/foto-bangunan/proses-pembangunan-gedung-2.jpeg",
    "/foto-bangunan/proses-pembangunan-gedung-3.jpeg",
    "/foto-bangunan/proses-pembangunan-gedung-4.jpeg",
    "/foto-bangunan/proses-pembangunan-gedung-5.jpeg",
    "/foto-bangunan/proses-pembangunan-gedung-6.jpeg",
    "/foto-bangunan/proses-pembangunan-gedung-7.jpeg",
    // "/foto-bangunan/proses-pembangunan-gedung-8.jpeg"
  ];

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % buildingImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + buildingImages.length) % buildingImages.length);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      {/* Hero Slider Banner */}
      <section className="relative h-[600px] overflow-hidden bg-white">
        {/* Background Images - Only for Image type slide */}
        <div className="absolute inset-0">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide && slide.mode === "Image" ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.mode === "Image" && (
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
            {isLoadingBanner && (
              <div className="flex justify-center items-center h-full">
                <div className="text-gray-600">Memuat banner...</div>
              </div>
            )}
            
            {!isLoadingBanner && bannerSlides.length > 0 && bannerSlides[currentSlide].mode === "ImageText" && (
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
                    {bannerSlides[currentSlide].description || 
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                    }
                  </p>
                  
                  {/* CTA Buttons */}
                  {bannerSlides[currentSlide].link && bannerSlides[currentSlide].buttonText && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <a 
                        href={bannerSlides[currentSlide].link}
                        className="text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl text-center"
                        style={{backgroundColor: '#f8971d'}}
                        onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#e8850a'}
                        onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#f8971d'}
                      >
                        {bannerSlides[currentSlide].buttonText}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isLoadingBanner && bannerSlides.length > 0 && bannerSlides[currentSlide].mode === "TextImage" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left - Content */}
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    {bannerSlides[currentSlide].title}
                  </h1>
                  <p className="text-md lg:text-ld text-gray-600 mb-8 leading-relaxed">
                    {bannerSlides[currentSlide].description || 
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                    }
                  </p>
                  
                  {/* CTA Buttons */}
                  {bannerSlides[currentSlide].link && bannerSlides[currentSlide].buttonText && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <a 
                        href={bannerSlides[currentSlide].link}
                        className="text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl text-center"
                        style={{backgroundColor: '#f8971d'}}
                        onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#e8850a'}
                        onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#f8971d'}
                      >
                        {bannerSlides[currentSlide].buttonText}
                      </a>
                    </div>
                  )}
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

            {/* For Image type slides, show overlay content if available */}
            {!isLoadingBanner && bannerSlides.length > 0 && bannerSlides[currentSlide].mode === "Image" && (bannerSlides[currentSlide].title || bannerSlides[currentSlide].description) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  {/* <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                    {bannerSlides[currentSlide].title}
                  </h1>
                  {bannerSlides[currentSlide].description && (
                    <p className="text-lg mb-6">
                      {bannerSlides[currentSlide].description}
                    </p>
                  )} */}
                  {bannerSlides[currentSlide].link && bannerSlides[currentSlide].buttonText && (
                    <a 
                      href={bannerSlides[currentSlide].link}
                      className="inline-block text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                      style={{backgroundColor: '#f8971d'}}
                      onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#e8850a'}
                      onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#f8971d'}
                    >
                      {bannerSlides[currentSlide].buttonText}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation Arrows - Only show if there are slides and not loading */}
        {!isLoadingBanner && bannerSlides.length > 1 && (
          <>
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
          </>
        )}
        
        {/* Dots Indicator - Only show if there are multiple slides and not loading */}
        {!isLoadingBanner && bannerSlides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {bannerSlides.map((slide, index) => (
              <button
                key={slide.id || index}
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
        )}
        
        {/* Slide Counter */}
        {/* <div className="absolute bottom-8 right-8 z-20 bg-gray-800 bg-opacity-80 text-white px-4 py-2 rounded-full text-sm">
          {currentSlide + 1} / {bannerSlides.length}
        </div> */}
      </section>

      {/* Unit Types Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Tipe Unit Rusun</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Pilih tipe unit yang sesuai dengan kebutuhan Anda di Rusun Pasar Jaya
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
                <p className="text-gray-600 mb-4">Rusun Pasar Jaya, Jakarta</p>
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
                <p className="text-gray-600 mb-4">Rusun Pasar Jaya, Jakarta</p>
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
                <p className="text-gray-600 mb-4">Rusun Pasar Jaya, Jakarta</p>
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
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {/* <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6" style={{backgroundColor: '#f8971d', color: 'white'}}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Layanan Terlengkap
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Mari Lihat Apa yang {''}
              <span className="" style={{color: '#f8971d'}}>Anda Cari</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Apakah Anda sedang mencari hunian yang cocok untuk Anda dan keluarga? Rusun Pasar Jaya punya berbagai opsi yang bisa disesuaikan dengan kebutuhan dan anggaran Anda.
            </p>
          </div> */}
          
          {/* Service Cards */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{backgroundColor: '#09893c'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sewa Rumah</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Unit sewa dengan biaya terjangkau, fleksibilitas kontrak, dan fasilitas lengkap. Ideal untuk Anda yang ingin mencoba tinggal di area tertentu.
                </p>
                <div className="flex items-center text-sm font-semibold transition-colors duration-300" style={{color: '#09893c'}}>
                  <span>Lihat Unit Tersedia</span>
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div> */}

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-3xl shadow-0 p-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6" style={{backgroundColor: '#09893c', color: 'white'}}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Keunggulan Kami
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Kenapa Memilih Kami?</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kami berkomitmen memberikan layanan terbaik untuk memenuhi kebutuhan hunian Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110" style={{backgroundColor: '#09893c'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Platform Terpercaya</h4>
                <p className="text-gray-600 leading-relaxed">Kami sudah membantu ribuan keluarga menemukan hunian yang tepat dengan tingkat kepuasan tinggi.</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110" style={{backgroundColor: '#f8971d'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Semua dalam Genggaman</h4>
                <p className="text-gray-600 leading-relaxed">Dari pencarian hingga kontrak, semua proses dapat dilakukan secara online dengan mudah dan aman.</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110" style={{backgroundColor: '#09893c'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Dukungan Penuh</h4>
                <p className="text-gray-600 leading-relaxed">Tim profesional kami siap membantu setiap langkah dari konsultasi hingga proses legal.</p>
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
                alt="Gedung Rusun"
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Bottom Left - Composite Image */}
            <div className="relative border border-gray-200">
              <Image
                src="/foto-bangunan/gedung-3.jpeg"
                alt="Gedung Rusun"
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


      {/* Building Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Galeri Gedung Rusun
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Lihat kemegahan dan kualitas bangunan Rusun Pasar Jaya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {buildingImages.map((image, index) => (
              <div 
                key={index}
                className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gray-200"
                onClick={() => openGallery(index)}
              >
                <Image
                  src={image}
                  alt={`Gedung Rusun ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index === 0}
                  onError={(e) => {
                    console.error('Error loading image:', image);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  onLoad={() => console.log('Image loaded successfully:', image)}
                />
                <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative h-[80vh] rounded-lg overflow-hidden">
              <Image
                src={buildingImages[currentImageIndex]}
                alt={`Gedung Rusun ${currentImageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain bg-black"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {buildingImages.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
              {buildingImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    index === currentImageIndex ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
                    <p className="text-gray-600 mb-4">Rusun Pasar Jaya, Jakarta</p>
                    
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
