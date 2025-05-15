import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(1, {message: 'name is required'}).min(3, {message: 'name should be at least 3 chars'}).max(20, {message: 'name should be less than 20 chars'}),
  email: z.string().min(1, {message: 'email is required'}).email(),
  password: z.string().min(1, {message: 'password is required'}).min(8, {message: 'password should be at least 8 chars'}).regex(/^[A-Z][a-z0-9]{8,}$/, {message: 'password should start with capital letter'}),
  rePassword: z.string().min(1, {message: 'confirm password is required'}),
  phone: z.string().min(1, {message: 'phone is required'}).regex(/^01[0125][0-9]{8}$/, {message: 'accept only egyptian phones'})
}).refine(input => input.password === input.rePassword, {message: 'password and confirm password does not match', path: ['rePassword']})

type TRegister = z.infer<typeof registerSchema>

export {registerSchema, type TRegister}
