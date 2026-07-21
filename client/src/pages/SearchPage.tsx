// Bite BookSite — Search Page
// Kullanıcı arama ve takip

import { useState } from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Search, UserPlus, UserMinus, Crown, Star, BookOpen } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { searchUsers, currentUser, followUser, unfollowUser, isFollowing } = useAuth();
  const results = query.length >= 2 ? searchUsers(query) : [];

  const handleFollow = (userId: string, username: string) => {
    if (!currentUser) { toast.error('Giriş yapmalısınız.'); return; }
    if (isFollowing(userId)) {
      unfollowUser(userId);
      toast.success(`@${username} takibinden çıkıldı.`);
    } else {
      followUser(userId);
      toast.success(`@${username} takip ediliyor!`);
    }
  };

  return (
    <Layout>
      <div className="container py-8 fade-in-up">
        <div className="max-w-xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-6" style={{ color: 'oklch(0.93 0.02 75)' }}>
            Kullanıcı Ara
          </h1>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.50 0.03 260)' }} />
            <Input
              placeholder="Kullanıcı adı veya görünen ad..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-9 h-11"
              autoFocus
            />
          </div>

          {query.length > 0 && query.length < 2 && (
            <p className="text-sm text-center py-8" style={{ color: 'oklch(0.45 0.03 260)' }}>
              En az 2 karakter girin
            </p>
          )}

          {results.length === 0 && query.length >= 2 && (
            <div className="text-center py-12">
              <Search className="w-10 h-10 mx-auto mb-3" style={{ color: 'oklch(0.30 0.03 260)' }} />
              <p style={{ color: 'oklch(0.50 0.03 260)' }}>Kullanıcı bulunamadı.</p>
            </div>
          )}

          <div className="space-y-3">
            {results.map(user => {
              const following = isFollowing(user.id);
              const isMe = currentUser?.id === user.id;
              return (
                <div key={user.id} className="bite-card p-4 flex items-center gap-4">
                  <Link href={`/profile/${user.username}`}>
                    <Avatar className="w-12 h-12 cursor-pointer flex-shrink-0">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)' }}>
                        {user.displayName[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${user.username}`}>
                      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                        <p className="text-sm font-medium" style={{ color: 'oklch(0.88 0.02 75)' }}>{user.displayName}</p>
                        {user.plan === 'premium' && <Crown className="w-3 h-3" style={{ color: 'oklch(0.70 0.20 295)' }} />}
                      </div>
                    </Link>
                    <p className="text-xs" style={{ color: 'oklch(0.50 0.03 260)' }}>@{user.username}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>
                        <Star className="w-3 h-3" style={{ color: 'oklch(0.75 0.18 65)' }} />
                        {user.totalPoints.toLocaleString()} puan
                      </span>
                    </div>
                  </div>
                  {!isMe && currentUser && (
                    <Button
                      size="sm"
                      onClick={() => handleFollow(user.id, user.username)}
                      className="flex-shrink-0 text-xs"
                      style={{
                        background: following ? 'transparent' : 'oklch(0.75 0.18 65)',
                        color: following ? 'oklch(0.65 0.03 260)' : 'oklch(0.10 0.03 260)',
                        border: following ? '1px solid oklch(1 0 0 / 0.12)' : 'none',
                      }}
                    >
                      {following ? <><UserMinus className="w-3 h-3 mr-1" />Takibi Bırak</> : <><UserPlus className="w-3 h-3 mr-1" />Takip</>}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
