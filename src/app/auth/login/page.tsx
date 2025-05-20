import { Metadata } from "next"
import Login from "./login"
import PublicRoute from "@components/auth/PublicRoute"

export const metadata: Metadata = {
  title: 'Login'
}

function LoginPage() {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  )
}

export default LoginPage
