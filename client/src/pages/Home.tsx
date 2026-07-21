// Bite BookSite — Home Page
// Ana sayfa: hero, öne çıkan kitaplar, liderlik özeti

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { BOOKS } from '@/lib/booksData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Trophy, Star, ArrowRight, Crown, Flame, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  const { currentUser, getLeaderboard } = useAuth();
  const [topBooks] = useState(BOOKS.slice(0, 6));
  const [dailyTop] = useState(() => getLeaderboard('daily').slice(0, 3));

  return (
    <Layout>
      <div className="fade-in-up">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[420px] flex items-center">
          <div className="absolute inset-0">
            <img
              src="/hero-bg.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.10 0.03 260 / 0.95) 0%, oklch(0.10 0.03 260 / 0.75) 60%, transparent 100%)' }} />
          </div>
          
          <div className="relative z-10 container py-16 lg:py-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.75 0.18 65)' }} />
                <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'oklch(0.75 0.18 65)' }}>
                  Okuyucu Platformu
                </span>
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: 'oklch(0.95 0.02 75)' }}>
                Her sayfa<br />
                <span style={{ color: 'oklch(0.75 0.18 65)' }}>bir adım öne.</span>
              </h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'oklch(0.70 0.03 260)' }}>
                Oku, puan al, zirvede ol. Kitap okumayı rekabetçi ve ödüllendirici yapan platform.
                Günlük sıralamalar, sınavlar ve ödüller seni bekliyor.
              </p>
              <div className="flex flex-wrap gap-3">
                {currentUser ? (
                  <>
                    <Link href="/library">
                      <Button className="amber-gradient font-semibold px-6" style={{ color: 'oklch(0.10 0.03 260)' }}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Kütüphaneye Git
                      </Button>
                    </Link>
                    <Link href="/leaderboard">
                      <Button variant="outline" className="px-6 font-semibold" style={{ borderColor: 'oklch(0.75 0.18 65 / 0.3)', color: 'oklch(0.75 0.18 65)', background: 'oklch(0.75 0.18 65 / 0.08)' }}>
                        <Trophy className="w-4 h-4 mr-2" />
                        Sıralamam
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth">
                      <Button className="amber-gradient font-semibold px-6" style={{ color: 'oklch(0.10 0.03 260)' }}>
                        Okumaya Başla
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/library">
                      <Button variant="outline" className="px-6 font-semibold" style={{ borderColor: 'oklch(1 0 0 / 0.15)', color: 'oklch(0.80 0.02 75)', background: 'transparent' }}>
                        Kitaplara Bak
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="border-y" style={{ borderColor: 'oklch(0.75 0.18 65 / 0.15)', background: 'linear-gradient(90deg, oklch(0.12 0.04 260), oklch(0.13 0.05 255), oklch(0.12 0.04 260))' }}>
          <div className="container py-4">
            <div className="flex flex-wrap gap-6 lg:gap-10">
              {[
                { icon: BookOpen, label: '110+ Kitap', sub: 'Kütüphanede' },
                { icon: Trophy, label: 'Günlük Sıralama', sub: 'Top 15 göster' },
                { icon: Star, label: '15-50 Puan', sub: 'Kitap başına' },
                { icon: Users, label: 'Topluluk', sub: 'Okuyucu ağı' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'oklch(0.75 0.18 65 / 0.12)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'oklch(0.75 0.18 65)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'oklch(0.88 0.02 75)' }}>{label}</p>
                    <p className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-10 lg:py-14">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sol: Öne çıkan kitaplar */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>
                    Öne Çıkan Kitaplar
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'oklch(0.55 0.03 260)' }}>
                    En yüksek puanlı seçkiler
                  </p>
                </div>
                <Link href="/library">
                  <Button variant="ghost" size="sm" className="text-sm" style={{ color: 'oklch(0.75 0.18 65)' }}>
                    Tümünü Gör <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {topBooks.map((book, i) => (
                  <Link key={book.id} href={`/book/${book.id}`}>
                    <div className="bite-book-card group" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={e => {
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300/1E2535/F0A500?text=${encodeURIComponent(book.title.slice(0, 15))}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <div className="absolute top-2 right-2">
                          <span className="text-xs font-mono-score font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'oklch(0.75 0.18 65)', color: 'oklch(0.10 0.03 260)' }}>
                            +{book.maxPoints}
                          </span>
                        </div>
                        {book.isClassic && (
                          <div className="absolute top-2 left-2">
                            <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                              style={{ background: 'oklch(0.70 0.20 295 / 0.9)', color: 'white' }}>
                              Klasik
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold leading-tight line-clamp-2" style={{ color: 'oklch(0.90 0.02 75)' }}>
                          {book.title}
                        </p>
                        <p className="text-xs mt-1 truncate" style={{ color: 'oklch(0.55 0.03 260)' }}>
                          {book.author}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'oklch(0.75 0.18 65 / 0.12)', color: 'oklch(0.75 0.18 65)' }}>
                            {book.difficulty}
                          </span>
                          <span className="text-xs" style={{ color: 'oklch(0.50 0.03 260)' }}>{book.pageCount}s</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sağ: Günlük lider + Premium */}
            <div className="space-y-6">
              {/* Günlük liderlik */}
              <div className="paper-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'oklch(0.75 0.18 65 / 0.15)' }}>
                    <Flame className="w-4 h-4" style={{ color: 'oklch(0.75 0.18 65)' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>Bugünün Liderleri</h3>
                    <p className="bite-tagline">Günlük sıralama</p>
                  </div>
                </div>
                
                {dailyTop.length > 0 ? (
                  <div className="space-y-3">
                    {dailyTop.map((user, i) => (
                      <Link key={user.id} href={`/profile/${user.username}`}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                          <span className={`text-lg font-bold font-mono-score w-6 text-center rank-${i + 1}`}>
                            {i === 0 ? '' : i === 1 ? '' : ''}
                          </span>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)', fontSize: '0.7rem' }}>
                              {user.displayName[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: 'oklch(0.88 0.02 75)' }}>
                              {user.displayName}
                            </p>
                            <p className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>
                              @{user.username}
                            </p>
                          </div>
                          <span className="text-sm font-mono-score font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>
                            {user.dailyPoints}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: 'oklch(0.35 0.03 260)' }} />
                    <p className="text-sm" style={{ color: 'oklch(0.50 0.03 260)' }}>
                      Henüz puan kazanılmadı.<br />İlk sen ol!
                    </p>
                  </div>
                )}
                
                <Link href="/leaderboard">
                  <Button variant="ghost" size="sm" className="w-full mt-3 text-sm" style={{ color: 'oklch(0.75 0.18 65)' }}>
                    Tam Sıralamayı Gör <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Premium kartı */}
              <div className="relative overflow-hidden rounded-xl p-5" style={{ background: 'oklch(0.70 0.20 295 / 0.12)', border: '1px solid oklch(0.70 0.20 295 / 0.25)' }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                  style={{ background: 'oklch(0.70 0.20 295)', transform: 'translate(30%, -30%)' }} />
                <Crown className="w-8 h-8 mb-3" style={{ color: 'oklch(0.70 0.20 295)' }} />
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'oklch(0.93 0.02 75)' }}>
                  Premium Plan
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'oklch(0.65 0.03 260)' }}>
                  Günde 5 kitaptan puan al. Ücretsiz planda günlük limit 2 kitap.
                </p>
                <ul className="space-y-1.5 mb-4">
                  {['Günde 5 kitap puan hakkı', 'Öncelikli destek', 'Premium rozet'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'oklch(0.70 0.03 260)' }}>
                      <Star className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(0.70 0.20 295)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                {!currentUser ? (
                  <Link href="/auth">
                    <Button size="sm" className="w-full text-sm font-semibold" style={{ background: 'oklch(0.70 0.20 295)', color: 'white' }}>
                      Kayıt Ol ve Yükselt
                    </Button>
                  </Link>
                ) : currentUser.plan === 'free' ? (
                  <Button size="sm" className="w-full text-sm font-semibold" style={{ background: 'oklch(0.70 0.20 295)', color: 'white' }}
                    onClick={() => {
                      // Admin onaylı premium upgrade - demo için direkt
                      alert('Premium yükseltme için admin ile iletişime geçin: kilincatayanki@gmail.com');
                    }}>
                    Premium\'a Geç
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4" style={{ color: 'oklch(0.70 0.20 295)' }} />
                    <span className="text-sm font-medium" style={{ color: 'oklch(0.70 0.20 295)' }}>Premium üyesin!</span>
                  </div>
                )}
              </div>

              {/* Nasıl çalışır */}
              <div className="paper-card rounded-xl p-5">
                <h3 className="font-display text-base font-bold mb-4" style={{ color: 'oklch(0.93 0.02 75)' }}>
                  Nasıl Çalışır?
                </h3>
                <div className="space-y-3">
                  {[
                    { step: '1', text: 'Kütüphaneden kitap seç' },
                    { step: '2', text: 'Oku ve 1-5 yıldız ver' },
                    { step: '3', text: 'Puan kazan (15-50 arası)' },
                    { step: '4', text: 'Sıralamada yüksel' },
                    { step: '5', text: 'Ödüller kazan!' },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ background: 'oklch(0.75 0.18 65 / 0.15)', color: 'oklch(0.75 0.18 65)' }}>
                        {step}
                      </div>
                      <p className="text-sm" style={{ color: 'oklch(0.70 0.03 260)' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
