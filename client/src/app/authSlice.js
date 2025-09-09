import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  signupApi,
  loginApi,
  verifyOtpApi,
  resendOtpApi,
  forgotPasswordApi,
  resetPasswordApi,
  checkAuthApi,
  refreshAccessTokenApi,
  logoutApi
} from './auth_api'

const requestState = {
  status: 'idle',
  successMessage: null,
  error: null
}

const initialState = {
  global: { ...requestState },
  signup: { ...requestState },
  login: { ...requestState },
  otpVerification: { ...requestState },
  resendOtp: { ...requestState },
  forgotPassword: { ...requestState },
  resetPassword: { ...requestState },
  logout: { ...requestState },
  loggedInUser: null,
  isAuthChecked: false
}

// Handles all the async actions and their status -- generates three actions pending,fulfulled and rejected
export const signupAsync = createAsyncThunk('auth/signupAsync', async (data) => {
  const res = await signupApi(data)
  return res
})

export const loginAsync = createAsyncThunk('auth/loginAsync', async (data) => {
  const res = await loginApi(data)
  return res
})

export const verifyOtpAsync = createAsyncThunk('auth/verifyOtpAsync', async (data) => {
  const res = await verifyOtpApi(data)
  return res
})

export const resendOtpAsync = createAsyncThunk('auth/resendOtpAsync', async (data) => {
  const res = await resendOtpApi(data)
  return res
})

export const forgotPasswordAsync = createAsyncThunk('auth/forgotPasswordAsync', async (data) => {
  const res = await forgotPasswordApi(data)
  return res
})

export const resetPasswordAsync = createAsyncThunk('auth/resetPasswordAsync', async (data) => {
  const res = await resetPasswordApi(data)
  return res
})

export const checkAuthAsync = createAsyncThunk('auth/checkAuthAsync', async () => {
  const res = await checkAuthApi()
  return res
})

export const refreshAccessTokenAsync = createAsyncThunk('auth/refreshAccessTokenAsync', async () => {
  const res = await refreshAccessTokenApi()
  return res
})

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  const res = await logoutApi()
  return res
})

//  Define all the Reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.global.status = 'idle'
    },
    clearAuthSuccessMessage: (state) => {
      state.global.successMessage = null
    },
    clearAuthError: (state) => {
      state.global.error = null
    },
    clearSignupStatus: (state) => {
      state.signup.status = 'idle'
    },
    clearSignupSuccessMessage: (state) => {
      state.signup.successMessage = null
    },
    clearSignupError: (state) => {
      state.signup.error = null
    },
    resetLoginStatus: (state) => {
      state.login.status = 'idle'
    },
    clearLoginSuccessMessage: (state) => {
      state.login.successMessage = null
    },
    clearLoginError: (state) => {
      state.login.error = null
    },
    resetOtpVerificationStatus: (state) => {
      state.otpVerification.status = 'idle'
    },
    clearOtpVerificationSuccessMessage: (state) => {
      state.otpVerification.successMessage = null
    },
    clearOtpVerificationError: (state) => {
      state.otpVerification.error = null
    },
    resetResetPasswordStatus: (state) => {
      state.resetPassword.status = 'idle'
    },
    clearResetPasswordSuccessMessage: (state) => {
      state.resetPassword.successMessage = null
    },
    clearResetPasswordError: (state) => {
      state.resetPassword.error = null
    },
    resetLogoutStatus: (state) => {
      state.logout.status = 'idle'
    },
    clearLogoutSuccessMessage: (state) => {
      state.logout.successMessage = null
    },
    clearLogoutError: (state) => {
      state.logout.error = null
    },
    resetResendOtpStatus: (state) => {
      state.resendOtp.status = 'idle'
    },
    clearResendOtpSuccessMessage: (state) => {
      state.resendOtp.successMessage = null
    },
    clearResendOtpError: (state) => {
      state.resendOtp.error = null
    },
    resetForgotPasswordStatus: (state) => {
      state.forgotPassword.status = 'idle'
    },
    clearForgotPasswordSuccessMessage: (state) => {
      state.forgotPassword.successMessage = null
    },
    clearForgotPasswordError: (state) => {
      state.forgotPassword.error = null
    }
  },
  // Used to handle async actions & to update the state
  extraReducers: (builder) => {
    builder
    // Signup
      .addCase(signupAsync.pending, (state) => {
        state.signup.status = 'pending'
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.signup.status = 'fulfilled'
        state.signup.successMessage = action.payload?.message
        state.loggedInUser = action.payload?.user
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.signup.status = 'rejected'
        state.signup.error = action.error?.message || 'Signup failed'
      })

      // Login
      .addCase(loginAsync.pending, (state) => {
        state.login.status = 'pending'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.login.status = 'fulfilled'
        state.login.successMessage = action.payload?.message
        state.loggedInUser = action.payload?.user 
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.login.status = 'rejected'
        state.login.error = action.error?.message || 'Login failed'
      })

      // Verify OTP
      .addCase(verifyOtpAsync.pending, (state) => {
        state.otpVerification.status = 'pending'
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.otpVerification.status = 'fulfilled'
        state.otpVerification.successMessage = action.payload?.message || 'OTP verified'
        state.loggedInUser = action.payload?.user
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.otpVerification.status = 'rejected'
        state.otpVerification.error = action.error?.message || 'OTP verification failed'
      })

      // Resend OTP
      .addCase(resendOtpAsync.pending, (state) => {
        state.resendOtp.status = 'pending'
      })
      .addCase(resendOtpAsync.fulfilled, (state, action) => {
        state.resendOtp.status = 'fulfilled'
        state.resendOtp.successMessage = action.payload?.message || 'OTP resent successfully' 
      })
      .addCase(resendOtpAsync.rejected, (state, action) => {
        state.resendOtp.status = 'rejected'
        state.resendOtp.error = action.error?.message || 'Resend OTP failed'
      })

      // Forgot Password
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.forgotPassword.status = 'pending'
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.forgotPassword.status = 'fulfilled'
        state.forgotPassword.successMessage = action.payload?.message || 'Reset link sent'
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.forgotPassword.status = 'rejected'
        state.forgotPassword.error = action.error?.message || 'Forgot password failed'
      })

      // Reset Password
      .addCase(resetPasswordAsync.pending, (state) => {
        state.resetPassword.status = 'pending'
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.resetPassword.status = 'fulfilled'
        state.resetPassword.successMessage = action.payload?.message || 'Password reset successfully'
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.resetPassword.status = 'rejected'
        state.resetPassword.error = action.error?.message || 'Reset password failed'
      })

      // Logout
      .addCase(logoutAsync.pending, (state) => {
        state.logout.status = 'pending'
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.logout.status = 'fulfilled'
        state.logout.successMessage = action.payload?.message || 'Logged out successfully'
        state.loggedInUser = null // ✅ clear user
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.logout.status = 'rejected'
        state.logout.error = action.error?.message || 'Logout failed'
      })

      // Check Auth
      .addCase(checkAuthAsync.pending, (state) => {
        state.global.status = 'pending'
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.global.status = 'fulfilled'
        state.loggedInUser = action.payload?.user || null
        state.isAuthChecked = true
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.global.status = 'rejected'
        state.global.error = action.error?.message || 'Auth check failed'
        state.isAuthChecked = true
      })

      // Refresh Access Token
      .addCase(refreshAccessTokenAsync.pending, (state) => {
        state.global.status = 'pending'
      })
      .addCase(refreshAccessTokenAsync.fulfilled, (state, action) => {
        state.global.status = 'fulfilled'
        state.loggedInUser = action.payload?.user || state.loggedInUser
      })
      .addCase(refreshAccessTokenAsync.rejected, (state, action) => {
        state.global.status = 'rejected'
        state.global.error = action.error?.message || 'Token refresh failed'
      })
  }
})

// Export all the Actions
export const {
  resetAuthStatus,
  clearAuthSuccessMessage,
  clearAuthError,
  resetLoginStatus,
  clearLoginSuccessMessage,
  clearLoginError,
  resetOtpVerificationStatus,
  clearOtpVerificationSuccessMessage,
  clearOtpVerificationError,
  resetResetPasswordStatus,
  clearResetPasswordSuccessMessage,
  clearResetPasswordError,
  resetLogoutStatus,
  clearLogoutSuccessMessage,
  clearLogoutError,
  resetResendOtpStatus,
  clearResendOtpSuccessMessage,
  clearResendOtpError,
  resetForgotPasswordStatus,
  clearForgotPasswordSuccessMessage,
  clearForgotPasswordError,
  resetSignupStatus,
  clearSignupSuccessMessage,
  clearSignupError
} = authSlice.actions

//  Export the Reducers
export default authSlice.reducer
