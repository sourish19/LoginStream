import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import { EMAIL } from './constants.util.js';
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
  host: EMAIL.emailHost,
  port: parseInt(EMAIL.emailPort, 10),
  secure: false,
  auth: {
    user: EMAIL.authUser,
    pass: EMAIL.authPass,
  },
});

export const sendEmail = async (options) => {
  try {
    const emailHtml = mailGenerator.generate(options.mailgenContent);
    const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

    const mail = {
      from: EMAIL.emailFrom,
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

export const emailVerificationMailgenContent = (username, otp) => ({
  body: {
    name: username,
    intro: "Welcome to our app! We're very excited to have you on board.",
    outro: `To verify your email, use the following OTP: **${otp}**. It will expire in 5 minutes.`,
  },
});

export const resetPasswordMailgenContent = (username, resetOtpl) => ({
  body: {
    name: username,
    intro: 'You recently requested to reset your password.',
    action: {
      instructions: 'Click the button below to set a new password:',
      button: {
        color: '#22BC66',
        text: 'Reset Password',
        link: resetOtpl,
      },
    },
    outro:
      'If you did not request a password reset, please ignore this email or contact support if you have concerns.',
  },
});
