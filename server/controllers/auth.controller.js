import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.util.js';
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';
import { generateHashedPassword } from '../utils/helper.util.js';

const prisma = new PrismaClient();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) throw new ApiError(409, 'User already registered', []);

  const hashedPassword = await generateHashedPassword(password);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
});
