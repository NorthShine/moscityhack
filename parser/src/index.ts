import 'dotenv/config';
import express from 'express';
import router from './routes';
import cors from 'cors';
import { errorMiddleware } from './middleware/error.middleware';
import { REQUEST_TIMEOUT } from './constants';
import ApiError from './exceptions/api-errors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.REQUEST_ORIGIN
  })
);
app.get('/parser/', (req, res) => {
  res.status(200).send('ping').end();
})
app.use(router);

app.use((req, res, next) => {
  res.setTimeout(REQUEST_TIMEOUT, () => {
    console.log('Request has timed out.');
    return next(ApiError.requestTimeout());
  });
});
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
