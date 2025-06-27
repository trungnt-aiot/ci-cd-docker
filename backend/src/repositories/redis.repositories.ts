import { redisClient } from '../config/redis';
import { RedisTypes } from '../types/redis.types';

class RedisRepositories {
    readonly visitorCounterKey: RedisTypes.redisKey = 'visitorCounter';

    async get(key: RedisTypes.redisKey): Promise<RedisTypes.redisValue | null> {
        try {
            return await redisClient.get(key);
        } catch (error) {
            console.error('Error fetching redis key:', error);
            throw error;
        }
    }

    async set(key: RedisTypes.redisKey, value: RedisTypes.redisValue): Promise<RedisTypes.redisValue | null> {
        try {
            return await redisClient.set(key, value);
        } catch (error) {
            console.error('Error setting redis key:', error);
            throw error;
        }
    }

    async items(): Promise<RedisTypes.redisSchema[]> {
        try {
            const allKeys: string[] = [];
            let cursor: string = '0';

            do {
                const reply: { cursor: string; keys: string[] } = await redisClient.scan(cursor);
                allKeys.push(...reply.keys);
                cursor = reply.cursor;
            } while (cursor !== '0');

            if (allKeys.length === 0) {
                return [];
            }

            const values = await redisClient.mGet(allKeys);

            const result: RedisTypes.redisSchema[] = [];
            allKeys.forEach((key: RedisTypes.redisKey, index: number) => {
                const value = values[index];
                if (value !== null) {
                    try {
                        const parsedValue: RedisTypes.redisValue = JSON.parse(value);
                        result.push({ key, value: parsedValue });
                    } catch (e) {
                        console.log(e);
                        console.warn(`Warning: Could not parse JSON for key "${key}". Value: "${value}"`);
                        result.push({ key, value });
                    }
                } else {
                    result.push({ key, value: null });
                }
            });

            return result;
        } catch (error) {
            console.error('Error fetching redis items:', error);
            throw error;
        }
    }

    async delete(key: RedisTypes.redisKey): Promise<number> {
        try {
            return await redisClient.del(key);
        } catch (error) {
            console.error('Error deleting redis key:', error);
            throw error;
        }
    }
}

export const redisRepositories = new RedisRepositories();
