/**
 * Cookie configuration options for authentication tokens
 * @constant {Object} cookieOptions
 */
export const cookieOptions = {
  options: {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
  emailFrom: process.env.NODE_ENV === 'production' ? process.env.EMAIL_MAIL : process.env.MAILTRAP_MAIL,
  emailHost: process.env.NODE_ENV === 'production' ? process.env.EMAIL_HOST : process.env.MAILTRAP_HOST,
  emailPort: process.env.NODE_ENV === 'production' ? process.env.EMAIL_PORT : process.env.MAILTRAP_PORT,
  authUser: process.env.NODE_ENV === 'production' ? process.env.EMAIL_USERNAME : process.env.MAILTRAP_USERNAME,
  authPass: process.env.NODE_ENV === 'production' ? process.env.EMAIL_PASSWORD : process.env.MAILTRAP_PASSWORD,
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
