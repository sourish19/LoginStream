import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  sendEmailVerificationOTP,
  verifyEmailVerificationOTP,
  getMe,
  sendOTPforForgotPassword,
  verifyOTPforForgotPassword,
  refreshAccessToken,
  changeCurrentPassword,
} from '../controllers/auth.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.middleware.js';
import isVerified from '../middlewares/isVerified.middleware.js';
import {
  signupValidation,
  loginValidation,
  OTPValidation,
  validOTPValidation,
  changePasswordValidation,
} from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', signupValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/send-otp', OTPValidation, sendEmailVerificationOTP);
router.post('/verify-otp', validOTPValidation, verifyEmailVerificationOTP);
router.post(
  '/forgotPassword/send-otp',
  OTPValidation,
  sendOTPforForgotPassword
);
router.post(
  '/forgotPassword/verify-otp',
  OTPValidation,
  verifyOTPforForgotPassword
); //

router.post('/logout', isLoggedIn, isVerified, logoutUser);
router.post(
  '/change-password',
  isLoggedIn,
  changePasswordValidation,
  isVerified,
  changeCurrentPassword
);

router.get('/getme', isLoggedIn, isVerified, getMe);
router.get('/refresh-access-token', refreshAccessToken);

export default router;
