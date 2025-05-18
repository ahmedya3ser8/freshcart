import { z } from "zod";

const checkoutSchema = z.object({
  details: z.string().min(1, {message: 'details is required'}),
  phone: z.string().min(1, {message: 'phone is required'}),
  city: z.string().min(1, {message: 'city is required'})
})

type TCheckout = z.infer<typeof checkoutSchema>

export {checkoutSchema, type TCheckout}
