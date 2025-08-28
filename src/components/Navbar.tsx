"use client";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Não mostrar navbar na página de login
  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="font-bold text-xl text-blue-700">ParkingApp</div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><a href="/dashboard" className="hover:text-blue-700 transition-colors">Dashboard</a></li>
        <li><a href="/vagas" className="hover:text-blue-700 transition-colors">Vagas</a></li>
        <li><a href="/relatorios" className="hover:text-blue-700 transition-colors">Relatórios</a></li>
        <li>
          <button 
            onClick={handleLogout}
            className="hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
