# 📚 Bite — BookSite

**Bite**, Letterboxd'dan ilham alınarak kitap okuyucuları için tasarlanmış bir sosyal okuma platformudur. Kitap okuyun, puan kazanın, sıralamada yükselin ve ödüller kazanın.

---

## 🚀 Özellikler

### Kullanıcı Sistemi
- Kayıt / Giriş (LocalStorage tabanlı, şifre hash'li)
- Profil fotoğrafı yükleme (base64)
- Kullanıcı takip etme / takipten çıkma
- Kullanıcı arama

### Kitap Sistemi
- **110+ kitap** (Dünya Klasikleri, Roman, Bilim Kurgu, Felsefe, Tarih, vb.)
- Open Library kapak görselleri (ISBN bazlı)
- Kitap puanlama (1-5 yıldız)
- Kitap yorumu yazma
- Kalpleme (Sonra Oku listesi)
- Kitap açılışında sayfa çevirme sesi (Web Audio API)

### Puan Sistemi
- Her kitaptan **15-50 puan** (zorluk, kelime dağarcığı, sayfa sayısına göre)
- **Ücretsiz plan:** Günde 2 kitaptan puan
- **Premium plan:** Günde 5 kitaptan puan
- Dünya klasikleri için **5 soruluk sınav** (doğruluk yüzdesine göre puan)

### Sıralama Tabloları
- Günlük / Haftalık / Aylık sıralama
- Yalnızca ilk 15 gösterilir

### Ödül Sistemi
- **Günlük birinci:** 3 gönderi hakkı (1 gün)
- **Haftalık birinci:** Mail + Kitap hediyesi + 3 gönderi hakkı
- **Aylık birinci:** 3 Kitap hediyesi + 3 gönderi hakkı
- Her birincilik bir kerelik

### Gönderi Platformu
- Gönderi hakkı kazanmak gerekir
- Admin onayından geçmeden yayınlanmaz
- Makale, proje, iş paylaşımı türleri

### Admin Paneli (`/admin`)
- Giriş: `kilincatayanki@gmail.com` / `admin123`
- Gönderi onaylama / reddetme
- Kitap ekleme arayüzü
- Kullanıcı yönetimi (premium yapma, gönderi hakkı verme)
- Ödül yönetimi (mail gönderme simülasyonu)
- Sınırsız gönderi hakkı

---

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Yerel Geliştirme

```bash
# Depoyu klonla
git clone https://github.com/KULLANICI_ADINIZ/bite-booksite.git
cd bite-booksite

# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

---

## 📦 GitHub Pages Deploy

### 1. Vite Yapılandırması

`vite.config.ts` dosyasında `base` değerini repo adınıza göre ayarlayın:

```typescript
export default defineConfig({
  base: '/bite-booksite/', // GitHub repo adınız
  // ...
});
```

### 2. GitHub Actions ile Otomatik Deploy

`.github/workflows/deploy.yml` dosyası zaten hazır. Sadece:

1. GitHub'da yeni bir repo oluşturun
2. Kodu push edin:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/bite-booksite.git
   git push -u origin main
   ```
3. GitHub repo ayarlarından **Settings → Pages → Source: GitHub Actions** seçin
4. Her `main` branch push'unda otomatik deploy olur

### 3. Manuel Build

```bash
pnpm build
# dist/ klasörü oluşur, herhangi bir statik host'a yükleyebilirsiniz
```

---

## 🌐 Diğer Hosting Seçenekleri

### Vercel
```bash
pnpm install -g vercel
vercel --prod
```

### Netlify
```bash
pnpm build
# Netlify'a dist/ klasörünü sürükle-bırak
```

### Cloudflare Pages
- GitHub repo'yu Cloudflare Pages'e bağlayın
- Build komutu: `pnpm build`
- Output dizini: `dist`

---

## 🔧 Gerçek Backend'e Geçiş Planı

Bu proje şu an **tamamen frontend** (LocalStorage tabanlı). Gerçek bir backend için:

### Önerilen Stack
- **Backend:** Node.js + Express veya Bun + Hono
- **Veritabanı:** PostgreSQL (Supabase ücretsiz tier)
- **Auth:** JWT + bcrypt
- **Mail:** Nodemailer + Gmail SMTP veya Resend
- **Dosya:** Cloudinary (profil fotoğrafları)

### Geçiş Adımları

1. **Supabase Projesi Oluştur**
   - `users`, `books`, `read_books`, `wishlist`, `following`, `posts`, `comments` tabloları
   
2. **Auth Context'i Güncelle**
   - `localStorage` yerine Supabase Auth
   - JWT token yönetimi

3. **API Katmanı Ekle**
   - `/api/books` - Kitap CRUD
   - `/api/users` - Kullanıcı işlemleri
   - `/api/leaderboard` - Sıralama hesaplama
   - `/api/posts` - Gönderi yönetimi

4. **Mail Sistemi**
   - Haftalık/aylık birinci tespiti (cron job)
   - `kilincatayanki@gmail.com`'dan ödül maili

---

## 📁 Proje Yapısı

```
bite-booksite/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Ana sayfa
│   │   │   ├── Library.tsx       # Kitap kütüphanesi
│   │   │   ├── BookDetail.tsx    # Kitap detayı + sınav
│   │   │   ├── Leaderboard.tsx   # Sıralama tablosu
│   │   │   ├── Profile.tsx       # Kullanıcı profili
│   │   │   ├── Feed.tsx          # Gönderi akışı
│   │   │   ├── AuthPage.tsx      # Giriş/Kayıt
│   │   │   ├── AdminPanel.tsx    # Admin yönetim paneli
│   │   │   └── SearchPage.tsx    # Kullanıcı arama
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx   # Kullanıcı sistemi
│   │   │   └── PostsContext.tsx  # Gönderi sistemi
│   │   ├── lib/
│   │   │   └── booksData.ts      # 110+ kitap veritabanı
│   │   └── components/
│   │       └── Layout.tsx        # Sidebar + header
│   └── index.html
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages otomatik deploy
└── README.md
```

---

## 🔐 Admin Erişimi

| Alan | Değer |
|------|-------|
| URL | `/admin` |
| E-posta | `kilincatayanki@gmail.com` |
| Şifre | `admin123` |

> **Önemli:** Gerçek deploy'da admin şifresini değiştirin!

---

## 📝 Lisans

MIT License — Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.
