import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='relative z-50 mx-auto flex justify-center'>
      <div className='font-poppins fixed flex h-16 w-80 items-center justify-around rounded-2xl bg-slate-100 px-3 text-neutral-900 shadow-inner shadow-gray-500/80 sm:w-96 md:w-5/12'>
        {' '}
        <div className='flex flex-1 items-center'>
          <img className='h-10 w-10' src='/Logo.png' alt='Logo' />
          <span className='text-2xl font-semibold tracking-tight text-slate-900'>LoginStream</span>
        </div>
        <div className='flex justify-center'>
          <span className='flex cursor-pointer items-center justify-center text-center'>
            {' '}
            <Link to='https://github.com/sourish19' target='_blank'>
              <Github />
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
