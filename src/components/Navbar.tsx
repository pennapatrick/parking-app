"use client";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

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

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/vagas', label: 'Vagas' },
    { href: '/relatorios', label: 'Relatórios' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-base bg-[var(--color-bg)]/80 backdrop-blur-md">
      <div className="container-narrow flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-bold text-lg tracking-tight heading-gradient">ParkingApp</Link>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {links.map(l => {
              const active = pathname?.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`transition-colors ${active ? 'accent font-semibold' : 'text-soft hover:accent'}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="btn btn-outline h-9 w-9 p-0 text-base"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-accent text-sm"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
