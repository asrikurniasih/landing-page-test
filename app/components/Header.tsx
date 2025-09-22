'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#09893c'}}>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div> */}
            <Image src="/logo-pasar-jaya.png" alt="Rusun" width={32} height={32} />
            <span className="text-xl font-bold text-gray-800">Rusun</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Beranda</Link>
            <Link href="/unit" className="text-gray-600 hover:text-gray-900 transition-colors">Unit</Link>
            <Link href="/tentang" className="text-gray-600 hover:text-gray-900 transition-colors">Tentang</Link>
            <Link href="/kontak" className="text-gray-600 hover:text-gray-900 transition-colors">Kontak</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
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
