import { publicAxiosInstance, privateAxiosInstance } from '@/config/axios'
import parseError from '@/config/parseError'

const signupApi = async (data) => {
  try {
    const res = await publicAxiosInstance.post('/api/v1/auth/register', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const loginApi = async (data) => {
  try {
    const res = await publicAxiosInstance.post('/api/v1/auth/login', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const verifyOtpApi = async (data) => {
  try {
    const res = await publicAxiosInstance.post('/api/v1/auth/verify-otp', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const sendOtpApi = async (data) => {
  try {
    const res = await publicAxiosInstance.post('/api/v1/auth/send-otp', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const forgotPasswordApi = async (data) => {
  try {
    const res = await publicAxiosInstance.post('/api/v1/auth/forgot-password', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const resetPasswordApi = async (data) => {
  try {
    const res = await publicAxiosInstance.post('/api/v1/user/reset-password', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const changePasswordApi = async (data) => {
  try {
    const res = await privateAxiosInstance.post('/api/v1/auth/change-password', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const checkAuthApi = async () => {
  try {
    const res = await privateAxiosInstance.get('/api/v1/auth/getme')
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const refreshAccessTokenApi = async () => {
  try {
    const res = await publicAxiosInstance.get('/api/v1/auth/refresh-access-token')
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const logoutApi = async () => {
  try {
    const res = await privateAxiosInstance.post('/api/v1/auth/logout')
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

export {
  signupApi,
  loginApi,
  verifyOtpApi,
  sendOtpApi,
  forgotPasswordApi,
  resetPasswordApi,
  changePasswordApi,
  checkAuthApi,
  refreshAccessTokenApi,
  logoutApi
}
