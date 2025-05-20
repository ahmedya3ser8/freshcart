"use client"
import { useAppSelector } from "@store/hooks"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: {children: React.ReactNode}) {
  const { token } = useAppSelector(state => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (token == null) {
      router.push('/auth/login');
    }
  }, [token, router]);
  if (token == null) return null;
  return (
    <>{children}</>
  )
}
