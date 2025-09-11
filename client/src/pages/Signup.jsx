import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signupSchema } from '@/config/schemaValidation'
import { signupAsync, signupSelect } from '@/app/authSlice'
import { loggedInUserSelect } from '@/app/authSlice'
import { Spinner } from '@/components/ui/spinner'
import { resetSignupStatus, clearSignupError, clearSignupSuccessMessage } from '@/app/authSlice'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(loggedInUserSelect)
  const signup = useSelector(signupSelect)

  // Check if user is logged in
  useEffect(() => {
    if (loggedInUser && loggedInUser.isVerified) {
      navigate('/')
    } else if (loggedInUser && !loggedInUser.isVerified) {
      navigate('/send-otp')
    }
  }, [loggedInUser])

  // Check signup status & cleanup after first render
  useEffect(() => {
    if (signup.status === 'fulfilled') {
      toast.success(signup.successMessage)
    } else if (signup.status === 'rejected') {
      toast.error(signup.error)
    }
    return () => {
      dispatch(resetSignupStatus())
      dispatch(clearSignupError())
      dispatch(clearSignupSuccessMessage())
    }
  }, [signup])

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    dispatch(signupAsync(data))
  }

  return (
    <div className='relative z-10 mt-40 flex items-center justify-center'>
      <Card className='max-w-sm sm:w-96'>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your credentials to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Jhon Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder='******' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {signup?.status === 'pending' ? (
                <Spinner size='small' />
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
            Already have an account?{' '}
            <Button className={'cursor-pointer'} variant='link'>
              <Link to={'/signin'}>Signin</Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup
