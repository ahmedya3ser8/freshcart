"use client"
import Input from "@components/forms/Input"
import useRegister from "@hooks/useRegister"
import Link from "next/link"
import { LuLoader } from "react-icons/lu"

function Register() {
  const {loading, register, handleSubmit, errors, submitForm} = useRegister();
  return (
    <section className="py-6">
      <h2 className="mb-4 text-2xl text-green-500 font-semibold text-center">Register Now</h2>
      <form onSubmit={handleSubmit(submitForm)} className="w-full md:w-1/2 mx-auto">
        <Input label="Name:" name="name" register={register} error={errors.name?.message as string} />
        <Input label="Email:" type="email" name="email" register={register} error={errors.email?.message as string} />
        <Input label="Password:" type="password" name="password" register={register} error={errors.password?.message as string} />
        <Input label="Confirm Password:" type="password" name="rePassword" register={register} error={errors.rePassword?.message as string} />
        <Input label="Phone:" type="tel" name="phone" register={register} error={errors.phone?.message as string} />
        <button type="submit" className="p-2 bg-green-500 text-white rounded-md">
          {loading === 'pending' ? <LuLoader className="animate-spin" /> : 'Register'}
        </button>
        <p className="text-center mt-2">
          you have an account? 
          <Link href="/auth/login" className="text-green-500 underline ms-1">login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register
