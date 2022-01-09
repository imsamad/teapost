import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/.env` });

import express from 'express';
const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (_req, res) => {
  res.send('Hello from TeaPost API...');
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
