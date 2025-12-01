import { COLLECTIONS, Course, db } from '@/src/services/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useCourses(category?: string, limitCount: number = 20) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);

        let q = query(
          collection(db, COLLECTIONS.COURSES),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );

        if (category && category !== 'all') {
          q = query(
            collection(db, COLLECTIONS.COURSES),
            where('category', '==', category),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
          );
        }

        const querySnapshot = await getDocs(q);
        const coursesData: Course[] = [];

        querySnapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() } as Course);
        });

        setCourses(coursesData);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [category, limitCount]);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);

      let q = query(
        collection(db, COLLECTIONS.COURSES),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      if (category && category !== 'all') {
        q = query(
          collection(db, COLLECTIONS.COURSES),
          where('category', '==', category),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }

      const querySnapshot = await getDocs(q);
      const coursesData: Course[] = [];

      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() } as Course);
      });

      setCourses(coursesData);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { courses, loading, error, refresh };
}

export function useCourse(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    async function fetchCourse() {
      try {
        setLoading(true);
        setError(null);

        const docRef = doc(db, COLLECTIONS.COURSES, courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
        } else {
          setCourse(null);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  async function refresh() {
    if (!courseId) return;

    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, COLLECTIONS.COURSES, courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
      } else {
        setCourse(null);
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { course, loading, error, refresh };
}

export function useFeaturedCourses(limitCount: number = 5) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFeaturedCourses() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.COURSES),
          orderBy('rating', 'desc'),
          limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        const coursesData: Course[] = [];

        querySnapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() } as Course);
        });

        setCourses(coursesData);
      } catch (err) {
        console.error('Error fetching featured courses:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedCourses();
  }, [limitCount]);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.COURSES),
        orderBy('rating', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const coursesData: Course[] = [];

      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() } as Course);
      });

      setCourses(coursesData);
    } catch (err) {
      console.error('Error fetching featured courses:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { courses, loading, error, refresh };
}