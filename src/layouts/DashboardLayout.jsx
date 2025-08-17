import React from 'react'
import Navbar from '../components/Navbar'

const DashboardLayout = ({ children }) => {
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
      <Navbar />
      {children}
    </div>
  )
}

export default DashboardLayout
