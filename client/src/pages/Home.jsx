import React from 'react'
import Cotainer from '@/components/Container'
import { KeyRound, Mail, LogOut } from 'lucide-react'
import Wave from '../assets/wave.png'

const Home = () => {
  return (
    <div className='relative z-1 mt-40 flex h-screen w-full flex-col text-white'>
      <div className='text-center'>
        <h1 className='mb-1 text-3xl font-bold tracking-tight sm:mb-3 sm:text-4xl md:text-5xl lg:text-6xl'>
          <span className='flex items-center justify-center gap-4 font-medium transition-all duration-300'>
            Welcome! User <img className='h-15 w-15' src={Wave} alt='' />
          </span>
        </h1>
        <h2 className='text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-4xl'>
          <span className='bg-gradient-to-r from-neutral-100 via-slate-400 to-neutral-400 bg-[200%_auto] bg-clip-text leading-tight text-transparent transition-all duration-300'>
            You are securely logged in with LoginStream
          </span>
        </h2>
      </div>
      <div className='mx-auto mt-10 flex flex-col flex-wrap gap-5 sm:flex-row md:flex-row'>
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
