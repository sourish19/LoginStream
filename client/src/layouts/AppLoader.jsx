import { Spinner } from '@/components/ui/spinner'

const AppLoader = () => {
  return (
    <div className='relative flex h-screen w-full flex-col bg-[#0f0f0f] py-10 text-white'>
      <div
        className='absolute inset-0 z-0 flex'
        style={{
          backgroundImage: `
        linear-gradient(to right, #262626 1px, transparent 1px),
        linear-gradient(to bottom, #262626 1px, transparent 1px)
      `,
          backgroundSize: '20px 20px'
        }}
      />
      <div className='relative z-10 mt-40 flex items-center justify-center'>
        <div className='flex items-center justify-center'>
          <Spinner size='large' className='text-3xl text-neutral-50'>
            <span className='text-2xl text-neutral-50'>Loading...</span>
          </Spinner>
        </div>
      </div>
    </div>
  )
}

export default AppLoader
