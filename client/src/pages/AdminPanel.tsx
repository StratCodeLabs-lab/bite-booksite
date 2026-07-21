// Bite BookSite — Admin Panel
// Kitap ekleme, gönderi onaylama, kullanıcı yönetimi, ödül sistemi

import { useState } from 'react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  Shield, BookPlus, CheckCircle, X, Users, Trophy, Mail,
  Gift, Crown, Star, Newspaper, Settings, ChevronRight,
  AlertCircle, Eye, Trash2, Plus
} from 'lucide-react';
import { ALL_CATEGORIES, type BookCategory } from '@/lib/booksData';

type AdminTab = 'books' | 'posts' | 'users' | 'rewards';

export default function AdminPanel() {
  const [, navigate] = useLocation();
  const { currentUser, getAllUsers, addBook, grantPostCredits, setPremium, getLeaderboard } = useAuth();
  const { getPendingPosts, approvePost, rejectPost } = usePosts();
  const [activeTab, setActiveTab] = useState<AdminTab>('posts');

  // Redirect if not admin
  if (!currentUser?.isAdmin) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.30 0.03 260)' }} />
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'oklch(0.88 0.02 75)' }}>
            Erişim Reddedildi
          </h2>
          <p style={{ color: 'oklch(0.55 0.03 260)' }}>Bu sayfaya erişim yetkiniz yok.</p>
          <Button onClick={() => navigate('/')} className="mt-4 amber-gradient font-semibold" style={{ color: 'oklch(0.10 0.03 260)' }}>
            Ana Sayfaya Dön
          </Button>
        </div>
      </Layout>
    );
  }

  const pendingPosts = getPendingPosts();
  const allUsers = getAllUsers();
  const dailyLeaders = getLeaderboard('daily');
  const weeklyLeaders = getLeaderboard('weekly');
  const monthlyLeaders = getLeaderboard('monthly');

  return (
    <Layout>
      <div className="container py-8 fade-in-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'oklch(0.65 0.22 25 / 0.15)' }}>
            <Shield className="w-5 h-5" style={{ color: 'oklch(0.65 0.22 25)' }} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>Admin Paneli</h1>
            <p className="text-sm" style={{ color: 'oklch(0.55 0.03 260)' }}>
              Giriş: {currentUser.email}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Kullanıcı', value: allUsers.length, color: 'oklch(0.65 0.15 220)' },
            { label: 'Bekleyen Gönderi', value: pendingPosts.length, color: 'oklch(0.75 0.18 65)' },
            { label: 'Premium Üye', value: allUsers.filter(u => u.plan === 'premium').length, color: 'oklch(0.70 0.20 295)' },
            { label: 'Toplam Puan', value: allUsers.reduce((s, u) => s + u.totalPoints, 0), color: 'oklch(0.65 0.22 25)' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bite-card p-4">
              <p className="text-2xl font-mono-score font-bold" style={{ color: 'oklch(0.88 0.02 75)' }}>
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              <p className="text-xs mt-1" style={{ color: 'oklch(0.50 0.03 260)' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 rounded-xl w-fit" style={{ background: 'oklch(0.15 0.04 258)' }}>
          {([
            { key: 'posts', label: 'Gönderiler', icon: Newspaper, badge: pendingPosts.length },
            { key: 'books', label: 'Kitap Ekle', icon: BookPlus, badge: 0 },
            { key: 'users', label: 'Kullanıcılar', icon: Users, badge: 0 },
            { key: 'rewards', label: 'Ödüller', icon: Trophy, badge: 0 },
          ] as const).map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === key ? 'oklch(0.75 0.18 65)' : 'transparent',
                color: activeTab === key ? 'oklch(0.10 0.03 260)' : 'oklch(0.55 0.03 260)',
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
              {badge > 0 && (
                <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: activeTab === key ? 'oklch(0.10 0.03 260 / 0.2)' : 'oklch(0.65 0.22 25)', color: 'white' }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab: Gönderi Onaylama */}
        {activeTab === 'posts' && (
          <PostsTab pendingPosts={pendingPosts} approvePost={approvePost} rejectPost={rejectPost} getUserById={useAuth().getUserById} />
        )}

        {/* Tab: Kitap Ekle */}
        {activeTab === 'books' && (
          <AddBookTab addBook={addBook} />
        )}

        {/* Tab: Kullanıcılar */}
        {activeTab === 'users' && (
          <UsersTab allUsers={allUsers} grantPostCredits={grantPostCredits} setPremium={setPremium} />
        )}

        {/* Tab: Ödüller */}
        {activeTab === 'rewards' && (
          <RewardsTab
            dailyLeaders={dailyLeaders}
            weeklyLeaders={weeklyLeaders}
            monthlyLeaders={monthlyLeaders}
            grantPostCredits={grantPostCredits}
          />
        )}
      </div>
    </Layout>
  );
}

// ─── Posts Tab ───────────────────────────────────────────────────────────────
function PostsTab({ pendingPosts, approvePost, rejectPost, getUserById }: any) {
  if (pendingPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: 'oklch(0.65 0.18 145)' }} />
        <p style={{ color: 'oklch(0.55 0.03 260)' }}>Onay bekleyen gönderi yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: 'oklch(0.55 0.03 260)' }}>
        {pendingPosts.length} gönderi onay bekliyor
      </p>
      {pendingPosts.map((post: any) => {
        const author = getUserById(post.userId);
        return (
          <div key={post.id} className="bite-card p-5">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={author?.avatarUrl} />
                <AvatarFallback style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)', fontSize: '0.7rem' }}>
                  {author?.displayName[0]?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium" style={{ color: 'oklch(0.85 0.02 75)' }}>{author?.displayName}</p>
                <p className="text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>@{author?.username} · {new Date(post.createdAt).toLocaleDateString('tr-TR')}</p>
              </div>
            </div>
            <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'oklch(0.90 0.02 75)' }}>{post.title}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'oklch(0.65 0.03 260)' }}>{post.content}</p>
            <div className="flex gap-3">
              <Button size="sm" onClick={() => { approvePost(post.id); toast.success('Gönderi onaylandı!'); }}
                className="font-semibold text-xs" style={{ background: 'oklch(0.65 0.18 145)', color: 'white' }}>
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />Onayla
              </Button>
              <Button size="sm" variant="outline" onClick={() => { rejectPost(post.id, 'Admin tarafından reddedildi.'); toast.success('Gönderi reddedildi.'); }}
                className="text-xs" style={{ borderColor: 'oklch(0.65 0.22 25 / 0.4)', color: 'oklch(0.65 0.22 25)' }}>
                <X className="w-3.5 h-3.5 mr-1.5" />Reddet
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Add Book Tab ─────────────────────────────────────────────────────────────
function AddBookTab({ addBook }: any) {
  const [form, setForm] = useState({
    title: '', author: '', year: '', pageCount: '', category: 'Roman' as BookCategory,
    difficulty: 'Orta', maxPoints: '25', description: '', coverUrl: '',
    language: 'Türkçe', isClassic: false, tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.description) {
      toast.error('Başlık, yazar ve açıklama zorunlu.');
      return;
    }
    const result = addBook({
      title: form.title,
      author: form.author,
      year: parseInt(form.year) || 2000,
      pageCount: parseInt(form.pageCount) || 200,
      category: form.category,
      difficulty: form.difficulty as any,
      maxPoints: parseInt(form.maxPoints) || 25,
      description: form.description,
      coverUrl: form.coverUrl || `https://via.placeholder.com/200x300/1E2535/F0A500?text=${encodeURIComponent(form.title.slice(0, 12))}`,
      language: form.language,
      isClassic: form.isClassic,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    if (result.success) {
      toast.success('Kitap eklendi!');
      setForm({ title: '', author: '', year: '', pageCount: '', category: 'Roman', difficulty: 'Orta', maxPoints: '25', description: '', coverUrl: '', language: 'Türkçe', isClassic: false, tags: '' });
    } else {
      toast.error(result.error || 'Hata oluştu.');
    }
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="bite-card p-6 space-y-4">
        <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'oklch(0.90 0.02 75)' }}>Yeni Kitap Ekle</h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Kitap Adı *</Label>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Kitap adı" className="h-9 text-sm" required />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Yazar *</Label>
            <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Yazar adı" className="h-9 text-sm" required />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Yıl</Label>
            <Input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2024" className="h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Sayfa Sayısı</Label>
            <Input type="number" value={form.pageCount} onChange={e => setForm(f => ({ ...f, pageCount: e.target.value }))} placeholder="300" className="h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Kategori</Label>
            <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as BookCategory }))}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ALL_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Zorluk</Label>
            <Select value={form.difficulty} onValueChange={v => setForm(f => ({ ...f, difficulty: v }))}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Kolay', 'Orta', 'Zor', 'Çok Zor'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Maks. Puan (15-50)</Label>
            <Input type="number" min={15} max={50} value={form.maxPoints} onChange={e => setForm(f => ({ ...f, maxPoints: e.target.value }))} className="h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Dil</Label>
            <Input value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} placeholder="Türkçe" className="h-9 text-sm" />
          </div>
        </div>

        <div>
          <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Kapak Görseli URL</Label>
          <Input value={form.coverUrl} onChange={e => setForm(f => ({ ...f, coverUrl: e.target.value }))} placeholder="https://..." className="h-9 text-sm" />
        </div>

        <div>
          <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Açıklama *</Label>
          <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Kitap hakkında..." rows={3} className="text-sm resize-none" required />
        </div>

        <div>
          <Label className="text-xs mb-1.5 block" style={{ color: 'oklch(0.60 0.03 260)' }}>Etiketler (virgülle ayır)</Label>
          <Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="roman, macera, klasik" className="h-9 text-sm" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="isClassic" checked={form.isClassic} onChange={e => setForm(f => ({ ...f, isClassic: e.target.checked }))} className="w-4 h-4" />
          <Label htmlFor="isClassic" className="text-sm cursor-pointer" style={{ color: 'oklch(0.70 0.03 260)' }}>
            Dünya Klasiği (sınav zorunlu)
          </Label>
        </div>

        <Button type="submit" className="w-full amber-gradient font-semibold" style={{ color: 'oklch(0.10 0.03 260)' }}>
          <Plus className="w-4 h-4 mr-2" />
          Kitabı Ekle
        </Button>
      </form>
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab({ allUsers, grantPostCredits, setPremium }: any) {
  const [search, setSearch] = useState('');
  const filtered = search ? allUsers.filter((u: any) =>
    u.username.includes(search.toLowerCase()) || u.displayName.toLowerCase().includes(search.toLowerCase())
  ) : allUsers;

  return (
    <div>
      <div className="mb-4">
        <Input placeholder="Kullanıcı ara..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs h-9 text-sm" />
      </div>
      <div className="space-y-3">
        {filtered.map((user: any) => (
          <div key={user.id} className="bite-card p-4 flex flex-wrap items-center gap-4">
            <Avatar className="w-9 h-9 flex-shrink-0">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)', fontSize: '0.7rem' }}>
                {user.displayName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium" style={{ color: 'oklch(0.85 0.02 75)' }}>{user.displayName}</p>
                {user.plan === 'premium' && <Crown className="w-3 h-3" style={{ color: 'oklch(0.70 0.20 295)' }} />}
                {user.isAdmin && <Shield className="w-3 h-3" style={{ color: 'oklch(0.65 0.22 25)' }} />}
              </div>
              <p className="text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>@{user.username} · {user.email}</p>
              <p className="text-xs mt-0.5" style={{ color: 'oklch(0.55 0.03 260)' }}>
                {user.totalPoints.toLocaleString()} puan · {user.postCredits} gönderi hakkı
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => { grantPostCredits(user.id, 3); toast.success(`@${user.username}'e 3 gönderi hakkı verildi.`); }}
                className="text-xs" style={{ borderColor: 'oklch(0.75 0.18 65 / 0.3)', color: 'oklch(0.75 0.18 65)' }}>
                +3 Gönderi Hakkı
              </Button>
              {user.plan === 'free' && (
                <Button size="sm" variant="outline" onClick={() => { setPremium(user.id, true); toast.success(`@${user.username} Premium yapıldı!`); }}
                  className="text-xs" style={{ borderColor: 'oklch(0.70 0.20 295 / 0.3)', color: 'oklch(0.70 0.20 295)' }}>
                  <Crown className="w-3 h-3 mr-1" />Premium Yap
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Rewards Tab ──────────────────────────────────────────────────────────────
function RewardsTab({ dailyLeaders, weeklyLeaders, monthlyLeaders, grantPostCredits }: any) {
  const [emailSent, setEmailSent] = useState<string[]>([]);

  const sendRewardEmail = (user: any, type: string) => {
    const key = `${type}-${user.id}`;
    if (emailSent.includes(key)) { toast.error('Bu ödül zaten gönderildi.'); return; }
    // Simüle edilmiş mail gönderimi
    toast.success(`📧 ${user.email} adresine ${type} ödül maili gönderildi!`);
    setEmailSent(prev => [...prev, key]);
    grantPostCredits(user.id, 3);
  };

  const LeaderCard = ({ user, rank, type, label }: any) => {
    const key = `${type}-${user.id}`;
    const sent = emailSent.includes(key);
    return (
      <div className="bite-card p-4 flex items-center gap-4">
        <span className="text-2xl">{rank === 0 ? '' : rank === 1 ? '' : ''}</span>
        <Avatar className="w-9 h-9">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)', fontSize: '0.7rem' }}>
            {user.displayName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium" style={{ color: 'oklch(0.85 0.02 75)' }}>{user.displayName}</p>
          <p className="text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>{user.email}</p>
        </div>
        {rank === 0 && (
          <Button size="sm" disabled={sent} onClick={() => sendRewardEmail(user, type)}
            className="text-xs flex-shrink-0"
            style={{ background: sent ? 'oklch(0.30 0.03 260)' : 'oklch(0.65 0.18 145)', color: 'white' }}>
            <Mail className="w-3.5 h-3.5 mr-1.5" />
            {sent ? 'Gönderildi' : 'Mail Gönder'}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-xl" style={{ background: 'oklch(0.75 0.18 65 / 0.06)', border: '1px solid oklch(0.75 0.18 65 / 0.15)' }}>
        <p className="text-sm" style={{ color: 'oklch(0.70 0.03 260)' }}>
          <strong style={{ color: 'oklch(0.75 0.18 65)' }}>Ödül Sistemi:</strong> Günlük birinci → 3 gönderi hakkı (1 gün).
          Haftalık birinci → Mail + kitap hediyesi + 3 gönderi hakkı.
          Aylık birinci → 3 kitap hediyesi + 3 gönderi hakkı. Her birincilik bir kerelik.
        </p>
      </div>

      {[
        { title: 'Günlük Liderler', leaders: dailyLeaders.slice(0, 3), type: 'daily' },
        { title: 'Haftalık Liderler', leaders: weeklyLeaders.slice(0, 3), type: 'weekly' },
        { title: 'Aylık Liderler', leaders: monthlyLeaders.slice(0, 3), type: 'monthly' },
      ].map(({ title, leaders, type }) => (
        <div key={type}>
          <h3 className="font-display text-lg font-bold mb-3" style={{ color: 'oklch(0.88 0.02 75)' }}>{title}</h3>
          {leaders.length === 0 ? (
            <p className="text-sm" style={{ color: 'oklch(0.45 0.03 260)' }}>Henüz puan kazanılmadı.</p>
          ) : (
            <div className="space-y-2">
              {leaders.map((user: any, i: number) => (
                <LeaderCard key={user.id} user={user} rank={i} type={type} label={title} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
