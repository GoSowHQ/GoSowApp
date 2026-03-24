"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useAuthInitialize } from '@/hooks/use-auth-initialize';
import { LayoutDashboard, FolderOpen, Users, LogOut } from 'lucide-react';

const adminLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Users', href: '/admin/users', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  useAuthInitialize();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-[#7ED957] border-t-transparent rounded-full" /></div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-gray-900 text-white h-16 flex items-center px-6 fixed top-0 left-0 right-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#7ED957] flex items-center justify-center">
            <span className="text-white font-bold text-xs">GS</span>
          </div>
          <span className="text-base font-semibold">GoSOW Admin</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-gray-300">{user?.name}</span>
        </div>
      </header>
      <div className="flex pt-16">
        <aside className="w-56 bg-gray-900 min-h-[calc(100vh-4rem)] fixed left-0 top-16 p-4">
          <nav className="space-y-1">
            {adminLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}>
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <button onClick={() => { logout(); router.push('/'); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-white w-full">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>
        <main className="ml-56 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
