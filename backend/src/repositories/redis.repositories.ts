import { redisClient } from '../config/redis';
import { RedisTypes } from '../types/redis.types';

export class redisRepositories {
    static async get(key: RedisTypes.redisKey) {
        return await redisClient.get(key);
    }

    static async set(key: RedisTypes.redisKey, value: RedisTypes.redisValue) {
        return await redisClient.set(key, value);
    }

    static async items(): Promise<RedisTypes.redisSchema[]> {
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
                    console.warn(`Warning: Could not parse JSON for key "${key}". Value: "${value}"`);
                    result.push({ key, value });
                }
            } else {
                result.push({ key, value: null });
            }
        });

        return result;
    }

    static async delete(key: RedisTypes.redisKey) {
        return await redisClient.del(key);
    }
}
