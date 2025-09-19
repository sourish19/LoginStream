import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import {
    loggedInUserSelect,
    forgotPasswordSelect,
  clearForgotPasswordError,
  clearForgotPasswordSuccessMessage,
  resetForgotPasswordStatus,
  forgotPasswordVerifyOtpAsync
} from '@/app/authSlice'
import { verifyOtpSchema } from '@/config/schemaValidation'

const VerifyForgotPasswordOtp = () => {
  const loggedInUser = useSelector(loggedInUserSelect)
  const forgotPassword = useSelector(forgotPasswordSelect)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: ''
    }
  })

//   If user is loggedin & verified redirect to 
  useEffect(() => {
    if (loggedInUser && !loggedInUser.isVerified) {
      navigate('/signup')
    } 
  }, [loggedInUser, navigate])

  // Check forgotPassword status
  useEffect(() => {
    if (forgotPassword.status === 'fulfilled' || forgotPassword.status === 'rejected') {
      forgotPassword.status === 'fulfilled' && navigate('/sigin')
      // CleanUp
      dispatch(resetForgotPasswordStatus())
      dispatch(clearForgotPasswordError())
      dispatch(clearForgotPasswordSuccessMessage())
    }
  }, [forgotPassword, loggedInUser, dispatch, navigate])

  // Submit handler
  const onSubmit = (data) => {
    data.email = loggedInUser?.email
    dispatch(forgotPasswordVerifyOtpAsync(data))
  }

  return (
    <div className='relative z-10 mt-42 flex items-center justify-center'>
      {!loggedInUser ? (
        <div className='flex items-center gap-4'>
          <Spinner size='large' className='text-white'>
            <span className='text-xl text-white'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className='w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-2xl'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-2xl font-semibold text-neutral-900'>Verify Forgot Password OTP</h2>
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
                {forgotPassword.status === 'pending' ? (
                  <div className='flex items-center justify-center'>
                    <Spinner size='small' className='text-black'>
                      <span className='text-md text-black'>Verifying...</span>
                    </Spinner>
                  </div>
                ) : (
                  <Button type='submit' className='w-full'>
                    Submit
                  </Button>
                )}
              </form>
            </Form>
            <div className='h-full w-full text-center'>
              <Button variant={'link'}>
                {' '}
                <Link to={'/forgot-password/send-otp'}>Didn't receive an OTP? Resend it</Link>{' '}
              </Button>
            </div>
          </div>
        </>
       )} 
    </div>
  )
}

export default VerifyForgotPasswordOtp
