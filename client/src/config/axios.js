import { refreshAccessTokenApi } from '@/app/auth_api'
import axios from 'axios'
import Cookies from 'js-cookie'

export const publicAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export const privateAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Send Token in header for every private route request
privateAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken')
    console.log('ACCESS TOKEN - ', accessToken);
    config.headers.Authorization = `Bearer ${accessToken || ''}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

privateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    console.log(error.response.data.error.code)
    console.log(error.response.status === 41)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      ['TOKEN_EXPIRED', 'TOKEN_NOT_ACTIVE', 'INVALID_TOKEN'].includes(error.response.data?.error?.code)
    ) {
      console.log('hiii')
      originalRequest._retry = true
      try {
        if (originalRequest.url?.includes('/refresh-access-token')) {
          return Promise.reject(error)
        }

        const res = await refreshAccessTokenApi()

        return privateAxiosInstance(originalRequest)
      } catch (error) {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        window.location.href = '/signin'
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)
