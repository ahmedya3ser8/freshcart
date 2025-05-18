"use client"
import { useAppSelector } from '@store/hooks';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector(state => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.replace('/');
    }
  }, [router, token]);
  if (token) return null;
  return (
    <>{children}</>
  )
}

export default PublicRoute;
