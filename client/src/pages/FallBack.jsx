import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FallBack = ({ error, resetErrorBoundary }) => {
  return (
    <div className='relative flex min-h-screen w-full flex-col bg-[#0f0f0f] text-white'>
      {/* Background grid pattern */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `
            linear-gradient(to right, #262626 1px, transparent 1px),
            linear-gradient(to bottom, #262626 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Error content */}
      <div className='relative z-10 flex flex-1 items-center justify-center p-6'>
        <div className='w-full max-w-md rounded-2xl border border-red-500/20 bg-red-950/20 p-8 text-center backdrop-blur-sm'>
          <div className='mb-4 flex justify-center'>
            <AlertTriangle className='h-16 w-16 text-red-400' />
          </div>

          <h2 className='mb-2 text-2xl font-semibold text-red-400'>Oops! Something went wrong</h2>

          <p className='mb-6 text-gray-300'>
            We encountered an unexpected error. Don't worry, we're working to fix it.
          </p>

          {process.env.NODE_ENV === 'development' && error?.message && (
            <div className='mb-6 rounded-lg bg-gray-800/50 p-3 text-left'>
              <p className='font-mono text-sm text-red-300'>{error.message}</p>
            </div>
          )}

          <Button onClick={resetErrorBoundary} className='w-full bg-red-600 hover:bg-red-700'>
            <RefreshCw className='mr-2 h-4 w-4' />
            Try Again
          </Button>

          <p className='mt-4 text-xs text-gray-400'>If the problem persists, please contact support</p>
        </div>
      </div>
    </div>
  )
}

export default FallBack
