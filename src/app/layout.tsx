import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parking App",
  description: "Sistema de gerenciamento de estacionamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 left-0 z-50">
          <div className="font-bold text-xl text-blue-700">ParkingApp</div>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li><a href="/vagas" className="hover:text-blue-700 transition-colors">Vagas</a></li>
            <li><a href="/dashboard" className="hover:text-blue-700 transition-colors">Dashboard</a></li>
            <li><a href="/veiculos" className="hover:text-blue-700 transition-colors">Veículos</a></li>
            <li><a href="/relatorios" className="hover:text-blue-700 transition-colors">Relatórios</a></li>
            <li><a href="/login" className="hover:text-red-600 transition-colors">Logout</a></li>
          </ul>
        </nav>
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
