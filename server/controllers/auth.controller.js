import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.util.js';
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';
import {
  generateOtp,
  generateHashedPassword,
  compareHash,
  generateRefreshAccessToken,
  decodeJwtToken,
  generateRandomToken,
} from '../utils/helper.util.js';
import logger from '../logger/winston.logger.js';
import {
  sendEmail,
  emailVerificationMailgenContent,
  resetPasswordMailgenContent,
} from '../utils/mail.util.js';
import { cookieOptions, JWT_CONSTANTS } from '../utils/constants.util.js';
import sanitizeUser from '../utils/sanitizeUser.js';

const prisma = new PrismaClient();

const handleSendOTP = async (user, type, subject, template) => {
  let updateUser;
  const { unhashedOtp, hashedOtp, otpExpiry } = await generateOtp();

  try {
    if (type === 'emailVerification') {
      updateUser = await prisma.user.update({
        where: {
          email: user?.email,
        },
        data: {
          emailVerificationOtp: hashedOtp,
          emailVerificationOtpExpiry: otpExpiry,
        },
      });
    }
    if (type === 'forgotPassword') {
      updateUser = await prisma.user.update({
        where: {
          email: user?.email,
        },
        data: {
          resetPasswordOtp: hashedOtp,
          resetPasswordOtpExpiry: otpExpiry,
        },
      });
    }

    if (!updateUser) {
      logger.error(`Failed to update user OTP in database for email: ${email}`);
      throw new ApiError(
        500,
        'Failed to send OTP. Please try again later.',
        {}
      );
    }

    await sendEmail({
      email: user?.email,
      subject,
      mailgenContent: template(updateUser?.name, unhashedOtp),
    });
  } catch (error) {
    logger.error(`Email service failed: ${error.message}`);
    throw new ApiError(500, 'Failed to send OTP. Please try again later.', {});
  }
};

const handleVerifyOTP = async (user, otp, otpExpiry, otpValidation) => {
  const isOtpExpired = Date.now() > new Date(user[otpExpiry]).getTime(); // Using this because in Schema I am storing in DateTime

  if (isOtpExpired) {
    logger.warn(`OTP expired for email: ${user.email}`);
    throw new ApiError(400, 'OTP has expired. Please request a new one.', {});
  }

  const isOtpValid = await compareHash(otp, user[otpValidation]);

  if (!isOtpValid) {
    logger.warn(`Invalid OTP attempt for email: ${user.email}`);
    throw new ApiError(400, 'Invalid OTP. Please check and try again.', {});
  }

  return true;
};

/**
 * Register a new user
 * @async
 * @function registerUser
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing user data
 * @param {string} req.body.name - User's name
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends registration response
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  logger.info(`Register attempt: name=${name}, email=${email}`);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      isVerified: true,
    },
  });

  if (existingUser) {
    logger.error(`User already exists with email: ${email}`);
    throw new ApiError(409, 'User with this email already exists', {});
  }

  const hashedPassword = await generateHashedPassword(password);

  logger.info(`hashedPassword in register controller: ${hashedPassword}`);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    logger.error('Failed to create new user in database');
    throw new ApiError(
      500,
      'User registration failed. Please try again later.',
      {}
    );
  }

  const sanitizedUser = sanitizeUser(newUser);

  res
    .status(201)
    .json(new ApiResponse(201, 'User registered successfully', sanitizedUser));
});

/**
 * Login an existing user
 * @async
 * @function loginUser
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing login data
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends login response with tokens
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  logger.info(`Login attempt: email=${email}`);

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      isVerified: true,
      tokenVersion: true,
    },
  });

  if (!findUser) {
    logger.warn(`Login attempt with non-existent email: ${email}`);
    throw new ApiError(401, 'Invalid email or password', {});
  }

  if (!findUser.isVerified) {
    logger.warn(`Login attempt with unverified email: ${email}`);
    throw new ApiError(401, 'Please verify your email before logging in', {});
  }

  const passwordValid = await compareHash(password, findUser.password);

  if (!passwordValid) {
    logger.warn(`Invalid password attempt for email: ${email}`);
    throw new ApiError(401, 'Invalid email or password', {});
  }

  const { accessToken, refreshToken } = generateRefreshAccessToken(
    findUser.id,
    findUser.tokenVersion
  );

  logger.debug(`accessToken issued for user ${findUser.email}`);

  const sanitizedUser = sanitizeUser(findUser);

  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions.options)
    .cookie('accessToken', accessToken, {
      ...cookieOptions.options,
      httpOnly: false,
    })
    .json(new ApiResponse(200, 'User login successful', sanitizedUser));
});

export const getMe = asyncHandler(async (req, res) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: req.user?.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
  });

  if (!findUser) {
    logger.warn(`Get me attempt with non-existent email: ${email}`);
    throw new ApiError(401, 'Invalid email or password', {});
  }

  const sanitedUser = sanitizeUser(findUser);

  res
    .status(200)
    .json(new ApiResponse(200, 'User Fetched Successfully', sanitedUser));
});

/**
 * Verify email OTP for user registration
 * @async
 * @function verifyOTP
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing OTP data
 * @param {string} req.body.otp - OTP code to verify
 * @param {string} req.body.email - User's email
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends verification response
 */
export const verifyEmailVerificationOTP = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      emailVerificationOtp: true,
      emailVerificationOtpExpiry: true,
      isVerified: true,
    },
  });

  if (!findUser) {
    logger.warn(`OTP verification attempt with non-existent email: ${email}`);
    throw new ApiError(404, 'User not found', {});
  }

  if (findUser.isVerified) {
    logger.error(
      `OTP verification attempt for already verified email: ${email}`
    );
    throw new ApiError(400, 'Email is already verified', {});
  }

  const otpValidation = await handleVerifyOTP(
    findUser,
    otp,
    'emailVerificationOtpExpiry',
    'emailVerificationOtp'
  );

  if (!otpValidation) {
    logger.warn(`Invalid OTP attempt for email: ${email}`);
    throw new ApiError(400, 'Invalid OTP. Please check and try again.', {});
  }

  const updateUser = await prisma.user.update({
    where: {
      email: findUser.email,
    },
    data: {
      emailVerificationOtp: null,
      emailVerificationOtpExpiry: null,
      isVerified: true,
    },
  });

  //  Set access & refresh token only after signup & after user is verified
  const { accessToken, refreshToken } = generateRefreshAccessToken(
    updateUser?.id,
    updateUser?.tokenVersion
  );

  const sanitizedUser = sanitizeUser(updateUser);

  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions.options)
    .cookie('accessToken', accessToken, {
      ...cookieOptions.options,
      httpOnly: false,
    })
    .json(new ApiResponse(200, 'User verification successful', sanitizedUser));
});

/**
 * Send OTP for email verification
 * @async
 * @function sendOTP
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing email
 * @param {string} req.body.email - User's email
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends OTP response
 */
export const sendEmailVerificationOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      emailVerificationOtp: true,
      emailVerificationOtpExpiry: true,
      isVerified: true,
    },
  });

  if (!findUser) {
    logger.warn(
      `OTP send attempt for non-existent or verified email: ${email}`
    );
    throw new ApiError(404, 'User not found or already verified', {});
  }

  if (findUser.isVerified) {
    logger.warn(`OTP send attempt for already verified email: ${email}`);
    throw new ApiError(400, 'Email is already verified', {});
  }
  await handleSendOTP(
    findUser,
    'emailVerification',
    'Email Verification',
    emailVerificationMailgenContent
  );

  const sanitizedUser = sanitizeUser(findUser);

  res
    .status(200)
    .json(new ApiResponse(200, 'OTP sent successfully', sanitizedUser));
});

export const sendOTPforForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      resetPasswordOtp: true,
      resetPasswordOtpExpiry: true,
      isVerified: true,
      updatedAt: true,
    },
  });

  if (!findUser) {
    logger.warn(
      `OTP send attempt for non-existent or verified email: ${email}`
    );
    throw new ApiError(404, 'User not found', {});
  }

  if (!findUser.isVerified) {
    logger.warn(`OTP send attempt for already verified email: ${email}`);
    throw new ApiError(400, 'Email is not verified', {});
  }

  await handleSendOTP(
    findUser,
    'forgotPassword',
    'Forgot Password OTP Verification',
    resetPasswordMailgenContent
  );

  res.status(200).json(new ApiResponse(200, 'OTP sent successfully', {}));
});

export const verifyOTPforForgotPassword = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      resetPasswordOtp: true,
      resetPasswordOtpExpiry: true,
      isVerified: true,
    },
  });

  if (!findUser) {
    logger.warn(`OTP verification attempt with non-existent email: ${email}`);
    throw new ApiError(404, 'User not found', {});
  }

  if (!findUser.isVerified) {
    logger.error(`OTP verification attempt for not verified email: ${email}`);
    throw new ApiError(400, 'Email not verified', {});
  }

  const otpValidation = await handleVerifyOTP(
    findUser,
    otp,
    'resetPasswordOtpExpiry',
    'resetPasswordOtp'
  );

  if (!otpValidation) {
    logger.warn(`Invalid OTP attempt for email: ${email}`);
    throw new ApiError(400, 'Invalid OTP. Please check and try again.', {});
  }

  const { token, hashedToken } = await generateRandomToken();

  const tokenExpiry = new Date(Date.now() + 1000 * 60 * 5); // 5min

  const updateUser = await prisma.user.update({
    where: {
      email: findUser.email,
    },
    data: {
      resetPasswordOtp: null,
      resetPasswordOtpExpiry: null,
      token: hashedToken,
      tokenExpiry: tokenExpiry,
    },
  });

  if (!updateUser) {
    logger.error(`Error in generating reset token for email: ${email}`);
    throw new ApiError(500, 'Unexpected Error', {});
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, 'OTP verified successfully', { resetToken: token })
    );
});

/**
 * Logout user and invalidate tokens
 * @async
 * @function logoutUser
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object
 * @param {string} req.user.email - User's email
 * @param {number} req.user.tokenVersion - User's token version
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends logout response
 */
export const logoutUser = asyncHandler(async (req, res) => {
  const findUser = await prisma.user.update({
    where: {
      email: req.user?.email,
    },
    data: {
      tokenVersion: req.user?.tokenVersion + 1,
    },
    select: {
      name: true,
      email: true,
      isVerified: true,
    },
  });

  if (!findUser) {
    logger.warn(`Logout attempt for non-existent user: ${req.user?.email}`);
    throw new ApiError(404, 'User not found', {});
  }

  res
    .clearCookie('accessToken', cookieOptions.options)
    .clearCookie('refreshToken', cookieOptions.options)
    .status(200)
    .json(new ApiResponse(200, 'Logout successful', {}));
});

/**
 * Reset user password using OTP
 * @async
 * @function resetPassword
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing reset data
 * @param {string} req.body.email - User's email
 * @param {string} req.body.otp - Reset password OTP
 * @param {string} req.body.newPassword - New password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends reset password response
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, confirmNewPassword, email } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      password: true,
      token: true,
      tokenExpiry: true,
    },
  });

  if (!findUser) {
    logger.warn(`Reset password attempt for non-existent user: ${email}`);
    throw new ApiError(404, 'User not found', {});
  }

  const isTokenExpired = Date.now() > new Date(findUser.tokenExpiry).getTime();

  if (isTokenExpired) {
    logger.warn(`Reset password attempt for non-existent user: ${email}`);
    throw new ApiError(400, 'Reset token has expired', {});
  }

  const resetTokenValidation = await compareHash(resetToken, findUser.token);

  if (!resetTokenValidation) {
    logger.warn(`Reset password attempt for non-existent user: ${email}`);
    throw new ApiError(400, 'Invalid reset token', {});
  }

  const hashedPassword = await generateHashedPassword(confirmNewPassword);

  const updateUser = await prisma.user.update({
    where: {
      email: findUser.email,
    },
    data: {
      password: hashedPassword,
      token: null,
      tokenExpiry: null,
    },
    select: {
      name: true,
      email: true,
      isVerified: true,
    },
  });

  if (!updateUser) {
    logger.warn(`Reset password attempt for non-existent user: ${email}`);
    throw new ApiError(504, 'Failed to reset password', {});
  }

  res.status(200).json(new ApiResponse(200, 'Password reset successfully', {}));
});

/**
 * Change current user password
 * @async
 * @function changeCurrentPassword
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing password data
 * @param {string} req.body.currentPassword - Current password
 * @param {string} req.body.newPassword - New password
 * @param {Object} req.user - Authenticated user object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends change password response
 */
export const changeCurrentPassword = asyncHandler(async (req, res) => {
  // TODO: Implement change password logic
  const { newPassword, currentPassword } = req.body;
  const findUser = await prisma.user.findUnique({
    where: {
      email: req.user?.email,
    },
    select: {
      name: true,
      email: true,
      password: true,
      tokenVersion: true,
    },
  });

  if (!findUser) {
    logger.warn(`User not found for email: ${req.user?.email}`);
    throw new ApiError(404, 'User not found', {});
  }

  const isPasswordValid = await compareHash(currentPassword, findUser.password);

  if (!isPasswordValid) {
    logger.warn(`Invalid password for email: ${req.user?.email}`);
    throw new ApiError(400, 'Invalid password', {});
  }

  const newHashedPassword = await generateHashedPassword(newPassword);

  const updateUser = await prisma.user.update({
    where: {
      email: findUser.email,
    },
    data: {
      password: newHashedPassword,
      tokenVersion: findUser.tokenVersion + 1,
    },
  });

  if (!updateUser) {
    logger.error(
      `Failed to update user password in database for email: ${req.user?.email}`
    );
    throw new ApiError(
      500,
      'Failed to change password. Please try again later.',
      {}
    );
  }

  const sanitizedUser = sanitizeUser(updateUser);

  res
    .status(200)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json(
      new ApiResponse(
        200,
        'Password changed successfully. Please log in',
        sanitizedUser
      )
    );
});

/**
 * Refresh access token using refresh token
 * @async
 * @function refreshAccessToken
 * @param {Object} req - Express request object
 * @param {Object} req.cookies - Request cookies
 * @param {string} req.cookies.refreshToken - Refresh token
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends new access token response
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  logger.info('Refresh access token');
  if (!req.cookies?.refreshToken) {
    logger.warn('Refresh token not found in cookies');
    throw new ApiError(403, 'Forbidden request', {});
  }

  const decodedToken = decodeJwtToken(
    req.cookies?.refreshToken,
    JWT_CONSTANTS.refreshTokenSecret
  );

  if (
    decodedToken === 'TOKEN_EXPIRED' ||
    decodedToken === 'TOKEN_NOT_ACTIVE' ||
    decodedToken === 'INVALID_TOKEN'
  ) {
    logger.warn(`Invalid refresh token ${decodedToken}`);
    throw new ApiError(403, 'Forbidden request', {});
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      tokenVersion: true,
      isVerified: true,
    },
  });

  if (!findUser) {
    logger.error(
      `Refresh token attempt for non-existent user: ${decodedToken?.userId}`
    );
    throw new ApiError(404, 'User not found', {});
  }

  if (findUser.tokenVersion !== decodedToken.tokenVersion) {
    logger.error(
      `Refresh token attempt for non-existent user: ${findUser.email}`
    );
    throw new ApiError(403, 'Forbidden request', {});
  }

  const { accessToken, refreshToken } = await generateRefreshAccessToken(
    findUser.id,
    findUser.tokenVersion
  );

  const sanitedUser = sanitizeUser(findUser);

  logger.info(`New tokens generated for user: ${findUser.email}`);

  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions.options)
    .cookie('accessToken', accessToken, {
      ...cookieOptions.options,
      httpOnly: false,
    })
    .json(new ApiResponse(200, 'Tokens refreshed successfully', sanitedUser));
});
