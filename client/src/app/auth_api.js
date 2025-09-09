import axiosInstance from '@/config/axios'

const signupApi = async (data) => {
  try {
    const res = await axiosInstance.post('api/v1/user/signup', data)
    return res.data
  } catch (error) {
    throw error.message
  }
}

const loginApi = async (data) => {
  try {
    const res = await axiosInstance.post('api/v1/user/login', data)
    return res.data
  } catch (error) {
    throw error.message
  }
}

const verifyOtpApi = async (data) => {
  try {
    const res = await axiosInstance.post('api/v1/user/verify-otp', data)
    return res.data
  } catch (error) {
    throw error.message
  }
}

const resendOtpApi = async (data) => {
  try {
    const res = await axiosInstance.post('api/v1/user/resend-otp', data)
    return res.data
  } catch (error) {
    throw error.message
  }
}

const forgotPasswordApi = async (data) => {
  try {
    const res = await axiosInstance.post('api/v1/user/forgot-password', data)
    return res.data
  } catch (error) {
    throw error.message
  }
}

const resetPasswordApi = async (data) => {
  try {
    const res = await axiosInstance.post('api/v1/user/reset-password', data)
    return res.data
  } catch (error) {
    throw error.message
  }
}

const checkAuthApi = async () => {
  try {
    const res = await axiosInstance.get('api/v1/user/getme')
    return res.data
  } catch (error) {
    throw error.message
  }
}

const refreshAccessTokenApi = async () => {
  try {
    const res = await axiosInstance.get('api/v1/user/refresh-token')
    return res.data
  } catch (error) {
    throw error.message
  }
}

const logoutApi = async () => {
  try {
    const res = await axiosInstance.get('api/v1/user/logout')
  } catch (error) {
    throw error.message
  }
}

export {
  signupApi,
  loginApi,
  verifyOtpApi,
  resendOtpApi,
  forgotPasswordApi,
  resetPasswordApi,
  checkAuthApi,
  refreshAccessTokenApi,
  logoutApi
}
