import 'dotenv/config';
import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('Server running on PORT: ', PORT));

export default app;
