// Bite BookSite — Layout Component
// Sol sidebar + üst header + ana içerik alanı

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen, Trophy, Users, Newspaper, Home, Search,
  Settings, LogOut, Menu, X, Crown, Shield, Star,
  ChevronRight, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/library', label: 'Kütüphane', icon: BookOpen },
  { href: '/leaderboard', label: 'Sıralama', icon: Trophy },
  { href: '/feed', label: 'Gönderi Akışı', icon: Newspaper },
  { href: '/search', label: 'Kullanıcı Ara', icon: Search },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { currentUser, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'oklch(0.10 0.03 260)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-auto',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )} style={{ background: 'oklch(0.12 0.04 260)', borderRight: '1px solid oklch(1 0 0 / 0.07)' }}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'oklch(1 0 0 / 0.07)' }}>
          <img src="/logo.png" alt="Bite" className="w-9 h-9 object-contain" />
          <div>
            <span className="font-display text-xl font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>Bite</span>
            <p className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>BookSite</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" style={{ color: 'oklch(0.55 0.03 260)' }} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive(href) ? 'nav-item-active' : 'hover:bg-white/5'
              )} style={{ color: isActive(href) ? 'oklch(0.75 0.18 65)' : 'oklch(0.70 0.03 260)' }}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </div>
            </Link>
          ))}

          {currentUser?.isAdmin && (
            <Link href="/admin">
              <div className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive('/admin') ? 'nav-item-active' : 'hover:bg-white/5'
              )} style={{ color: isActive('/admin') ? 'oklch(0.75 0.18 65)' : 'oklch(0.70 0.03 260)' }}>
                <Shield className="w-4 h-4 flex-shrink-0" />
                Admin Paneli
                <span className="ml-auto admin-badge">Admin</span>
              </div>
            </Link>
          )}
        </nav>

        {/* User section */}
        <div className="p-3 border-t" style={{ borderColor: 'oklch(1 0 0 / 0.07)' }}>
          {currentUser ? (
            <div>
              <Link href={`/profile/${currentUser.username}`}>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={currentUser.avatarUrl} />
                    <AvatarFallback style={{ background: 'oklch(0.75 0.18 65)', color: 'oklch(0.10 0.03 260)' }}>
                      {currentUser.displayName[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium truncate" style={{ color: 'oklch(0.90 0.02 75)' }}>
                        {currentUser.displayName}
                      </p>
                      {currentUser.plan === 'premium' && <Crown className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(0.70 0.20 295)' }} />}
                      {currentUser.isAdmin && <Shield className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(0.65 0.22 25)' }} />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: 'oklch(0.75 0.18 65)' }} />
                      <span className="text-xs font-mono-score" style={{ color: 'oklch(0.75 0.18 65)' }}>
                        {currentUser.totalPoints.toLocaleString()} puan
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.45 0.03 260)' }} />
                </div>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors mt-1"
                style={{ color: 'oklch(0.55 0.03 260)' }}
              >
                <LogOut className="w-4 h-4" />
                Çıkış Yap
              </button>
            </div>
          ) : (
            <Link href="/auth">
              <Button className="w-full amber-gradient text-sm font-semibold" style={{ color: 'oklch(0.10 0.03 260)' }}>
                Giriş Yap / Kayıt Ol
              </Button>
            </Link>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b glass sticky top-0 z-30" style={{ borderColor: 'oklch(1 0 0 / 0.07)' }}>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" style={{ color: 'oklch(0.70 0.03 260)' }} />
          </button>
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Bite" className="w-7 h-7 object-contain" />
              <span className="font-display text-lg font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>Bite</span>
            </div>
          </Link>
          {currentUser && (
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" style={{ color: 'oklch(0.75 0.18 65)' }} />
                <span className="text-sm font-mono-score" style={{ color: 'oklch(0.75 0.18 65)' }}>
                  {currentUser.totalPoints.toLocaleString()}
                </span>
              </div>
              <Link href={`/profile/${currentUser.username}`}>
                <Avatar className="w-7 h-7">
                  <AvatarImage src={currentUser.avatarUrl} />
                  <AvatarFallback style={{ background: 'oklch(0.75 0.18 65)', color: 'oklch(0.10 0.03 260)', fontSize: '0.65rem' }}>
                    {currentUser.displayName[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
