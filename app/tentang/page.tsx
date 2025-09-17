"use client";

import Image from "next/image";
import { useState } from "react";

export default function Tentang() {
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
              Tentang Rusunawa
            </h1>
            <p className="text-sm lg:text-base text-white max-w-3xl mx-auto leading-relaxed">
              Solusi Hunian Terjangkau untuk Masyarakat Jakarta
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Mengenal Rusunawa Pasar Jaya
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Rusunawa (Rumah Susun Sederhana Sewa) adalah hunian vertikal yang disediakan pemerintah sebagai solusi perumahan terjangkau bagi masyarakat. Dengan konsep sederhana namun tetap layak huni, Rusunawa hadir untuk menjawab kebutuhan tempat tinggal yang nyaman, aman, dan strategis bagi masyarakat berpenghasilan rendah (MBR).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/foto-bangunan/gedung.jpeg"
                    alt="Gedung Rusunawa"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Sistem Sewa yang Fleksibel
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Melalui sistem sewa yang fleksibel dan biaya yang terjangkau, Rusunawa memberikan kesempatan bagi masyarakat untuk tinggal di lingkungan yang sehat dengan fasilitas memadai. Selain itu, Rusunawa juga dirancang untuk mendukung keteraturan tata kota, mengurangi kawasan kumuh, serta meningkatkan kualitas hidup masyarakat.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Platform Digital yang Mudah
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Aplikasi Rusunawa ini hadir untuk memudahkan masyarakat dalam mendapatkan informasi lengkap mengenai unit yang tersedia, melakukan pendaftaran secara online, hingga menghubungi pengelola secara langsung. Dengan adanya platform digital ini, proses pengajuan hunian menjadi lebih cepat, transparan, dan efisien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Keunggulan Rusunawa
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Temukan keunggulan yang membuat Rusunawa menjadi pilihan terbaik untuk hunian terjangkau
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Harga Terjangkau</h3>
              <p className="text-gray-600">
                Sistem sewa dengan biaya yang sangat terjangkau untuk masyarakat berpenghasilan rendah
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Lokasi Strategis</h3>
              <p className="text-gray-600">
                Berada di lokasi strategis dengan akses mudah ke berbagai fasilitas umum dan transportasi
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Fasilitas Lengkap</h3>
              <p className="text-gray-600">
                Dilengkapi dengan berbagai fasilitas untuk mendukung kenyamanan dan kualitas hidup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Building Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Galeri Gedung Rusunawa
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Lihat kemegahan dan kualitas bangunan Rusunawa Pasar Jaya
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
                  alt={`Gedung Rusunawa ${index + 1}`}
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

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor: '#09893c'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Siap Mencari Hunian Terjangkau?
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Daftarkan diri Anda sekarang dan dapatkan kesempatan untuk tinggal di Rusunawa Pasar Jaya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl" style={{backgroundColor: '#f8971d'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e8850a'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8971d'}>
              Lihat Unit
            </button>
            <button className="border-2 px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg text-white border-white hover:bg-white hover:text-green-800">
              Hubungi Kami
            </button>
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
                alt={`Gedung Rusunawa ${currentImageIndex + 1}`}
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
    </div>
  );
}
