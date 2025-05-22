"use client"
import Input from "@components/forms/Input"
import useLogin from "@hooks/useLogin"
import Link from "next/link"
import { LuLoader } from "react-icons/lu"

const Login = () => {
  const {loading, register, handleSubmit, errors, submitForm} = useLogin();
  return (
    <section className="py-6">
      <h2 className="mb-4 text-2xl text-green-500 font-semibold text-center">Login Now</h2>
      <form onSubmit={handleSubmit(submitForm)} className="w-full md:w-1/2 mx-auto border border-green-500 rounded-md p-4">
        <Input label="Email:" type="email" name="email" register={register} error={errors.email?.message as string} />
        <Input label="Password:" type="password" name="password" register={register} error={errors.password?.message as string} />
        <Link href='/auth/forget-password' className="block text-right my-2 text-emerald-500 cursor-pointer">Forgot Password?</Link>
        <button type="submit" className="p-2 bg-green-500 text-white rounded-md">
          {loading === 'pending' ? <LuLoader className="animate-spin" /> : 'Login'}
        </button>
        <p className="text-center mt-2">
          you don&lsquo;t have an account?
          <Link href="/auth/register" className="text-green-500 underline ms-1">Register</Link>
        </p>
      </form>
    </section>
  )
}

export default Login