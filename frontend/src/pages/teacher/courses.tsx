import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getMyCourses, createCourse, type Course } from '../../services/courses';
import { getCurrentUser, getToken } from '../../services/auth';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/Teacher.module.css';

export default function TeacherCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();
      if (!token) {
        router.push('/signin');
        return;
      }

      try {
        const user = await getCurrentUser(token);
        if (user.role !== 'instructor') {
          router.push('/dashboard');
          return;
        }
        loadCourses();
      } catch (error) {
        router.push('/signin');
      }
    };

    checkUser();
  }, [router]);

  const loadCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCourse(formData);
      setShowCreateForm(false);
      setFormData({ title: '', description: '', price: 0 });
      loadCourses();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Xatolik yuz berdi');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Yuklanmoqda...</div>;
  }

  return (
    <>
      <Head>
        <title>Mening Kurslarim - Teacher</title>
      </Head>
      <div className={styles.container}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <header className={styles.header}>
          <button className={styles.menuButton} onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h1>📚 Mening Kurslarim</h1>
          <button className={styles.createButton} onClick={() => setShowCreateForm(true)}>
            + Yangi Kurs
          </button>
        </header>

        <main className={styles.main}>
          {showCreateForm && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Yangi Kurs Yaratish</h2>
                <form onSubmit={handleCreateCourse}>
                  <div className={styles.formGroup}>
                    <label>Kurs nomi</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Tavsif</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Narx (so'm)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button type="submit">Yaratish</button>
                    <button type="button" onClick={() => setShowCreateForm(false)}>
                      Bekor qilish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className={styles.coursesGrid}>
            {courses.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Hozircha kurslar yo'q. Yangi kurs yarating!</p>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <h3>{course.title}</h3>
                  <p>{course.description || 'Tavsif yo\'q'}</p>
                  <div className={styles.courseMeta}>
                    <span>Status: {course.status}</span>
                    <span>Narx: {course.price} so'm</span>
                  </div>
                  <Link href={`/teacher/courses/${course.id}`}>
                    <button className={styles.viewButton}>Kursni boshqarish</button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}

