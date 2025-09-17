"use client";

import Image from "next/image";
import { useState } from "react";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Apa itu Rusunawa Pasar Jaya?",
      answer: "Rusunawa Pasar Jaya adalah hunian sewa sederhana yang dikelola secara profesional, dengan fasilitas lengkap dan harga terjangkau bagi masyarakat."
    },
    {
      question: "Siapa saja yang bisa menyewa unit di Rusunawa?",
      answer: "Semua masyarakat yang memenuhi persyaratan administrasi, seperti KTP, KK, dan dokumen pendukung lainnya sesuai ketentuan pengelola."
    },
    {
      question: "Bagaimana cara mengajukan sewa unit?",
      answer: "Anda dapat mengajukan secara online melalui halaman Kontak/Registrasi di website ini, atau langsung datang ke kantor pengelola untuk konsultasi lebih lanjut."
    },
    {
      question: "Apa saja biaya yang perlu disiapkan?",
      answer: "Biaya sewa bulanan sudah termasuk pemakaian unit, sementara biaya listrik, air, dan layanan tambahan dibayarkan sesuai pemakaian masing-masing penghuni."
    },
    {
      question: "Bagaimana sistem pembayarannya?",
      answer: "Pembayaran sewa dapat dilakukan secara transfer bank, virtual account, atau metode lain yang disediakan oleh pengelola."
    },
    {
      question: "Apakah saya bisa berhenti menyewa sebelum kontrak habis?",
      answer: "Ya, penghuni dapat mengajukan pengakhiran sewa lebih awal dengan mengikuti prosedur pengelola, termasuk pemberitahuan minimal 30 hari sebelumnya."
    },
    {
      question: "Apa keuntungan tinggal di Rusunawa Pasar Jaya?",
      answer: "Lokasi strategis dekat dengan pusat aktivitas, fasilitas lengkap dan terawat, harga sewa terjangkau, dan proses sewa mudah dan transparan."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/foto-bangunan/gedung-4.jpeg"
            alt="Rusunawa Pasar Jaya"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h1>
            <p className="text-sm lg:text-base text-white/90 max-w-3xl mx-auto">
              Temukan jawaban dari pertanyaan umum tentang hunian dan layanan kami. Jika masih ada yang ingin ditanyakan, silakan hubungi tim kami.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openItems.includes(index) ? 'rotate-180' : ''
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
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#09893c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Masih ada pertanyaan lain?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Hubungi kami melalui WhatsApp atau Email untuk mendapatkan informasi lebih lanjut
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#09893c] bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>
            
            <a
              href="mailto:info@rusunawapasarjaya.com"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
