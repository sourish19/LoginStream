import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import {
  loggedInUserSelect,
  changePasswordSelect,
  resetChangePasswordStatus,
  clearChangePasswordError,
  clearChangePasswordSuccessMessage,
  changePasswordAsync
} from '@/app/authSlice'
import { updatePasswordSchema } from '@/config/schemaValidation'

const ChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(loggedInUserSelect)
  const changePassword = useSelector(changePasswordSelect)
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: ''
    }
  })

  useEffect(() => {
    if (changePassword.status === 'fulfilled') {
      toast.success(changePassword.successMessage)

      // Cleanup
      dispatch(resetChangePasswordStatus())
      dispatch(clearChangePasswordError())
      dispatch(clearChangePasswordSuccessMessage())
    } else if (changePassword.status === 'rejected') {
      navigate('/')
      toast.error(changePassword.error)

      // Cleanup
      dispatch(resetChangePasswordStatus())
      dispatch(clearChangePasswordError())
      dispatch(clearChangePasswordSuccessMessage())
    }
  }, [changePassword, loggedInUser, dispatch, navigate])

  const onSubmit = (data) => {
    dispatch(changePasswordAsync(data))
  }
  return (
    <div className='relative z-10 mt-40 flex items-center justify-center'>
      <Card className='max-w-sm sm:w-96'>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder='Enter Current Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder='Enter New Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {changePassword?.status === 'pending' ? (
                <div className='flex items-center justify-center'>
                  <Spinner size='small' className='text-black'>
                    <span className='text-md text-black'>Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Button type={'submit'} className={'w-full'}>
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChangePassword
