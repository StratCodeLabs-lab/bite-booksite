# Bite BookSite - GitHub Pages Deploy Rehberi

## Adım 1: GitHub Repository Oluştur

1. GitHub'da yeni bir repository oluştur: `bite-booksite`
2. Repository'yi public yap
3. Repository URL'sini kopyala (örn: `https://github.com/KULLANICI_ADINIZ/bite-booksite.git`)

## Adım 2: Yerel Projede Git Konfigürasyonu

```bash
cd bite-booksite

# Git'i başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Bite BookSite v1.0 - 140 kitap, PWA, GitHub Pages ready"

# Branch'ı main olarak ayarla
git branch -M main

# Remote repository'yi ekle
git remote add origin https://github.com/KULLANICI_ADINIZ/bite-booksite.git

# Push et
git push -u origin main
```

## Adım 3: GitHub Pages Ayarları

1. GitHub repository sayfasına git
2. **Settings** → **Pages** seçeneğine tıkla
3. **Source** bölümünde **GitHub Actions** seçeneğini seç
4. `.github/workflows/deploy.yml` dosyası otomatik olarak çalışacak

## Adım 4: Versiyon Güncelleme

Her güncellemede:

```bash
# Değişiklikleri ekle
git add .

# Commit et
git commit -m "Açıklama: Yeni özellik veya düzeltme"

# Push et
git push origin main
```

GitHub Actions otomatik olarak build yapıp GitHub Pages'e deploy edecek.

## Adım 5: Sitenize Erişim

Deploy tamamlandıktan sonra siteniz şu adreste erişilebilir olacak:

```
https://KULLANICI_ADINIZ.github.io/bite-booksite
```

## Önemli Notlar

### Görseller
- Tüm görseller `client/public/` klasöründe bulunuyor
- Logo: `logo.png` (512x512)
- Hero background: `hero-bg.jpg`
- Library background: `library-bg.jpg`

### Yerel Geliştirme
```bash
# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm run dev

# Tarayıcıda aç
# http://localhost:3000
```

### Production Build
```bash
# Build et
pnpm run build

# Preview et
pnpm run preview
```

## Sorun Giderme

### GitHub Pages'de görseller görünmüyor
- Tüm görsellerin `client/public/` klasöründe olduğunu kontrol et
- Resim referanslarının `/` ile başladığını kontrol et (örn: `/logo.png`)

### Deploy başarısız
- `.github/workflows/deploy.yml` dosyasını kontrol et
- GitHub Actions sekmesinde hataları kontrol et
- Repository settings'de Pages'in GitHub Actions'dan deploy olacak şekilde ayarlandığını kontrol et

### Yerel sunucuda çalışıyor ama GitHub Pages'de çalışmıyor
- Tüm relative URL'lerin `/` ile başladığını kontrol et
- Service Worker'ın kaydedildiğini kontrol et
- Tarayıcı cache'ini temizle (Ctrl+Shift+Delete)

## Gelişmiş Ayarlar

### Custom Domain
1. GitHub Settings → Pages
2. **Custom domain** bölümüne domain adını gir
3. DNS ayarlarında CNAME kaydı ekle

### HTTPS
GitHub Pages otomatik olarak HTTPS sağlar.

### Subdomain Kullanma
Repository adını değiştirmek istersen:
1. GitHub'da repository'yi yeniden adlandır
2. `vite.config.ts`'de `base` ayarını güncelle:
```typescript
export default defineConfig({
  base: '/yeni-repository-adi/',
  // ...
})
```

## Daha Fazla Bilgi

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
