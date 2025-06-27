import { createClient } from 'redis';
import { RedisServices } from '../services/redis.services';

export const redisClient = createClient({
    url: `redis://redis:${process.env.REDIS_PORT}`,
});

export async function connectRedis(): Promise<void> {
    if (!redisClient.isReady) {
        try {
            await redisClient.connect();
            console.log('Connected to Redis!');
            await RedisServices.initRedis();
        } catch (error) {
            console.error('Could not connect to Redis: ', error);
        }
    }
}
