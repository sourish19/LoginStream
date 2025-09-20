import axios from 'axios'
import Cookies from 'js-cookie'
import { refreshAccessTokenApi } from '@/app/auth_api'

const isProd = import.meta.env.MODE === "production" // Vite automatically injects a built-in variable

export const publicAxiosInstance = axios.create({
  baseURL: isProd ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_DEV_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export const privateAxiosInstance = axios.create({
  baseURL: isProd ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_DEV_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Send Token in header for every private route request
privateAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken')
    config.headers.Authorization = `Bearer ${accessToken || ''}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Every response is passed through this function, it is mainly used for 401 access-refresh token
privateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Axios request failed object
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      ['TOKEN_EXPIRED', 'TOKEN_NOT_ACTIVE', 'INVALID_TOKEN'].includes(error.response.data?.error?.code) // JWT expected error
    ) {
      // Retry the request prevent from infinite loop
      originalRequest._retry = true

      try {
        // dont refresh during in this route
        if (originalRequest.url?.includes('/refresh-access-token')) {
          return Promise.reject(error)
        }

        const res = await refreshAccessTokenApi()

        // Call the previous request with the new access token
        return privateAxiosInstance(originalRequest)
      } catch (error) {
        // If error means there is no refresh token, redirect to login
        window.location.href = '/signin'
        return Promise.reject(error)
      }
    }
    // Any other error not related to 401
    return Promise.reject(error)
  }
)
