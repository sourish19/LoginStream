import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/config/schemaValidation'

const Signin = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    console.log(data)
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
                      <Link className='text-sm underline-offset-4 hover:underline'>
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

              <Button type='submit' className='w-full cursor-pointer'>
                Submit
              </Button>
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
              Signup
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signin
