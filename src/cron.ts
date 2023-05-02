import cron from 'node-cron';
import addJobToQueue from './queue';

const schedule = () => {
  console.log(`Cron running`);

  cron.schedule('*/10 * * * * *', async () => await addJobToQueue('task'));
};

export default schedule;
