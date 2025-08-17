import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Signup = () => {
  return (
    <div className='relative z-10 mt-40 flex items-center justify-center'>
      <Card className='max-w-sm sm:w-96'>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your credentials to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='jhonDoe@gmail.com' required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' type='text' placeholder='Jhon Doe' required />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input id='password' type='password' placeholder='********' required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full cursor-pointer'>
            Signup
          </Button>
          <Button variant='outline' className='w-full cursor-pointer'>
            Continue with Google
          </Button>
          <CardDescription>
            Already have an account? <Button className={"cursor-pointer"} variant='link'>Signin</Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup
