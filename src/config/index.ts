import * as dotenv from 'dotenv';

dotenv.config();

export default {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
  },
};
