import React from 'react'
import { Routes, Route } from 'react-router-dom'

import DashboardLayout from '@/layouts/DashboardLayout'
import AuthLayout from '@/layouts/AuthLayout'

import {
  Home,
  Protected,
  Signup,
  Signin,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  SendOtp,
  OtpVerify
} from '../pages'

const AppRoutes = () => {
  // const authCheck =

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Protected>
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          </Protected>
        }
      />
      <Route
        path='/signup'
        element={
          <AuthLayout>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path='/signin'
        element={
          <AuthLayout>
            <Signin />
          </AuthLayout>
        }
      />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/change-password' element={<ChangePassword />} />
      <Route
        path='/send-otp'
        element={
          <AuthLayout>
            <SendOtp />
          </AuthLayout>
        }
      />
      <Route
        path='/verify-otp'
        element={
          <AuthLayout>
            <OtpVerify />
          </AuthLayout>
        }
      />
    </Routes>
  )
}

export default AppRoutes
