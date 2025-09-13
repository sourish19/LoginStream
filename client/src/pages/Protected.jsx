import { Navigate } from 'react-router-dom'
import AppLoader from '@/layouts/AppLoader'

const Protected = ({ children, loggedInUser, isAuthChecked }) => {
  if (!isAuthChecked) {
    return <AppLoader />
  }
  if (isAuthChecked && loggedInUser?.isVerified) {
    return children
  }
  return <Navigate to={'/signin'} replace={true} />
}

export default Protected
