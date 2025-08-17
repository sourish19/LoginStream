import React from 'react'
import Cotainer from '@/components/Container'
import { KeyRound, Mail, LogOut } from 'lucide-react'

const Home = () => {
  return (
    <div className='text-white h-screen w-full relative z-1 flex flex-col'>
      <div className='text-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-1 sm:mb-3'>
          <span className='font-medium  transition-all duration-300'>Welcome User</span>
        </h1>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-center'>
          <span className='bg-gradient-to-r bg-[200%_auto] bg-clip-text leading-tight text-transparent transition-all duration-300 from-neutral-100 via-slate-400 to-neutral-400'>
            You are securely logged in with <span className='border-b-3 border-blue-400 pb-1'>LoginStream</span>
          </span>
        </h2>
      </div>
      <div className='flex flex-wrap flex-col sm:flex-row md:flex-row mt-10 gap-5 mx-auto'>
        {' '}
        <Cotainer
          title='Reset Password'
          description='Securely update your account password.'
          Component={<KeyRound />}
        />{' '}
        <Cotainer
          title='Verify Email'
          description='Confirm your email to activate your account.'
          Component={<Mail />}
        />{' '}
        <Cotainer title='Logout' description='Sign out from your account safely.' Component={<LogOut />} />{' '}
      </div>
    </div>
  )
}

export default Home
