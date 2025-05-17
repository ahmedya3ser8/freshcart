import { Metadata } from "next"
import Login from "./login"

export const metadata: Metadata = {
  title: 'Login'
}

function LoginPage() {
  return (
    <Login />
  )
}

export default LoginPage
