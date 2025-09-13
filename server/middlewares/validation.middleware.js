import z from 'zod';
import logger from '../logger/winston.logger.js';
import asyncHandler from '../utils/asyncHandler.util.js';
import {
  signupSchema,
  loginSchema,
  OTPSchema,
} from '../validators/zod.validator.js';
import ApiError from '../utils/apiError.util.js';

// Formating errors
const getErrors = (zodErr) => {
  const flaten = z.flattenError(zodErr);
  return flaten.fieldErrors;
};

const signupValidation = asyncHandler((req, res, next) => {
  const result = signupSchema.safeParse(req.body);

  if (result.success) {
    logger.info(
      `Signup attempt: name=${result.data.name}, email=${result.data.email}, password=${result.data.password}`
    );
    next();
  } else {
    logger.error(`Signup attempt failed:`, result.error);
    throw new ApiError(400, 'Validation Error', getErrors(result.error));
  }
});

const loginValidation = asyncHandler((req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (result.success) {
    logger.info(`login attempt:`);
    next();
  } else {
    logger.error(`login attempt failed:`, result.error);
    throw new ApiError(400, 'Validation Error', getErrors(result.error));
  }
});

const OTPValidation = asyncHandler((req, res, next) => {
  const result = OTPSchema.safeParse(req.body);

  if (result.success) {
    logger.info(`OTP attempt:`);
    next();
  } else {
    logger.error(`OTP attempt failed:`, result.error);
    throw new ApiError(400, 'Validation Error', getErrors(result.error));
  }
});

export { signupValidation, loginValidation, OTPValidation };
