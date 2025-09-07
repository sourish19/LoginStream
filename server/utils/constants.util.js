export const cookiesOption = {
  options: {
    sameSite: 'strict',
    secure: false,
    httpOnly: true,
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
  },
};

export const EMAIL_CONSTANTS = {
  emailFrom: process.env.MAILTRAP_MAIL,
  emailHost: process.env.MAILTRAP_HOST,
  emailPort: process.env.MAILTRAP_PORT,
  authUser: process.env.MAILTRAP_USERNAME,
  authPass: process.env.MAILTRAP_PASSWORD,
};

export const JWT_CONSTANTS = {
  accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry : process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry : process.env.REFRESH_TOKEN_EXPIRY
}
