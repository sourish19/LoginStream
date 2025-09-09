import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
  error: null,
  message: null,
  signupStatus: 'idle',
  signupSuccessMessage: null,
  signupError: null,
  loginStatus: 'idle',
  loginSuccessMessage: null,
  loginError: null,
  loggedInUser: null,
  otpVerificationStatus: 'idle',
  otpVerificationSuccessMessage: null,
  otpVerificationError: null,
  resendOtpStatus: 'idle',
  resendOtpSuccessMessage: null,
  resendOtp: null,
  forgotPasswordStatus: 'idle',
  forgotPasswordSuccessMessage: null,
  forgotPasswordError: null,
  resetPasswordStatus: 'idle',
  resetPasswordSuccessMessage: null,
  resetPasswordError: null,
  logoutStatus: 'idle',
  logoutSuccessMessage: null,
  logoutError: null,
  isAuthChecked: false
}

//  Define all the Reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.status = 'idle'
    },
    clearAuthSuccessMessage: (state) => {
      state.message = null
    },
    clearAuthError: (state) => {
      state.error = null
    },
    clearSignupStatus: (state) => {
      state.signupStatus = 'idle'
    },
    clearSignupSuccessMessage: (state) => {
      state.signupSuccessMessage = null
    },
    clearSignupError: (state) => {
      state.signupError = null
    },
    resetLoginStatus: (state) => {
      state.loginStatus = 'idle'
    },
    clearLoginSuccessMessage: (state) => {
      state.loginSuccessMessage = null
    },
    clearLoginError: (state) => {
      state.loginError = null
    },
    resetOtpVerificationStatus: (state) => {
      state.otpVerificationStatus = 'idle'
    },
    clearOtpVerificationSuccessMessage: (state) => {
      state.otpVerificationSuccessMessage = null
    },
    clearOtpVerificationError: (state) => {
      state.otpVerificationError = null
    },
    resetResetPasswordStatus: (state) => {
      state.resetPasswordStatus = 'idle'
    },
    clearResetPasswordSuccessMessage: (state) => {
      state.resetPasswordSuccessMessage = null
    },
    clearResetPasswordError: (state) => {
      state.resetPasswordError = null
    },
    resetLogoutStatus: (state) => {
      state.logoutStatus = 'idle'
    },
    clearLogoutSuccessMessage: (state) => {
      state.logoutSuccessMessage = null
    },
    clearLogoutError: (state) => {
      state.logoutError = null
    },
    resetResendOtpStatus: (state) => {
      state.resendOtpStatus = 'idle'
    },
    clearResendOtpSuccessMessage: (state) => {
      state.resendOtpSuccessMessage = null
    },
    clearResendOtpError: (state) => {
      state.resendOtpError = null
    },
    resetForgotPasswordStatus: (state) => {
      state.forgotPasswordStatus = 'idle'
    },
    clearForgotPasswordSuccessMessage: (state) => {
      state.forgotPasswordSuccessMessage = null
    },
    clearForgotPasswordError: (state) => {
      state.forgotPasswordError = null
    }
  }
})
