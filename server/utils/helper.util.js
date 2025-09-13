import otpGenerator from 'otp-generator';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from './apiError.util.js';
import logger from '../logger/winston.logger.js';
import { JWT_CONSTANTS } from './constants.util.js';

/**
 * Generate a random token and its hashed version
 * @async
 * @function generateRandomToken
 * @returns {Promise<Object>} Object containing token and hashedToken
 */
export const generateRandomToken = async () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(token, 10);
  return { token, hashedToken };
};

/**
 * Generate email verification OTP with hash and expiry
 * @async
 * @function generateEmailVerificationOTP
 * @returns {Promise<Object>} Object containing unhashedOtp, hashedOtp, and otpExpiry
 */
export const generateOtp = async () => {
  const unhashedOtp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const hashedOtp = await bcrypt.hash(unhashedOtp, 10);
  const otpExpiry = new Date(Date.now() + 1000 * 60 * 5); // 5min
  return { unhashedOtp, hashedOtp, otpExpiry };
};

/**
 * Generate hashed password using bcrypt
 * @async
 * @function generateHashedPassword
 * @param {string} password - Plain text password
 * @returns {Promise<string|null>} Hashed password or null if invalid input
 */
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

/**
 * Compare unhashed token with hashed token
 * @async
 * @function compareHash
 * @param {string} unhashedToken - Plain text token
 * @param {string} hashedToken - Hashed token to compare against
 * @returns {Promise<boolean>} True if tokens match, false otherwise
 */
export const compareHash = async (unhashedToken, hashedToken) => {
  return await bcrypt.compare(unhashedToken, hashedToken);
};

/**
 * Generate access and refresh tokens using JWT
 * @async
 * @function generateRefreshAccessToken
 * @param {string} userId - User ID
 * @param {number} tokenVersion - Token version for refresh token
 * @returns {Promise<Object>} Object containing accessToken and refreshToken
 */
export const generateRefreshAccessToken = (userId, tokenVersion) => {
  const accessToken = jwt.sign({ userId }, JWT_CONSTANTS.accessTokenSecret, {
    expiresIn: JWT_CONSTANTS.accessTokenExpiry,
  });
  const refreshToken = jwt.sign(
    { tokenVersion, userId },
    JWT_CONSTANTS.refreshTokenSecret,
    { expiresIn: JWT_CONSTANTS.refreshTokenExpiry }
  );
  return { accessToken, refreshToken };
};

export const decodeJwtToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    logger.warn(error.message);
    return null;
  }
};
