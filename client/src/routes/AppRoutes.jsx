import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spinner } from '@/components/ui/spinner'

const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'))
const Home = lazy(() => import('../pages/Home'))

import { Protected, Signup, Signin, ForgotPassword, ResetPassword, ChangePassword, SendOtp, OtpVerify } from '../pages'
import { isAuthCheckedSelect, loggedInUserSelect } from '@/app/authSlice'
import useAuthCheck from '@/hooks/useAuthCheck'

const AppRoutes = () => {
  const loggedInUser = useSelector(loggedInUserSelect)
  const authCheck = useSelector(isAuthCheckedSelect)

  useAuthCheck()

  return (
    <Suspense
      fallback={
        <div className={'relative z-10 flex h-screen items-center justify-center'}>
          <div className='flex items-center justify-center'>
            <Spinner size='small' className='text-black'>
              <span className='text-md text-black'>Loading...</span>
            </Spinner>
          </div>
        </div>
      }
    >
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
    </Suspense>
  )
}

export default AppRoutes
