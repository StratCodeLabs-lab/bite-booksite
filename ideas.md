# Bite — BookSite Tasarım Fikirleri

## Üç Yaklaşım

### 1. "Eski Kütüphane" (Probability: 0.07)
Derin ahşap tonları, deri cilt dokusu, serifli yazı tipleri. Antika kitap rafı estetiği.

### 2. "Dijital Manifesto" (Probability: 0.03)
Sert siyah-beyaz kontrast, büyük tipografi, minimal renk, punk-zine estetiği.

### 3. "Gece Okuyucusu" — **SEÇİLDİ** (Probability: 0.08)
Koyu lacivert-siyah arka plan, amber/altın vurgu rengi. Gece lambası altında kitap okuma hissi. Sıcak ve davetkar ama modern.

---

## Seçilen Yaklaşım: "Gece Okuyucusu"

### Design Movement
Dark Academia meets Modern Editorial — karanlık, entelektüel, sıcak ışıklı bir atmosfer.

### Core Principles
1. Koyu zemin üzerinde altın/amber vurgu renkleri — kitap sayfası sarısı
2. Asimetrik kart düzeni — kitap rafı gibi değişken yükseklikler
3. Serif başlık + sans-serif gövde kombinasyonu
4. Kitap kapağı görselleri ön planda, büyük ve etkileyici

### Color Philosophy
- Background: `#0D0F14` (gece mavisi-siyah)
- Surface: `#161B27` (koyu lacivert)
- Card: `#1E2535` (biraz daha açık lacivert)
- Primary/Accent: `#F0A500` (amber/altın) — kitap sayfası sarısı
- Secondary Accent: `#E8C97A` (açık altın)
- Text Primary: `#F5F0E8` (krem beyaz)
- Text Muted: `#8B95A8` (soğuk gri)
- Success: `#4CAF82` (yeşil)
- Premium: `#C084FC` (mor)

### Layout Paradigm
- Sol sidebar navigasyon (masaüstü)
- Kitap kartları: değişken boyutlu grid (masonry-like)
- Liderlik tablosu: sağ panel
- Profil sayfası: Letterboxd benzeri film şeridi layout

### Signature Elements
1. Kitap kapağı hover'da 3D tilt efekti + sayfa çevirme sesi
2. Puan yıldızları: altın rengi, animasyonlu
3. Liderlik tablosu: ateş ikonu + kullanıcı avatarları

### Interaction Philosophy
- Kitap açılırken gerçek sayfa çevirme sesi
- Hover'da kitap kapağı hafifçe öne çıkar (translateZ)
- Puanlama yıldızları hover'da soldan sağa dolar
- Smooth scroll ve fade-in animasyonlar

### Animation
- Sayfa geçişleri: 200ms ease-out fade
- Kart hover: 150ms scale(1.03) + shadow artışı
- Yıldız puanlama: 100ms dolma animasyonu
- Modal açılış: 250ms scale(0.95→1) + opacity
- Liderlik tablosu satırları: 50ms stagger

### Typography System
- Display/Heading: `Playfair Display` (serif, ağır, dramatik)
- Body: `Inter` (clean, okunabilir) — sadece body için
- Accent/Score: `Space Mono` (monospace, puan gösterimi için)
- Sizes: 4xl hero, 2xl section, xl card title, base body

### Brand Essence
Bite — Kitap okumayı rekabetçi ve ödüllendirici yapan platform. Okuyucular için, okuyucular tarafından.
Personality: Entelektüel · Rekabetçi · Sıcak

### Brand Voice
Headlines: "Her sayfa bir adım öne." / "Oku, puan al, zirvede ol."
CTAs: "Okumaya başla" / "Sıralamana bak"
Ban: "Hoş geldiniz" / "Hemen başlayın"

### Wordmark & Logo
"B" harfi kitap açık sayfası şeklinde — köşeli, bold, amber rengi

### Signature Brand Color
`#F0A500` — Amber/Altın (kitap sayfası sarısı)

---

## Style Decisions
- Tüm kartlarda `border: 1px solid rgba(240, 165, 0, 0.15)` — ince altın çerçeve
- Aktif nav öğesi: sol kenarda amber çizgi
- Premium rozet: mor gradient
- Admin rozet: kırmızı
