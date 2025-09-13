import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loggedInUserSelect } from '@/app/authSlice'

const Protected = ({ children }) => {
  const loggedInUser = useSelector(loggedInUserSelect)
  console.log("Hiiiii --- ", loggedInUser);
  

  if (loggedInUser?.isVerified) {
    return children
  }
  return <Navigate to={'/signin'} replace={true} />
}

export default Protected
