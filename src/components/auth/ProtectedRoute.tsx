"use client"
import { useAppSelector } from "@store/hooks"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

export default function ProtectedRoute({ children, redirectTo = "/auth/login" }: {children: React.ReactNode, redirectTo?: string}) {
  const { token } = useAppSelector(state => state.auth);
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  useEffect(() => {
    setCheckingAuth(false);
    if (!token) {
      router.push(redirectTo);
    }
  }, [token, router, redirectTo]);
  if (checkingAuth || !token) { 
    return (
      <div className="flex justify-center items-center h-screen">
        <LuLoaderCircle className="animate-spin size-10" />
      </div>
    )
  }
  return (
    <>{children}</>
  )
}
