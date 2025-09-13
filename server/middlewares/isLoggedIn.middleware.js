import { PrismaClient } from '@prisma/client';
import logger from '../logger/winston.logger.js';
import asyncHandler from '../utils/asyncHandler.util.js';
import { JWT_CONSTANTS } from '../utils/constants.util.js';
import ApiError from '../utils/apiError.util.js';
import { decodeJwtToken } from '../utils/helper.util.js';

const prisma = new PrismaClient();

// Client should make a request to /api/v1/auth/refresh-token if the accessToken is invalid & if they have refreshToken present in their cookie
// Then they will get a new access token which will allow them to refresh the access token without logging out the user

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let accessToken;

  // check cookies
  if (req.cookies.accessToken) {
    accessToken = req.cookies?.accessToken;
  }
  // if not cookies then check headers
  else if (req.headers['authorization']?.startsWith('Bearer ')) {
    accessToken = req.headers['authorization']?.split(' ')[1];
  }

  if (!accessToken) {
    logger.warn('Access token not found in cookies');
    throw new ApiError(401, 'Unauthorized request', {});
  }

  const decodedToken = decodeJwtToken(
    accessToken,
    JWT_CONSTANTS.accessTokenSecret
  );

  if (!decodedToken) {
    logger.warn(`Invalid access token ${decodedToken}`);
    throw new ApiError(401, 'Unauthorized request', {});
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: decodedToken?.userId,
    },
    select: {
      id: true,
      email: true,
      isVerified: true,
      tokenVersion: true
    },
  });

  if (!findUser) {
    logger.warn('User not found');
    throw new ApiError(404, 'User not found', {});
  }

  req.user = findUser;

  next();
});

export default isLoggedIn;
