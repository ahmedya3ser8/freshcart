import { Metadata } from "next"
import Register from "./register"

export const metadata: Metadata = {
  title: 'Register'
}

function RegisterPage() {
  return (
    <Register />
  )
}

export default RegisterPage
