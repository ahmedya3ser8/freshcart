import { Metadata } from "next"
import Register from "./register"
import PublicRoute from "@components/auth/PublicRoute"

export const metadata: Metadata = {
  title: 'Register'
}

function RegisterPage() {
  return (
    <PublicRoute>
      <Register />
    </PublicRoute>
  )
}

export default RegisterPage
