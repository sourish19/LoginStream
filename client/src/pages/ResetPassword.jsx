import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { loggedInUserSelect } from '@/app/authSlice'
import { resetPasswordSelect,resetPasswordAsync,resetResetPasswordStatus,clearResetPasswordError,clearResetPasswordSuccessMessage } from '@/app/authSlice'
import { resetPasswordSchema } from '@/config/schemaValidation'

const ResetPassword = () => {
  const loggedInUser = useSelector(loggedInUserSelect)
  const resetPassword = useSelector(resetPasswordSelect)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues:{
      newPassword: "",
      confirmPassword: ""
    }
  })

  useEffect(()=>{
    if(!loggedInUser || !loggedInUser.isVerified){
      navigate('/signup')
    }
  },[loggedInUser,navigate])

  useEffect(()=>{
    if(resetPassword.status === "fulfilled" || resetPassword.status === "rejected"){
      resetPassword.status === "fulfilled" && navigate("/signin")

      dispatch(resetResetPasswordStatus())
      dispatch(clearResetPasswordError())
      dispatch(clearResetPasswordSuccessMessage())
    }
  },[resetPassword,dispatch,navigate])

const onSubmit = (data)=>{
  data.resetToken = loggedInUser?.resetToken
  data.email = loggedInUser?.email
  dispatch(resetPasswordAsync(data))
}

  return (
    <div className='relative z-10 flex h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-neutral-100 p-6 shadow-lg'>
        <div className='flex w-full justify-between'>
          <h2 className='text-lg font-semibold text-neutral-900'>Reset Password</h2>
          <Button className={'cursor-pointer'} variant='link'>
            <Link to={'/sigin'}>Sign in</Link>
          </Button>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-1'>
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'mt-5 w-full text-neutral-900'}>New Password</FormLabel>
                    <FormControl>
                      <Input className={'text-neutral-900'} placeholder='Enter new password...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className={'mb-5'}>
                    <FormLabel className={'mt-5 w-full text-neutral-900'}>Confirm Password</FormLabel>
                    <FormControl>
                      <Input className={'text-neutral-900'} placeholder='Enter confirm password...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {resetPassword.status === 'pending' ? (
                <div className='flex items-center justify-center'>
                  <Spinner size='small' className='text-black'>
                    <span className='text-md text-black'>Sending...</span>
                  </Spinner>
                </div>
              ) : (
                <Button type='submit' className='w-full'>
                  Reset
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
