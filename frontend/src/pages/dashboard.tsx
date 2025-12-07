import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getCurrentUser, getToken, removeToken } from '../services/auth';
import type { User } from '../services/auth';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        setError('Foydalanuvchi ma\'lumotlarini yuklashda xatolik');
        removeToken();
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
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
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <p>Qayta yo'naltirilmoqda...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Education Platform</title>
        <meta name="description" content="Education Platform Dashboard" />
      </Head>
      <div className={styles.container}>
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <button 
                className={styles.menuButton}
                onClick={() => setSidebarOpen(true)}
                aria-label="Menu"
              >
                <span className={styles.menuIcon}>☰</span>
              </button>
              <h1 className={styles.logo}>🎓 Education Platform</h1>
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.first_name} {user.last_name}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Chiqish
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Welcome Section */}
          <section className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>
              Xush kelibsiz, {user.first_name}! 👋
            </h2>
            <p className={styles.welcomeText}>
              Education Platform'ga xush kelibsiz. Bu yerda siz o'zingizga kerakli kurslarni topishingiz va o'rganishingiz mumkin.
            </p>
          </section>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📚</div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>0</h3>
                <p className={styles.statLabel}>Kurslar</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>0</h3>
                <p className={styles.statLabel}>Tugallangan</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⏳</div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>0</h3>
                <p className={styles.statLabel}>Jarayonda</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>0</h3>
                <p className={styles.statLabel}>Reyting</p>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <section className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>Profil Ma'lumotlari</h2>
            <div className={styles.profileCard}>
              <div className={styles.profileGrid}>
                <div className={styles.profileItem}>
                  <label className={styles.profileLabel}>Foydalanuvchi nomi</label>
                  <p className={styles.profileValue}>{user.username}</p>
                </div>
                <div className={styles.profileItem}>
                  <label className={styles.profileLabel}>Email</label>
                  <p className={styles.profileValue}>{user.email}</p>
                </div>
                <div className={styles.profileItem}>
                  <label className={styles.profileLabel}>Ism</label>
                  <p className={styles.profileValue}>{user.first_name} {user.last_name}</p>
                </div>
                <div className={styles.profileItem}>
                  <label className={styles.profileLabel}>Rol</label>
                  <p className={styles.profileValue}>
                    <span className={styles.roleBadge}>{user.role}</span>
                  </p>
                </div>
                <div className={styles.profileItem}>
                  <label className={styles.profileLabel}>Hisob holati</label>
                  <p className={styles.profileValue}>
                    <span className={user.is_active ? styles.activeBadge : styles.inactiveBadge}>
                      {user.is_active ? 'Faol' : 'Nofaol'}
                    </span>
                  </p>
                </div>
                <div className={styles.profileItem}>
                  <label className={styles.profileLabel}>Ro'yxatdan o'tgan sana</label>
                  <p className={styles.profileValue}>
                    {new Date(user.created_at).toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className={styles.actionsSection}>
            <h2 className={styles.sectionTitle}>Tezkor Amallar</h2>
            <div className={styles.actionsGrid}>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>🔍</span>
                <span className={styles.actionText}>Kurslarni qidirish</span>
              </button>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>📖</span>
                <span className={styles.actionText}>Mening kurslarim</span>
              </button>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>⚙️</span>
                <span className={styles.actionText}>Sozlamalar</span>
              </button>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>💬</span>
                <span className={styles.actionText}>Yordam</span>
              </button>
            </div>
          </section>

          {/* Recent Activity */}
          <section className={styles.activitySection}>
            <h2 className={styles.sectionTitle}>So'nggi Faoliyat</h2>
            <div className={styles.activityCard}>
              <p className={styles.emptyState}>
                Hozircha faoliyat yo'q. Kurslarni ko'rib chiqing va o'rganishni boshlang!
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
