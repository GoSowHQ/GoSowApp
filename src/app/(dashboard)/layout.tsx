"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useAuthInitialize } from '@/hooks/use-auth-initialize';
import { LayoutDashboard, FolderOpen, Heart, Bookmark, Settings, LogOut } from 'lucide-react';

const sidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Projects', href: '/dashboard/projects', icon: FolderOpen },
  { label: 'My Fundings', href: '/dashboard/fundings', icon: Heart },
  { label: 'Bookmarks', href: '/dashboard/bookmarks', icon: Bookmark },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  useAuthInitialize();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-[#7ED957] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 fixed top-0 left-0 right-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#7ED957] flex items-center justify-center">
            <span className="text-white font-bold text-xs">GS</span>
          </div>
          <span className="text-base font-semibold text-gray-900">GoSOW</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">{user?.name?.[0]}</span>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] fixed left-0 top-16 p-4">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-[#7ED957]/10 text-[#7ED957]' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 w-full"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="ml-56 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
