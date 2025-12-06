import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, saveToken } from '../services/auth';
import styles from '../styles/Auth.module.css';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const authResponse = await signIn(formData);
      saveToken(authResponse.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Foydalanuvchi nomi yoki parol noto\'g\'ri');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Kirish - Education Platform</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Kirish</h1>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Foydalanuvchi nomi</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Foydalanuvchi nomi"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Parol</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Parolingizni kiriting"
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? 'Yuklanmoqda...' : 'Kirish'}
            </button>
          </form>

          <p className={styles.linkText}>
            Hisobingiz yo'qmi?{' '}
            <a href="/signup" className={styles.link}>
              Ro'yxatdan o'tish
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

