import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/config/schemaValidation'
import { clearLoginError, clearLoginSuccessMessage, loggedInUserSelect, loginAsync, loginSelect, resetLoginStatus } from '@/app/authSlice'
import { Spinner } from '@/components/ui/spinner'

const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = useSelector(loginSelect)
  const loggedInUser = useSelector(loggedInUserSelect)

  // Check if user is logged in or verified
  useEffect(()=>{
    if(loggedInUser && loggedInUser.isVerified){
      navigate('/')
    }
    else if(loggedInUser && !loggedInUser.isVerified){
      navigate('/send-otp')
    }
  },[loggedInUser])

  // Check login status & cleanup after first render
  useEffect(()=>{
    if(login.status === 'fulfilled'){
      toast.success(login.successMessage)
    }
    else if(login.status === 'rejected'){
      toast.error(login.error)
    }
    return ()=>{
      dispatch(resetLoginStatus())
      dispatch(clearLoginSuccessMessage())
      dispatch(clearLoginError())
    }
  },[login])

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    console.log(data)
    dispatch(loginAsync(data))
  }

  return (
    <div className='relative z-10 mt-40 flex items-center justify-center'>
      <Card className='max-w-sm sm:w-96'>
        <CardHeader>
          <CardTitle>Signin to your account</CardTitle>
          <CardDescription>Enter your credentials to signin to your account</CardDescription>
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
                <Spinner size='small' />
              ) : (
                <Button type='submit' className='w-full cursor-pointer'>
                  Signin
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
