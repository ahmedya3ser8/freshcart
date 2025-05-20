"use client"
import { useAppSelector } from "@store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicRoute({ children }: {children: React.ReactNode}) {
  const { token } = useAppSelector(state => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);
  if (token) return null;
  return (
    <>{children}</>
  )
}
