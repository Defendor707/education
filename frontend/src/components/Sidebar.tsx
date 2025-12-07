import { useRouter } from 'next/router';
import Link from 'next/link';
import { removeToken } from '../services/auth';
import styles from '../styles/Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/signin');
  };

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '📚', label: 'Kurslar', path: '/courses' },
    { icon: '📖', label: 'Mening kurslarim', path: '/my-courses' },
    { icon: '🔍', label: 'Qidirish', path: '/search' },
    { icon: '⭐', label: 'Reyting', path: '/ratings' },
    { icon: '👤', label: 'Profil', path: '/profile' },
    { icon: '⚙️', label: 'Sozlamalar', path: '/settings' },
    { icon: '💬', label: 'Yordam', path: '/help' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>🎓 Education</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${styles.menuItem} ${
                    router.pathname === item.path ? styles.active : ''
                  }`}
                  onClick={onClose}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <span className={styles.menuIcon}>🚪</span>
            <span className={styles.menuLabel}>Chiqish</span>
          </button>
        </div>
      </aside>
    </>
  );
}

