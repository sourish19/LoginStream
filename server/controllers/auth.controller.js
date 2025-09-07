import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.util.js';
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';
import {
  generateEmailVerificationOTP,
  generateHashedPassword,
} from '../utils/helper.util.js';
import logger from '../logger/winston.logger.js';
import {
  sendEmail,
  emailVerificationMailgenContent,
} from '../utils/mail.util.js';

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
    logger.error(`existingUser in register controller: ${existingUser}`);
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

  const { unhashedOtp, hashedOtp, otpExpiry } = generateEmailVerificationOTP();

  logger.info(
    `Otp in register controller: ${unhashedOtp} ${hashedOtp} ${otpExpiry}`
  );

  await sendEmail({
    email,
    subject: 'Email Verification',
    mailgenContent: emailVerificationMailgenContent(newUser?.name, unhashedOtp),
  });

  res.status(201).json(
    new ApiResponse(201, 'User registered successfully', {
      username: newUser.username,
      email: newUser.email,
      isVerified: newUser.isVerified,
    })
  );
});

export const loginUser = asyncHandler(async(req,res)=>{
  const {name,email,password} = req.body

    logger.info(
    `name email password in loginUser controller: ${name} ${email} ${password}`
  );

  const findUser = await prisma.user.findUnique({
    where:{
      email
    }
  })

  if(!findUser){
       logger.error(`findUser in login controller: ${findUser}`);
    throw new ApiError(409, 'User login failed', []); 
  }

  
})
