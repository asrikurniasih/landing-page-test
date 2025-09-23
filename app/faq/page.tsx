"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [faqDataAPI, setFaqDataAPI] = useState<any[]>([]);
  const [isLoadingFaq, setIsLoadingFaq] = useState(true);
  
  const faqSectionRef = useRef<HTMLElement>(null);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Scroll to FAQ section
    if (faqSectionRef.current) {
      faqSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const fetchFaqData = async () => {
      setIsLoadingFaq(true);
      const response = await fetch('/api/faq?limit=100&active_bool=true');
      const data = await response.json();
      setFaqDataAPI(data.results.data);
      setIsLoadingFaq(false);
    };
    fetchFaqData();
  }, []);


  const categories = useMemo(() => {
    // Extract unique categories from FAQ data since we have category_title in each FAQ
    const uniqueCategories = faqDataAPI.reduce((acc, faq) => {
      if (faq.category_id && faq.category_title && !acc.find((cat: {id: string, name: string, count: number}) => cat.id === faq.category_id)) {
        acc.push({
          id: faq.category_id,
          name: faq.category_title,
          count: faqDataAPI.filter(f => f.category_id === faq.category_id).length
        });
      }
      return acc;
    }, [] as Array<{id: string, name: string, count: number}>);
    
    // Add "All" category at the beginning
    return [
      { id: "all", name: "Semua", count: faqDataAPI.length },
      ...uniqueCategories
    ];
  }, [faqDataAPI]);

  // const categories = [
  //   { id: "all", name: "Semua", count: faqData.length },
  //   { id: "umum", name: "Umum", count: faqData.filter(faq => faq.category === "umum").length },
  //   { id: "persyaratan", name: "Persyaratan", count: faqData.filter(faq => faq.category === "persyaratan").length },
  //   { id: "proses", name: "Proses Sewa", count: faqData.filter(faq => faq.category === "proses").length },
  //   { id: "biaya", name: "Biaya", count: faqData.filter(faq => faq.category === "biaya").length },
  //   { id: "pembayaran", name: "Pembayaran", count: faqData.filter(faq => faq.category === "pembayaran").length },
  //   { id: "kontrak", name: "Kontrak", count: faqData.filter(faq => faq.category === "kontrak").length },
  //   { id: "keuntungan", name: "Keuntungan", count: faqData.filter(faq => faq.category === "keuntungan").length },
  //   { id: "fasilitas", name: "Fasilitas", count: faqData.filter(faq => faq.category === "fasilitas").length },
  //   { id: "lokasi", name: "Lokasi", count: faqData.filter(faq => faq.category === "lokasi").length },
  //   { id: "maintenance", name: "Maintenance", count: faqData.filter(faq => faq.category === "maintenance").length }
  // ];

  const filteredFAQs = useMemo(() => {
    return faqDataAPI.filter(faq => {
      // Add null safety checks
      const question = faq.title || '';
      const answer = faq.content || '';
      
      const matchesSearch = question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || faq.category_id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqDataAPI, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white text-sm font-medium">FAQ</span>
              </div>
              
              <div className="text-2xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Pertanyaan yang Sering 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Diajukan
                </span>
              </div>
              
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Temukan jawaban lengkap dari pertanyaan umum tentang hunian dan layanan kami. 
                <span className="block mt-2 text-white/80">
                  Jika masih ada yang ingin ditanyakan, tim kami siap membantu Anda.
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Search Section */}
      <section className="pt-12 pb-8 bg-white" ref={faqSectionRef} >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari pertanyaan atau jawaban..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#09893c] focus:border-transparent shadow-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Sidebar Layout */}
      <section className="pb-16 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {
            isLoadingFaq ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sedang memuat...</h3>
              </div>
            ) : (
              <>
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada hasil ditemukan</h3>
                    <p className="text-gray-600 text-sm">Coba gunakan kata kunci yang berbeda atau pilih kategori lain.</p>
                  </div>
                ) : (
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Categories */}
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori FAQ</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                             <button
                               key={category.id}
                               onClick={() => handleCategoryChange(category.id)}
                               className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                 selectedCategory === category.id
                                   ? 'bg-[#09893c] text-white shadow-sm'
                                   : 'text-gray-700 hover:bg-white hover:shadow-sm'
                               }`}
                             >
                              <div className="flex items-center justify-between">
                                <span>{category.name}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  selectedCategory === category.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {category.count}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Main Content - FAQ List */}
                    <div className="flex-1">
                      <div className="space-y-4">
                        {filteredFAQs.map((faq, index) => (
                          <div
                            key={faq.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-0 transition-shadow duration-200"
                          >
                            <button
                              onClick={() => toggleItem(faq.id)}
                              className="w-full p-3 text-left hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 pr-4">
                                  <div className="flex items-center mb-3">
                                    <span className="text-xs font-medium text-[#09893c] bg-[#09893c]/10 px-3 py-1 rounded-full">
                                      {faq.category_title}
                                    </span>
                                  </div>
                                  <h3 className="text-base font-semibold text-gray-900 leading-relaxed">
                                    {faq.title}
                                  </h3>
                                </div>
                                <div className="flex-shrink-0">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    openItems.includes(faq.id) 
                                      ? 'bg-[#09893c] text-white' 
                                      : 'bg-gray-100 text-gray-400 hover:bg-[#09893c] hover:text-white'
                                  }`}>
                                    <svg
                                      className={`w-4 h-4 transition-transform duration-200 ${
                                        openItems.includes(faq.id) ? 'rotate-180' : ''
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </button>
                            
                            {/* Answer Section */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="px-3 pb-3">
                                <div className="border-t border-gray-100 pt-4">
                                  <div 
                                    className="text-sm text-gray-600 faq-content"
                                    dangerouslySetInnerHTML={{ __html: faq.content }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )
          }
        </div>
      </section>

      {/* Minimalis CTA Section */}
      <section className="py-16 bg-[#09893c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">
              Masih ada pertanyaan?
            </h2>
            <p className="text-sm text-white/80 max-w-2xl mx-auto">
              Hubungi tim customer service kami untuk bantuan lebih lanjut
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#09893c] rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>
            
            <a
              href="mailto:info@rusunawapasarjaya.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-medium text-sm hover:bg-white/10 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
