"use client"
import { useAppSelector } from '@store/hooks';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector(state => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.replace('/auth/login');
    }
  }, [router, token]);
  if (!token) return null;
  return (
    <>{children}</>
  )
}

export default ProtectedRoute;
