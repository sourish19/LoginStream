import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useNavigate } from 'react-router-dom'
import { loggedInUserSelect } from '@/app/authSlice'

const SendOtp = () => {
  const navigate = useNavigate()
  const loggedInUser = useSelector(loggedInUserSelect)

  // useEffect(() => {
  //   if (loggedInUser && loggedInUser.isVerified) {
  //     navigate('/')
  //   } else if (!loggedInUser) {
  //     navigate('/signin')
  //   }
  // }, [loggedInUser])

  const handleClick = ()=>{
    
  }

  return (
    <div className='relative z-10 flex h-screen items-center justify-center'>
      {loggedInUser ? (
        <div className='flex items-center gap-4'>
          <Spinner size='large' className='text-red-400'>
            <span className='text-xl text-red-400'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className='w-full max-w-md rounded-lg bg-neutral-100 p-6 shadow-lg'>
          <h2 className='text-lg font-semibold text-neutral-900'>Send OTP</h2>
          <p className='mt-2 text-sm text-neutral-900'>
            We will send a one-time password (OTP) to your registered email/phone number. Please confirm to proceed.
          </p>
          <div className='mt-4 flex justify-end space-x-3'>
            <Button variant={'default'} className={'bg-white text-black hover:text-black hover:bg-white cursor-pointer'} >
              Cancel
            </Button>
            <Button variant={'default'} className={'cursor-pointer'} 
            onClick = {handleClick}
            >Send OTP</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SendOtp
