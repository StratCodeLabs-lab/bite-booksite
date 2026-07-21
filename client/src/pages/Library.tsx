// Bite BookSite — Library Page
// Tüm kitaplar, filtreleme, arama

import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import { BOOKS, ALL_CATEGORIES, type BookCategory, type Book } from '@/lib/booksData';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, BookOpen, CheckCircle2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const DIFFICULTY_COLORS: Record<string, string> = {
  'Kolay': 'oklch(0.65 0.18 145)',
  'Orta': 'oklch(0.75 0.18 65)',
  'Zor': 'oklch(0.70 0.20 35)',
  'Çok Zor': 'oklch(0.65 0.22 25)',
};

export default function Library() {
  const { currentUser, isInWishlist, addToWishlist, removeFromWishlist, hasReadBook } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'Tümü'>('Tümü');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Tümü');
  const [showClassicsOnly, setShowClassicsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'points' | 'title' | 'year'>('points');

  // Admin'in eklediği kitapları da dahil et
  const allBooks = useMemo(() => {
    try {
      const customBooks = JSON.parse(localStorage.getItem('bite_custom_books') || '[]') as Book[];
      return [...BOOKS, ...customBooks];
    } catch {
      return [...BOOKS];
    }
  }, []);

  const filtered = useMemo(() => {
    let books = [...allBooks];
    if (search) {
      const q = search.toLowerCase();
      books = books.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some(t => t.includes(q))
      );
    }
    if (selectedCategory !== 'Tümü') books = books.filter(b => b.category === selectedCategory);
    if (selectedDifficulty !== 'Tümü') books = books.filter(b => b.difficulty === selectedDifficulty);
    if (showClassicsOnly) books = books.filter(b => b.isClassic);
    books.sort((a, b) => {
      if (sortBy === 'points') return b.maxPoints - a.maxPoints;
      if (sortBy === 'title') return a.title.localeCompare(b.title, 'tr');
      return b.year - a.year;
    });
    return books;
  }, [search, selectedCategory, selectedDifficulty, showClassicsOnly, sortBy]);

  const handleWishlist = (e: React.MouseEvent, bookId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return;
    if (isInWishlist(bookId)) removeFromWishlist(bookId);
    else addToWishlist(bookId);
  };

  return (
    <Layout>
      <div className="container py-8 fade-in-up">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: 'oklch(0.93 0.02 75)' }}>
            Kütüphane
          </h1>
          <p className="text-sm" style={{ color: 'oklch(0.55 0.03 260)' }}>
            {BOOKS.length} kitap · Oku, puan kazan, sıralamada yüksel
          </p>
        </div>

        {/* Filtreler */}
        <div className="space-y-4 mb-8">
          {/* Arama */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.50 0.03 260)' }} />
            <Input
              placeholder="Kitap veya yazar ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>

          {/* Kategori filtresi */}
          <div className="flex flex-wrap gap-2">
            {(['Tümü', ...ALL_CATEGORIES] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as BookCategory | 'Tümü')}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
                style={{
                  background: selectedCategory === cat ? 'oklch(0.75 0.18 65)' : 'oklch(0.15 0.04 258)',
                  color: selectedCategory === cat ? 'oklch(0.10 0.03 260)' : 'oklch(0.65 0.03 260)',
                  border: `1px solid ${selectedCategory === cat ? 'transparent' : 'oklch(1 0 0 / 0.08)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alt filtreler */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>Zorluk:</span>
              {['Tümü', 'Kolay', 'Orta', 'Zor', 'Çok Zor'].map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className="px-2.5 py-1 rounded text-xs font-medium transition-all"
                  style={{
                    background: selectedDifficulty === d ? 'oklch(0.75 0.18 65 / 0.2)' : 'transparent',
                    color: selectedDifficulty === d ? 'oklch(0.75 0.18 65)' : 'oklch(0.55 0.03 260)',
                    border: `1px solid ${selectedDifficulty === d ? 'oklch(0.75 0.18 65 / 0.3)' : 'oklch(1 0 0 / 0.06)'}`,
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowClassicsOnly(s => !s)}
              className="px-3 py-1 rounded text-xs font-medium transition-all"
              style={{
                background: showClassicsOnly ? 'oklch(0.70 0.20 295 / 0.2)' : 'transparent',
                color: showClassicsOnly ? 'oklch(0.70 0.20 295)' : 'oklch(0.55 0.03 260)',
                border: `1px solid ${showClassicsOnly ? 'oklch(0.70 0.20 295 / 0.3)' : 'oklch(1 0 0 / 0.06)'}`,
              }}
            >
              Sadece Klasikler
            </button>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>Sırala:</span>
              {[
                { value: 'points', label: 'Puan' },
                { value: 'title', label: 'İsim' },
                { value: 'year', label: 'Yıl' },
              ].map(s => (
                <button
                  key={s.value}
                  onClick={() => setSortBy(s.value as typeof sortBy)}
                  className="px-2.5 py-1 rounded text-xs font-medium transition-all"
                  style={{
                    background: sortBy === s.value ? 'oklch(0.75 0.18 65 / 0.15)' : 'transparent',
                    color: sortBy === s.value ? 'oklch(0.75 0.18 65)' : 'oklch(0.55 0.03 260)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sonuç sayısı */}
        <p className="text-sm mb-4" style={{ color: 'oklch(0.50 0.03 260)' }}>
          {filtered.length} kitap bulundu
        </p>

        {/* Kitap grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((book, i) => {
            const read = hasReadBook(book.id);
            const wishlisted = isInWishlist(book.id);
            
            return (
              <Link key={book.id} href={`/book/${book.id}`}>
                <div className="bite-book-card group relative" style={{ animationDelay: `${Math.min(i * 20, 300)}ms` }}>
                  {/* Kapak */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={e => {
                        const el = e.target as HTMLImageElement;
                        el.src = `https://via.placeholder.com/200x300/1E2535/F0A500?text=${encodeURIComponent(book.title.slice(0, 12))}`;
                      }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Badges */}
                    <div className="absolute top-1.5 right-1.5 flex flex-col gap-1">
                      <span className="text-xs font-mono-score font-bold px-1.5 py-0.5 rounded"
                        style={{ background: 'oklch(0.75 0.18 65)', color: 'oklch(0.10 0.03 260)' }}>
                        +{book.maxPoints}
                      </span>
                    </div>
                    {book.isClassic && (
                      <div className="absolute top-1.5 left-1.5">
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{ background: 'oklch(0.70 0.20 295 / 0.9)', color: 'white', fontSize: '0.6rem' }}>
                          Klasik
                        </span>
                      </div>
                    )}
                    
                    {/* Read indicator */}
                    {read && (
                      <div className="absolute bottom-1.5 left-1.5">
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'oklch(0.65 0.18 145)' }} />
                      </div>
                    )}

                    {/* Wishlist button */}
                    {currentUser && (
                      <button
                        onClick={e => handleWishlist(e, book.id)}
                        className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                        style={{ background: 'oklch(0.10 0.03 260 / 0.8)' }}
                      >
                        <Heart
                          className="w-3.5 h-3.5"
                          style={{ color: wishlisted ? 'oklch(0.65 0.22 25)' : 'oklch(0.70 0.03 260)' }}
                          fill={wishlisted ? 'oklch(0.65 0.22 25)' : 'none'}
                        />
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-2.5">
                    <p className="text-xs font-semibold leading-tight line-clamp-2 mb-1" style={{ color: 'oklch(0.88 0.02 75)' }}>
                      {book.title}
                    </p>
                    <p className="text-xs truncate mb-1.5" style={{ color: 'oklch(0.50 0.03 260)' }}>
                      {book.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: `${DIFFICULTY_COLORS[book.difficulty]}20`, color: DIFFICULTY_COLORS[book.difficulty], fontSize: '0.6rem' }}>
                        {book.difficulty}
                      </span>
                      <span className="text-xs" style={{ color: 'oklch(0.45 0.03 260)', fontSize: '0.6rem' }}>
                        {book.pageCount}s
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: 'oklch(0.30 0.03 260)' }} />
            <p style={{ color: 'oklch(0.50 0.03 260)' }}>Arama kriterlerine uygun kitap bulunamadı.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
