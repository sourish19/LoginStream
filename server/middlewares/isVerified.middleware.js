import logger from '../logger/winston.logger';
import asyncHandler from '../utils/asyncHandler.util';
import ApiError from '../utils/apiError.util';

const isVerified = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user.isVerified) {
    logger.warn(`User not verified: ${user.email}`);
    throw new ApiError(403, 'User not verified', {});
  }
  next();
});

export default isVerified;
