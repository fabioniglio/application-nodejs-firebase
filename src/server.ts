import express from 'express';

import firebase from 'firebase-admin';
import routes from './routes';

import serviceAccount from '../serviceAccountKey.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://construyo-coding-challenge.firebaseio.com',
});

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(3333, () => {
  console.log('Server Started on port 3333');
});
