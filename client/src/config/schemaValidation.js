import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email('Invalid email').trim().toLowerCase(),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be at most 20 characters')
})

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be at most 20 characters')
})

const OTPSchema = z.object({
  email: z.email('Invalid email')
})

export { signupSchema, loginSchema, OTPSchema }
