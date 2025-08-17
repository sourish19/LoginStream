import React from 'react'

const DashboardLayout = ({ children }) => {
  return (
    <div className='min-h-screen w-full bg-[#0f0f0f] relative text-white flex py-10'>
      <div
        className='absolute inset-0 z-0 flex '
        style={{
          backgroundImage: `
        linear-gradient(to right, #262626 1px, transparent 1px),
        linear-gradient(to bottom, #262626 1px, transparent 1px)
      `,
          backgroundSize: '20px 20px'
        }}
      />
      {children}
    </div>
  )
}

export default DashboardLayout
