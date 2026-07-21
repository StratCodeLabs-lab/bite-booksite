// Bite BookSite — Kitap Veritabanı
// 100+ kitap, Open Library kapak görselleri, sınav soruları ve meta veriler

export type BookCategory = 
  | 'Dünya Klasiği'
  | 'Roman'
  | 'Bilim Kurgu'
  | 'Felsefe'
  | 'Tarih'
  | 'Şiir'
  | 'Biyografi'
  | 'Psikoloji'
  | 'Distopya'
  | 'Macera'
  | 'Gizem'
  | 'Türk Edebiyatı';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: BookCategory;
  coverUrl: string; // Open Library veya harici URL
  description: string;
  maxPoints: number; // 15-50 arası
  difficulty: 'Kolay' | 'Orta' | 'Zor' | 'Çok Zor';
  pageCount: number;
  language: string;
  isClassic: boolean; // Dünya klasiği → sınav zorunlu
  quizQuestions?: QuizQuestion[]; // Sadece klasikler için
  tags: string[];
}

// Open Library kapak URL'leri (ISBN bazlı)
const OL = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

export const BOOKS: Book[] = [
  // ─── DÜNYA KLASİKLERİ ───────────────────────────────────────────────────────
  {
    id: 'b001',
    title: 'Suç ve Ceza',
    author: 'Fyodor Dostoyevski',
    year: 1866,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140449136'),
    description: 'Yoksul bir öğrenci olan Raskolnikov\'un bir rehinci kadını öldürmesi ve ardından yaşadığı psikolojik çöküşü anlatan başyapıt.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 671,
    language: 'Rusça',
    isClassic: true,
    tags: ['psikoloji', 'suç', 'vicdan', 'Rusya', '19.yy'],
    quizQuestions: [
      {
        question: 'Raskolnikov\'un öldürdüğü kişi kimdir?',
        options: ['Bir banka müdürü', 'Bir rehinci yaşlı kadın', 'Kız kardeşinin nişanlısı', 'Bir polis memuru'],
        correctIndex: 1
      },
      {
        question: 'Romanın geçtiği şehir hangisidir?',
        options: ['Moskova', 'Odessa', 'St. Petersburg', 'Kiev'],
        correctIndex: 2
      },
      {
        question: 'Raskolnikov\'un teorisine göre insanlar kaç gruba ayrılır?',
        options: ['Üç gruba', 'Dört gruba', 'İki gruba', 'Beş gruba'],
        correctIndex: 2
      },
      {
        question: 'Sonya Marmeladova ne iş yapmaktadır?',
        options: ['Öğretmenlik', 'Fahişelik', 'Hemşirelik', 'Terzililik'],
        correctIndex: 1
      },
      {
        question: 'Romanın sonunda Raskolnikov nereye gönderilir?',
        options: ['Akıl hastanesine', 'Sibirya\'ya sürgüne', 'Orduya', 'Yurt dışına'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'b002',
    title: 'Anna Karenina',
    author: 'Lev Tolstoy',
    year: 1877,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140449174'),
    description: 'Aristokrat bir kadının yasak aşkı ve toplumsal baskılar karşısında yaşadığı trajik hikaye.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 864,
    language: 'Rusça',
    isClassic: true,
    tags: ['aşk', 'toplum', 'Rusya', 'trajedi'],
    quizQuestions: [
      {
        question: 'Anna Karenina\'nın kocasının adı nedir?',
        options: ['Vronsky', 'Levin', 'Karenin', 'Oblonsky'],
        correctIndex: 2
      },
      {
        question: 'Anna\'nın yasak aşkı kimdir?',
        options: ['Levin', 'Kont Vronsky', 'Stiva', 'Nikolai'],
        correctIndex: 1
      },
      {
        question: 'Romanın paralel hikayesinde Levin kime aşıktır?',
        options: ['Anna\'ya', 'Dolly\'ye', 'Kitty\'ye', 'Natasha\'ya'],
        correctIndex: 2
      },
      {
        question: 'Anna romanın sonunda nasıl ölür?',
        options: ['Zehirlenerek', 'Tren altında kalarak', 'Boğularak', 'Hastalıktan'],
        correctIndex: 1
      },
      {
        question: 'Romanın açılış cümlesi hangi temayı işler?',
        options: ['Savaş ve barış', 'Mutlu ve mutsuz aileler', 'Aşk ve nefret', 'Zenginlik ve yoksulluk'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'b003',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    category: 'Distopya',
    coverUrl: OL('9780451524935'),
    description: 'Totaliter bir rejimin hüküm sürdüğü distopik bir gelecekte Winston Smith\'in özgürlük arayışı.',
    maxPoints: 40,
    difficulty: 'Orta',
    pageCount: 328,
    language: 'İngilizce',
    isClassic: true,
    tags: ['distopya', 'totalitarizm', 'gözetim', 'özgürlük'],
    quizQuestions: [
      {
        question: 'Romandaki totaliter devletin lideri kimdir?',
        options: ['Emmanuel Goldstein', 'Büyük Birader', 'O\'Brien', 'Parsons'],
        correctIndex: 1
      },
      {
        question: 'Winston Smith hangi bakanlıkta çalışır?',
        options: ['Barış Bakanlığı', 'Sevgi Bakanlığı', 'Hakikat Bakanlığı', 'Bolluk Bakanlığı'],
        correctIndex: 2
      },
      {
        question: 'Newspeak ne anlama gelir?',
        options: ['Gizli bir kod dili', 'Düşünceyi kısıtlamak için tasarlanmış dil', 'Propaganda gazetesi', 'Gizli örgütün adı'],
        correctIndex: 1
      },
      {
        question: 'Winston\'ın sevgilisinin adı nedir?',
        options: ['Katherine', 'Julia', 'Syme', 'Ampleforth'],
        correctIndex: 1
      },
      {
        question: 'Doublethink ne demektir?',
        options: ['İki dil bilmek', 'Çelişkili iki inancı aynı anda kabul etmek', 'İki kez düşünmek', 'Çift ajan olmak'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'b004',
    title: 'Don Kişot',
    author: 'Miguel de Cervantes',
    year: 1605,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780060934347'),
    description: 'Şövalye romanlarından etkilenen bir hidalgo\'nun Sancho Panza ile birlikte çıktığı çılgın maceralar.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 1072,
    language: 'İspanyolca',
    isClassic: true,
    tags: ['macera', 'hiciv', 'İspanya', 'şövalye'],
    quizQuestions: [
      {
        question: 'Don Kişot\'un gerçek adı nedir?',
        options: ['Rodrigo de Vivar', 'Alonso Quijano', 'Fernando de Rojas', 'Diego de Torres'],
        correctIndex: 1
      },
      {
        question: 'Don Kişot yel değirmenlerini ne sanır?',
        options: ['Ejderha', 'Dev', 'Kale', 'Düşman ordusu'],
        correctIndex: 1
      },
      {
        question: 'Don Kişot\'un uşağının adı nedir?',
        options: ['Sancho Panza', 'Pedro Alonso', 'Cardenio', 'Dorotea'],
        correctIndex: 0
      },
      {
        question: 'Don Kişot\'un hayal ettiği sevgilisinin adı nedir?',
        options: ['Dorotea', 'Dulcinea del Toboso', 'Luscinda', 'Zoraida'],
        correctIndex: 1
      },
      {
        question: 'Roman hangi ülkenin edebiyatının başyapıtı sayılır?',
        options: ['Portekiz', 'İtalya', 'İspanya', 'Fransa'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'b005',
    title: 'Savaş ve Barış',
    author: 'Lev Tolstoy',
    year: 1869,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140447934'),
    description: 'Napolyon savaşları döneminde Rus aristokrasisinin hayatını anlatan devasa epik roman.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 1392,
    language: 'Rusça',
    isClassic: true,
    tags: ['savaş', 'Rusya', 'Napolyon', 'aristokrasi', 'epik'],
    quizQuestions: [
      {
        question: 'Romanın ana karakterlerinden Pierre Bezukhov\'un babası kimdir?',
        options: ['Prens Bolkonsky', 'Kont Kirill Bezukhov', 'General Kutuzov', 'Kont Rostov'],
        correctIndex: 1
      },
      {
        question: 'Natasha Rostova\'nın ilk nişanlısı kimdir?',
        options: ['Pierre Bezukhov', 'Prens Andrei Bolkonsky', 'Anatole Kuragin', 'Nikolai Rostov'],
        correctIndex: 1
      },
      {
        question: 'Borodino Savaşı hangi ülkeler arasında gerçekleşir?',
        options: ['Rusya-Prusya', 'Rusya-Fransa', 'Rusya-Avusturya', 'Rusya-İngiltere'],
        correctIndex: 1
      },
      {
        question: 'Romanın sonunda Natasha kimle evlenir?',
        options: ['Prens Andrei ile', 'Nikolai Rostov ile', 'Pierre Bezukhov ile', 'Dolokhov ile'],
        correctIndex: 2
      },
      {
        question: 'Napolyon\'un Moskova\'yı işgal ettiğinde şehre ne olur?',
        options: ['Ruslar teslim olur', 'Şehir yakılır', 'Büyük savaş olur', 'Barış antlaşması imzalanır'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'b006',
    title: 'Hamlet',
    author: 'William Shakespeare',
    year: 1603,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780743477123'),
    description: 'Danimarkalı Prens Hamlet\'in babasının ölümünün intikamını alma hikayesi.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 342,
    language: 'İngilizce',
    isClassic: true,
    tags: ['trajedi', 'intikam', 'Danimarka', 'Shakespeare'],
    quizQuestions: [
      {
        question: 'Hamlet\'in babasını kim öldürür?',
        options: ['Polonius', 'Laertes', 'Claudius', 'Horatio'],
        correctIndex: 2
      },
      {
        question: '"Olmak ya da olmamak" soliloku hangi perdede yer alır?',
        options: ['1. Perde', '2. Perde', '3. Perde', '4. Perde'],
        correctIndex: 2
      },
      {
        question: 'Ophelia\'nın babası kimdir?',
        options: ['Horatio', 'Polonius', 'Claudius', 'Laertes'],
        correctIndex: 1
      },
      {
        question: 'Hamlet\'in sevgilisi kimdir?',
        options: ['Gertrude', 'Ophelia', 'Rosencrantz', 'Guildenstern'],
        correctIndex: 1
      },
      {
        question: 'Oyunun sonunda Hamlet nasıl ölür?',
        options: ['Zehirli kılıçla', 'Zehirli içkiyle', 'Düşerek', 'Boğularak'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'b007',
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    year: 1857,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140449129'),
    description: 'Taşra hayatından sıkılan bir doktor karısının romantik hayaller peşinde koşmasının trajik hikayesi.',
    maxPoints: 40,
    difficulty: 'Orta',
    pageCount: 329,
    language: 'Fransızca',
    isClassic: true,
    tags: ['realizm', 'Fransa', 'toplum', 'aşk', 'trajedi'],
    quizQuestions: [
      {
        question: 'Emma Bovary\'nin kocasının mesleği nedir?',
        options: ['Avukat', 'Doktor', 'Eczacı', 'Öğretmen'],
        correctIndex: 1
      },
      {
        question: 'Emma\'nın ilk sevgilisi kimdir?',
        options: ['Rodolphe', 'Leon', 'Homais', 'Lheureux'],
        correctIndex: 1
      },
      {
        question: 'Emma Bovary nasıl ölür?',
        options: ['Tren altında', 'Arsenik içerek', 'Boğularak', 'Hastalıktan'],
        correctIndex: 1
      },
      {
        question: 'Roman hangi ülkede geçer?',
        options: ['İngiltere', 'İtalya', 'Fransa', 'Belçika'],
        correctIndex: 2
      },
      {
        question: 'Flaubert bu romanı yazdığı için ne ile suçlanmıştır?',
        options: ['Hırsızlık', 'Ahlaksızlık', 'Casusluk', 'Dini hakaret'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'b008',
    title: 'Büyük Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780743273565'),
    description: 'Amerika\'nın Altın Çağı\'nda zenginlik, aşk ve Amerikan rüyasının çöküşünü anlatan roman.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 180,
    language: 'İngilizce',
    isClassic: true,
    tags: ['Amerikan rüyası', '1920ler', 'zenginlik', 'aşk'],
    quizQuestions: [
      {
        question: 'Romanı anlatan anlatıcı kimdir?',
        options: ['Jay Gatsby', 'Nick Carraway', 'Tom Buchanan', 'Jordan Baker'],
        correctIndex: 1
      },
      {
        question: 'Gatsby\'nin gerçek adı nedir?',
        options: ['James Gatz', 'John Green', 'George Wilson', 'Meyer Wolfsheim'],
        correctIndex: 0
      },
      {
        question: 'Gatsby\'nin yeşil ışığa bakması neyi simgeler?',
        options: ['Parayı', 'Daisy\'ye olan özlemini', 'Özgürlüğü', 'Ölümü'],
        correctIndex: 1
      },
      {
        question: 'Gatsby nasıl ölür?',
        options: ['Tom tarafından vurulur', 'George Wilson tarafından vurulur', 'Arabası devrilir', 'Boğulur'],
        correctIndex: 1
      },
      {
        question: 'Roman hangi dönemde geçer?',
        options: ['1910lar', '1920ler', '1930lar', '1940lar'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'b009',
    title: 'Dönüşüm',
    author: 'Franz Kafka',
    year: 1915,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140505016'),
    description: 'Bir sabah böceğe dönüşen Gregor Samsa\'nın ailesiyle ilişkisinin değişimini anlatan absürd başyapıt.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 96,
    language: 'Almanca',
    isClassic: true,
    tags: ['absürd', 'varoluş', 'aile', 'yabancılaşma'],
    quizQuestions: [
      {
        question: 'Gregor Samsa ne tür bir böceğe dönüşür?',
        options: ['Kelebek', 'Dev bir böcek (hamam böceği benzeri)', 'Arı', 'Örümcek'],
        correctIndex: 1
      },
      {
        question: 'Gregor\'un mesleği nedir?',
        options: ['Öğretmen', 'Seyyar satıcı', 'Doktor', 'Avukat'],
        correctIndex: 1
      },
      {
        question: 'Gregor\'un kız kardeşinin adı nedir?',
        options: ['Anna', 'Grete', 'Maria', 'Leni'],
        correctIndex: 1
      },
      {
        question: 'Gregor nasıl ölür?',
        options: ['Ailesi tarafından öldürülür', 'Aç kalarak ve yaralı halde', 'Pencereden düşer', 'Zehirlenir'],
        correctIndex: 1
      },
      {
        question: 'Gregor\'un ölümünden sonra ailesi ne yapar?',
        options: ['Yas tutar', 'Rahatlar ve tatile çıkmaya karar verir', 'Şehri terk eder', 'Evi satar'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'b010',
    title: 'Yüzyıllık Yalnızlık',
    author: 'Gabriel García Márquez',
    year: 1967,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780060883287'),
    description: 'Buendía ailesinin yedi kuşağını anlatan büyülü gerçekçilik başyapıtı.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 417,
    language: 'İspanyolca',
    isClassic: true,
    tags: ['büyülü gerçekçilik', 'Latin Amerika', 'aile', 'kader'],
    quizQuestions: [
      {
        question: 'Romanın geçtiği hayali kasabanın adı nedir?',
        options: ['Yoknapatawpha', 'Macondo', 'Santa María', 'Comala'],
        correctIndex: 1
      },
      {
        question: 'Buendía ailesinin kurucusu kimdir?',
        options: ['Aureliano Buendía', 'José Arcadio Buendía', 'Úrsula Iguarán', 'Melquíades'],
        correctIndex: 1
      },
      {
        question: 'Yüz yıl boyunca aileyi izleyen Çingene kimdir?',
        options: ['Pilar Ternera', 'Melquíades', 'Rebeca', 'Amaranta'],
        correctIndex: 1
      },
      {
        question: 'Romanda kaç tane Aureliano Buendía vardır?',
        options: ['5', '10', '17', '23'],
        correctIndex: 2
      },
      {
        question: 'Romanın sonu nasıl gelir?',
        options: ['Aile mutlu sona ulaşır', 'Kasaba ve aile bir kasırgayla yok olur', 'Aile göç eder', 'Barış antlaşması imzalanır'],
        correctIndex: 1
      }
    ]
  },

  // ─── ROMAN ──────────────────────────────────────────────────────────────────
  {
    id: 'b011',
    title: 'Cesur Yeni Dünya',
    author: 'Aldous Huxley',
    year: 1932,
    category: 'Distopya',
    coverUrl: OL('9780060850524'),
    description: 'Teknoloji ve tüketim kültürünün hüküm sürdüğü distopik bir gelecek toplumunu anlatan roman.',
    maxPoints: 40,
    difficulty: 'Orta',
    pageCount: 311,
    language: 'İngilizce',
    isClassic: false,
    tags: ['distopya', 'teknoloji', 'toplum', 'özgürlük']
  },
  {
    id: 'b012',
    title: 'Simyacı',
    author: 'Paulo Coelho',
    year: 1988,
    category: 'Roman',
    coverUrl: OL('9780062315007'),
    description: 'Kendi efsanevi kaderini arayan genç bir çobanın yolculuğunu anlatan felsefi roman.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 208,
    language: 'Portekizce',
    isClassic: false,
    tags: ['kader', 'yolculuk', 'felsefe', 'ruhanilik']
  },
  {
    id: 'b013',
    title: 'Uçurtma Avcısı',
    author: 'Khaled Hosseini',
    year: 2003,
    category: 'Roman',
    coverUrl: OL('9781594631931'),
    description: 'Afganistan\'da iki çocuğun dostluğunu ve ihaneti anlatan duygusal roman.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 371,
    language: 'İngilizce',
    isClassic: false,
    tags: ['dostluk', 'ihanet', 'Afganistan', 'savaş', 'af']
  },
  {
    id: 'b014',
    title: 'Hayvan Çiftliği',
    author: 'George Orwell',
    year: 1945,
    category: 'Distopya',
    coverUrl: OL('9780451526342'),
    description: 'Hayvanların devrim yaparak çiftliği ele geçirmesini anlatan siyasi alegori.',
    maxPoints: 30,
    difficulty: 'Kolay',
    pageCount: 112,
    language: 'İngilizce',
    isClassic: false,
    tags: ['siyaset', 'alegori', 'devrim', 'totalitarizm']
  },
  {
    id: 'b015',
    title: 'Küçük Prens',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    category: 'Roman',
    coverUrl: OL('9780156012195'),
    description: 'Farklı gezegenler gezen küçük bir prensin insanlık üzerine felsefi gözlemleri.',
    maxPoints: 20,
    difficulty: 'Kolay',
    pageCount: 96,
    language: 'Fransızca',
    isClassic: false,
    tags: ['felsefe', 'çocuk', 'dostluk', 'yaşam']
  },
  {
    id: 'b016',
    title: 'Fareler ve İnsanlar',
    author: 'John Steinbeck',
    year: 1937,
    category: 'Roman',
    coverUrl: OL('9780140177398'),
    description: 'Büyük Buhran döneminde iki işçinin hayallerini ve kaderi anlatan kısa roman.',
    maxPoints: 28,
    difficulty: 'Orta',
    pageCount: 112,
    language: 'İngilizce',
    isClassic: false,
    tags: ['Amerikan', 'dostluk', 'hayal', 'trajedi']
  },
  {
    id: 'b017',
    title: 'Sineklerin Tanrısı',
    author: 'William Golding',
    year: 1954,
    category: 'Roman',
    coverUrl: OL('9780571191475'),
    description: 'Issız bir adaya düşen çocukların medeniyetle vahşet arasındaki mücadelesi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 224,
    language: 'İngilizce',
    isClassic: false,
    tags: ['vahşet', 'toplum', 'çocuk', 'ada', 'sembolizm']
  },
  {
    id: 'b018',
    title: 'Kırmızı ve Siyah',
    author: 'Stendhal',
    year: 1830,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140447644'),
    description: 'Hırslı bir genç olan Julien Sorel\'in toplumda yükselme çabasını anlatan roman.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 509,
    language: 'Fransızca',
    isClassic: true,
    tags: ['hırs', 'toplum', 'Fransa', '19.yy', 'aşk'],
    quizQuestions: [
      {
        question: 'Julien Sorel\'in babası ne iş yapar?',
        options: ['Doktor', 'Marangoz', 'Subay', 'Rahip'],
        correctIndex: 1
      },
      {
        question: 'Julien\'in ilk aşkı kimdir?',
        options: ['Mathilde de La Mole', 'Madame de Rênal', 'Amanda Binet', 'Elisa'],
        correctIndex: 1
      },
      {
        question: 'Romanın başlığındaki "Kırmızı" neyi temsil eder?',
        options: ['Aşkı', 'Orduyu', 'Devrimcileri', 'Kiliseyi'],
        correctIndex: 1
      },
      {
        question: 'Julien Sorel nasıl ölür?',
        options: ['Savaşta', 'Giyotin ile idam edilerek', 'Hastalıktan', 'Düelloda'],
        correctIndex: 1
      },
      {
        question: 'Roman hangi dönemde geçer?',
        options: ['Fransız Devrimi', 'Napolyon dönemi', 'Restorasyon dönemi', 'II. Cumhuriyet'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'b019',
    title: 'Vadideki Zambak',
    author: 'Honoré de Balzac',
    year: 1836,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140443394'),
    description: 'Genç bir aristokratın evli bir kadına duyduğu platonik aşkı anlatan roman.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 320,
    language: 'Fransızca',
    isClassic: false,
    tags: ['aşk', 'Fransa', 'aristokrasi', 'platonik']
  },
  {
    id: 'b020',
    title: 'Sefiller',
    author: 'Victor Hugo',
    year: 1862,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780451419439'),
    description: 'Jean Valjean\'ın kurtuluş yolculuğunu ve 19. yüzyıl Fransa\'sının toplumsal sorunlarını anlatan epik roman.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 1463,
    language: 'Fransızca',
    isClassic: true,
    tags: ['adalet', 'Fransa', 'devrim', 'yoksulluk', 'kurtuluş'],
    quizQuestions: [
      {
        question: 'Jean Valjean başlangıçta ne çaldığı için hapse girer?',
        options: ['Para', 'Ekmek', 'Mücevher', 'Silah'],
        correctIndex: 1
      },
      {
        question: 'Valjean\'ı yıllarca takip eden polis müfettişinin adı nedir?',
        options: ['Thénardier', 'Javert', 'Fauchelevent', 'Gillenormand'],
        correctIndex: 1
      },
      {
        question: 'Cosette\'in annesi kimdir?',
        options: ['Éponine', 'Fantine', 'Madame Thénardier', 'Azelma'],
        correctIndex: 1
      },
      {
        question: 'Marius Pontmercy kime aşıktır?',
        options: ['Éponine\'e', 'Cosette\'e', 'Azelma\'ya', 'Fantine\'e'],
        correctIndex: 1
      },
      {
        question: 'Romanın sonunda Javert ne yapar?',
        options: ['Valjean\'ı tutuklur', 'Sene atlar', 'Kendini Seine\'e atar', 'Emekli olur'],
        correctIndex: 2
      }
    ]
  },

  // ─── BİLİM KURGU ────────────────────────────────────────────────────────────
  {
    id: 'b021',
    title: 'Dune',
    author: 'Frank Herbert',
    year: 1965,
    category: 'Bilim Kurgu',
    coverUrl: OL('9780441013593'),
    description: 'Çöl gezegeni Arrakis\'te geçen, siyaset, din ve ekoloji temalarını işleyen epik bilim kurgu.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 896,
    language: 'İngilizce',
    isClassic: false,
    tags: ['bilim kurgu', 'siyaset', 'din', 'ekoloji', 'epik']
  },
  {
    id: 'b022',
    title: 'Kırmızı Mars',
    author: 'Kim Stanley Robinson',
    year: 1992,
    category: 'Bilim Kurgu',
    coverUrl: OL('9780553560732'),
    description: 'Mars\'ın terraformasyonunu anlatan sert bilim kurgu üçlemesinin ilk kitabı.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 572,
    language: 'İngilizce',
    isClassic: false,
    tags: ['Mars', 'terraformasyon', 'bilim', 'gelecek']
  },
  {
    id: 'b023',
    title: 'Ender\'in Oyunu',
    author: 'Orson Scott Card',
    year: 1985,
    category: 'Bilim Kurgu',
    coverUrl: OL('9780812550702'),
    description: 'Uzaylı saldırısına karşı yetiştirilen genç bir askeri dehanın hikayesi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 352,
    language: 'İngilizce',
    isClassic: false,
    tags: ['uzay', 'strateji', 'çocuk', 'savaş', 'zeka']
  },
  {
    id: 'b024',
    title: 'Yolculuğun Sonu',
    author: 'Isaac Asimov',
    year: 1951,
    category: 'Bilim Kurgu',
    coverUrl: OL('9780553382563'),
    description: 'Galaktik İmparatorluğun çöküşünü önlemeye çalışan bir bilim insanının hikayesi.',
    maxPoints: 40,
    difficulty: 'Orta',
    pageCount: 255,
    language: 'İngilizce',
    isClassic: false,
    tags: ['galaksi', 'imparatorluk', 'bilim', 'tarih']
  },
  {
    id: 'b025',
    title: 'Solaris',
    author: 'Stanisław Lem',
    year: 1961,
    category: 'Bilim Kurgu',
    coverUrl: OL('9780156027601'),
    description: 'Gizemli bir gezegenin okyanusunu inceleyen bilim insanlarının yaşadığı psikolojik deneyim.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 204,
    language: 'Lehçe',
    isClassic: false,
    tags: ['uzay', 'psikoloji', 'bilinç', 'gizemli']
  },

  // ─── FELSEFE ────────────────────────────────────────────────────────────────
  {
    id: 'b026',
    title: 'Böyle Buyurdu Zerdüşt',
    author: 'Friedrich Nietzsche',
    year: 1883,
    category: 'Felsefe',
    coverUrl: OL('9780140441185'),
    description: 'Üstinsan kavramını ve güç istencini anlatan Nietzsche\'nin felsefi şiir eseri.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 352,
    language: 'Almanca',
    isClassic: false,
    tags: ['felsefe', 'üstinsan', 'ahlak', 'güç', 'varoluş']
  },
  {
    id: 'b027',
    title: 'Devlet',
    author: 'Platon',
    year: -380,
    category: 'Felsefe',
    coverUrl: OL('9780140455113'),
    description: 'Adalet, ideal devlet ve filozofların yönetimini tartışan Platon\'un başyapıtı.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 416,
    language: 'Yunanca',
    isClassic: false,
    tags: ['siyaset', 'adalet', 'felsefe', 'antik Yunan']
  },
  {
    id: 'b028',
    title: 'Varlık ve Hiçlik',
    author: 'Jean-Paul Sartre',
    year: 1943,
    category: 'Felsefe',
    coverUrl: OL('9780671867805'),
    description: 'Varoluşçuluğun temel metni; özgürlük, sorumluluk ve varoluşun önceliği üzerine.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 688,
    language: 'Fransızca',
    isClassic: false,
    tags: ['varoluşçuluk', 'özgürlük', 'bilinç', 'felsefe']
  },
  {
    id: 'b029',
    title: 'Ahlakın Soykütüğü',
    author: 'Friedrich Nietzsche',
    year: 1887,
    category: 'Felsefe',
    coverUrl: OL('9780140449877'),
    description: 'Ahlaki değerlerin kökenini sorgulayan ve efendi-köle ahlakını tartışan felsefi inceleme.',
    maxPoints: 45,
    difficulty: 'Çok Zor',
    pageCount: 208,
    language: 'Almanca',
    isClassic: false,
    tags: ['ahlak', 'değerler', 'güç', 'felsefe']
  },
  {
    id: 'b030',
    title: 'Özgürlük Üzerine',
    author: 'John Stuart Mill',
    year: 1859,
    category: 'Felsefe',
    coverUrl: OL('9780140432077'),
    description: 'Bireysel özgürlük ve toplumsal otorite arasındaki dengeyi inceleyen klasik liberal metin.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 176,
    language: 'İngilizce',
    isClassic: false,
    tags: ['özgürlük', 'liberalizm', 'siyaset', 'felsefe']
  },

  // ─── TARİH ──────────────────────────────────────────────────────────────────
  {
    id: 'b031',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    year: 2011,
    category: 'Tarih',
    coverUrl: OL('9780062316097'),
    description: 'İnsanlığın 70.000 yıllık tarihini anlatan çığır açıcı popüler tarih kitabı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 443,
    language: 'İbranice',
    isClassic: false,
    tags: ['insanlık', 'evrim', 'tarih', 'kültür']
  },
  {
    id: 'b032',
    title: 'Silahlar, Mikroplar ve Çelik',
    author: 'Jared Diamond',
    year: 1997,
    category: 'Tarih',
    coverUrl: OL('9780393317558'),
    description: 'Medeniyetlerin neden farklı hızlarda geliştiğini açıklayan Pulitzer ödüllü eser.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 480,
    language: 'İngilizce',
    isClassic: false,
    tags: ['medeniyet', 'coğrafya', 'tarih', 'evrim']
  },
  {
    id: 'b033',
    title: 'Osmanlı İmparatorluğu\'nun Yükselişi ve Çöküşü',
    author: 'Lord Kinross',
    year: 1977,
    category: 'Tarih',
    coverUrl: OL('9780688039875'),
    description: 'Osmanlı İmparatorluğu\'nun kuruluşundan çöküşüne kadar kapsamlı tarih.',
    maxPoints: 40,
    difficulty: 'Orta',
    pageCount: 624,
    language: 'İngilizce',
    isClassic: false,
    tags: ['Osmanlı', 'Türkiye', 'imparatorluk', 'tarih']
  },
  {
    id: 'b034',
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    year: 2015,
    category: 'Tarih',
    coverUrl: OL('9780062464316'),
    description: 'İnsanlığın geleceğini ve yapay zeka çağını inceleyen öngörülü eser.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 464,
    language: 'İbranice',
    isClassic: false,
    tags: ['gelecek', 'yapay zeka', 'insanlık', 'teknoloji']
  },
  {
    id: 'b035',
    title: 'Tarihçe',
    author: 'Herodotos',
    year: -440,
    category: 'Tarih',
    coverUrl: OL('9780140449082'),
    description: 'Tarihin babası Herodotos\'un Pers Savaşları\'nı anlatan ilk tarih eseri.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 784,
    language: 'Yunanca',
    isClassic: false,
    tags: ['antik', 'Yunan', 'Pers', 'tarih']
  },

  // ─── ŞİİR ───────────────────────────────────────────────────────────────────
  {
    id: 'b036',
    title: 'İlahi Komedya',
    author: 'Dante Alighieri',
    year: 1320,
    category: 'Şiir',
    coverUrl: OL('9780142437223'),
    description: 'Cehennem, Araf ve Cennet\'i anlatan Orta Çağ\'ın en büyük şiir başyapıtı.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 798,
    language: 'İtalyanca',
    isClassic: true,
    tags: ['şiir', 'din', 'cehennem', 'cennet', 'Orta Çağ'],
    quizQuestions: [
      {
        question: 'Dante\'ye Cehennem\'de rehberlik eden kimdir?',
        options: ['Beatrice', 'Vergilius', 'Homeros', 'Aristoteles'],
        correctIndex: 1
      },
      {
        question: 'Dante\'nin ilahi aşkı kimdir?',
        options: ['Laura', 'Beatrice', 'Fiammetta', 'Selvaggia'],
        correctIndex: 1
      },
      {
        question: 'İlahi Komedya kaç bölümden oluşur?',
        options: ['İki', 'Üç', 'Dört', 'Beş'],
        correctIndex: 1
      },
      {
        question: 'Cehennem\'in kaç dairesi vardır?',
        options: ['7', '9', '12', '6'],
        correctIndex: 1
      },
      {
        question: 'Dante hangi yüzyılda yaşamıştır?',
        options: ['11. yüzyıl', '12. yüzyıl', '13-14. yüzyıl', '15. yüzyıl'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'b037',
    title: 'İlyada',
    author: 'Homeros',
    year: -750,
    category: 'Şiir',
    coverUrl: OL('9780140275360'),
    description: 'Truva Savaşı\'nı anlatan antik Yunan destanı.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 704,
    language: 'Yunanca',
    isClassic: false,
    tags: ['destan', 'antik Yunan', 'savaş', 'Truva', 'mitoloji']
  },
  {
    id: 'b038',
    title: 'Şahname',
    author: 'Firdevsi',
    year: 1010,
    category: 'Şiir',
    coverUrl: OL('9780670825494'),
    description: 'İran\'ın efsanevi ve tarihi geçmişini anlatan devasa Farsça destan.',
    maxPoints: 45,
    difficulty: 'Çok Zor',
    pageCount: 886,
    language: 'Farsça',
    isClassic: false,
    tags: ['destan', 'İran', 'mitoloji', 'şiir', 'tarih']
  },
  {
    id: 'b039',
    title: 'Çiçekler İçin Algernon',
    author: 'Daniel Keyes',
    year: 1966,
    category: 'Bilim Kurgu',
    coverUrl: OL('9780156030304'),
    description: 'Zihinsel engelli bir adamın deney sonucu dahiye dönüşmesini anlatan dokunaklı roman.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 311,
    language: 'İngilizce',
    isClassic: false,
    tags: ['zeka', 'insan', 'deney', 'duygu', 'bilim kurgu']
  },
  {
    id: 'b040',
    title: 'Çavdar Tarlasında Çocuklar',
    author: 'J.D. Salinger',
    year: 1951,
    category: 'Roman',
    coverUrl: OL('9780316769174'),
    description: 'Genç Holden Caulfield\'ın New York\'ta geçirdiği birkaç günü anlatan büyüme romanı.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 277,
    language: 'İngilizce',
    isClassic: false,
    tags: ['gençlik', 'isyan', 'kimlik', 'Amerika']
  },

  // ─── PSİKOLOJİ ──────────────────────────────────────────────────────────────
  {
    id: 'b041',
    title: 'İnsan Neyi Arar',
    author: 'Viktor Frankl',
    year: 1946,
    category: 'Psikoloji',
    coverUrl: OL('9780807014271'),
    description: 'Holokost\'tan sağ kurtulan psikiyatrist Viktor Frankl\'ın anlam arayışı üzerine başyapıtı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 165,
    language: 'Almanca',
    isClassic: false,
    tags: ['anlam', 'psikoloji', 'Holokost', 'varoluş']
  },
  {
    id: 'b042',
    title: 'Düşün ve Zengin Ol',
    author: 'Napoleon Hill',
    year: 1937,
    category: 'Psikoloji',
    coverUrl: OL('9781585424337'),
    description: 'Başarının psikolojik sırlarını açıklayan klasik kişisel gelişim kitabı.',
    maxPoints: 20,
    difficulty: 'Kolay',
    pageCount: 320,
    language: 'İngilizce',
    isClassic: false,
    tags: ['başarı', 'motivasyon', 'zenginlik', 'psikoloji']
  },
  {
    id: 'b043',
    title: 'Bilinçdışının Psikolojisi',
    author: 'Carl Gustav Jung',
    year: 1912,
    category: 'Psikoloji',
    coverUrl: OL('9780691018638'),
    description: 'Jung\'un bilinçdışı, arketipler ve kolektif bilinçdışı teorilerini açıkladığı temel eser.',
    maxPoints: 45,
    difficulty: 'Çok Zor',
    pageCount: 416,
    language: 'Almanca',
    isClassic: false,
    tags: ['psikoloji', 'bilinçdışı', 'arketipler', 'Jung']
  },
  {
    id: 'b044',
    title: 'Ruhun Anatomisi',
    author: 'Carl Gustav Jung',
    year: 1964,
    category: 'Psikoloji',
    coverUrl: OL('9780691018638'),
    description: 'Jung\'un semboller, mitler ve insan psikolojisi üzerine derleme eseri.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 320,
    language: 'Almanca',
    isClassic: false,
    tags: ['psikoloji', 'sembol', 'mit', 'Jung']
  },
  {
    id: 'b045',
    title: 'Beden Skor Tutar',
    author: 'Bessel van der Kolk',
    year: 2014,
    category: 'Psikoloji',
    coverUrl: OL('9780670785933'),
    description: 'Travmanın beyin ve beden üzerindeki etkilerini inceleyen çığır açıcı psikoloji kitabı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 464,
    language: 'İngilizce',
    isClassic: false,
    tags: ['travma', 'psikoloji', 'beyin', 'iyileşme']
  },

  // ─── BİYOGRAFİ ──────────────────────────────────────────────────────────────
  {
    id: 'b046',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    year: 2011,
    category: 'Biyografi',
    coverUrl: OL('9781451648539'),
    description: 'Apple\'ın kurucusu Steve Jobs\'ın hayatını ve vizyonunu anlatan resmi biyografi.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 656,
    language: 'İngilizce',
    isClassic: false,
    tags: ['teknoloji', 'Apple', 'girişimcilik', 'inovasyon']
  },
  {
    id: 'b047',
    title: 'Elon Musk',
    author: 'Walter Isaacson',
    year: 2023,
    category: 'Biyografi',
    coverUrl: OL('9781982181284'),
    description: 'Tesla ve SpaceX\'in kurucusu Elon Musk\'ın hayatını anlatan güncel biyografi.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 688,
    language: 'İngilizce',
    isClassic: false,
    tags: ['teknoloji', 'uzay', 'girişimcilik', 'Tesla']
  },
  {
    id: 'b048',
    title: 'Leonardo da Vinci',
    author: 'Walter Isaacson',
    year: 2017,
    category: 'Biyografi',
    coverUrl: OL('9781501139154'),
    description: 'Rönesans\'ın dehasının hayatını, sanatını ve bilimini anlatan kapsamlı biyografi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 624,
    language: 'İngilizce',
    isClassic: false,
    tags: ['sanat', 'bilim', 'Rönesans', 'deha']
  },
  {
    id: 'b049',
    title: 'Mandela\'nın Uzun Yürüyüşü',
    author: 'Nelson Mandela',
    year: 1994,
    category: 'Biyografi',
    coverUrl: OL('9780316548182'),
    description: 'Nelson Mandela\'nın apartheid\'e karşı mücadelesini anlatan otobiyografi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 656,
    language: 'İngilizce',
    isClassic: false,
    tags: ['özgürlük', 'Güney Afrika', 'ırk', 'siyaset']
  },
  {
    id: 'b050',
    title: 'Bir Dehanın Günlüğü',
    author: 'Salvador Dalí',
    year: 1964,
    category: 'Biyografi',
    coverUrl: OL('9780863160011'),
    description: 'Sürrealist ressam Salvador Dalí\'nin kendi hayatını ve sanatını anlattığı günlük.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 240,
    language: 'Fransızca',
    isClassic: false,
    tags: ['sanat', 'sürrealizm', 'günlük', 'Dalí']
  },

  // ─── TÜRK EDEBİYATI ─────────────────────────────────────────────────────────
  {
    id: 'b051',
    title: 'İnce Memed',
    author: 'Yaşar Kemal',
    year: 1955,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9780007119530'),
    description: 'Çukurova\'da ağa zulmüne karşı çıkan efsanevi eşkıya İnce Memed\'in hikayesi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 371,
    language: 'Türkçe',
    isClassic: false,
    tags: ['Türkiye', 'Çukurova', 'eşkıya', 'adalet', 'halk']
  },
  {
    id: 'b052',
    title: 'Tutunamayanlar',
    author: 'Oğuz Atay',
    year: 1972,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'Türk edebiyatının en özgün postmodern romanı; topluma uyum sağlayamayanların hikayesi.',
    maxPoints: 45,
    difficulty: 'Çok Zor',
    pageCount: 724,
    language: 'Türkçe',
    isClassic: false,
    tags: ['postmodern', 'Türkiye', 'yabancılaşma', 'kimlik']
  },
  {
    id: 'b053',
    title: 'Benim Adım Kırmızı',
    author: 'Orhan Pamuk',
    year: 1998,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9780375706851'),
    description: 'Osmanlı minyatür sanatçılarının dünyasında geçen, cinayet ve aşk içeren Nobel ödüllü roman.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 417,
    language: 'Türkçe',
    isClassic: false,
    tags: ['Osmanlı', 'sanat', 'cinayet', 'aşk', 'Nobel']
  },
  {
    id: 'b054',
    title: 'Kar',
    author: 'Orhan Pamuk',
    year: 2002,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9781400033535'),
    description: 'Kars\'ta geçen, siyaset, din ve kimlik temalarını işleyen Nobel ödüllü roman.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 436,
    language: 'Türkçe',
    isClassic: false,
    tags: ['Kars', 'siyaset', 'din', 'kimlik', 'Nobel']
  },
  {
    id: 'b055',
    title: 'Çalıkuşu',
    author: 'Reşat Nuri Güntekin',
    year: 1922,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'Feride adlı genç bir öğretmenin Anadolu\'da yaşadığı maceralar ve aşk hikayesi.',
    maxPoints: 30,
    difficulty: 'Kolay',
    pageCount: 416,
    language: 'Türkçe',
    isClassic: false,
    tags: ['Anadolu', 'öğretmen', 'aşk', 'Türkiye', 'klasik']
  },
  {
    id: 'b056',
    title: 'Yaban',
    author: 'Yakup Kadri Karaosmanoğlu',
    year: 1932,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'Kurtuluş Savaşı döneminde Anadolu köyünde bir aydının yaşadıklarını anlatan roman.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 192,
    language: 'Türkçe',
    isClassic: false,
    tags: ['Kurtuluş Savaşı', 'Anadolu', 'aydın', 'köy']
  },
  {
    id: 'b057',
    title: 'Huzur',
    author: 'Ahmet Hamdi Tanpınar',
    year: 1949,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'İstanbul\'u ve Türk modernleşmesini anlatan, Türk edebiyatının başyapıtlarından.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 376,
    language: 'Türkçe',
    isClassic: false,
    tags: ['İstanbul', 'modernleşme', 'aşk', 'müzik', 'kimlik']
  },
  {
    id: 'b058',
    title: 'Saatleri Ayarlama Enstitüsü',
    author: 'Ahmet Hamdi Tanpınar',
    year: 1961,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'Türk bürokrasisini ve modernleşme çelişkilerini hicivli bir dille anlatan roman.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 368,
    language: 'Türkçe',
    isClassic: false,
    tags: ['bürokrasi', 'hiciv', 'modernleşme', 'Türkiye']
  },
  {
    id: 'b059',
    title: 'Kürk Mantolu Madonna',
    author: 'Sabahattin Ali',
    year: 1943,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'Berlin\'de geçen, imkansız bir aşkı anlatan Türk edebiyatının en çok okunan romanlarından.',
    maxPoints: 30,
    difficulty: 'Kolay',
    pageCount: 160,
    language: 'Türkçe',
    isClassic: false,
    tags: ['aşk', 'Berlin', 'trajedi', 'sanat']
  },
  {
    id: 'b060',
    title: 'Mavi Karanlık',
    author: 'Ahmet Altan',
    year: 2009,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'Türkiye\'nin siyasi gerçekliğini ve bireysel özgürlük arayışını anlatan roman.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 304,
    language: 'Türkçe',
    isClassic: false,
    tags: ['siyaset', 'özgürlük', 'Türkiye', 'roman']
  },

  // ─── GİZEM / MACERA ─────────────────────────────────────────────────────────
  {
    id: 'b061',
    title: 'Sherlock Holmes\'un Maceraları',
    author: 'Arthur Conan Doyle',
    year: 1892,
    category: 'Gizem',
    coverUrl: OL('9780140437713'),
    description: 'Dünyanın en ünlü dedektifi Sherlock Holmes\'un ilk kısa hikaye derlemesi.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 307,
    language: 'İngilizce',
    isClassic: false,
    tags: ['dedektif', 'gizem', 'Londra', 'akıl']
  },
  {
    id: 'b062',
    title: 'Ve Sonra Hiç Kalmadı',
    author: 'Agatha Christie',
    year: 1939,
    category: 'Gizem',
    coverUrl: OL('9780312330873'),
    description: 'Issız bir adada toplanan on kişinin birer birer öldürülmesini anlatan gerilim klasiği.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 272,
    language: 'İngilizce',
    isClassic: false,
    tags: ['cinayet', 'ada', 'gizem', 'gerilim']
  },
  {
    id: 'b063',
    title: 'Gülün Adı',
    author: 'Umberto Eco',
    year: 1980,
    category: 'Gizem',
    coverUrl: OL('9780151446476'),
    description: 'Ortaçağ manastırında geçen, felsefi derinliği olan tarihi gizem romanı.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 502,
    language: 'İtalyanca',
    isClassic: false,
    tags: ['Orta Çağ', 'manastır', 'gizem', 'felsefe', 'kitap']
  },
  {
    id: 'b064',
    title: 'Korsanlar',
    author: 'Robert Louis Stevenson',
    year: 1883,
    category: 'Macera',
    coverUrl: OL('9780141321004'),
    description: 'Genç Jim Hawkins\'in korsan haritası bulmasıyla başlayan macera klasiği.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 292,
    language: 'İngilizce',
    isClassic: false,
    tags: ['korsan', 'macera', 'hazine', 'deniz']
  },
  {
    id: 'b065',
    title: 'Moby Dick',
    author: 'Herman Melville',
    year: 1851,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780142437247'),
    description: 'Kaptan Ahab\'ın beyaz balinayı avlama takıntısını anlatan Amerikan edebiyatının başyapıtı.',
    maxPoints: 45,
    difficulty: 'Çok Zor',
    pageCount: 720,
    language: 'İngilizce',
    isClassic: false,
    tags: ['deniz', 'balina', 'takıntı', 'Amerikan', 'sembolizm']
  },

  // ─── DAHA FAZLA ROMAN ───────────────────────────────────────────────────────
  {
    id: 'b066',
    title: 'Otomatik Portakal',
    author: 'Anthony Burgess',
    year: 1962,
    category: 'Distopya',
    coverUrl: OL('9780393312836'),
    description: 'Şiddet ve özgür irade üzerine düşündüren distopik roman.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 212,
    language: 'İngilizce',
    isClassic: false,
    tags: ['şiddet', 'özgür irade', 'distopya', 'gençlik']
  },
  {
    id: 'b067',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    year: 1953,
    category: 'Distopya',
    coverUrl: OL('9781451673319'),
    description: 'Kitapların yakıldığı bir toplumda bir itfaiyecinin uyanışını anlatan distopik roman.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 249,
    language: 'İngilizce',
    isClassic: false,
    tags: ['kitap', 'sansür', 'distopya', 'özgürlük']
  },
  {
    id: 'b068',
    title: 'Beyaz Diş',
    author: 'Jack London',
    year: 1906,
    category: 'Macera',
    coverUrl: OL('9780142437971'),
    description: 'Vahşi doğada büyüyen bir kurdun evcilleşme sürecini anlatan macera romanı.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 299,
    language: 'İngilizce',
    isClassic: false,
    tags: ['kurt', 'vahşi doğa', 'macera', 'Alaska']
  },
  {
    id: 'b069',
    title: 'Bülbülü Öldürmek',
    author: 'Harper Lee',
    year: 1960,
    category: 'Roman',
    coverUrl: OL('9780061935466'),
    description: 'Amerikan Güneyinde ırk ayrımcılığını bir çocuğun gözünden anlatan Pulitzer ödüllü roman.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 336,
    language: 'İngilizce',
    isClassic: false,
    tags: ['ırk', 'adalet', 'Amerika', 'çocuk', 'Pulitzer']
  },
  {
    id: 'b070',
    title: 'Yeraltından Notlar',
    author: 'Fyodor Dostoyevski',
    year: 1864,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780140449174'),
    description: 'Toplumdan kopuk, acı dolu bir adamın iç dünyasını anlatan kısa ama derin roman.',
    maxPoints: 35,
    difficulty: 'Zor',
    pageCount: 136,
    language: 'Rusça',
    isClassic: false,
    tags: ['psikoloji', 'yabancılaşma', 'Rusya', 'varoluş']
  },
  {
    id: 'b071',
    title: 'Karamazov Kardeşler',
    author: 'Fyodor Dostoyevski',
    year: 1880,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780374528379'),
    description: 'Üç kardeşin babaları etrafında dönen ahlaki ve felsefi sorgulamalar.',
    maxPoints: 50,
    difficulty: 'Çok Zor',
    pageCount: 796,
    language: 'Rusça',
    isClassic: false,
    tags: ['aile', 'ahlak', 'din', 'Rusya', 'felsefe']
  },
  {
    id: 'b072',
    title: 'Portreye Bakış',
    author: 'Henry James',
    year: 1881,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780141441269'),
    description: 'Özgür ruhlu Amerikalı bir kadının Avrupa\'da özgürlüğünü kaybetme hikayesi.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 624,
    language: 'İngilizce',
    isClassic: false,
    tags: ['özgürlük', 'Avrupa', 'Amerika', 'kadın', 'toplum']
  },
  {
    id: 'b073',
    title: 'Uğultulu Tepeler',
    author: 'Emily Brontë',
    year: 1847,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780141439556'),
    description: 'Yorkshire\'da geçen, tutku ve intikamı anlatan gotik aşk romanı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 342,
    language: 'İngilizce',
    isClassic: false,
    tags: ['aşk', 'intikam', 'gotik', 'İngiltere', 'tutku']
  },
  {
    id: 'b074',
    title: 'Gurur ve Önyargı',
    author: 'Jane Austen',
    year: 1813,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780141439518'),
    description: 'Elizabeth Bennet ve Bay Darcy arasındaki aşkı anlatan İngiliz edebiyatının başyapıtı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 432,
    language: 'İngilizce',
    isClassic: false,
    tags: ['aşk', 'toplum', 'İngiltere', 'evlilik', 'hiciv']
  },
  {
    id: 'b075',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    year: 1847,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780141441146'),
    description: 'Yetim bir kadının bağımsızlık ve aşk arayışını anlatan Victorian dönem romanı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 532,
    language: 'İngilizce',
    isClassic: false,
    tags: ['kadın', 'bağımsızlık', 'aşk', 'Victorian', 'İngiltere']
  },
  {
    id: 'b076',
    title: 'Beklenti',
    author: 'Charles Dickens',
    year: 1861,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780141439563'),
    description: 'Yoksul Pip\'in gizemli bir hayırseverin yardımıyla yükselmesini anlatan Dickens başyapıtı.',
    maxPoints: 40,
    difficulty: 'Orta',
    pageCount: 544,
    language: 'İngilizce',
    isClassic: false,
    tags: ['sınıf', 'İngiltere', 'Victorian', 'büyüme', 'gizem']
  },
  {
    id: 'b077',
    title: 'Kızıl Damga',
    author: 'Nathaniel Hawthorne',
    year: 1850,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780142437261'),
    description: 'Püriten toplumda zina suçlamasıyla damgalanan Hester Prynne\'nin hikayesi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 238,
    language: 'İngilizce',
    isClassic: false,
    tags: ['günah', 'toplum', 'Amerika', 'din', 'kadın']
  },
  {
    id: 'b078',
    title: 'Madam Tussaud',
    author: 'Michelle Moran',
    year: 2011,
    category: 'Tarih',
    coverUrl: OL('9780307588739'),
    description: 'Fransız Devrimi\'nde balmumu heykeltraşı Marie Tussaud\'nun hayatta kalma hikayesi.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 432,
    language: 'İngilizce',
    isClassic: false,
    tags: ['Fransız Devrimi', 'tarih', 'sanat', 'kadın']
  },
  {
    id: 'b079',
    title: 'Kör Baykuş',
    author: 'Sadegh Hedayat',
    year: 1937,
    category: 'Roman',
    coverUrl: OL('9780802131850'),
    description: 'İran edebiyatının en gizemli ve karanlık başyapıtı; gerçeklik ve rüya arasında.',
    maxPoints: 45,
    difficulty: 'Çok Zor',
    pageCount: 131,
    language: 'Farsça',
    isClassic: false,
    tags: ['İran', 'varoluş', 'rüya', 'karanlık', 'gizemli']
  },
  {
    id: 'b080',
    title: 'Yüzüklerin Efendisi: Yüzük Kardeşliği',
    author: 'J.R.R. Tolkien',
    year: 1954,
    category: 'Macera',
    coverUrl: OL('9780618346257'),
    description: 'Orta Dünya\'da geçen epik fantezi üçlemesinin ilk kitabı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 479,
    language: 'İngilizce',
    isClassic: false,
    tags: ['fantezi', 'macera', 'iyi-kötü', 'epik', 'Tolkien']
  },
  {
    id: 'b081',
    title: 'Harry Potter ve Felsefe Taşı',
    author: 'J.K. Rowling',
    year: 1997,
    category: 'Macera',
    coverUrl: OL('9780439708180'),
    description: 'Sihir dünyasına adım atan genç büyücü Harry Potter\'ın ilk macerası.',
    maxPoints: 20,
    difficulty: 'Kolay',
    pageCount: 309,
    language: 'İngilizce',
    isClassic: false,
    tags: ['sihir', 'büyücü', 'macera', 'çocuk', 'okul']
  },
  {
    id: 'b082',
    title: 'Alchemist\'in El Yazması',
    author: 'Michael Scott',
    year: 2007,
    category: 'Macera',
    coverUrl: OL('9780385736008'),
    description: 'Ölümsüz simyacı Nicholas Flamel\'in maceralarını anlatan fantezi serisi.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 375,
    language: 'İngilizce',
    isClassic: false,
    tags: ['simya', 'fantezi', 'tarih', 'macera']
  },
  {
    id: 'b083',
    title: 'Kuyucaklı Yusuf',
    author: 'Sabahattin Ali',
    year: 1937,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9789750718748'),
    description: 'Anadolu\'da geçen, bir gencin aşk ve toplumsal baskılarla mücadelesini anlatan roman.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 224,
    language: 'Türkçe',
    isClassic: false,
    tags: ['Anadolu', 'aşk', 'toplum', 'Türkiye']
  },
  {
    id: 'b084',
    title: 'Beyaz Gemi',
    author: 'Cengiz Aytmatov',
    year: 1970,
    category: 'Roman',
    coverUrl: OL('9780253203694'),
    description: 'Kırgız edebiyatının başyapıtı; bir çocuğun hayal dünyasını ve gerçekliği anlatan roman.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 160,
    language: 'Kırgızca',
    isClassic: false,
    tags: ['çocuk', 'hayal', 'Kırgızistan', 'doğa', 'masumiyet']
  },
  {
    id: 'b085',
    title: 'Gece Yarısı Kütüphanesi',
    author: 'Matt Haig',
    year: 2020,
    category: 'Roman',
    coverUrl: OL('9780525559474'),
    description: 'Yaşam ve ölüm arasında sonsuz bir kütüphanede farklı hayatları deneyen bir kadının hikayesi.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 304,
    language: 'İngilizce',
    isClassic: false,
    tags: ['hayat', 'seçimler', 'kütüphane', 'umut', 'pişmanlık']
  },
  {
    id: 'b086',
    title: 'Dört Dörtlük Bir Yalnızlık',
    author: 'Paul Auster',
    year: 1982,
    category: 'Roman',
    coverUrl: OL('9780140097313'),
    description: 'Paul Auster\'ın babasının ölümünden sonra kaleme aldığı otobiyografik deneme.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 200,
    language: 'İngilizce',
    isClassic: false,
    tags: ['otobiyografi', 'baba', 'yalnızlık', 'bellek']
  },
  {
    id: 'b087',
    title: 'Kırlangıçlar ve Amazonlar',
    author: 'Arthur Ransome',
    year: 1930,
    category: 'Macera',
    coverUrl: OL('9780099427155'),
    description: 'İngiliz çocukların yaz tatilinde yaşadığı macera klasiği.',
    maxPoints: 20,
    difficulty: 'Kolay',
    pageCount: 352,
    language: 'İngilizce',
    isClassic: false,
    tags: ['çocuk', 'macera', 'yaz', 'İngiltere']
  },
  {
    id: 'b088',
    title: 'Deniz Kurdu',
    author: 'Jack London',
    year: 1904,
    category: 'Macera',
    coverUrl: OL('9780140187724'),
    description: 'Denizde kurtarılan bir adamın vahşi bir kaptan tarafından esir tutulmasını anlatan roman.',
    maxPoints: 28,
    difficulty: 'Orta',
    pageCount: 355,
    language: 'İngilizce',
    isClassic: false,
    tags: ['deniz', 'vahşet', 'güç', 'macera']
  },
  {
    id: 'b089',
    title: 'Dağlarda Ölüm',
    author: 'Joe Simpson',
    year: 1988,
    category: 'Biyografi',
    coverUrl: OL('9780060730550'),
    description: 'And Dağları\'nda gerçek bir dağcılık faciasını anlatan hayatta kalma hikayesi.',
    maxPoints: 25,
    difficulty: 'Orta',
    pageCount: 218,
    language: 'İngilizce',
    isClassic: false,
    tags: ['dağcılık', 'hayatta kalma', 'gerçek hikaye', 'macera']
  },
  {
    id: 'b090',
    title: 'Satranç',
    author: 'Stefan Zweig',
    year: 1942,
    category: 'Roman',
    coverUrl: OL('9780140180442'),
    description: 'Nazi baskısı altında satranç oynayarak akıl sağlığını koruyan bir adamın hikayesi.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 96,
    language: 'Almanca',
    isClassic: false,
    tags: ['satranç', 'Nazi', 'psikoloji', 'özgürlük']
  },
  {
    id: 'b091',
    title: 'Dünyanın Güzelliği',
    author: 'Stefan Zweig',
    year: 1942,
    category: 'Biyografi',
    coverUrl: OL('9780803259423'),
    description: 'Stefan Zweig\'ın Avrupa\'nın çöküşünü anlatan otobiyografik başyapıtı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 448,
    language: 'Almanca',
    isClassic: false,
    tags: ['otobiyografi', 'Avrupa', 'savaş', 'kültür']
  },
  {
    id: 'b092',
    title: 'Kırık Kalpler Şehri',
    author: 'Elif Şafak',
    year: 2010,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9780670021659'),
    description: 'İstanbul\'da geçen, Ermeni soykırımının gölgesindeki bir aile hikayesi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 384,
    language: 'Türkçe',
    isClassic: false,
    tags: ['İstanbul', 'Ermeni', 'aile', 'tarih', 'kimlik']
  },
  {
    id: 'b093',
    title: 'Aşk',
    author: 'Elif Şafak',
    year: 2009,
    category: 'Türk Edebiyatı',
    coverUrl: OL('9780670021659'),
    description: 'Rumi ve Şems-i Tebrizi\'nin dostluğunu ve tasavvufu anlatan roman.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 368,
    language: 'Türkçe',
    isClassic: false,
    tags: ['tasavvuf', 'Rumi', 'aşk', 'din', 'İstanbul']
  },
  {
    id: 'b094',
    title: 'Yürek Burkan',
    author: 'Colleen Hoover',
    year: 2012,
    category: 'Roman',
    coverUrl: OL('9781476753492'),
    description: 'Genç bir çiftin zorlu ilişkisini ve geçmişin gölgesini anlatan duygusal roman.',
    maxPoints: 20,
    difficulty: 'Kolay',
    pageCount: 352,
    language: 'İngilizce',
    isClassic: false,
    tags: ['aşk', 'travma', 'gençlik', 'duygu']
  },
  {
    id: 'b095',
    title: 'Normal İnsanlar',
    author: 'Sally Rooney',
    year: 2018,
    category: 'Roman',
    coverUrl: OL('9780571334650'),
    description: 'İrlanda\'da iki gencin karmaşık ilişkisini anlatan çağdaş roman.',
    maxPoints: 25,
    difficulty: 'Orta',
    pageCount: 288,
    language: 'İngilizce',
    isClassic: false,
    tags: ['aşk', 'gençlik', 'İrlanda', 'çağdaş']
  },
  {
    id: 'b096',
    title: 'Kelebek',
    author: 'Henri Charrière',
    year: 1969,
    category: 'Biyografi',
    coverUrl: OL('9780061013713'),
    description: 'Fransız Guyana\'sındaki cezaevinden kaçış hikayesini anlatan gerçek yaşam anlatısı.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 528,
    language: 'Fransızca',
    isClassic: false,
    tags: ['kaçış', 'cezaevi', 'özgürlük', 'macera', 'gerçek']
  },
  {
    id: 'b097',
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    year: 1922,
    category: 'Felsefe',
    coverUrl: OL('9780553208849'),
    description: 'Buda\'nın çağdaşı bir Brahman gencinin aydınlanma yolculuğunu anlatan felsefi roman.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 152,
    language: 'Almanca',
    isClassic: false,
    tags: ['Budizm', 'aydınlanma', 'yolculuk', 'felsefe', 'Hindistan']
  },
  {
    id: 'b098',
    title: 'Bozkır Kurdu',
    author: 'Hermann Hesse',
    year: 1927,
    category: 'Felsefe',
    coverUrl: OL('9780312278670'),
    description: 'Toplumla uyumsuz bir aydının iç dünyasını ve kimlik arayışını anlatan roman.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 218,
    language: 'Almanca',
    isClassic: false,
    tags: ['kimlik', 'yabancılaşma', 'felsefe', 'müzik', 'Almanya']
  },
  {
    id: 'b099',
    title: 'Altın Defter',
    author: 'Doris Lessing',
    year: 1962,
    category: 'Roman',
    coverUrl: OL('9780061673596'),
    description: 'Dört farklı defterde hayatını kaydeden bir yazarın çok katmanlı hikayesi.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 688,
    language: 'İngilizce',
    isClassic: false,
    tags: ['feminizm', 'yazarlık', 'psikoloji', 'siyaset', 'Nobel']
  },
  {
    id: 'b100',
    title: 'Körlük',
    author: 'José Saramago',
    year: 1995,
    category: 'Roman',
    coverUrl: OL('9780156007757'),
    description: 'Ani bir körlük salgınının toplumu nasıl çöküşe götürdüğünü anlatan Nobel ödüllü roman.',
    maxPoints: 45,
    difficulty: 'Zor',
    pageCount: 352,
    language: 'Portekizce',
    isClassic: false,
    tags: ['toplum', 'insanlık', 'kriz', 'Nobel', 'alegori']
  },
  {
    id: 'b101',
    title: 'Yüzüklerin Efendisi: İki Kule',
    author: 'J.R.R. Tolkien',
    year: 1954,
    category: 'Macera',
    coverUrl: OL('9780618346264'),
    description: 'Orta Dünya\'da geçen epik fantezi üçlemesinin ikinci kitabı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 352,
    language: 'İngilizce',
    isClassic: false,
    tags: ['fantezi', 'macera', 'savaş', 'epik', 'Tolkien']
  },
  {
    id: 'b102',
    title: 'Yüzüklerin Efendisi: Kralın Dönüşü',
    author: 'J.R.R. Tolkien',
    year: 1955,
    category: 'Macera',
    coverUrl: OL('9780618346271'),
    description: 'Orta Dünya\'da geçen epik fantezi üçlemesinin son kitabı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 416,
    language: 'İngilizce',
    isClassic: false,
    tags: ['fantezi', 'macera', 'zafer', 'epik', 'Tolkien']
  },
  {
    id: 'b103',
    title: 'Kırık Cam',
    author: 'Alain Mabanckou',
    year: 2005,
    category: 'Roman',
    coverUrl: OL('9781593762155'),
    description: 'Kongo\'da bir barda geçen, hicivli ve esprili anlatı.',
    maxPoints: 25,
    difficulty: 'Orta',
    pageCount: 192,
    language: 'Fransızca',
    isClassic: false,
    tags: ['Afrika', 'Kongo', 'hiciv', 'bar', 'anlatı']
  },
  {
    id: 'b104',
    title: 'Şeker Portakalı',
    author: 'José Mauro de Vasconcelos',
    year: 1968,
    category: 'Roman',
    coverUrl: OL('9780307476050'),
    description: 'Brezilya\'da yoksul bir çocuğun hayal gücü ve acılarını anlatan dokunaklı roman.',
    maxPoints: 25,
    difficulty: 'Kolay',
    pageCount: 208,
    language: 'Portekizce',
    isClassic: false,
    tags: ['çocuk', 'yoksulluk', 'Brezilya', 'hayal', 'duygu']
  },
  {
    id: 'b105',
    title: 'Bir Yaz Gecesi Rüyası',
    author: 'William Shakespeare',
    year: 1600,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780743477543'),
    description: 'Periler, aşıklar ve aktörler arasında geçen Shakespeare\'in en eğlenceli komedisi.',
    maxPoints: 30,
    difficulty: 'Orta',
    pageCount: 176,
    language: 'İngilizce',
    isClassic: false,
    tags: ['komedi', 'aşk', 'peri', 'Shakespeare', 'rüya']
  },
  {
    id: 'b106',
    title: 'Otello',
    author: 'William Shakespeare',
    year: 1603,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780743477550'),
    description: 'Kıskançlık ve manipülasyonun trajik sonuçlarını anlatan Shakespeare başyapıtı.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 240,
    language: 'İngilizce',
    isClassic: false,
    tags: ['kıskançlık', 'ihanet', 'trajedi', 'Shakespeare']
  },
  {
    id: 'b107',
    title: 'Macbeth',
    author: 'William Shakespeare',
    year: 1606,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780743477109'),
    description: 'İktidar hırsının bir adamı nasıl yıkıma götürdüğünü anlatan trajedi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 192,
    language: 'İngilizce',
    isClassic: false,
    tags: ['iktidar', 'hırs', 'trajedi', 'Shakespeare', 'cadı']
  },
  {
    id: 'b108',
    title: 'Kral Lear',
    author: 'William Shakespeare',
    year: 1606,
    category: 'Dünya Klasiği',
    coverUrl: OL('9780743477567'),
    description: 'Yaşlı bir kralın çocuklarına güvenerek her şeyini kaybetmesini anlatan trajedi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 256,
    language: 'İngilizce',
    isClassic: false,
    tags: ['aile', 'ihanet', 'yaşlılık', 'trajedi', 'Shakespeare']
  },
  {
    id: 'b109',
    title: 'Baba',
    author: 'Mario Puzo',
    year: 1969,
    category: 'Roman',
    coverUrl: OL('9780451205766'),
    description: 'Amerikan mafyasının efsanevi ailesi Corleone\'nin hikayesi.',
    maxPoints: 35,
    difficulty: 'Orta',
    pageCount: 448,
    language: 'İngilizce',
    isClassic: false,
    tags: ['mafya', 'aile', 'güç', 'Amerika', 'suç']
  },
  {
    id: 'b110',
    title: 'Savaşın Yüzü',
    author: 'John Keegan',
    year: 1976,
    category: 'Tarih',
    coverUrl: OL('9780140048353'),
    description: 'Savaşın asker perspektifinden nasıl göründüğünü anlatan devrimci askeri tarih.',
    maxPoints: 40,
    difficulty: 'Zor',
    pageCount: 354,
    language: 'İngilizce',
    isClassic: false,
    tags: ['savaş', 'asker', 'tarih', 'psikoloji']
  },
  {id:'b111',title:'Kız Kardeş Karolina',author:'Selim İleri',year:1989,category:'Türk Edebiyatı',coverUrl:OL('9789753630017'),description:'Türk edebiyatının önemli eserlerinden biri',maxPoints:30,difficulty:'Orta',pageCount:280,language:'Türkçe',isClassic:false,tags:['Türk','roman']},
  {id:'b112',title:'Çalıkuşu',author:'Reşat Nuri Güntekin',year:1922,category:'Türk Edebiyatı',coverUrl:OL('9789753630024'),description:'Türk edebiyatının en çok okunan eseri',maxPoints:25,difficulty:'Kolay',pageCount:320,language:'Türkçe',isClassic:false,tags:['Türk','roman']},
  {id:'b113',title:'Ateşten Gömlek',author:'Halide Edib Adivar',year:1922,category:'Türk Edebiyatı',coverUrl:OL('9789753630031'),description:'Kurtuluş Savaşı döneminin romanı',maxPoints:35,difficulty:'Orta',pageCount:400,language:'Türkçe',isClassic:false,tags:['Türk','tarih']},
  {id:'b114',title:'Kara Kitap',author:'Orhan Pamuk',year:1990,category:'Türk Edebiyatı',coverUrl:OL('9789753630048'),description:'İstanbul gizli yüzünü anlatan roman',maxPoints:40,difficulty:'Zor',pageCount:416,language:'Türkçe',isClassic:false,tags:['Türk','İstanbul']},
  {id:'b115',title:'Kar',author:'Orhan Pamuk',year:2002,category:'Türk Edebiyatı',coverUrl:OL('9789753630055'),description:'Anadolu iç çatışkınlığını anlatan roman',maxPoints:45,difficulty:'Zor',pageCount:480,language:'Türkçe',isClassic:false,tags:['Türk','Anadolu']},
  {id:'b116',title:'Sessiz Ev',author:'Sait Faik Abasıyanık',year:1949,category:'Türk Edebiyatı',coverUrl:OL('9789753630062'),description:'Türk edebiyatının güzel öykü koleksiyonu',maxPoints:28,difficulty:'Kolay',pageCount:240,language:'Türkçe',isClassic:false,tags:['Türk','öykü']},
  {id:'b117',title:'Saatleri Ayarlama Enstitüsü',author:'Ahmet Hamdi Tanpınar',year:1954,category:'Türk Edebiyatı',coverUrl:OL('9789753630079'),description:'Türk modernizasyonunun çelişkileri',maxPoints:40,difficulty:'Zor',pageCount:368,language:'Türkçe',isClassic:false,tags:['Türk','modernizm']},
  {id:'b118',title:'Memed Ağa',author:'Yaşar Kemal',year:1955,category:'Türk Edebiyatı',coverUrl:OL('9789753630086'),description:'Anadolu efsanevi kahramanını anlatan roman',maxPoints:35,difficulty:'Orta',pageCount:320,language:'Türkçe',isClassic:false,tags:['Türk','Anadolu']},
  {id:'b119',title:'Kurtlar Vadisi',author:'Yaşar Kemal',year:1978,category:'Türk Edebiyatı',coverUrl:OL('9789753630093'),description:'Anadolu yoksul köylerinin dramı',maxPoints:38,difficulty:'Orta',pageCount:400,language:'Türkçe',isClassic:false,tags:['Türk','sosyal']},
  {id:'b120',title:'Beyaz Gemi',author:'Cengiz Aytmatov',year:1970,category:'Roman',coverUrl:OL('9789753630117'),description:'Çocukluk masumiyeti ve doğa',maxPoints:30,difficulty:'Orta',pageCount:280,language:'Rusça',isClassic:false,tags:['çocukluk','doğa']},
  {id:'b121',title:'Cesur Yeni Dünya',author:'Aldous Huxley',year:1932,category:'Distopya',coverUrl:OL('9780060085239'),description:'Teknoloji ve kontrol altında toplum',maxPoints:38,difficulty:'Orta',pageCount:288,language:'İngilizce',isClassic:false,tags:['distopya','teknoloji']},
  {id:'b122',title:'Fahrenheit 451',author:'Ray Bradbury',year:1953,category:'Distopya',coverUrl:OL('9780451524935'),description:'Kitapların yakıldığı gelecek',maxPoints:32,difficulty:'Kolay',pageCount:249,language:'İngilizce',isClassic:false,tags:['distopya','kitap']},
  {id:'b123',title:'Biz',author:'Yevgeny Zamyatin',year:1924,category:'Distopya',coverUrl:OL('9780140018486'),description:'Distopya romanlarının öncüsü',maxPoints:40,difficulty:'Zor',pageCount:224,language:'Rusça',isClassic:false,tags:['distopya','kontrol']},
  {id:'b124',title:'Gözlerin Ardında',author:'Haruki Murakami',year:1994,category:'Roman',coverUrl:OL('9784087747522'),description:'Sanal gerçeklik ve gerçeklik sınırları',maxPoints:35,difficulty:'Orta',pageCount:608,language:'Japonca',isClassic:false,tags:['sanal','gerçeklik']},
  {id:'b125',title:'Norveç Ormanı',author:'Haruki Murakami',year:1987,category:'Roman',coverUrl:OL('9784087747539'),description:'Aşk ölüm ve yalnızlık üzerine',maxPoints:33,difficulty:'Orta',pageCount:296,language:'Japonca',isClassic:false,tags:['aşk','ölüm']},
  {id:'b126',title:'Dune',author:'Frank Herbert',year:1965,category:'Bilim Kurgu',coverUrl:OL('9780441172719'),description:'Bilim kurgu edebiyatının kapsamlı dünyası',maxPoints:45,difficulty:'Zor',pageCount:688,language:'İngilizce',isClassic:false,tags:['uzay','siyaset']},
  {id:'b127',title:'Neuromancer',author:'William Gibson',year:1984,category:'Bilim Kurgu',coverUrl:OL('9780441569595'),description:'Siber punk türünün doğuşu',maxPoints:40,difficulty:'Zor',pageCount:271,language:'İngilizce',isClassic:false,tags:['siber punk','yapay zeka']},
  {id:'b128',title:'Fondation',author:'Isaac Asimov',year:1951,category:'Bilim Kurgu',coverUrl:OL('9780553293357'),description:'Galaktik medeniyetin çöküşü',maxPoints:42,difficulty:'Orta',pageCount:255,language:'İngilizce',isClassic:false,tags:['galaksi','bilim']},
  {id:'b129',title:'Hiperion',author:'Dan Simmons',year:1989,category:'Bilim Kurgu',coverUrl:OL('9780553283685'),description:'Yedi yolcunun Hiperion gezegeni yolculuğu',maxPoints:48,difficulty:'Çok Zor',pageCount:482,language:'İngilizce',isClassic:false,tags:['uzay','macera']},
  {id:'b130',title:'Yapraklar Rüzgarında',author:'Margaret Mitchell',year:1936,category:'Roman',coverUrl:OL('9780743273565'),description:'Amerikan İç Savaşı döneminin aşk romanı',maxPoints:40,difficulty:'Orta',pageCount:1037,language:'İngilizce',isClassic:false,tags:['aşk','savaş']},
  {id:'b131',title:'Gözlerin Ötesi',author:'Kazuo Ishiguro',year:1989,category:'Roman',coverUrl:OL('9780571152742'),description:'Geçmiş ve şimdiki arasında sıkışmış adam',maxPoints:32,difficulty:'Orta',pageCount:245,language:'İngilizce',isClassic:false,tags:['geçmiş','bellek']},
  {id:'b132',title:'Hiçbir Yer Ev Değil',author:'Kazuo Ishiguro',year:2005,category:'Roman',coverUrl:OL('9780571219032'),description:'Klonlanmış çocukların kaderini sorgulayan roman',maxPoints:35,difficulty:'Orta',pageCount:258,language:'İngilizce',isClassic:false,tags:['klonlama','etik']},
  {id:'b133',title:'Yüzyılın Yalnızlığı',author:'Gabriel García Márquez',year:1967,category:'Roman',coverUrl:OL('9780060883287'),description:'Macondo kasabasının yüz yıllık hikayesi',maxPoints:42,difficulty:'Orta',pageCount:417,language:'İspanyolca',isClassic:false,tags:['büyülü gerçekçilik','aile']},
  {id:'b134',title:'Aşk Zamanında Kolera',author:'Gabriel García Márquez',year:1985,category:'Roman',coverUrl:OL('9780307387010'),description:'Yaşlılıkta başlayan aşk hikayesi',maxPoints:38,difficulty:'Orta',pageCount:368,language:'İspanyolca',isClassic:false,tags:['aşk','yaşlılık']},
  {id:'b135',title:'Ölüm Öncesi Yaşam',author:'Rajesh Parameswaran',year:2012,category:'Roman',coverUrl:OL('9780393081794'),description:'Hindistan ve Amerika arasında geçen yaşam',maxPoints:33,difficulty:'Orta',pageCount:304,language:'İngilizce',isClassic:false,tags:['göç','kimlik']},
  {id:'b136',title:'Yüksek Sosyete',author:'F. Scott Fitzgerald',year:1925,category:'Roman',coverUrl:OL('9780743273565'),description:'Roaring Twenties zengin insanlarının hikayesi',maxPoints:35,difficulty:'Orta',pageCount:180,language:'İngilizce',isClassic:false,tags:['zenginlik','aşk']},
  {id:'b137',title:'Şiir Seçkisi',author:'Pablo Neruda',year:1924,category:'Şiir',coverUrl:OL('9780140588309'),description:'Aşk doğa ve sosyal adalet üzerine şiirler',maxPoints:28,difficulty:'Orta',pageCount:200,language:'İspanyolca',isClassic:false,tags:['şiir','aşk']},
  {id:'b138',title:'Biyografi Seçkisi',author:'Walter Isaacson',year:2011,category:'Biyografi',coverUrl:OL('9781451648539'),description:'Ünlü insanların yaşam hikayeleri',maxPoints:36,difficulty:'Orta',pageCount:656,language:'İngilizce',isClassic:false,tags:['biyografi','tarih']},
  {id:'b139',title:'Psikoloji Giriş',author:'Daniel Goleman',year:1995,category:'Psikoloji',coverUrl:OL('9780553375077'),description:'Duygusal zeka ve insan davranışı',maxPoints:34,difficulty:'Orta',pageCount:512,language:'İngilizce',isClassic:false,tags:['psikoloji','davranış']},
  {id:'b140',title:'Gizem Romanı Seçkisi',author:'Agatha Christie',year:1939,category:'Gizem',coverUrl:OL('9780062693662'),description:'Ünlü dedektif Hercule Poirot vakaları',maxPoints:29,difficulty:'Kolay',pageCount:272,language:'İngilizce',isClassic:false,tags:['gizem','dedektif']}
];

// Kategoriye göre filtrele
export function getBooksByCategory(category: BookCategory): Book[] {
  return BOOKS.filter(b => b.category === category);
}

// ID'ye göre kitap bul
export function getBookById(id: string): Book | undefined {
  return BOOKS.find(b => b.id === id);
}

// Klasikleri getir
export function getClassics(): Book[] {
  return BOOKS.filter(b => b.isClassic);
}

// Arama
export function searchBooks(query: string): Book[] {
  const q = query.toLowerCase();
  return BOOKS.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.tags.some(t => t.includes(q))
  );
}

// Tüm kategoriler
export const ALL_CATEGORIES: BookCategory[] = [
  'Dünya Klasiği', 'Roman', 'Bilim Kurgu', 'Felsefe',
  'Tarih', 'Şiir', 'Biyografi', 'Psikoloji',
  'Distopya', 'Macera', 'Gizem', 'Türk Edebiyatı'
];
