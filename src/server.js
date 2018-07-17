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

// when there is no fitting route set error and run the next func
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// this func then returns the json error message
app.use((error, req, res) => {
  res.status(error.status || 404);
  res.json({ status: 'error', message: error.message });
});


// listen only when not testing
// this is to avoid Uncaught Error: listen EADDRINUSE :::3000
if (!module.parent) {
  app.listen(port, () => {
    // console.log(`Listening on port ${port}`);
  });
}

// export app for testing
module.exports = app;
