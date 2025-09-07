import 'dotenv/config';
import cors from 'cors';
import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from './logger/winston.logger.js';
import router from './routes/auth.route.js';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/user', router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
