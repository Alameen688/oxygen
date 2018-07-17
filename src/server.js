import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from './router/index';

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/entries', router.entries);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res) => res.status(error.status || 404)
  .json({
    status: error,
    message: error.message,
  }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// export app for testing
module.exports = app;
