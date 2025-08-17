import React from 'react'
import { Routes, Route } from 'react-router-dom'

import DashboardLayout from '@/layouts/DashboardLayout'

import Home from '@/pages/Home'
import Signin from '@/pages/Signin'
import Signup from '@/pages/Signup'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import VerifyEmail from '@/pages/VerifyEmail'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route
        path='/'
        element={
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        }
      />
    </Routes>
  )
}

export default AppRoutes
