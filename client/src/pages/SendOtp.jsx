import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { loggedInUserSelect } from '@/app/authSlice'
import { sendOtpAsync } from '@/app/authSlice'
import { sendOtpSelect } from '@/app/authSlice'
import { resetSendOtpStatus, clearSendOtpError, clearSendOtpSuccessMessage } from '@/app/authSlice'
import { OTPSchema } from '@/config/schemaValidation'

const SendOtp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(loggedInUserSelect)
  const form = useForm({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      email: loggedInUser?.email || ''
    }
  })
  const sendOtp = useSelector(sendOtpSelect)

  // If user is loggedin & verified redirect to /
  useEffect(() => {
    if (loggedInUser && loggedInUser.isVerified) {
      navigate('/')
    }
  }, [loggedInUser])

  // Check sendOtp status & cleanup after first render
  useEffect(() => {
    if (sendOtp.status === 'pending') {
      console.log('pending....')
    }
    if (sendOtp.status === 'fulfilled') {
      toast.success(sendOtp.successMessage)
      navigate('/verify-otp')

      //CleanUp

      dispatch(resetSendOtpStatus())
      dispatch(clearSendOtpError())
      dispatch(clearSendOtpSuccessMessage())
    } else if (sendOtp.status === 'rejected') {
      toast.error(sendOtp.error)

      //CleanUp
      dispatch(resetSendOtpStatus())
      dispatch(clearSendOtpError())
      dispatch(clearSendOtpSuccessMessage())
    }
  }, [sendOtp])

  // Send OTP api call
  const onSubmit = (data) => {
    dispatch(sendOtpAsync(data))
  }

  return (
    <div className='relative z-10 flex h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-neutral-100 p-6 shadow-lg'>
        <div className='flex w-full justify-between'>
          <h2 className='text-lg font-semibold text-neutral-900'>Send OTP</h2>
          <Button className={'cursor-pointer'} variant='link'>
            <Link to={'/signup'}>Sign up</Link>
          </Button>
        </div>
        <p className='mt-2 text-sm text-neutral-900'>
          We will send a one-time password (OTP) to your registered email. Please confirm to proceed.
        </p>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={'mt-5 w-full text-neutral-900'}>Email</FormLabel>
                      <FormControl>
                        <Input className={'text-neutral-900'} placeholder='Enter your email...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {sendOtp.status === 'pending' ? (
                  <div className='flex items-center justify-center'>
                    <Spinner size='small' className='text-black'>
                      <span className='text-md text-black'>Sending...</span>
                    </Spinner>
                  </div>
                ) : (
                  <Button type='submit' className='w-full'>
                    Submit
                  </Button>
                )}
              </form>
            </Form>
          </div>
      </div>
    </div>
  )
}

export default SendOtp
