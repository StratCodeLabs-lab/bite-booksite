// Bite BookSite — Auth Page (Giriş / Kayıt)

import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { BookOpen, Eye, EyeOff, Star, Trophy, Users } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { login, register } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    displayName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        const result = await login(form.email, form.password);
        if (result.success) {
          toast.success('Hoş geldin! ');
          navigate('/');
        } else {
          toast.error(result.error || 'Giriş başarısız.');
        }
      } else {
        const result = await register({
          email: form.email,
          password: form.password,
          username: form.username,
          displayName: form.displayName || form.username,
        });
        if (result.success) {
          toast.success('Hesabın oluşturuldu! Okumaya başlayabilirsin ');
          navigate('/');
        } else {
          toast.error(result.error || 'Kayıt başarısız.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'oklch(0.10 0.03 260)' }}>
      {/* Sol panel - hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'oklch(0.12 0.04 260)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('/library-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.10 0.03 260 / 0.9), oklch(0.12 0.04 260 / 0.7))' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="Bite" className="w-10 h-10 object-contain" />
            <span className="font-display text-2xl font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>Bite</span>
          </div>
          
          <h1 className="font-display text-4xl font-bold leading-tight mb-4" style={{ color: 'oklch(0.93 0.02 75)' }}>
            Her sayfa<br />
            <span style={{ color: 'oklch(0.75 0.18 65)' }}>bir adım öne.</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'oklch(0.65 0.03 260)' }}>
            Oku, puan al, zirvede ol. Kitap okumayı rekabetçi ve ödüllendirici yapan platform.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            { icon: Star, text: 'Her kitaptan 15-50 puan kazan' },
            { icon: Trophy, text: 'Günlük, haftalık, aylık sıralamalar' },
            { icon: Users, text: 'Okuyucu topluluğuna katıl' },
            { icon: BookOpen, text: '100+ kitap, sınav sistemi ve ödüller' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'oklch(0.75 0.18 65 / 0.15)' }}>
                <Icon className="w-4 h-4" style={{ color: 'oklch(0.75 0.18 65)' }} />
              </div>
              <span className="text-sm" style={{ color: 'oklch(0.75 0.03 260)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <img src="/logo.png" alt="Bite" className="w-8 h-8 object-contain" />
            <span className="font-display text-xl font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>Bite</span>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'oklch(0.93 0.02 75)' }}>
              {mode === 'login' ? 'Tekrar hoş geldin' : 'Hesap oluştur'}
            </h2>
            <p className="text-sm" style={{ color: 'oklch(0.55 0.03 260)' }}>
              {mode === 'login' ? 'Okuma serüvenine devam et' : 'Okuma serüvenine başla'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-lg p-1 mb-6" style={{ background: 'oklch(0.15 0.04 258)' }}>
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200"
                style={{
                  background: mode === m ? 'oklch(0.75 0.18 65)' : 'transparent',
                  color: mode === m ? 'oklch(0.10 0.03 260)' : 'oklch(0.55 0.03 260)',
                }}
              >
                {m === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <Label className="text-sm mb-1.5 block" style={{ color: 'oklch(0.70 0.03 260)' }}>Kullanıcı Adı</Label>
                  <Input
                    placeholder="kullanici_adi"
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    required
                    minLength={3}
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block" style={{ color: 'oklch(0.70 0.03 260)' }}>Görünen Ad</Label>
                  <Input
                    placeholder="Adın Soyadın"
                    value={form.displayName}
                    onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
                    className="h-11"
                  />
                </div>
              </>
            )}

            <div>
              <Label className="text-sm mb-1.5 block" style={{ color: 'oklch(0.70 0.03 260)' }}>E-posta</Label>
              <Input
                type="email"
                placeholder="ornek@mail.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                className="h-11"
              />
            </div>

            <div>
              <Label className="text-sm mb-1.5 block" style={{ color: 'oklch(0.70 0.03 260)' }}>Şifre</Label>
              <div className="relative">
                <Input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  minLength={6}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'oklch(0.50 0.03 260)' }}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 font-semibold text-sm amber-gradient mt-2"
              style={{ color: 'oklch(0.10 0.03 260)' }}
            >
              {loading ? 'Yükleniyor...' : mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
            </Button>
          </form>



          {/* Premium tanıtım */}
          <div className="mt-4 p-4 rounded-lg" style={{ background: 'oklch(0.70 0.20 295 / 0.08)', border: '1px solid oklch(0.70 0.20 295 / 0.15)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'oklch(0.70 0.20 295)' }}> Premium Plan</p>
            <p className="text-xs" style={{ color: 'oklch(0.60 0.03 260)' }}>
              Günde 5 kitaptan puan al (ücretsiz: 2 kitap)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
