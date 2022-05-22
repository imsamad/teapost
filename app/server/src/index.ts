import 'colors';
import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config({
  path: path.join(__dirname, '../', `config`, '.env'),
});
import connectDB from './db/connectDB';

import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

// Security middlewares
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
// @ts-ignore
import xss from 'xss-clean';
import hpp from 'hpp';

import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';

import BUSINESS_ROUTES from './routes';
import checkTemp from './middleware/checkTemp';

const app = express();
app.use(mongoSanitize());

app.use(helmet());

app.use(xss());
app.use(hpp());
app.use(cors());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
// app.use(limiter);

app.use(express.json());
app.use(express.text());
app.use(morgan('dev'));
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '../', 'tmp'),
  })
);

app.use(
  '/image',
  express.static(path.join(__dirname, '../', '/public/uploads/image'))
);

app.use(express.static(path.join(__dirname, '../', 'public')));

app.use(checkTemp(), BUSINESS_ROUTES);
app.get('/api/v1/health', (_req, res) => {
  return res.json({
    dir: __dirname,
    env: process.env,
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`):- Listening on http://localhost:${PORT}`.yellow.bold);
});
