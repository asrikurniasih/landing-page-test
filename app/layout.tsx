import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { NotificationProvider } from "./components/layout/notification-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rusunawa Pasar Jaya - Hunian Sewa Terjangkau di Jakarta",
  description: "Rusunawa Pasar Rumput - Rumah susun sewa yang dikelola Perumda Pasar Jaya di Jakarta. Hunian berkualitas dengan harga terjangkau untuk masyarakat Jakarta.",
  keywords: "rusunawa pasar jaya, rusunawa pasar rumput, rumah susun sewa jakarta, perumda pasar jaya, hunian terjangkau jakarta",
  openGraph: {
    title: "Rusunawa Pasar Jaya - Hunian Sewa Terjangkau di Jakarta",
    description: "Rusunawa Pasar Rumput - Rumah susun sewa yang dikelola Perumda Pasar Jaya di Jakarta. Hunian berkualitas dengan harga terjangkau untuk masyarakat Jakarta.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <Header />
          {children}
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  );
}
