import crypto from 'crypto';
import bcrypt from 'bcrypt';
import ApiError from './apiError.util';

export const generateHashedToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  //   const tokenExpiry = 1000 * 60 * 60 * 1; // 1hr

  return { token };
};

export const generateHashedPassword = async (password) => {
  if (!password) return null;
  const salt = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {}
};
