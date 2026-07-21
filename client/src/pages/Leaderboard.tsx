// Bite BookSite — Leaderboard Page
// Günlük / Haftalık / Aylık sıralama tabloları

import { useState } from 'react';
import { Link } from 'wouter';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Calendar, Star, Crown, Medal, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type Period = 'daily' | 'weekly' | 'monthly';

const PERIOD_LABELS: Record<Period, string> = {
  daily: 'Günlük',
  weekly: 'Haftalık',
  monthly: 'Aylık',
};

const PERIOD_ICONS: Record<Period, React.ElementType> = {
  daily: Flame,
  weekly: Calendar,
  monthly: Trophy,
};

export default function Leaderboard() {
  const [period, setPeriod] = useState<Period>('daily');
  const { getLeaderboard, currentUser } = useAuth();
  const leaders = getLeaderboard(period);

  const getPoints = (user: ReturnType<typeof getLeaderboard>[0]) => {
    if (period === 'daily') return user.dailyPoints;
    if (period === 'weekly') return user.weeklyPoints;
    return user.monthlyPoints;
  };

  const getRankIcon = (i: number) => {
    if (i === 0) return '';
    if (i === 1) return '';
    if (i === 2) return '';
    return null;
  };

  return (
    <Layout>
      <div className="container py-8 fade-in-up">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'oklch(0.75 0.18 65 / 0.15)' }}>
              <Trophy className="w-5 h-5" style={{ color: 'oklch(0.75 0.18 65)' }} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>
                Sıralama Tablosu
              </h1>
              <p className="text-sm" style={{ color: 'oklch(0.55 0.03 260)' }}>
                En çok puan kazanan okuyucular · İlk 15
              </p>
            </div>
          </div>
        </div>

        {/* Period tabs */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl w-fit" style={{ background: 'oklch(0.15 0.04 258)' }}>
          {(['daily', 'weekly', 'monthly'] as Period[]).map(p => {
            const Icon = PERIOD_ICONS[p];
            return (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: period === p ? 'oklch(0.75 0.18 65)' : 'transparent',
                  color: period === p ? 'oklch(0.10 0.03 260)' : 'oklch(0.55 0.03 260)',
                }}
              >
                <Icon className="w-4 h-4" />
                {PERIOD_LABELS[p]}
              </button>
            );
          })}
        </div>

        {/* Ödül bilgisi */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '', title: 'Günlük Birinci', desc: '3 gönderi hakkı (1 gün)', color: 'oklch(0.75 0.18 65)' },
            { icon: '', title: 'Haftalık Birinci', desc: 'Mail + Kitap hediyesi + 3 gönderi hakkı', color: 'oklch(0.70 0.20 295)' },
            { icon: '', title: 'Aylık Birinci', desc: '3 Kitap hediyesi + 3 gönderi hakkı', color: 'oklch(0.65 0.22 25)' },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className="paper-card rounded-xl p-4 stagger-item">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-display text-sm font-bold mb-1" style={{ color: 'oklch(0.88 0.02 75)' }}>{title}</p>
              <p className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="paper-card rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="flex items-center gap-4 px-5 py-3 border-b text-xs font-medium" style={{ borderColor: 'oklch(1 0 0 / 0.07)', color: 'oklch(0.45 0.03 260)' }}>
            <span className="w-8 text-center">#</span>
            <span className="flex-1">Kullanıcı</span>
            <span className="w-24 text-right">Puan</span>
          </div>

          {leaders.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="w-12 h-12 mx-auto mb-3" style={{ color: 'oklch(0.30 0.03 260)' }} />
              <p style={{ color: 'oklch(0.50 0.03 260)' }}>Henüz sıralama yok.</p>
              <p className="text-sm mt-1" style={{ color: 'oklch(0.40 0.03 260)' }}>İlk kitabını oku ve sıralamaya gir!</p>
            </div>
          ) : (
            leaders.map((user, i) => {
              const isCurrentUser = currentUser?.id === user.id;
              const rankIcon = getRankIcon(i);
              const points = getPoints(user);
              
              return (
                <Link key={user.id} href={`/profile/${user.username}`}>
                  <div
                    className="flex items-center gap-4 px-5 py-4 border-b transition-all duration-150 hover:bg-white/3 cursor-pointer stagger-item"
                    style={{
                      borderColor: 'oklch(1 0 0 / 0.05)',
                      background: isCurrentUser ? 'oklch(0.75 0.18 65 / 0.05)' : i === 0 ? 'oklch(0.75 0.18 65 / 0.03)' : 'transparent',
                    }}
                  >
                    {/* Rank */}
                    <div className="w-8 text-center flex-shrink-0">
                      {rankIcon ? (
                        <span className="text-xl">{rankIcon}</span>
                      ) : (
                        <span className="text-sm font-mono-score font-bold" style={{ color: 'oklch(0.45 0.03 260)' }}>
                          {i + 1}
                        </span>
                      )}
                    </div>

                    {/* User */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="w-9 h-9 flex-shrink-0">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback style={{ background: i === 0 ? 'oklch(0.75 0.18 65 / 0.3)' : 'oklch(0.22 0.04 258)', color: i === 0 ? 'oklch(0.75 0.18 65)' : 'oklch(0.65 0.03 260)', fontSize: '0.75rem' }}>
                          {user.displayName[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium truncate" style={{ color: isCurrentUser ? 'oklch(0.75 0.18 65)' : 'oklch(0.88 0.02 75)' }}>
                            {user.displayName}
                            {isCurrentUser && ' (Sen)'}
                          </p>
                          {user.plan === 'premium' && <Crown className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(0.70 0.20 295)' }} />}
                        </div>
                        <p className="text-xs truncate" style={{ color: 'oklch(0.45 0.03 260)' }}>@{user.username}</p>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="w-24 text-right flex-shrink-0">
                      <p className="text-base font-mono-score font-bold" style={{ color: i === 0 ? 'oklch(0.85 0.18 65)' : i === 1 ? 'oklch(0.75 0.05 260)' : i === 2 ? 'oklch(0.70 0.15 45)' : 'oklch(0.75 0.18 65)' }}>
                        {points.toLocaleString()}
                      </p>
                      <p className="text-xs" style={{ color: 'oklch(0.40 0.03 260)' }}>puan</p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Mevcut kullanıcı sırası */}
        {currentUser && !leaders.find(u => u.id === currentUser.id) && (
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'oklch(0.75 0.18 65 / 0.06)', border: '1px solid oklch(0.75 0.18 65 / 0.15)' }}>
            <p className="text-sm" style={{ color: 'oklch(0.70 0.03 260)' }}>
              Senin {PERIOD_LABELS[period].toLowerCase()} puanın:{' '}
              <span className="font-mono-score font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>
                {period === 'daily' ? currentUser.dailyPoints : period === 'weekly' ? currentUser.weeklyPoints : currentUser.monthlyPoints}
              </span>
              {' '}— İlk 15'e girmek için daha fazla kitap oku!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
