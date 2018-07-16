import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser);

app.use(morgan('dev'));

app.listen(process.env.PORT || 300, () => {
  console.log(`Listening on port ${this.address().port}`);
});
