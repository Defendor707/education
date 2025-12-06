import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signUp, signIn, saveToken } from '../services/auth';
import styles from '../styles/Auth.module.css';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
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
      // Sign up
      await signUp(formData);
      
      // Auto sign in after sign up
      const authResponse = await signIn({
        username: formData.username,
        password: formData.password,
      });
      
      saveToken(authResponse.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ro'yxatdan o'tish - Education Platform</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Ro'yxatdan o'tish</h1>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="first_name">Ism</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="last_name">Familiya</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                placeholder="Familiyangizni kiriting"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="username">Foydalanuvchi nomi</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                placeholder="Foydalanuvchi nomi"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
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
                minLength={6}
                placeholder="Kamida 6 ta belgi"
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
            </button>
          </form>

          <p className={styles.linkText}>
            Allaqachon hisobingiz bormi?{' '}
            <a href="/signin" className={styles.link}>
              Kirish
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

