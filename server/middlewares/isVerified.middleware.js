import logger from '../logger/winston.logger.js';
import asyncHandler from '../utils/asyncHandler.util.js';
import ApiError from '../utils/apiError.util.js';

const isVerified = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user.isVerified) {
    logger.warn(`User not verified: ${user.email}`);
    throw new ApiError(403, 'User not verified', {});
  }
  next();
});

export default isVerified;
