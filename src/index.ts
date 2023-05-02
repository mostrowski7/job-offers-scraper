import express from 'express';
import * as dotenv from 'dotenv';
import runCron from './cron';
import runWorker from './worker';

dotenv.config();

const app = express();

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on PORT ${process.env.APP_PORT}`);

  runWorker();
  runCron();
});
