import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spinner } from '@/components/ui/spinner'

import DashboardLayout from '@/layouts/DashboardLayout'
import AuthLayout from '@/layouts/AuthLayout'
import {
  Protected,
  Signup,
  Signin,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  SendOtp,
  OtpVerify,
  Home
} from '../pages'
import { isAuthCheckedSelect, loggedInUserSelect } from '@/app/authSlice'
import useAuthCheck from '@/hooks/useAuthCheck'

const AppRoutes = () => {
  const loggedInUser = useSelector(loggedInUserSelect)
  const authCheck = useSelector(isAuthCheckedSelect)

  useAuthCheck()

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Protected loggedInUser={loggedInUser} isAuthChecked={authCheck}>
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          </Protected>
        }
      />
      <Route
        path='/change-password'
        element={
          <Protected loggedInUser={loggedInUser} isAuthChecked={authCheck}>
            <DashboardLayout>
              <ChangePassword />
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
      <Route
        path='/forgot-password'
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path='/reset-password'
        element={
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        }
      />
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
