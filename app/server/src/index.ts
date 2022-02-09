import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV !== 'production'
      ? `${__dirname}/.env.development`
      : `${__dirname}/.env`,
});

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db/connectDB';

import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';

import authRtr from './routes/authRtr';
import storyRtr from './routes/storyRtr';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRtr);
app.use('/api/v1/story', storyRtr);

app.get('/', (_req, res) => {
  res.send('Hello from TeaPost API...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on http://localhost:${PORT}`);
});
