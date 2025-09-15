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

const verifyOtpSchema = z.object({
  otp: z.string().min(6, 'OTP must be at least 6 characters')
})

const passwordSchema = z
  .string()
  .min(4, 'Password must be at least 4 characters')
  .max(20, 'Password must be at most 20 characters')

const updatePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordSchema
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different',
    path: ['newPassword']
  })

export { signupSchema, loginSchema, OTPSchema, verifyOtpSchema, updatePasswordSchema }
