import cors from 'cors';
import 'dotenv/config';
import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from './logger/winston.logger.js';
import router from './routes/auth.route.js';
import customErrorResponse from './middlewares/error.middleware.js';
import healthCheck from './controllers/healthcheck.controller.js';

const app = express();
console.log("CORS allowed origin:", process.env.FRONTEND_URL);


app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/health-check', healthCheck);
app.use('/api/v1/auth', router);

app.use(customErrorResponse);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
