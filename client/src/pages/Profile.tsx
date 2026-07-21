// Bite BookSite — Profile Page
// Kullanıcı profili, okunan kitaplar, wishlist, takip sistemi

import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getBookById } from '@/lib/booksData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  BookOpen, Star, Trophy, Heart, Users, UserPlus, UserMinus,
  Edit2, Camera, Crown, Shield, CheckCircle2, Calendar, Zap
} from 'lucide-react';
import { Link } from 'wouter';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [, navigate] = useLocation();
  const { currentUser, getUserByUsername, followUser, unfollowUser, isFollowing, getReadBooks, getWishlist, updateUser } = useAuth();
  
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ displayName: '', bio: '', avatarUrl: '' });
  const [activeTab, setActiveTab] = useState<'read' | 'wishlist' | 'stats'>('read');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Dosya 2MB\'dan küçük olmalı.'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setEditForm(f => ({ ...f, avatarUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const profileUser = username ? getUserByUsername(username) : currentUser;
  const isOwnProfile = currentUser?.id === profileUser?.id;
  const following = profileUser ? isFollowing(profileUser.id) : false;
  const readBooks = profileUser ? getReadBooks(profileUser.id) : [];
  const wishlist = profileUser ? getWishlist(profileUser.id) : [];

  useEffect(() => {
    if (profileUser) {
      setEditForm({ displayName: profileUser.displayName, bio: profileUser.bio, avatarUrl: profileUser.avatarUrl });
    }
  }, [profileUser]);

  if (!profileUser) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p style={{ color: 'oklch(0.55 0.03 260)' }}>Kullanıcı bulunamadı.</p>
        </div>
      </Layout>
    );
  }

  const handleSaveProfile = () => {
    if (!editForm.displayName.trim()) { toast.error('Görünen ad boş olamaz.'); return; }
    updateUser({ displayName: editForm.displayName.trim(), bio: editForm.bio.trim(), avatarUrl: editForm.avatarUrl.trim() });
    setEditing(false);
    toast.success('Profil güncellendi!');
  };

  const handleFollow = () => {
    if (!currentUser) { navigate('/auth'); return; }
    if (following) {
      unfollowUser(profileUser.id);
      toast.success(`@${profileUser.username} takibinden çıkıldı.`);
    } else {
      followUser(profileUser.id);
      toast.success(`@${profileUser.username} takip ediliyor!`);
    }
  };

  return (
    <Layout>
      <div className="container py-8 fade-in-up">
        {/* Profile header */}
        <div className="bite-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profileUser.avatarUrl} />
                <AvatarFallback className="text-2xl font-display font-bold" style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)' }}>
                  {profileUser.displayName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && editing && (
                <label className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'oklch(0.75 0.18 65)' }} title="Fotoğraf yükle">
                  <Camera className="w-3.5 h-3.5" style={{ color: 'oklch(0.10 0.03 260)' }} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-3">
                  <Input
                    value={editForm.displayName}
                    onChange={e => setEditForm(f => ({ ...f, displayName: e.target.value }))}
                    placeholder="Görünen Ad"
                    className="max-w-xs h-9 text-sm"
                  />
                  <Textarea
                    value={editForm.bio}
                    onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                    placeholder="Biyografi..."
                    rows={2}
                    className="max-w-sm text-sm resize-none"
                  />
                  <Input
                    value={editForm.avatarUrl}
                    onChange={e => setEditForm(f => ({ ...f, avatarUrl: e.target.value }))}
                    placeholder="Avatar URL (opsiyonel)"
                    className="max-w-sm h-9 text-sm"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveProfile} className="amber-gradient text-xs font-semibold" style={{ color: 'oklch(0.10 0.03 260)' }}>
                      Kaydet
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="font-display text-2xl font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>
                      {profileUser.displayName}
                    </h1>
                    {profileUser.plan === 'premium' && (
                      <span className="premium-badge flex items-center gap-1">
                        <Crown className="w-2.5 h-2.5" /> Premium
                      </span>
                    )}
                    {profileUser.isAdmin && (
                      <span className="admin-badge flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5" /> Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-2" style={{ color: 'oklch(0.50 0.03 260)' }}>@{profileUser.username}</p>
                  {profileUser.bio && (
                    <p className="text-sm mb-2" style={{ color: 'oklch(0.65 0.03 260)' }}>{profileUser.bio}</p>
                  )}
                  <p className="text-xs" style={{ color: 'oklch(0.40 0.03 260)' }}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {new Date(profileUser.joinedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })} tarihinde katıldı
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {isOwnProfile ? (
                !editing && (
                  <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="text-xs"
                    style={{ borderColor: 'oklch(1 0 0 / 0.12)', color: 'oklch(0.65 0.03 260)' }}>
                    <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                    Düzenle
                  </Button>
                )
              ) : (
                <Button size="sm" onClick={handleFollow}
                  style={{
                    background: following ? 'transparent' : 'oklch(0.75 0.18 65)',
                    color: following ? 'oklch(0.65 0.03 260)' : 'oklch(0.10 0.03 260)',
                    border: following ? '1px solid oklch(1 0 0 / 0.12)' : 'none',
                  }}>
                  {following ? (
                    <><UserMinus className="w-3.5 h-3.5 mr-1.5" />Takibi Bırak</>
                  ) : (
                    <><UserPlus className="w-3.5 h-3.5 mr-1.5" />Takip Et</>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-5 border-t" style={{ borderColor: 'oklch(1 0 0 / 0.07)' }}>
            {[
              { icon: Star, label: 'Toplam Puan', value: profileUser.totalPoints.toLocaleString(), color: 'oklch(0.75 0.18 65)' },
              { icon: BookOpen, label: 'Okunan Kitap', value: readBooks.length.toString(), color: 'oklch(0.65 0.18 145)' },
              { icon: Users, label: 'Takipçi', value: profileUser.followersCount.toString(), color: 'oklch(0.65 0.15 220)' },
              { icon: Heart, label: 'Sonra Oku', value: wishlist.length.toString(), color: 'oklch(0.65 0.22 25)' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="text-center">
                <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                <p className="text-lg font-mono-score font-bold" style={{ color: 'oklch(0.88 0.02 75)' }}>{value}</p>
                <p className="text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-lg w-fit" style={{ background: 'oklch(0.15 0.04 258)' }}>
          {[
            { key: 'read', label: 'Okunanlar', count: readBooks.length },
            { key: 'wishlist', label: 'Sonra Oku', count: wishlist.length },
            { key: 'stats', label: 'İstatistikler', count: null },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === key ? 'oklch(0.75 0.18 65)' : 'transparent',
                color: activeTab === key ? 'oklch(0.10 0.03 260)' : 'oklch(0.55 0.03 260)',
              }}
            >
              {label} {count !== null && <span className="ml-1 text-xs opacity-70">({count})</span>}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'read' && (
          <div>
            {readBooks.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: 'oklch(0.30 0.03 260)' }} />
                <p style={{ color: 'oklch(0.50 0.03 260)' }}>
                  {isOwnProfile ? 'Henüz kitap okumadın.' : 'Bu kullanıcı henüz kitap okumamış.'}
                </p>
                {isOwnProfile && (
                  <Link href="/library">
                    <Button className="mt-4 amber-gradient text-sm font-semibold" style={{ color: 'oklch(0.10 0.03 260)' }}>
                      Kütüphaneye Git
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {readBooks.sort((a, b) => new Date(b.readAt).getTime() - new Date(a.readAt).getTime()).map(rb => {
                  const book = getBookById(rb.bookId);
                  if (!book) return null;
                  return (
                    <Link key={rb.bookId} href={`/book/${book.id}`}>
                      <div className="bite-book-card group">
                        <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={e => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300/1E2535/F0A500?text=${encodeURIComponent(book.title.slice(0, 12))}`; }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-2 left-2 flex items-center gap-1">
                            {Array.from({ length: rb.rating }).map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5 fill-current" style={{ color: 'oklch(0.75 0.18 65)' }} />
                            ))}
                          </div>
                          <div className="absolute top-2 right-2">
                            <span className="text-xs font-mono-score font-bold px-1.5 py-0.5 rounded" style={{ background: 'oklch(0.65 0.18 145)', color: 'white' }}>
                              +{rb.pointsEarned}
                            </span>
                          </div>
                          <CheckCircle2 className="absolute top-2 left-2 w-4 h-4" style={{ color: 'oklch(0.65 0.18 145)' }} />
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ color: 'oklch(0.88 0.02 75)' }}>{book.title}</p>
                          <p className="text-xs mt-0.5 truncate" style={{ color: 'oklch(0.50 0.03 260)' }}>{book.author}</p>
                          {rb.quizScore !== undefined && (
                            <p className="text-xs mt-1" style={{ color: 'oklch(0.70 0.20 295)' }}>Sınav: %{rb.quizScore}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 mx-auto mb-3" style={{ color: 'oklch(0.30 0.03 260)' }} />
                <p style={{ color: 'oklch(0.50 0.03 260)' }}>Sonra oku listesi boş.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {wishlist.map(w => {
                  const book = getBookById(w.bookId);
                  if (!book) return null;
                  return (
                    <Link key={w.bookId} href={`/book/${book.id}`}>
                      <div className="bite-book-card group">
                        <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={e => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x300/1E2535/F0A500?text=${encodeURIComponent(book.title.slice(0, 12))}`; }} />
                          <div className="absolute top-2 right-2">
                            <Heart className="w-4 h-4 fill-current" style={{ color: 'oklch(0.65 0.22 25)' }} />
                          </div>
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ color: 'oklch(0.88 0.02 75)' }}>{book.title}</p>
                          <p className="text-xs mt-0.5 truncate" style={{ color: 'oklch(0.50 0.03 260)' }}>{book.author}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Toplam Puan', value: profileUser.totalPoints, icon: Star, color: 'oklch(0.75 0.18 65)' },
              { label: 'Bugünkü Puan', value: profileUser.dailyPoints, icon: Zap, color: 'oklch(0.65 0.18 145)' },
              { label: 'Haftalık Puan', value: profileUser.weeklyPoints, icon: Trophy, color: 'oklch(0.70 0.20 295)' },
              { label: 'Aylık Puan', value: profileUser.monthlyPoints, icon: Trophy, color: 'oklch(0.65 0.22 25)' },
              { label: 'Okunan Kitap', value: readBooks.length, icon: BookOpen, color: 'oklch(0.65 0.15 220)' },
              { label: 'Takipçi Sayısı', value: profileUser.followersCount, icon: Users, color: 'oklch(0.60 0.18 145)' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bite-card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <p className="text-sm" style={{ color: 'oklch(0.55 0.03 260)' }}>{label}</p>
                </div>
                <p className="text-3xl font-mono-score font-bold" style={{ color: 'oklch(0.88 0.02 75)' }}>
                  {value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
