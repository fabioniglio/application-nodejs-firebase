import express from 'express';
import cors from 'cors';

import routes from './routes';

import db from './database';

const collection = [];

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server Started on port 3333');
});
