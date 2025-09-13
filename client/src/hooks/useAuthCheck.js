import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuthAsync } from '@/app/authSlice'

const useAuthCheck = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])
}

export default useAuthCheck
