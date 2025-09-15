import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthAsync } from '@/app/authSlice'

const useAuthCheck = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])
}

export default useAuthCheck
