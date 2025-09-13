import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  sendOTP,
  verifyOTP,
  getMe,
  resendOTP,
} from '../controllers/auth.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.middleware.js';
import isVerified from '../middlewares/isVerified.middleware.js';
import {
  signupValidation,
  loginValidation,
  OTPValidation,
} from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', signupValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/send-otp', OTPValidation, sendOTP);
router.post('/resend-otp', OTPValidation, resendOTP);
router.post('/verify-otp', OTPValidation, verifyOTP);
router.post('/logout', isLoggedIn, isVerified, logoutUser);
router.get('/getme', isLoggedIn, isVerified, getMe);

export default router;
