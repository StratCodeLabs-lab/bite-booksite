# Bite BookSite - GitHub'a Yükleme Rehberi (Adım Adım)

## Ön Koşullar

1. **Git Kurulu**: `git --version` yazarak kontrol et
2. **GitHub Hesabı**: https://github.com'da hesap oluştur
3. **SSH Anahtarı** (opsiyonel ama önerilen):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   Ardından `~/.ssh/id_ed25519.pub` dosyasını GitHub Settings → SSH Keys'e ekle

---

## ADIM 1: GitHub'da Yeni Repository Oluştur

1. GitHub.com'da oturum aç
2. Sağ üst köşede **+** simgesine tıkla → **New repository**
3. Repository adı: `bite-booksite`
4. Açıklama: `Kitap okumayı rekabetçi yapan platform`
5. **Public** seçeneğini seç
6. **.gitignore** seçme (biz kendimiz yapacağız)
7. **Create repository** düğmesine tıkla

---

## ADIM 2: Yerel Bilgisayarda Terminal Aç

VS Code'da:
- `Ctrl + `` (backtick) tuşuna bas
- Veya **Terminal** → **New Terminal**

---

## ADIM 3: Proje Klasörüne Git

```bash
cd bite-booksite
```

Eğer farklı konumdaysa:
```bash
cd /path/to/bite-booksite
```

Doğru konumda olup olmadığını kontrol et:
```bash
ls -la
```

`package.json` ve `client` klasörünü görürsen doğru yerdesin.

---

## ADIM 4: .gitignore Dosyası Oluştur

Büyük dosyaları exclude etmek için:

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
pnpm-lock.yaml

# Build outputs
dist/
build/
.next/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
.manus-logs/
*.log

# Large media files (use GitHub LFS if needed)
*.mp4
*.mov
*.avi

# Cache
.cache/
.eslintcache

# Temporary
tmp/
temp/
EOF
```

Kontrol et:
```bash
cat .gitignore
```

---

## ADIM 5: Git Konfigürasyonu

İlk kez kullanıyorsan:

```bash
git config --global user.name "Senin Adın"
git config --global user.email "senin_email@example.com"
```

Kontrol et:
```bash
git config --global user.name
git config --global user.email
```

---

## ADIM 6: Git Repository'yi Başlat

```bash
git init
```

Kontrol et:
```bash
ls -la
```

`.git` klasörünü görürsen başarılı.

---

## ADIM 7: Tüm Dosyaları Ekle

```bash
git add .
```

Kontrol et:
```bash
git status
```

Yeşil renkte dosyaları görürsen hazır.

---

## ADIM 8: İlk Commit Yap

```bash
git commit -m "Bite BookSite v1.0 - 140 kitap, PWA, GitHub Pages ready"
```

Başarılı olursa:
```
[main (root-commit) abc1234] Bite BookSite v1.0 - 140 kitap, PWA, GitHub Pages ready
 XXX files changed, XXXXX insertions(+)
```

---

## ADIM 9: Branch'ı main Olarak Ayarla

```bash
git branch -M main
```

Kontrol et:
```bash
git branch
```

`* main` görürsen doğru.

---

## ADIM 10: Remote Repository'yi Ekle

GitHub'daki repository URL'sini kopyala (HTTPS veya SSH):

**HTTPS (Daha kolay):**
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/bite-booksite.git
```

**SSH (Daha güvenli):**
```bash
git remote add origin git@github.com:KULLANICI_ADINIZ/bite-booksite.git
```

Kontrol et:
```bash
git remote -v
```

İki satır görürsen (fetch ve push) doğru.

---

## ADIM 11: GitHub'a Push Et

```bash
git push -u origin main
```

İlk kez HTTPS kullanıyorsan:
- GitHub'da **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
- **Generate new token** → Scope: `repo` seç
- Token'ı kopyala ve terminal'de paste et (şifre yerine)

Başarılı olursa:
```
Enumerating objects: XXX, done.
Counting objects: 100% (XXX/XXX), done.
...
To https://github.com/KULLANICI_ADINIZ/bite-booksite.git
 * [new branch]      main -> main
Branch 'main' is tracking 'origin/main'.
```

---

## ADIM 12: GitHub'da Kontrol Et

1. GitHub.com'da repository sayfasına git
2. Dosyaları görebilirsin
3. **Settings** → **Pages** seçeneğine tıkla
4. **Source** bölümünde **GitHub Actions** seçeneğini seç
5. Deploy otomatik başlayacak

---

## ADIM 13: Deploy Durumunu Kontrol Et

1. Repository sayfasında **Actions** sekmesine tıkla
2. Workflow'u göreceksin
3. Yeşil ✓ işareti = başarılı
4. Kırmızı ✗ işareti = hata

---

## ADIM 14: Sitenize Erişim

Deploy tamamlandıktan sonra:

```
https://KULLANICI_ADINIZ.github.io/bite-booksite
```

---

## Sonraki Güncellemeler

Her değişiklik için:

```bash
# 1. Değişiklikleri ekle
git add .

# 2. Commit et
git commit -m "Açıklama: Ne yaptığını yaz"

# 3. Push et
git push origin main
```

GitHub Actions otomatik deploy yapacak.

---

## Sorun Giderme

### "fatal: not a git repository"
```bash
cd bite-booksite
git init
```

### "error: src refspec main does not match any"
```bash
git commit -m "İlk commit"
git branch -M main
```

### "Permission denied (publickey)"
SSH kullanıyorsan:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# GitHub Settings → SSH Keys'e ekle
```

### "fatal: 'origin' does not appear to be a 'git' repository"
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/bite-booksite.git
```

### Büyük dosya hatası
```bash
# Dosyayı .gitignore'a ekle
echo "client/public/hero-bg.jpg" >> .gitignore
git add .gitignore
git commit -m "Büyük dosyayı exclude et"
git push
```

---

## Faydalı Komutlar

```bash
# Durumu kontrol et
git status

# Commit geçmişini gör
git log --oneline

# Son değişiklikleri gör
git diff

# Değişiklikleri geri al
git reset --hard HEAD

# Remote'u kontrol et
git remote -v

# Branch'ları gör
git branch -a
```

---

## GitHub Pages Ayarları

1. Repository → **Settings** → **Pages**
2. **Source**: GitHub Actions
3. Deploy otomatik başlayacak
4. Siteniz: `https://KULLANICI_ADINIZ.github.io/bite-booksite`

---

## İpuçları

- Commit mesajlarını açıklayıcı yaz
- Sık sık push et (her özellik tamamlandığında)
- `.gitignore` dosyasını doğru yapılandır
- SSH kullanmak daha güvenli (password gerekmez)
- GitHub Desktop uygulaması GUI alternatifi

---

**Başarılar! Sorular olursa GitHub Issues'de sor.**
