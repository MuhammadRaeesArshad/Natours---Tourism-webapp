const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err, err.name, err.message);
  console.log('Unhandled Exception: Shutting down...');
  process.exit(1);
});

dotenv.config({
  path: './config.env',
});

const app = require('./app');

const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB');
  });
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection: Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
