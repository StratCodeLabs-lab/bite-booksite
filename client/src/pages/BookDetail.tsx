// Bite BookSite — Book Detail Page
// Kitap detayı, puanlama, sınav, yorumlar, wishlist

import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { getBookById } from '@/lib/booksData';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Star, Heart, BookOpen, CheckCircle2, Clock, Award,
  MessageSquare, ChevronLeft, BookMarked, Zap, Trophy,
  AlertCircle, CheckCircle, X
} from 'lucide-react';

// Sayfa çevirme sesi (Web Audio API)
function playPageTurnSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const duration = 0.3;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2) * 0.3;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start();
    source.stop(ctx.currentTime + duration);
  } catch {}
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const book = getBookById(id || '');
  const { currentUser, addReadBook, hasReadBook, isInWishlist, addToWishlist, removeFromWishlist, getUserById } = useAuth();
  const { getComments, addComment } = usePosts();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pageFlipped, setPageFlipped] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const alreadyRead = hasReadBook(id || '');
  const wishlisted = isInWishlist(id || '');
  const comments = getComments(id || '');

  useEffect(() => {
    if (book) {
      // Sayfa açılırken sayfa sesi
      setTimeout(() => playPageTurnSound(), 300);
    }
  }, [book]);

  if (!book) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.30 0.03 260)' }} />
          <p style={{ color: 'oklch(0.55 0.03 260)' }}>Kitap bulunamadı.</p>
          <Button onClick={() => navigate('/library')} className="mt-4" variant="ghost" style={{ color: 'oklch(0.75 0.18 65)' }}>
            Kütüphaneye Dön
          </Button>
        </div>
      </Layout>
    );
  }

  const handleRate = () => {
    if (!currentUser) { toast.error('Puanlamak için giriş yapmalısınız.'); return; }
    if (alreadyRead) { toast.error('Bu kitabı zaten okudunuz.'); return; }
    if (rating === 0) { toast.error('Lütfen bir puan seçin.'); return; }
    
    if (book.isClassic && book.quizQuestions) {
      setShowQuiz(true);
      setShowRatingModal(false);
    } else {
      submitRating(rating, undefined);
    }
  };

  const submitRating = (r: number, quiz?: number) => {
    const basePoints = Math.round(book.maxPoints * (r / 5));
    let finalPoints = basePoints;
    if (quiz !== undefined) {
      finalPoints = Math.round(basePoints * (quiz / 100));
      finalPoints = Math.max(5, finalPoints); // minimum 5 puan
    }

    const result = addReadBook({
      bookId: book.id,
      rating: r,
      pointsEarned: finalPoints,
      quizScore: quiz,
      readAt: new Date().toISOString(),
    });

    if (result.success) {
      playPageTurnSound();
      toast.success(` ${finalPoints} puan kazandın!`);
      setShowQuiz(false);
      setShowRatingModal(false);
    } else {
      toast.error(result.error || 'Hata oluştu.');
    }
  };

  const handleQuizSubmit = () => {
    if (!book.quizQuestions) return;
    let correct = 0;
    book.quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) correct++;
    });
    const score = Math.round((correct / book.quizQuestions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    
    setTimeout(() => {
      submitRating(rating, score);
    }, 2000);
  };

  const handleComment = async () => {
    if (!currentUser) { toast.error('Yorum yapmak için giriş yapmalısınız.'); return; }
    if (!commentText.trim()) return;
    setSubmitting(true);
    const result = addComment({ bookId: book.id, content: commentText.trim() });
    if (result.success) {
      setCommentText('');
      toast.success('Yorumun eklendi!');
    } else {
      toast.error(result.error || 'Hata oluştu.');
    }
    setSubmitting(false);
  };

  const DIFFICULTY_COLORS: Record<string, string> = {
    'Kolay': 'oklch(0.65 0.18 145)',
    'Orta': 'oklch(0.75 0.18 65)',
    'Zor': 'oklch(0.70 0.20 35)',
    'Çok Zor': 'oklch(0.65 0.22 25)',
  };

  return (
    <Layout>
      <div className="container py-8 fade-in-up">
        {/* Back button */}
        <button onClick={() => navigate('/library')} className="flex items-center gap-2 mb-6 text-sm hover:opacity-80 transition-opacity"
          style={{ color: 'oklch(0.55 0.03 260)' }}>
          <ChevronLeft className="w-4 h-4" />
          Kütüphaneye Dön
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sol: Kapak + aksiyonlar */}
          <div className="lg:col-span-1">
            <div className={`relative rounded-xl overflow-hidden shadow-2xl ${pageFlipped ? 'page-turn' : ''}`}
              style={{ aspectRatio: '2/3', maxWidth: '280px', margin: '0 auto' }}>
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/280x420/1E2535/F0A500?text=${encodeURIComponent(book.title.slice(0, 15))}`;
                }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, oklch(0.10 0.03 260 / 0.6) 0%, transparent 50%)' }} />
              {book.isClassic && (
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: 'oklch(0.70 0.20 295 / 0.9)', color: 'white' }}>
                    Dünya Klasiği
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span className="text-sm font-mono-score font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: 'oklch(0.75 0.18 65)', color: 'oklch(0.10 0.03 260)' }}>
                  +{book.maxPoints}
                </span>
              </div>
            </div>

            {/* Aksiyonlar */}
            <div className="mt-5 space-y-3 max-w-[280px] mx-auto">
              {alreadyRead ? (
                <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'oklch(0.65 0.18 145 / 0.12)', border: '1px solid oklch(0.65 0.18 145 / 0.25)' }}>
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'oklch(0.65 0.18 145)' }} />
                  <span className="text-sm font-medium" style={{ color: 'oklch(0.65 0.18 145)' }}>Okundu!</span>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    if (!currentUser) { toast.error('Giriş yapmalısınız.'); return; }
                    setShowRatingModal(true);
                  }}
                  className="w-full font-semibold amber-gradient"
                  style={{ color: 'oklch(0.10 0.03 260)' }}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Okudum, Puan Al
                </Button>
              )}

              {currentUser && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (wishlisted) removeFromWishlist(book.id);
                    else addToWishlist(book.id);
                    toast.success(wishlisted ? 'Listeden çıkarıldı.' : 'Sonra oku listesine eklendi!');
                  }}
                  className="w-full"
                  style={{
                    borderColor: wishlisted ? 'oklch(0.65 0.22 25 / 0.4)' : 'oklch(1 0 0 / 0.12)',
                    color: wishlisted ? 'oklch(0.65 0.22 25)' : 'oklch(0.65 0.03 260)',
                    background: wishlisted ? 'oklch(0.65 0.22 25 / 0.08)' : 'transparent',
                  }}
                >
                  <Heart className="w-4 h-4 mr-2" fill={wishlisted ? 'currentColor' : 'none'} />
                  {wishlisted ? 'Listeden Çıkar' : 'Sonra Oku'}
                </Button>
              )}
            </div>

            {/* Kitap bilgileri */}
            <div className="mt-5 bite-card p-4 max-w-[280px] mx-auto">
              <div className="space-y-2.5">
                {[
                  { label: 'Yazar', value: book.author },
                  { label: 'Yıl', value: book.year > 0 ? book.year.toString() : `MÖ ${Math.abs(book.year)}` },
                  { label: 'Sayfa', value: `${book.pageCount} sayfa` },
                  { label: 'Dil', value: book.language },
                  { label: 'Kategori', value: book.category },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span style={{ color: 'oklch(0.50 0.03 260)' }}>{label}</span>
                    <span className="font-medium" style={{ color: 'oklch(0.80 0.02 75)' }}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm">
                  <span style={{ color: 'oklch(0.50 0.03 260)' }}>Zorluk</span>
                  <span className="font-medium" style={{ color: DIFFICULTY_COLORS[book.difficulty] }}>{book.difficulty}</span>
                </div>
                {book.isClassic && (
                  <div className="flex justify-between items-center text-sm">
                    <span style={{ color: 'oklch(0.50 0.03 260)' }}>Sınav</span>
                    <span className="font-medium" style={{ color: 'oklch(0.70 0.20 295)' }}>5 Soru</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sağ: Detaylar */}
          <div className="lg:col-span-2">
            {/* Başlık */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'oklch(0.75 0.18 65 / 0.12)', color: 'oklch(0.75 0.18 65)' }}>
                  {book.category}
                </span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${DIFFICULTY_COLORS[book.difficulty]}15`, color: DIFFICULTY_COLORS[book.difficulty] }}>
                  {book.difficulty}
                </span>
                {book.isClassic && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'oklch(0.70 0.20 295 / 0.12)', color: 'oklch(0.70 0.20 295)' }}>
                    Sınav Zorunlu
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2" style={{ color: 'oklch(0.93 0.02 75)' }}>
                {book.title}
              </h1>
              <p className="text-lg" style={{ color: 'oklch(0.60 0.03 260)' }}>{book.author}</p>
            </div>

            {/* Puan bilgisi */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-xl" style={{ background: 'oklch(0.75 0.18 65 / 0.06)', border: '1px solid oklch(0.75 0.18 65 / 0.15)' }}>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: 'oklch(0.75 0.18 65)' }} />
                <div>
                  <p className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>Maksimum Puan</p>
                  <p className="text-xl font-mono-score font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>{book.maxPoints}</p>
                </div>
              </div>
              {book.isClassic && (
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" style={{ color: 'oklch(0.70 0.20 295)' }} />
                  <div>
                    <p className="text-xs" style={{ color: 'oklch(0.55 0.03 260)' }}>Sınav Bonusu</p>
                    <p className="text-sm font-medium" style={{ color: 'oklch(0.70 0.20 295)' }}>%100 doğruluk = tam puan</p>
                  </div>
                </div>
              )}
            </div>

            {/* Açıklama */}
            <div className="mb-6">
              <h2 className="font-display text-lg font-bold mb-3" style={{ color: 'oklch(0.88 0.02 75)' }}>Hakkında</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.65 0.03 260)' }}>{book.description}</p>
            </div>

            {/* Etiketler */}
            <div className="flex flex-wrap gap-2 mb-8">
              {book.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'oklch(0.18 0.04 258)', color: 'oklch(0.55 0.03 260)', border: '1px solid oklch(1 0 0 / 0.06)' }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Yorumlar */}
            <div>
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'oklch(0.88 0.02 75)' }}>
                <MessageSquare className="w-5 h-5" style={{ color: 'oklch(0.75 0.18 65)' }} />
                Yorumlar ({comments.length})
              </h2>

              {currentUser ? (
                <div className="mb-6">
                  <Textarea
                    placeholder="Bu kitap hakkında ne düşünüyorsun?"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows={3}
                    className="mb-2 resize-none"
                  />
                  <Button
                    onClick={handleComment}
                    disabled={submitting || !commentText.trim()}
                    size="sm"
                    className="amber-gradient font-semibold"
                    style={{ color: 'oklch(0.10 0.03 260)' }}
                  >
                    Yorum Yap
                  </Button>
                </div>
              ) : (
                <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: 'oklch(0.15 0.04 258)', border: '1px solid oklch(1 0 0 / 0.08)' }}>
                  <span style={{ color: 'oklch(0.55 0.03 260)' }}>Yorum yapmak için </span>
                  <a href="/auth" style={{ color: 'oklch(0.75 0.18 65)' }}>giriş yapın</a>
                </div>
              )}

              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2" style={{ color: 'oklch(0.30 0.03 260)' }} />
                    <p className="text-sm" style={{ color: 'oklch(0.45 0.03 260)' }}>Henüz yorum yok. İlk yorumu sen yap!</p>
                  </div>
                ) : (
                  comments.map(comment => {
                    const commenter = getUserById(comment.userId);
                    return (
                      <div key={comment.id} className="bite-card p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={commenter?.avatarUrl} />
                            <AvatarFallback style={{ background: 'oklch(0.75 0.18 65 / 0.2)', color: 'oklch(0.75 0.18 65)', fontSize: '0.7rem' }}>
                              {commenter?.displayName[0]?.toUpperCase() || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium" style={{ color: 'oklch(0.85 0.02 75)' }}>
                                {commenter?.displayName || 'Kullanıcı'}
                              </span>
                              <span className="text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>
                                {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.70 0.03 260)' }}>
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'oklch(0 0 0 / 0.7)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 fade-in-up" style={{ background: 'oklch(0.15 0.04 258)', border: '1px solid oklch(0.75 0.18 65 / 0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>Kitabı Puanla</h3>
              <button onClick={() => setShowRatingModal(false)}>
                <X className="w-5 h-5" style={{ color: 'oklch(0.50 0.03 260)' }} />
              </button>
            </div>
            <p className="text-sm mb-4" style={{ color: 'oklch(0.60 0.03 260)' }}>{book.title}</p>
            
            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    className="w-10 h-10"
                    fill={(hoverRating || rating) >= s ? 'oklch(0.75 0.18 65)' : 'none'}
                    style={{ color: (hoverRating || rating) >= s ? 'oklch(0.75 0.18 65)' : 'oklch(0.35 0.05 65)' }}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="text-center text-sm mb-4" style={{ color: 'oklch(0.65 0.03 260)' }}>
                Tahmini puan: <span className="font-mono-score font-bold" style={{ color: 'oklch(0.75 0.18 65)' }}>
                  {Math.round(book.maxPoints * (rating / 5))}
                </span>
                {book.isClassic && ' (sınav sonucuna göre değişir)'}
              </p>
            )}

            {book.isClassic && (
              <div className="p-3 rounded-lg mb-4 text-xs" style={{ background: 'oklch(0.70 0.20 295 / 0.1)', border: '1px solid oklch(0.70 0.20 295 / 0.2)' }}>
                <p style={{ color: 'oklch(0.70 0.20 295)' }}>
                  Bu bir Dünya Klasiği! Puanlamak için 5 soruluk bir sınav yapacaksın.
                  Doğruluk oranın puanını etkiler.
                </p>
              </div>
            )}

            <Button
              onClick={handleRate}
              disabled={rating === 0}
              className="w-full amber-gradient font-semibold"
              style={{ color: 'oklch(0.10 0.03 260)' }}
            >
              {book.isClassic ? 'Sınava Geç' : 'Puanla ve Kaydet'}
            </Button>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && book.quizQuestions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: 'oklch(0 0 0 / 0.8)' }}>
          <div className="w-full max-w-lg rounded-2xl p-6 my-4 fade-in-up" style={{ background: 'oklch(0.15 0.04 258)', border: '1px solid oklch(0.70 0.20 295 / 0.3)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5" style={{ color: 'oklch(0.70 0.20 295)' }} />
              <h3 className="font-display text-xl font-bold" style={{ color: 'oklch(0.93 0.02 75)' }}>Klasik Sınavı</h3>
            </div>
            <p className="text-sm mb-6" style={{ color: 'oklch(0.55 0.03 260)' }}>
              {book.title} · 5 soru · Doğruluk oranın puanını belirler
            </p>

            {!quizSubmitted ? (
              <>
                <div className="space-y-6">
                  {book.quizQuestions.map((q, qi) => (
                    <div key={qi}>
                      <p className="text-sm font-medium mb-3" style={{ color: 'oklch(0.85 0.02 75)' }}>
                        <span style={{ color: 'oklch(0.75 0.18 65)' }}>{qi + 1}.</span> {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <button
                            key={oi}
                            onClick={() => {
                              const newAnswers = [...quizAnswers];
                              newAnswers[qi] = oi;
                              setQuizAnswers(newAnswers);
                            }}
                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-150"
                            style={{
                              background: quizAnswers[qi] === oi ? 'oklch(0.70 0.20 295 / 0.2)' : 'oklch(0.18 0.04 258)',
                              border: `1px solid ${quizAnswers[qi] === oi ? 'oklch(0.70 0.20 295 / 0.5)' : 'oklch(1 0 0 / 0.08)'}`,
                              color: quizAnswers[qi] === oi ? 'oklch(0.70 0.20 295)' : 'oklch(0.70 0.03 260)',
                            }}
                          >
                            {String.fromCharCode(65 + oi)}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleQuizSubmit}
                  disabled={quizAnswers.filter(a => a !== undefined).length < (book.quizQuestions?.length || 5)}
                  className="w-full mt-6 font-semibold"
                  style={{ background: 'oklch(0.70 0.20 295)', color: 'white' }}
                >
                  Sınavı Tamamla ({quizAnswers.filter(a => a !== undefined).length}/{book.quizQuestions.length})
                </Button>
              </>
            ) : (
              <div className="text-center py-6">
                {quizScore >= 80 ? (
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.65 0.18 145)' }} />
                ) : (
                  <AlertCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.75 0.18 65)' }} />
                )}
                <p className="font-display text-3xl font-bold mb-2" style={{ color: 'oklch(0.93 0.02 75)' }}>
                  %{quizScore}
                </p>
                <p className="text-sm" style={{ color: 'oklch(0.60 0.03 260)' }}>
                  {quizScore >= 80 ? 'Harika! Tam puan kazandın.' : quizScore >= 60 ? 'İyi! Kısmi puan kazandın.' : 'Biraz daha okuma gerekiyor.'}
                </p>
                <p className="text-xs mt-2" style={{ color: 'oklch(0.50 0.03 260)' }}>
                  Puan hesaplanıyor...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
