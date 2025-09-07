import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from './apiError.util.js';
import logger from '../logger/winston.logger.js';
import { JWT_CONSTANTS } from './constants.util.js';

export const generateEmailVerificationOTP = async () => {
  const unhashedOtp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const hashedOtp = await bcrypt.hash(unhashedOtp, 10);
  const otpExpiry =  Date.now() + 1000 * 60 * 5 // 5min
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

export const comparePassword = async (oldPassword, hashedPassword) => {
  return await bcrypt.compare(oldPassword, hashedPassword);
};

export const generateRefreshAccessToken = async (userId,userEmail)=>{
  const accessToken = jwt.sign({userId},JWT_CONSTANTS.accessTokenSecret,{expiresIn:JWT_CONSTANTS.accessTokenExpiry})
  const refreshToken = jwt.sign({userEmail,userId},JWT_CONSTANTS.refreshTokenSecret,{expiresIn:JWT_CONSTANTS.refreshTokenExpiry})
  const hashedRefreshToken = await bcrypt.hash(refreshToken,10)
  return {accessToken,refreshToken,hashedRefreshToken}
}