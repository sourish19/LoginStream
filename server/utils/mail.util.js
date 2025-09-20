import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import { EMAIL_CONSTANTS } from './constants.util.js';
import logger from '../logger/winston.logger.js';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'LoginStream',
    link: 'https://LoginStream.app',
    logo: 'https://mailgen.js/img/logo.png',
    logoHeight: '30px',
    copyright: `© ${new Date().getFullYear()} LoginStream. All rights reserved.`,
  },
});

const transporter = nodemailer.createTransport({
  host: EMAIL_CONSTANTS.emailHost,
  port: parseInt(EMAIL_CONSTANTS.emailPort, 10),
  secure: false,
  auth: {
    user: EMAIL_CONSTANTS.authUser,
    pass: EMAIL_CONSTANTS.authPass,
  },
  logger: true,  // enable logging
  debug: true,   // show connection debug
});

/**
 * Send email using nodemailer
 * @async
 * @function sendEmail
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {Object} options.mailgenContent - Mailgen content object
 * @returns {Promise<void>} Sends email
 */
export const sendEmail = async (options) => {
  try {
    const emailHtml = mailGenerator.generate(options.mailgenContent);
    const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

    const mail = {
      from: EMAIL_CONSTANTS.emailFrom,
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailHtml,
    };
    await transporter.sendMail(mail);
    logger.info(`Email sent to: ${options.email}`);
  } catch (error) {
    // Fail silently
    logger.error(`Email service failed: ${error.message}`);
  }
};

/**
 * Generate email verification mailgen content
 * @function emailVerificationMailgenContent
 * @param {string} username - User's name
 * @param {string} otp - OTP code
 * @returns {Object} Mailgen content object
 */
export const emailVerificationMailgenContent = (username, otp) => ({
  body: {
    name: username,
    intro: "Welcome to our app! We're very excited to have you on board.",
    outro: `To verify your email, use the following OTP: **${otp}**. It will expire in 5 minutes.`,
  },
});

/**
 * Generate reset password mailgen content
 * @function resetPasswordMailgenContent
 * @param {string} username - User's name
 * @param {string} otp - OTP or link
 * @returns {Object} Mailgen content object
 */
export const resetPasswordMailgenContent = (username, otp) => ({
  body: {
    name: username,
    intro: 'You recently requested to reset your password.',
    outro: `Use the following OTP to reset your password: **${otp}**. It will expire in 5 minutes.`,
  },
});
