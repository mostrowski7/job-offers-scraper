import { Worker } from 'bullmq';
import config from './config';

const runWorker = () => {
  console.log(`Worker running`);

  const worker = new Worker(
    'job-offers',
    async (job) => {
      console.log(`Processing job ${job.id}`);
      return 'value';
    },
    { connection: config.redis },
  );

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    if (job) console.log(`Job ${job.id} failed with error: ${err}`);
  });
};

export default runWorker;
