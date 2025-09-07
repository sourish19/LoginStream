import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.util.js';
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';
import {
  generateEmailVerificationOTP,
  generateHashedPassword,
  comparePassword,
  generateRefreshAccessToken
} from '../utils/helper.util.js';
import logger from '../logger/winston.logger.js';
import {
  sendEmail,
  emailVerificationMailgenContent,
} from '../utils/mail.util.js';
import { cookiesOption } from '../utils/constants.util.js';

const prisma = new PrismaClient();

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  logger.info(
    `name email password in register controller: ${name} ${email} ${password}`
  );

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    logger.error(`existingUser in register controller:`, {
      user: existingUser,
    });
    throw new ApiError(409, 'User registration failed', []);
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
    logger.erroe(`newUser failed in register controller: ${newUser}`);
    throw new ApiError(500, 'User registration failed', []);
  }

  const { unhashedOtp, hashedOtp, otpExpiry } = await generateEmailVerificationOTP();

  logger.info(
    `Otp in register controller: ${unhashedOtp} ${hashedOtp} ${otpExpiry}`
  );

  const updateUser = await prisma.user.update({
    where: {
      email: newUser.email,
    },
    data: {
      emailVerificationOtp: hashedOtp,
      emailVerificationOtpExpiry: otpExpiry,
    },
  });

  if (!updateUser) {
    logger.error(`updateUser failed in register controller:`, {
      user: updateUser,
    });
    throw new ApiError(
      500,
      'User email verification failed please try again later',
      []
    );
  }

  await sendEmail({
    email,
    subject: 'Email Verification',
    mailgenContent: emailVerificationMailgenContent(newUser?.name, unhashedOtp),
  });

  res.status(201).json(
    new ApiResponse(201, 'User registered successfully', {
      username: newUser.name,
      email: newUser.email,
      isVerified: newUser.isVerified,
    })
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  logger.info(
    `name email password in loginUser controller: ${name} ${email} ${password}`
  );

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) {
    logger.error(`findUser in login controller: ${findUser}`);
    throw new ApiError(409, 'User login failed', []);
  }

  const passwordValid = await comparePassword(password, findUser.password)

  if (!passwordValid) {
    logger.error(
      `password - ${password} hashedPassword - ${hashedPassword} db pass - ${findUser.password}`
    );
    throw new ApiError(400, 'User login failed', []);
  }

  const {accessToken,refreshToken,hashedRefreshToken} = generateRefreshAccessToken(findUser.id,findUser.email)

  logger.info(`accessToken in login controller: ${accessToken}`);
  logger.info(`refreshToken in login controller: ${refreshToken}`);
  logger.info(`hashedRefreshToken in login controller: ${hashedRefreshToken}`);

  const user = await prisma.user.update({
    where:{
      email: findUser.email
    },
    data:{
      refreshToken: hashedRefreshToken,
    }
  })

  if(!user){
    logger.error(`user in login controller:`,{user});
    throw new ApiError(500, 'User login failed', []);
  }

  res
  .status(200)
  .cookie('refreshToken',refreshToken,cookiesOption.options)
  .cookie("accessToken",accessToken,cookiesOption.options)
  .json(
    new ApiResponse(200, 'User login successfull', {
      username: findUser.username,
      email: findUser.email,
      isVerified: findUser.isVerified,
    })
  );
});
