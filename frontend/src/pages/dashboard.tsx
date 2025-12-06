import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getCurrentUser, getToken, removeToken } from '../services/auth';
import type { User } from '../services/auth';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/signin');
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser(token);
        setUser(userData);
      } catch (error) {
        removeToken();
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push('/signin');
  };

  if (loading) {
    return <div className={styles.container}>Yuklanmoqda...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Education Platform</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Xush kelibsiz, {user.first_name}!</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Chiqish
          </button>
        </div>
        
        <div className={styles.profile}>
          <h2>Profil ma'lumotlari</h2>
          <div className={styles.info}>
            <p><strong>Foydalanuvchi nomi:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Ism:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Rol:</strong> {user.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}

