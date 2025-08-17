import { Github } from 'lucide-react'

export default function Header() {
  return (
    <div className='relative z-10 mx-auto flex justify-center'>
      <div className='navbar font-poppins fixed h-16 w-80 rounded-2xl bg-slate-100 text-neutral-900 shadow-sm sm:w-96 md:w-5/12'>
        {' '}
        <div className='flex flex-1 items-center'>
          <img className='h-10 w-10' src='/Logo.png' alt='' />
          <span className='text-2xl font-semibold tracking-tight text-slate-900'>LoginStream</span>
        </div>
        <div className='flex-none'>
          <span className='cursor-pointer'>
            {' '}
            <a href='https://github.com/sourish19' target='blank'>
              <Github />
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
