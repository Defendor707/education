import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser, getToken, type User } from '../services/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser(token);
        setUser(userData);
      } catch (error) {
        // Token invalid or expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isTeacher = user?.role === 'instructor';
  const isStudent = user?.role === 'student';
  const isAdmin = user?.role === 'admin';

  return {
    user,
    loading,
    isTeacher,
    isStudent,
    isAdmin,
    isAuthenticated: !!user,
  };
}

export function useRequireRole(requiredRole: 'instructor' | 'student' | 'admin') {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/signin');
        return;
      }

      const roleMap = {
        instructor: 'instructor',
        student: 'student',
        admin: 'admin',
      };

      if (user?.role !== roleMap[requiredRole]) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, isAuthenticated, requiredRole, router]);

  return { user, loading };
}

