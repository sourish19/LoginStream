import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { loggedInUserSelect, otpVerificationSelect, verifyOtpAsync } from '@/app/authSlice'
import { verifyOtpSchema } from '@/config/schemaValidation'

const OtpVerify = () => {
  const loggedInUser = useSelector(loggedInUserSelect)
  const otpVerification = useSelector(otpVerificationSelect)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: ''
    }
  })

  useEffect(() => {
    if (loggedInUser && loggedInUser.isVerified) {
      navigate('/')
    }
  }, [loggedInUser])

  useEffect(() => {
    if (otpVerification.status === 'fulfilled') {
      toast(otpVerification.successMessage)
      navigate('/')
    } else if (otpVerification.status === 'rejwcted') {
      toast(otpVerification.error)
      navigate('/send-otp')
    }
  }, [otpVerification])

  const onSubmit = (data) => {
    dispatch(verifyOtpAsync(data))
  }

  return (
    <div className='relative z-10 mt-42 flex items-center justify-center'>
      <div className='w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-2xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold text-neutral-900'>Verify OTP</h2>
              <p className='mt-1 text-sm text-neutral-500'>Enter the one-time password sent to your email</p>
            </div>

            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem className={'flex flex-col items-center justify-center text-neutral-900'}>
                  <FormLabel className='sr-only'>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className='text-center' />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
        <div className='h-full w-full text-center'>
          {otpVerification.status === 'pending' ? (
            <div className='flex items-center gap-4'>
              <Spinner size='large' className='text-black'>
                <span className='text-xl text-black'>Sending...</span>
              </Spinner>
            </div>
          ) : (
            <Button variant={'link'}>
              {' '}
              <Link to={'/send-otp'}>Didn't receive an OTP? Resend it</Link>{' '}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OtpVerify
