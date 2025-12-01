import { COLLECTIONS, db, UserProgress } from '@/src/services/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useUserProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }

    async function fetchProgress() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.USER_PROGRESS),
          where('userId', '==', user?.uid),
          orderBy('lastAccessedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const progressData: UserProgress[] = [];

        querySnapshot.forEach((doc) => {
          progressData.push({ id: doc.id, ...doc.data() } as UserProgress);
        });

        setProgress(progressData);
      } catch (err) {
        console.error('Error fetching progress:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [user]);

  async function updateProgress(courseId: string, progressPercentage: number) {
    if (!user) return;

    try {
      const progressId = `${user.uid}_${courseId}`;
      const docRef = doc(db, COLLECTIONS.USER_PROGRESS, progressId);

      const progressData = {
        userId: user.uid,
        courseId,
        progressPercentage,
        completed: progressPercentage >= 100,
        lastAccessedAt: serverTimestamp(),
      };

      // Check if document exists
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        await updateDoc(docRef, progressData);
      } else {
        await setDoc(docRef, {
          id: progressId,
          ...progressData,
        });
      }

      // Refresh progress
      await refresh();
      return progressData;
    } catch (err) {
      console.error('Error updating progress:', err);
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
        collection(db, COLLECTIONS.USER_PROGRESS),
        where('userId', '==', user.uid),
        orderBy('lastAccessedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const progressData: UserProgress[] = [];

      querySnapshot.forEach((doc) => {
        progressData.push({ id: doc.id, ...doc.data() } as UserProgress);
      });

      setProgress(progressData);
    } catch (err) {
      console.error('Error fetching progress:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { progress, loading, error, updateProgress, refresh };
}

export function useCourseProgress(courseId: string) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user || !courseId) {
      setProgress(null);
      setLoading(false);
      return;
    }

    async function fetchCourseProgress() {
      try {
        setLoading(true);
        setError(null);

        const progressId = `${user?.uid}_${courseId}`;
        const docRef = doc(db, COLLECTIONS.USER_PROGRESS, progressId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProgress({ id: docSnap.id, ...docSnap.data() } as UserProgress);
        } else {
          setProgress(null);
        }
      } catch (err) {
        console.error('Error fetching course progress:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourseProgress();
  }, [user, courseId]);

  async function refresh() {
    if (!user || !courseId) return;

    try {
      setLoading(true);
      setError(null);

      const progressId = `${user.uid}_${courseId}`;
      const docRef = doc(db, COLLECTIONS.USER_PROGRESS, progressId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProgress({ id: docSnap.id, ...docSnap.data() } as UserProgress);
      } else {
        setProgress(null);
      }
    } catch (err) {
      console.error('Error fetching course progress:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { progress, loading, error, refresh };
}

export function useInProgressCourses(limitCount: number = 10) {
  const { user } = useAuth();
  const [courses, setCourses] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setCourses([]);
      setLoading(false);
      return;
    }

    async function fetchInProgressCourses() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.USER_PROGRESS),
          where('userId', '==', user?.uid),
          where('completed', '==', false),
          orderBy('lastAccessedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const coursesData: UserProgress[] = [];

        querySnapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() } as UserProgress);
        });

        setCourses(coursesData.slice(0, limitCount));
      } catch (err) {
        console.error('Error fetching in-progress courses:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchInProgressCourses();
  }, [user, limitCount]);

  async function refresh() {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.USER_PROGRESS),
        where('userId', '==', user.uid),
        where('completed', '==', false),
        orderBy('lastAccessedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const coursesData: UserProgress[] = [];

      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() } as UserProgress);
      });

      setCourses(coursesData.slice(0, limitCount));
    } catch (err) {
      console.error('Error fetching in-progress courses:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { courses, loading, error, refresh };
}

export function useCompletedCourses(limitCount: number = 10) {
  const { user } = useAuth();
  const [courses, setCourses] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setCourses([]);
      setLoading(false);
      return;
    }

    async function fetchCompletedCourses() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.USER_PROGRESS),
          where('userId', '==', user?.uid),
          where('completed', '==', true),
          orderBy('lastAccessedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const coursesData: UserProgress[] = [];

        querySnapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() } as UserProgress);
        });

        setCourses(coursesData.slice(0, limitCount));
      } catch (err) {
        console.error('Error fetching completed courses:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompletedCourses();
  }, [user, limitCount]);

  async function refresh() {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.USER_PROGRESS),
        where('userId', '==', user.uid),
        where('completed', '==', true),
        orderBy('lastAccessedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const coursesData: UserProgress[] = [];

      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() } as UserProgress);
      });

      setCourses(coursesData.slice(0, limitCount));
    } catch (err) {
      console.error('Error fetching completed courses:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { courses, loading, error, refresh };
}