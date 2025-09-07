import crypto from 'crypto';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import ApiError from './apiError.util';
import logger from '../logger/winston.logger.js';

export const generateEmailVerificationOTP = () => {
  const unhashedOtp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const hashedOtp = bcrypt.hash(otp, 10);
  const otpExpiry = 1000 * 60 * 5; // 5min
  return { unhashedOtp, hashedOtp, otpExpiry };
};

export const generateHashedPassword = async (password) => {
  logger.info(`password in generateHashedPassword fn ${password}`);
  if (!password) return null;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    logger.error(`${error.message}`);
    throw new ApiError(500, 'Internal Server Error', error);
  }
};
