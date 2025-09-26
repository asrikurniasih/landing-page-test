'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Config type definition
interface ConfigData {
  id: string;
  company_name: string;
  logo: string;
  fav_icon: string;
  color_array: Array<{
    hex: string;
    active: boolean;
  }>;
  footer_array: {
    email: string;
    phone: string;
    sosmed: Array<{
      link: string;
      type: string;
    }>;
    address: string;
  };
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  // Fetch config data from API
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        setIsLoadingConfig(true);
        const response = await fetch('/api/config');
        const data = await response.json();
        
        if (data.results && data.results.data && Array.isArray(data.results.data) && data.results.data.length > 0) {
          // Take the first item from the array (index 0)
          setConfigData(data.results.data[0]);
        } else {
          // Fallback config data if API fails
          setConfigData({
            id: "1",
            company_name: "Rusun Pasar Jaya",
            logo: "/logo-pasar-jaya.png",
            fav_icon: "/favicon.ico",
            color_array: [{"hex": "#09893c", "active": true}],
            footer_array: {
              email: "info@rusunpasarjaya.com",
              phone: "+62 21 1234 5678",
              sosmed: [],
              address: "Jakarta, Indonesia"
            }
          });
        }
      } catch (error) {
        console.error('Error fetching config data:', error);
        // Fallback config data on error
        setConfigData({
          id: "1",
          company_name: "Rusun Pasar Jaya",
          logo: "/logo-pasar-jaya.png",
          fav_icon: "/favicon.ico",
          color_array: [{"hex": "#09893c", "active": true}],
          footer_array: {
            email: "info@rusunpasarjaya.com",
            phone: "+62 21 1234 5678",
            sosmed: [],
            address: "Jakarta, Indonesia"
          }
        });
      } finally {
        setIsLoadingConfig(false);
      }
    };

    fetchConfigData();
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              {configData?.logo ? (
                <Image 
                  src={configData.logo} 
                  alt={configData.company_name || "Company Logo"} 
                  width={32} 
                  height={32}
                  className="rounded"
                />
              ) : (
                <Image src="/logo-pasar-jaya.png" alt="Rusun" width={32} height={32} />
              )}
              <span className="text-md font-bold text-gray-800">
                {configData?.company_name || "Rusun Pasar Jaya"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Beranda</Link>
            <Link href="/unit" className="text-gray-600 hover:text-gray-900 transition-colors">Unit</Link>
            <Link href="/tentang" className="text-gray-600 hover:text-gray-900 transition-colors">Tentang</Link>
            <Link href="/kontak" className="text-gray-600 hover:text-gray-900 transition-colors">Kontak</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block sm:w-[203px]">
            <Link href="/pengajuan">
              <button 
                className="text-white px-6 py-2 rounded-full font-semibold transition-all shadow-0 hover:shadow-lg"
                style={{backgroundColor: '#f8971d'}}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e8850a'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f8971d'}
              >
                Daftar Sekarang
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Beranda</Link>
              <Link href="/unit" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Unit</Link>
              <Link href="/tentang" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Tentang</Link>
              <Link href="/kontak" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Kontak</Link>
              <Link href="/faq" className="block px-3 py-2 text-gray-600 hover:text-gray-900">FAQ</Link>
              <div className="px-3 py-2">
                <Link href="/pengajuan">
                  <button 
                    className="w-full text-white px-4 py-2 rounded-full font-semibold transition-all"
                    style={{backgroundColor: '#f8971d'}}
                  >
                    Daftar Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
