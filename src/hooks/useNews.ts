import { COLLECTIONS, db, NewsArticle, UserBookmark } from '@/src/services/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useNews(limitCount: number = 20) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.NEWS),
          orderBy('publishedAt', 'desc'),
          limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        const articlesData: NewsArticle[] = [];

        querySnapshot.forEach((doc) => {
          articlesData.push({ id: doc.id, ...doc.data() } as NewsArticle);
        });

        setArticles(articlesData);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [limitCount]);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.NEWS),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const articlesData: NewsArticle[] = [];

      querySnapshot.forEach((doc) => {
        articlesData.push({ id: doc.id, ...doc.data() } as NewsArticle);
      });

      setArticles(articlesData);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { articles, loading, error, refresh };
}

export function useTrendingNews(limitCount: number = 10) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTrendingNews() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.NEWS),
          where('trending', '==', true),
          orderBy('publishedAt', 'desc'),
          limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        const articlesData: NewsArticle[] = [];

        querySnapshot.forEach((doc) => {
          articlesData.push({ id: doc.id, ...doc.data() } as NewsArticle);
        });

        setArticles(articlesData);
      } catch (err) {
        console.error('Error fetching trending news:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingNews();
  }, [limitCount]);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.NEWS),
        where('trending', '==', true),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const articlesData: NewsArticle[] = [];

      querySnapshot.forEach((doc) => {
        articlesData.push({ id: doc.id, ...doc.data() } as NewsArticle);
      });

      setArticles(articlesData);
    } catch (err) {
      console.error('Error fetching trending news:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { articles, loading, error, refresh };
}

export function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    async function fetchBookmarks() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.USER_BOOKMARKS),
          where('userId', '==', user?.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const bookmarksData: UserBookmark[] = [];

        querySnapshot.forEach((doc) => {
          bookmarksData.push({ id: doc.id, ...doc.data() } as UserBookmark);
        });

        setBookmarks(bookmarksData);
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarks();
  }, [user]);

  async function addBookmark(articleId: string) {
    if (!user) return;

    try {
      const bookmarkId = `${user.uid}_${articleId}`;
      const docRef = doc(db, COLLECTIONS.USER_BOOKMARKS, bookmarkId);

      await setDoc(docRef, {
        id: bookmarkId,
        userId: user.uid,
        articleId,
        createdAt: serverTimestamp(),
      });

      // Refresh bookmarks
      await refresh();
    } catch (err) {
      console.error('Error adding bookmark:', err);
      setError(err as Error);
      throw err;
    }
  }

  async function removeBookmark(articleId: string) {
    if (!user) return;

    try {
      const bookmarkId = `${user.uid}_${articleId}`;
      const docRef = doc(db, COLLECTIONS.USER_BOOKMARKS, bookmarkId);

      await deleteDoc(docRef);

      // Refresh bookmarks
      await refresh();
    } catch (err) {
      console.error('Error removing bookmark:', err);
      setError(err as Error);
      throw err;
    }
  }

  async function refresh() {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.USER_BOOKMARKS),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const bookmarksData: UserBookmark[] = [];

      querySnapshot.forEach((doc) => {
        bookmarksData.push({ id: doc.id, ...doc.data() } as UserBookmark);
      });

      setBookmarks(bookmarksData);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  function isBookmarked(articleId: string): boolean {
    return bookmarks.some(b => b.articleId === articleId);
  }

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refresh,
  };
}