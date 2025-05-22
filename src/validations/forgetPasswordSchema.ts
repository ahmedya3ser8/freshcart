import { z } from "zod";

const forgetPasswordSchema = z.object({
  email: z.string().min(1, {message: 'email is required'}).email()
});

type TForgetPassword = z.infer<typeof forgetPasswordSchema>

const resetCodeSchema = z.object({
  resetCode: z.string().min(1, {message: 'resetCode is required'}).trim()
});

type TResetCode = z.infer<typeof resetCodeSchema>

const resetPasswordSchema = z.object({
  email: z.string().email().min(1, {message: 'email is required'}),
  newPassword: z.string().min(1, {message: 'email is required'}).min(8, {message: 'newPassword should be at least 8 chars'}).regex(/^[A-Z][a-z0-9]{8,}$/, {message: 'newPassword should be start with capital letter'})
});

type TResetPassword = z.infer<typeof resetPasswordSchema>

export {forgetPasswordSchema, resetCodeSchema, resetPasswordSchema, type TForgetPassword, type TResetCode, type TResetPassword }
