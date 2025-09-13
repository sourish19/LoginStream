import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import { loginSchema } from '@/config/schemaValidation'
import {
  clearLoginError,
  clearLoginSuccessMessage,
  loggedInUserSelect,
  loginAsync,
  loginSelect,
  resetLoginStatus
} from '@/app/authSlice'

const Signin = () => {
  const { loggedInUser, login } = useSelector((state) => ({
    loggedInUser: loggedInUserSelect(state),
    login: loginSelect(state)
  }))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Check if user is logged in or verified
  useEffect(() => {
    if (loggedInUser && loggedInUser.isVerified) {
      navigate('/')
    } else if (loggedInUser && !loggedInUser.isVerified) {
      navigate('/send-otp')
    }
  }, [loggedInUser])

  // Check login status
  useEffect(() => {
    if (login.status === 'fulfilled') {
      toast.success(login.successMessage)

      // CleanUp
      dispatch(resetLoginStatus())
      dispatch(clearLoginSuccessMessage())
      dispatch(clearLoginError())
    } else if (login.status === 'rejected') {
      toast.error(login.error)

      //CleanUp
      dispatch(resetLoginStatus())
      dispatch(clearLoginSuccessMessage())
      dispatch(clearLoginError())
    }
  }, [login, dispatch])

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    dispatch(loginAsync(data))
  }

  return (
    <div className='relative z-10 mt-40 flex items-center justify-center'>
      <Card className='max-w-sm sm:w-96'>
        <CardHeader>
          <CardTitle>Signin to your account</CardTitle>
          <CardDescription>Enter your credentials to signin to your account</CardDescription>
          <CardAction>
            <Button variant={'link'}>
              <Link to={'/send-otp'}>Send OTP</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type={'email'} placeholder='jhonDoe@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link to='/forgot-password' className='text-sm underline-offset-4 hover:underline'>
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type='password' placeholder='******' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {login?.status === 'pending' ? (
                <div className='flex items-center justify-center'>
                  <Spinner size='small' className='text-black'>
                    <span className='text-md text-black'>Signing in...</span>
                  </Spinner>
                </div>
              ) : (
                <Button type={'submit'} className={'w-full'}>
                  Signup
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button variant='outline' className='w-full cursor-pointer'>
            Continue with Google
          </Button>
          <CardDescription>
            Don't have an account?{' '}
            <Button className={'cursor-pointer'} variant='link'>
              <Link to={'/signup'}>Sign up</Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signin
