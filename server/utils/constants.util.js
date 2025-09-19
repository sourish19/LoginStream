/**
 * Cookie configuration options for authentication tokens
 * @constant {Object} cookieOptions
 */
export const cookieOptions = {
  options: {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15d
  },
};

/**
 * Email service configuration constants
 * @constant {Object} EMAIL_CONSTANTS
 */
export const EMAIL_CONSTANTS = {
  emailFrom: process.env.MAILTRAP_MAIL,
  emailHost: process.env.MAILTRAP_HOST,
  emailPort: process.env.MAILTRAP_PORT,
  authUser: process.env.MAILTRAP_USERNAME,
  authPass: process.env.MAILTRAP_PASSWORD,
};

/**
 * JWT token configuration constants
 * @constant {Object} JWT_CONSTANTS
 */
export const JWT_CONSTANTS = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
};
