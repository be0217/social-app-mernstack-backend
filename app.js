const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could Not found this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error Occured' });
});

mongoose
  .connect(
    'mongodb+srv://ankit:Ankit007@cluster0-q2m7h.mongodb.net/places?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => {
    app.listen(5000, () => console.log('Listining to port 5000'));
  })
  .catch(error => console.log(error));
