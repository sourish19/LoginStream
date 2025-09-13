import axiosInstance from '@/config/axios'
import parseError from '@/config/parseError'

const signupApi = async (data) => {
  try {
    const res = await axiosInstance.post('/api/v1/auth/register', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const loginApi = async (data) => {
  try {
    const res = await axiosInstance.post('/api/v1/auth/login', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const verifyOtpApi = async (data) => {
  try {
    const res = await axiosInstance.post('/api/v1/auth/verify-otp', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const sendOtpApi = async (data) => {
  try {
    const res = await axiosInstance.post('/api/v1/auth/send-otp', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const forgotPasswordApi = async (data) => {
  try {
    const res = await axiosInstance.post('/api/v1/auth/forgot-password', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const resetPasswordApi = async (data) => {
  try {
    const res = await axiosInstance.post('/api/v1/user/reset-password', data)
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const checkAuthApi = async () => {
  try {
    const res = await axiosInstance.get('/api/v1/auth/getme')
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const refreshAccessTokenApi = async () => {
  try {
    const res = await axiosInstance.get('/api/v1/auth/refresh-token')
    return res.data
  } catch (error) {
    throw parseError(error)
  }
}

const logoutApi = async () => {
  try {
    const res = await axiosInstance.get('/api/v1/auth/logout')
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
  checkAuthApi,
  refreshAccessTokenApi,
  logoutApi
}
