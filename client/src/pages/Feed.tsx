// Bite BookSite — Feed Page
// Gönderi platformu: onaylı gönderiler, gönderi oluşturma

import { useState } from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Newspaper, Heart, MessageSquare, Plus, Clock, CheckCircle, X, FileText, Briefcase, Code, MessageCircle } from 'lucide-react';

const POST_TYPE_LABELS = {
  article: 'Makale',
  project: 'Proje',
  work: 'İş/Kariyer',
  general: 'Genel',
};

const POST_TYPE_ICONS = {
  article: FileText,
  project: Code,
  work: Briefcase,
  general: MessageCircle,
};

export default function Feed() {
  const { currentUser, getUserById, updateUser } = useAuth();
  const { getApprovedPosts, createPost, getUserPosts, likePost, unlikePost, isLikedPost } = usePosts();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', type: 'general' as keyof typeof POST_TYPE_LABELS });
  const [submitting, setSubmitting] = useState(false);

  const posts = getApprovedPosts();
  const myPendingPosts = currentUser ? getUserPosts(currentUser.id).filter(p => p.status === 'pending') : [];
  const canPost = currentUser && (currentUser.postCredits > 0 || currentUser.isAdmin);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.content.trim()) { toast.error('Başlık ve içerik zorunlu.'); return; }
    if (!currentUser) { toast.error('Giriş yapmalısınız.'); return; }
    if (!currentUser.isAdmin && currentUser.postCredits <= 0) { toast.error('Gönderi hakkınız kalmadı.'); return; }
    setSubmitting(true);
    const result = createPost({ title: form.title.trim(), content: form.content.trim(), type: form.type });
    if (result.success) {
      // Admin değilse gönderi hakkını düşür
      if (!currentUser.isAdmin) {
        updateUser({ postCredits: Math.max(0, currentUser.postCredits - 1) });
      }
      toast.success('Gönderiniz admin onaylına gönderildi!');
      setForm({ title: '', content: '', type: 'general' });
      setShowCreate(false);
    } else {
      toast.error(result.error || 'Hata oluştu.');
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="container py-8 fade-in-up">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-3xl font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>
                Gönderi Akışı
              </h1>
              <p className="text-sm mt-1" style={{ color: 'oklch(0.55 0.03 260)' }}>
                Okuyucuların paylaşımları
              </p>
            </div>
            {canPost && (
              <Button
                onClick={() => setShowCreate(s => !s)}
                className="amber-gradient font-semibold text-sm"
                style={{ color: 'oklch(0.10 0.03 260)' }}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Paylaş
              </Button>
            )}
          </div>

          {/* Post limit info */}
          {currentUser && !currentUser.isAdmin && (
            <div className="mb-4 p-3 rounded-lg text-xs" style={{ background: 'oklch(0.15 0.04 258)', border: '1px solid oklch(1 0 0 / 0.08)' }}>
              <span style={{ color: 'oklch(0.55 0.03 260)' }}>Gönderi hakkın: </span>
              <span className="font-mono-score font-bold" style={{ color: currentUser.postCredits > 0 ? 'oklch(0.75 0.18 65)' : 'oklch(0.55 0.03 260)' }}>
                {currentUser.postCredits}
              </span>
              <span style={{ color: 'oklch(0.45 0.03 260)' }}> · Günlük/haftalık/aylık birinciler gönderi hakkı kazanır</span>
            </div>
          )}

          {/* Bekleyen gönderiler */}
          {myPendingPosts.length > 0 && (
            <div className="mb-6 p-4 rounded-xl" style={{ background: 'oklch(0.75 0.18 65 / 0.06)', border: '1px solid oklch(0.75 0.18 65 / 0.15)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: 'oklch(0.75 0.18 65)' }} />
                <p className="text-sm font-medium" style={{ color: 'oklch(0.75 0.18 65)' }}>
                  {myPendingPosts.length} gönderiniz admin onayı bekliyor
                </p>
              </div>
              {myPendingPosts.map(p => (
                <p key={p.id} className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>• {p.title}</p>
              ))}
            </div>
          )}

          {/* Create post form */}
          {showCreate && (
            <div className="bite-card p-5 mb-6 fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold" style={{ color: 'oklch(0.88 0.02 75)' }}>Yeni Gönderi</h3>
                <button onClick={() => setShowCreate(false)}>
                  <X className="w-4 h-4" style={{ color: 'oklch(0.50 0.03 260)' }} />
                </button>
              </div>
              
              <div className="space-y-3">
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as typeof form.type }))}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(POST_TYPE_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="Başlık"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="h-9 text-sm"
                />
                <Textarea
                  placeholder="İçerik..."
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={4}
                  className="text-sm resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>
                    Admin onayından sonra yayınlanacak
                  </p>
                  <Button
                    onClick={handleCreate}
                    disabled={submitting}
                    size="sm"
                    className="amber-gradient font-semibold text-xs"
                    style={{ color: 'oklch(0.10 0.03 260)' }}
                  >
                    Gönder
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Posts list */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-12 h-12 mx-auto mb-3" style={{ color: 'oklch(0.30 0.03 260)' }} />
              <p style={{ color: 'oklch(0.50 0.03 260)' }}>Henüz onaylı gönderi yok.</p>
              <p className="text-sm mt-1" style={{ color: 'oklch(0.40 0.03 260)' }}>
                Sıralamada birinci ol ve gönderi hakkı kazan!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => {
                const author = getUserById(post.userId);
                const liked = isLikedPost(post.id);
                const TypeIcon = POST_TYPE_ICONS[post.type] || MessageCircle;
                
                return (
                  <div key={post.id} className="bite-card p-5">
                    {/* Author */}
                    <div className="flex items-center gap-3 mb-3">
                      <Link href={`/profile/${author?.username}`}>
                        <Avatar className="w-9 h-9 cursor-pointer">
                          <AvatarImage src={author?.avatarUrl} />
                          <AvatarFallback style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)', fontSize: '0.75rem' }}>
                            {author?.displayName[0]?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/profile/${author?.username}`}>
                          <p className="text-sm font-medium hover:underline cursor-pointer" style={{ color: 'oklch(0.85 0.02 75)' }}>
                            {author?.displayName || 'Kullanıcı'}
                          </p>
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>
                            {new Date(post.approvedAt || post.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                          <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded" style={{ background: 'oklch(0.75 0.18 65 / 0.1)', color: 'oklch(0.75 0.18 65)' }}>
                            <TypeIcon className="w-2.5 h-2.5" />
                            {POST_TYPE_LABELS[post.type]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'oklch(0.90 0.02 75)' }}>
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.65 0.03 260)' }}>
                      {post.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t" style={{ borderColor: 'oklch(1 0 0 / 0.07)' }}>
                      <button
                        onClick={() => {
                          if (!currentUser) { toast.error('Beğenmek için giriş yapın.'); return; }
                          if (liked) unlikePost(post.id);
                          else likePost(post.id);
                        }}
                        className="flex items-center gap-1.5 text-sm transition-colors"
                        style={{ color: liked ? 'oklch(0.65 0.22 25)' : 'oklch(0.50 0.03 260)' }}
                      >
                        <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                        {post.likesCount}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
