import { Queue } from 'bullmq';
import config from './config';

const queue = new Queue('job-offers', {
  connection: config.redis,
});

const addJobToQueue = async (name: string) => {
  console.log(`Adding job to queue`);

  await queue.add(
    name,
    {},
    {
      removeOnComplete: {
        age: 3600,
        count: 1000,
      },
      removeOnFail: {
        age: 24 * 3600,
      },
    },
  );
};

export default addJobToQueue;
