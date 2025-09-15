import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthAsync } from '@/app/authSlice'
import { isAuthCheckedSelect } from '@/app/authSlice'

const useAuthCheck = () => {
  const dispatch = useDispatch()
  const isAuthChecked = useSelector(isAuthCheckedSelect)

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch, isAuthChecked])
}

export default useAuthCheck
