// Bite BookSite — Auth Context
// LocalStorage tabanlı kullanıcı sistemi (GitHub deploy için)

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

export type UserPlan = 'free' | 'premium';

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // basit hash
  displayName: string;
  bio: string;
  avatarUrl: string;
  plan: UserPlan;
  isAdmin: boolean;
  joinedAt: string;
  followersCount: number;
  followingCount: number;
  totalPoints: number;
  dailyPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  lastPointDate: string; // YYYY-MM-DD
  dailyBooksRead: number; // günlük puan alınan kitap sayısı (free: 2, premium: 5)
  postCredits: number; // gönderi hakkı
  isWeeklyWinner: boolean;
  isMonthlyWinner: boolean;
}

export interface ReadBook {
  bookId: string;
  userId: string;
  rating: number; // 1-5
  pointsEarned: number;
  quizScore?: number; // 0-100
  readAt: string;
  review?: string;
}

export interface WishlistItem {
  bookId: string;
  userId: string;
  addedAt: string;
}

export interface Following {
  followerId: string;
  followingId: string;
}

export interface NewBookData {
  title: string;
  author: string;
  year: number;
  pageCount: number;
  category: string;
  difficulty: string;
  maxPoints: number;
  description: string;
  coverUrl: string;
  language: string;
  isClassic: boolean;
  tags: string[];
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  getAllUsers: () => User[];
  getUserById: (id: string) => User | undefined;
  getUserByUsername: (username: string) => User | undefined;
  followUser: (targetId: string) => void;
  unfollowUser: (targetId: string) => void;
  isFollowing: (targetId: string) => boolean;
  getFollowers: (userId: string) => User[];
  getFollowing: (userId: string) => User[];
  getReadBooks: (userId?: string) => ReadBook[];
  addReadBook: (data: Omit<ReadBook, 'userId'>) => { success: boolean; error?: string };
  getWishlist: (userId?: string) => WishlistItem[];
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  hasReadBook: (bookId: string) => boolean;
  getLeaderboard: (period: 'daily' | 'weekly' | 'monthly') => User[];
  searchUsers: (query: string) => User[];
  addBook: (data: NewBookData) => { success: boolean; error?: string };
  grantPostCredits: (userId: string, credits: number) => void;
  setPremium: (userId: string, isPremium: boolean) => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Basit hash fonksiyonu
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

const STORAGE_KEYS = {
  USERS: 'bite_users',
  CURRENT_USER: 'bite_current_user',
  READ_BOOKS: 'bite_read_books',
  WISHLIST: 'bite_wishlist',
  FOLLOWING: 'bite_following',
};

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getWeekKey(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
}

function getMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// Admin kullanıcısı
const ADMIN_USER: User = {
  id: 'admin_001',
  username: 'admin',
  email: 'kilincatayanki@gmail.com',
  passwordHash: simpleHash('admin1234'),
  displayName: 'Bite Admin',
  bio: 'Bite BookSite yöneticisi',
  avatarUrl: '',
  plan: 'premium',
  isAdmin: true,
  joinedAt: new Date().toISOString(),
  followersCount: 0,
  followingCount: 0,
  totalPoints: 99999,
  dailyPoints: 9999,
  weeklyPoints: 9999,
  monthlyPoints: 9999,
  lastPointDate: getToday(),
  dailyBooksRead: 0,
  postCredits: 999999,
  isWeeklyWinner: false,
  isMonthlyWinner: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorage yardımcıları
  const getUsers = useCallback((): User[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: User[] = data ? JSON.parse(data) : [];
      // Admin her zaman mevcut
      if (!users.find(u => u.id === 'admin_001')) {
        users.push(ADMIN_USER);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      }
      return users;
    } catch {
      return [ADMIN_USER];
    }
  }, []);

  const saveUsers = useCallback((users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, []);

  const getReadBooksAll = useCallback((): ReadBook[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READ_BOOKS);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }, []);

  const saveReadBooks = useCallback((books: ReadBook[]) => {
    localStorage.setItem(STORAGE_KEYS.READ_BOOKS, JSON.stringify(books));
  }, []);

  const getWishlistAll = useCallback((): WishlistItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }, []);

  const getFollowingAll = useCallback((): Following[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOLLOWING);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }, []);

  // Başlangıç: mevcut kullanıcıyı yükle
  useEffect(() => {
    const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (userId) {
      const users = getUsers();
      const user = users.find(u => u.id === userId);
      if (user) {
        // Günlük sayaçları sıfırla
        const today = getToday();
        if (user.lastPointDate !== today) {
          user.dailyPoints = 0;
          user.dailyBooksRead = 0;
          user.lastPointDate = today;
          const users2 = getUsers().map(u2 => u2.id === user.id ? user : u2);
          saveUsers(users2);
        }
        setCurrentUser(user);
      }
    }
    setIsLoading(false);
  }, [getUsers, saveUsers]);

  const login = useCallback(async (email: string, password: string) => {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return { success: false, error: 'Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.' };
    if (user.passwordHash !== simpleHash(password)) return { success: false, error: 'Şifre yanlış.' };
    
    // Günlük sayaçları sıfırla
    const today = getToday();
    if (user.lastPointDate !== today) {
      user.dailyPoints = 0;
      user.dailyBooksRead = 0;
      user.lastPointDate = today;
      const updatedUsers = users.map(u => u.id === user.id ? user : u);
      saveUsers(updatedUsers);
    }
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, user.id);
    setCurrentUser(user);
    return { success: true };
  }, [getUsers, saveUsers]);

  const register = useCallback(async (data: RegisterData) => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'Bu e-posta adresi zaten kullanılıyor.' };
    }
    if (users.find(u => u.username.toLowerCase() === data.username.toLowerCase())) {
      return { success: false, error: 'Bu kullanıcı adı zaten alınmış.' };
    }
    if (data.username.length < 3) return { success: false, error: 'Kullanıcı adı en az 3 karakter olmalı.' };
    if (data.password.length < 6) return { success: false, error: 'Şifre en az 6 karakter olmalı.' };

    const newUser: User = {
      id: nanoid(),
      username: data.username,
      email: data.email,
      passwordHash: simpleHash(data.password),
      displayName: data.displayName || data.username,
      bio: '',
      avatarUrl: '',
      plan: 'free',
      isAdmin: false,
      joinedAt: new Date().toISOString(),
      followersCount: 0,
      followingCount: 0,
      totalPoints: 0,
      dailyPoints: 0,
      weeklyPoints: 0,
      monthlyPoints: 0,
      lastPointDate: getToday(),
      dailyBooksRead: 0,
      postCredits: 0,
      isWeeklyWinner: false,
      isMonthlyWinner: false,
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, newUser.id);
    setCurrentUser(newUser);
    return { success: true };
  }, [getUsers, saveUsers]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (!currentUser) return;
    const users = getUsers();
    const updated = { ...currentUser, ...updates };
    const newUsers = users.map(u => u.id === currentUser.id ? updated : u);
    saveUsers(newUsers);
    setCurrentUser(updated);
  }, [currentUser, getUsers, saveUsers]);

  const getAllUsers = useCallback(() => getUsers(), [getUsers]);

  const getUserById = useCallback((id: string) => getUsers().find(u => u.id === id), [getUsers]);

  const getUserByUsername = useCallback((username: string) => 
    getUsers().find(u => u.username.toLowerCase() === username.toLowerCase()), [getUsers]);

  const followUser = useCallback((targetId: string) => {
    if (!currentUser || targetId === currentUser.id) return;
    const followings = getFollowingAll();
    if (followings.find(f => f.followerId === currentUser.id && f.followingId === targetId)) return;
    followings.push({ followerId: currentUser.id, followingId: targetId });
    localStorage.setItem(STORAGE_KEYS.FOLLOWING, JSON.stringify(followings));
    
    // Sayaçları güncelle
    const users = getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) return { ...u, followingCount: u.followingCount + 1 };
      if (u.id === targetId) return { ...u, followersCount: u.followersCount + 1 };
      return u;
    });
    saveUsers(updatedUsers);
    const me = updatedUsers.find(u => u.id === currentUser.id);
    if (me) setCurrentUser(me);
  }, [currentUser, getFollowingAll, getUsers, saveUsers]);

  const unfollowUser = useCallback((targetId: string) => {
    if (!currentUser) return;
    const followings = getFollowingAll().filter(
      f => !(f.followerId === currentUser.id && f.followingId === targetId)
    );
    localStorage.setItem(STORAGE_KEYS.FOLLOWING, JSON.stringify(followings));
    
    const users = getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) return { ...u, followingCount: Math.max(0, u.followingCount - 1) };
      if (u.id === targetId) return { ...u, followersCount: Math.max(0, u.followersCount - 1) };
      return u;
    });
    saveUsers(updatedUsers);
    const me = updatedUsers.find(u => u.id === currentUser.id);
    if (me) setCurrentUser(me);
  }, [currentUser, getFollowingAll, getUsers, saveUsers]);

  const isFollowing = useCallback((targetId: string) => {
    if (!currentUser) return false;
    return getFollowingAll().some(f => f.followerId === currentUser.id && f.followingId === targetId);
  }, [currentUser, getFollowingAll]);

  const getFollowers = useCallback((userId: string) => {
    const followings = getFollowingAll();
    const followerIds = followings.filter(f => f.followingId === userId).map(f => f.followerId);
    return getUsers().filter(u => followerIds.includes(u.id));
  }, [getFollowingAll, getUsers]);

  const getFollowing = useCallback((userId: string) => {
    const followings = getFollowingAll();
    const followingIds = followings.filter(f => f.followerId === userId).map(f => f.followingId);
    return getUsers().filter(u => followingIds.includes(u.id));
  }, [getFollowingAll, getUsers]);

  const getReadBooks = useCallback((userId?: string) => {
    const uid = userId || currentUser?.id;
    if (!uid) return [];
    return getReadBooksAll().filter(rb => rb.userId === uid);
  }, [currentUser, getReadBooksAll]);

  const addReadBook = useCallback((data: Omit<ReadBook, 'userId'>) => {
    if (!currentUser) return { success: false, error: 'Giriş yapmalısınız.' };
    
    const allReadBooks = getReadBooksAll();
    if (allReadBooks.find(rb => rb.userId === currentUser.id && rb.bookId === data.bookId)) {
      return { success: false, error: 'Bu kitabı zaten okudunuz.' };
    }

    // Günlük limit kontrolü
    const maxDaily = currentUser.plan === 'premium' ? 5 : 2;
    if (currentUser.dailyBooksRead >= maxDaily) {
      return { success: false, error: `Günlük ${maxDaily} kitap limitine ulaştınız. ${currentUser.plan === 'free' ? 'Premium\'a geçerek 5 kitaba çıkarabilirsiniz.' : ''}` };
    }

    allReadBooks.push({ ...data, userId: currentUser.id });
    saveReadBooks(allReadBooks);

    // Kullanıcı puanlarını güncelle
    const users = getUsers();
    const updatedUser = {
      ...currentUser,
      totalPoints: currentUser.totalPoints + data.pointsEarned,
      dailyPoints: currentUser.dailyPoints + data.pointsEarned,
      weeklyPoints: currentUser.weeklyPoints + data.pointsEarned,
      monthlyPoints: currentUser.monthlyPoints + data.pointsEarned,
      dailyBooksRead: currentUser.dailyBooksRead + 1,
      lastPointDate: getToday(),
    };
    const newUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    saveUsers(newUsers);
    setCurrentUser(updatedUser);

    return { success: true };
  }, [currentUser, getReadBooksAll, saveReadBooks, getUsers, saveUsers]);

  const getWishlist = useCallback((userId?: string) => {
    const uid = userId || currentUser?.id;
    if (!uid) return [];
    return getWishlistAll().filter(w => w.userId === uid);
  }, [currentUser, getWishlistAll]);

  const addToWishlist = useCallback((bookId: string) => {
    if (!currentUser) return;
    const wishlist = getWishlistAll();
    if (wishlist.find(w => w.userId === currentUser.id && w.bookId === bookId)) return;
    wishlist.push({ bookId, userId: currentUser.id, addedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [currentUser, getWishlistAll]);

  const removeFromWishlist = useCallback((bookId: string) => {
    if (!currentUser) return;
    const wishlist = getWishlistAll().filter(w => !(w.userId === currentUser.id && w.bookId === bookId));
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [currentUser, getWishlistAll]);

  const isInWishlist = useCallback((bookId: string) => {
    if (!currentUser) return false;
    return getWishlistAll().some(w => w.userId === currentUser.id && w.bookId === bookId);
  }, [currentUser, getWishlistAll]);

  const hasReadBook = useCallback((bookId: string) => {
    if (!currentUser) return false;
    return getReadBooksAll().some(rb => rb.userId === currentUser.id && rb.bookId === bookId);
  }, [currentUser, getReadBooksAll]);

  const getLeaderboard = useCallback((period: 'daily' | 'weekly' | 'monthly') => {
    const users = getUsers().filter(u => !u.isAdmin);
    const sorted = [...users].sort((a, b) => {
      const aPoints = period === 'daily' ? a.dailyPoints : period === 'weekly' ? a.weeklyPoints : a.monthlyPoints;
      const bPoints = period === 'daily' ? b.dailyPoints : period === 'weekly' ? b.weeklyPoints : b.monthlyPoints;
      return bPoints - aPoints;
    });
    return sorted.slice(0, 15);
  }, [getUsers]);

  const searchUsers = useCallback((query: string) => {
    const q = query.toLowerCase();
    return getUsers().filter(u =>
      !u.isAdmin && (
        u.username.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q)
      )
    );
  }, [getUsers]);

  const addBook = useCallback((data: NewBookData) => {
    if (!currentUser?.isAdmin) return { success: false, error: 'Yetki gerekli.' };
    try {
      const existing = JSON.parse(localStorage.getItem('bite_custom_books') || '[]');
      existing.push({ ...data, id: 'custom_' + nanoid(), isCustom: true });
      localStorage.setItem('bite_custom_books', JSON.stringify(existing));
      return { success: true };
    } catch {
      return { success: false, error: 'Kitap eklenemedi.' };
    }
  }, [currentUser]);

  const grantPostCredits = useCallback((userId: string, credits: number) => {
    if (!currentUser?.isAdmin) return;
    const users = getUsers();
    const updated = users.map(u => u.id === userId ? { ...u, postCredits: u.postCredits + credits } : u);
    saveUsers(updated);
    if (currentUser.id === userId) setCurrentUser(prev => prev ? { ...prev, postCredits: prev.postCredits + credits } : prev);
  }, [currentUser, getUsers, saveUsers]);

  const setPremium = useCallback((userId: string, isPremium: boolean) => {
    if (!currentUser?.isAdmin) return;
    const users = getUsers();
    const updated = users.map(u => u.id === userId ? { ...u, plan: isPremium ? 'premium' as const : 'free' as const } : u);
    saveUsers(updated);
  }, [currentUser, getUsers, saveUsers]);

  return (
    <AuthContext.Provider value={{
      currentUser, isLoading,
      login, register, logout, updateUser,
      getAllUsers, getUserById, getUserByUsername,
      followUser, unfollowUser, isFollowing, getFollowers, getFollowing,
      getReadBooks, addReadBook,
      getWishlist, addToWishlist, removeFromWishlist, isInWishlist, hasReadBook,
      getLeaderboard, searchUsers,
      addBook, grantPostCredits, setPremium,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { getToday, getWeekKey, getMonthKey };
