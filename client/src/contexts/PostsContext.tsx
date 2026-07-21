// Bite BookSite — Posts & Comments Context
// Gönderi platformu, yorumlar, admin onay sistemi

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'article' | 'project' | 'work' | 'general';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  rejectedReason?: string;
  likesCount: number;
  commentsCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  bookId?: string;
  postId?: string;
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface Like {
  userId: string;
  targetId: string; // post veya comment id
  targetType: 'post' | 'comment';
}

interface PostsContextType {
  getPosts: (status?: Post['status']) => Post[];
  getUserPosts: (userId: string) => Post[];
  createPost: (data: Omit<Post, 'id' | 'userId' | 'status' | 'createdAt' | 'likesCount' | 'commentsCount'>) => { success: boolean; error?: string };
  approvePost: (postId: string) => void;
  rejectPost: (postId: string, reason: string) => void;
  deletePost: (postId: string) => void;
  getComments: (bookId?: string, postId?: string) => Comment[];
  addComment: (data: Omit<Comment, 'id' | 'userId' | 'createdAt' | 'likesCount'>) => { success: boolean; error?: string };
  deleteComment: (commentId: string) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  isLikedPost: (postId: string) => boolean;
  getApprovedPosts: () => Post[];
  getPendingPosts: () => Post[];
}

const PostsContext = createContext<PostsContextType | null>(null);

const STORAGE_KEYS = {
  POSTS: 'bite_posts',
  COMMENTS: 'bite_comments',
  LIKES: 'bite_likes',
};

export function PostsProvider({ children, currentUserId }: { children: React.ReactNode; currentUserId?: string }) {
  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate(n => n + 1);

  const getPosts = useCallback((status?: Post['status']): Post[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.POSTS);
      const posts: Post[] = data ? JSON.parse(data) : [];
      if (status) return posts.filter(p => p.status === status);
      return posts;
    } catch { return []; }
  }, []);

  const savePosts = useCallback((posts: Post[]) => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    refresh();
  }, []);

  const getUserPosts = useCallback((userId: string) => {
    return getPosts().filter(p => p.userId === userId);
  }, [getPosts]);

  const createPost = useCallback((data: Omit<Post, 'id' | 'userId' | 'status' | 'createdAt' | 'likesCount' | 'commentsCount'>) => {
    if (!currentUserId) return { success: false, error: 'Giriş yapmalısınız.' };
    
    const posts = getPosts();
    const newPost: Post = {
      ...data,
      id: nanoid(),
      userId: currentUserId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
    };
    posts.push(newPost);
    savePosts(posts);
    return { success: true };
  }, [currentUserId, getPosts, savePosts]);

  const approvePost = useCallback((postId: string) => {
    const posts = getPosts().map(p => 
      p.id === postId ? { ...p, status: 'approved' as const, approvedAt: new Date().toISOString() } : p
    );
    savePosts(posts);
  }, [getPosts, savePosts]);

  const rejectPost = useCallback((postId: string, reason: string) => {
    const posts = getPosts().map(p =>
      p.id === postId ? { ...p, status: 'rejected' as const, rejectedReason: reason } : p
    );
    savePosts(posts);
  }, [getPosts, savePosts]);

  const deletePost = useCallback((postId: string) => {
    const posts = getPosts().filter(p => p.id !== postId);
    savePosts(posts);
  }, [getPosts, savePosts]);

  const getComments = useCallback((bookId?: string, postId?: string): Comment[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      const comments: Comment[] = data ? JSON.parse(data) : [];
      if (bookId) return comments.filter(c => c.bookId === bookId);
      if (postId) return comments.filter(c => c.postId === postId);
      return comments;
    } catch { return []; }
  }, []);

  const addComment = useCallback((data: Omit<Comment, 'id' | 'userId' | 'createdAt' | 'likesCount'>) => {
    if (!currentUserId) return { success: false, error: 'Giriş yapmalısınız.' };
    if (!data.content.trim()) return { success: false, error: 'Yorum boş olamaz.' };
    
    try {
      const comments: Comment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '[]');
      const newComment: Comment = {
        ...data,
        id: nanoid(),
        userId: currentUserId,
        createdAt: new Date().toISOString(),
        likesCount: 0,
      };
      comments.push(newComment);
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
      refresh();
      return { success: true };
    } catch {
      return { success: false, error: 'Yorum eklenemedi.' };
    }
  }, [currentUserId]);

  const deleteComment = useCallback((commentId: string) => {
    try {
      const comments: Comment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '[]');
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments.filter(c => c.id !== commentId)));
      refresh();
    } catch {}
  }, []);

  const getLikes = useCallback((): Like[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES) || '[]');
    } catch { return []; }
  }, []);

  const likePost = useCallback((postId: string) => {
    if (!currentUserId) return;
    const likes = getLikes();
    if (likes.find(l => l.userId === currentUserId && l.targetId === postId)) return;
    likes.push({ userId: currentUserId, targetId: postId, targetType: 'post' });
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
    
    const posts = getPosts().map(p => p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p);
    savePosts(posts);
  }, [currentUserId, getLikes, getPosts, savePosts]);

  const unlikePost = useCallback((postId: string) => {
    if (!currentUserId) return;
    const likes = getLikes().filter(l => !(l.userId === currentUserId && l.targetId === postId));
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
    
    const posts = getPosts().map(p => p.id === postId ? { ...p, likesCount: Math.max(0, p.likesCount - 1) } : p);
    savePosts(posts);
  }, [currentUserId, getLikes, getPosts, savePosts]);

  const isLikedPost = useCallback((postId: string) => {
    if (!currentUserId) return false;
    return getLikes().some(l => l.userId === currentUserId && l.targetId === postId);
  }, [currentUserId, getLikes]);

  const getApprovedPosts = useCallback(() => {
    return getPosts('approved').sort((a, b) => new Date(b.approvedAt || b.createdAt).getTime() - new Date(a.approvedAt || a.createdAt).getTime());
  }, [getPosts]);

  const getPendingPosts = useCallback(() => {
    return getPosts('pending').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [getPosts]);

  return (
    <PostsContext.Provider value={{
      getPosts, getUserPosts, createPost, approvePost, rejectPost, deletePost,
      getComments, addComment, deleteComment,
      likePost, unlikePost, isLikedPost, getApprovedPosts, getPendingPosts,
    }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
