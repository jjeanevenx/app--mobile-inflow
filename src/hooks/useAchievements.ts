import { Achievement, COLLECTIONS, db, UserAchievement } from '@/src/services/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        setLoading(true);
        setError(null);

        const querySnapshot = await getDocs(collection(db, COLLECTIONS.ACHIEVEMENTS));
        const achievementsData: Achievement[] = [];

        querySnapshot.forEach((doc) => {
          achievementsData.push({ id: doc.id, ...doc.data() } as Achievement);
        });

        setAchievements(achievementsData);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);

      const querySnapshot = await getDocs(collection(db, COLLECTIONS.ACHIEVEMENTS));
      const achievementsData: Achievement[] = [];

      querySnapshot.forEach((doc) => {
        achievementsData.push({ id: doc.id, ...doc.data() } as Achievement);
      });

      setAchievements(achievementsData);
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { achievements, loading, error, refresh };
}

export function useUserAchievements() {
  const { user } = useAuth();
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setUserAchievements([]);
      setLoading(false);
      return;
    }

    async function fetchUserAchievements() {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, COLLECTIONS.USER_ACHIEVEMENTS),
          where('userId', '==', user?.uid)
        );

        const querySnapshot = await getDocs(q);
        const achievementsData: UserAchievement[] = [];

        querySnapshot.forEach((doc) => {
          achievementsData.push({ id: doc.id, ...doc.data() } as UserAchievement);
        });

        setUserAchievements(achievementsData);
      } catch (err) {
        console.error('Error fetching user achievements:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAchievements();
  }, [user]);

  async function unlockAchievement(achievementId: string) {
    if (!user) return;

    try {
      const achievementDocId = `${user.uid}_${achievementId}`;
      const docRef = doc(db, COLLECTIONS.USER_ACHIEVEMENTS, achievementDocId);

      await setDoc(docRef, {
        id: achievementDocId,
        userId: user.uid,
        achievementId,
        unlockedAt: serverTimestamp(),
      });

      // Refresh achievements
      await refresh();
    } catch (err) {
      console.error('Error unlocking achievement:', err);
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
        collection(db, COLLECTIONS.USER_ACHIEVEMENTS),
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      const achievementsData: UserAchievement[] = [];

      querySnapshot.forEach((doc) => {
        achievementsData.push({ id: doc.id, ...doc.data() } as UserAchievement);
      });

      setUserAchievements(achievementsData);
    } catch (err) {
      console.error('Error fetching user achievements:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { userAchievements, loading, error, unlockAchievement, refresh };
}