import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  sendOTP,
  verifyOTP,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/send-otp', sendOTP);
router.patch('/verify-otp', verifyOTP);
router.patch('/logout', logoutUser);

export default router;
