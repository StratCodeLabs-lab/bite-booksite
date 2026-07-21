# Bite BookSite - Mobil ve Masaüstü Uygulaması Kurulum Rehberi

## Progressive Web App (PWA) Olarak Kurulum

Bite BookSite, Progressive Web App (PWA) teknolojisi ile mobil ve masaüstü cihazlarda native uygulama gibi çalışabilir.

### Mobil Cihazlarda (iOS ve Android)

#### Android'de Kurulum:
1. Chrome, Edge veya Firefox tarayıcısında `https://your-domain.com` adresine gidin
2. Sağ üst köşedeki menüyü açın (⋮)
3. "Uygulamayı yükle" veya "Ekrana ekle" seçeneğine tıklayın
4. "Yükle" veya "Ekle" düğmesine tıklayın
5. Bite uygulaması ana ekrana eklenecek

#### iOS'ta Kurulum:
1. Safari tarayıcısında `https://your-domain.com` adresine gidin
2. Paylaş düğmesine (↑) tıklayın
3. "Ana Ekrana Ekle" seçeneğine tıklayın
4. Bite uygulamasının adını doğrulayın ve "Ekle" düğmesine tıklayın
5. Bite uygulaması ana ekrana eklenecek

### Masaüstü Cihazlarda (Windows, macOS, Linux)

#### Chrome/Edge'de Kurulum:
1. `https://your-domain.com` adresine gidin
2. Adres çubuğunun sağında "Uygulamayı yükle" simgesine tıklayın
3. "Yükle" düğmesine tıklayın
4. Bite uygulaması başlat menüsüne eklenecek

#### Firefox'ta Kurulum:
1. `https://your-domain.com` adresine gidin
2. Adres çubuğunun sağında "Uygulamayı yükle" simgesine tıklayın
3. "Yükle" düğmesine tıklayın

## Özellikler

- **Çevrimdışı Destek**: Service Worker sayesinde çevrimdışı modda temel işlevler çalışır
- **Hızlı Yükleme**: Önbelleğe alınan veriler sayesinde hızlı açılış
- **Native Deneyim**: Tam ekran modunda tarayıcı arayüzü gizlenir
- **Bildirimler**: Sistem bildirimleri alabilirsiniz (yapılandırılırsa)
- **Kütüphane Desteği**: iOS ve Android'in uygulama kütüphanelerine eklenir

## GitHub'dan Masaüstü Uygulaması Oluşturma

Electron kullanarak masaüstü uygulaması oluşturmak için:

```bash
# Electron kurulumu
npm install --save-dev electron electron-builder

# Electron uygulaması oluşturma
npx electron-builder
```

## Sunucu Yapılandırması

PWA'nın düzgün çalışması için sunucu ayarları:

### HTTPS Gerekli
PWA'lar HTTPS üzerinde çalışmalıdır. Localhost'ta test için HTTP kullanılabilir.

### CORS Ayarları
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Cache Headers
```
Cache-Control: public, max-age=31536000, immutable  (static files için)
Cache-Control: no-cache, must-revalidate  (HTML için)
```

## Sorun Giderme

### Service Worker Kaydedilmiyor
- Tarayıcı konsolunda hata mesajını kontrol edin
- HTTPS kullanıyor olduğunuzdan emin olun
- Manifest.json dosyasının doğru konumda olduğunu kontrol edin

### Uygulama Yüklenemiyor
- Manifest.json dosyasının geçerli JSON olduğunu kontrol edin
- İcon dosyalarının erişilebilir olduğunu kontrol edin
- Tarayıcı konsolundaki hataları kontrol edin

### Çevrimdışı Çalışmıyor
- Service Worker'ın kaydedildiğini kontrol edin
- Manifest.json'da gerekli dosyaların listelendiğini kontrol edin
- Tarayıcı depolama ayarlarını kontrol edin

## Daha Fazla Bilgi

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA Checklist](https://web.dev/pwa-checklist/)
- [Google - PWA Documentation](https://developers.google.com/web/progressive-web-apps)
