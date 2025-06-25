import { redisRepositories } from '../repositories/redis.repositories';
import { counterService } from './counter.services';
import { RedisTypes } from '../types/redis.types';
import { APIError } from '../utils/error.handler.utils';
import { REDIS_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

export class redisServices {
    static readonly defaultCounterValue: string = '0';

    static async initRedis(): Promise<RedisTypes.redisValue> {
        try {
            const visitorCounter: string | null = await redisRepositories.get(redisRepositories.visitorCounterKey);
            if (!visitorCounter) {
                const counterDB: RedisTypes.redisValue = String(await counterService.getVisiter());

                await redisRepositories.set(redisRepositories.visitorCounterKey, counterDB);
                return counterDB;
            }

            return visitorCounter;
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.INIT_REDIS_ERROR}: ${error}`);
            throw error;
        }
    }

    static async getCounter(): Promise<RedisTypes.redisValue> {
        try {
            const visitorCounter: string | null = await redisRepositories.get(redisRepositories.visitorCounterKey);
            if (!visitorCounter) return await this.initRedis();
            return visitorCounter;
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.GET_COUNTER_ERROR}: ${error}`);
            throw error;
        }
    }

    static async incrementCounter(stepIncrement: number = 1): Promise<RedisTypes.redisValue> {
        // stepIncrement is the number of steps to increment the counter

        if (stepIncrement < 0) {
            throw new APIError(REDIS_ERROR_MESSAGE.STEP_INCREMENT_NEGATIVE_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            const newValue: RedisTypes.redisValue = String(Number(await this.getCounter()) + stepIncrement);
            await counterService.setVisiter(Number(newValue));
            await redisRepositories.set(redisRepositories.visitorCounterKey, newValue);
            return newValue;
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.INCREMENT_COUNTER_ERROR}: ${error}`);
            throw error;
        }
    }

    static async items(): Promise<RedisTypes.redisSchema[]> {
        try {
            return await redisRepositories.items();
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.GET_ALL_ERROR}: ${error}`);
            throw error;
        }
    }

    static async getByKey(key: RedisTypes.redisKey): Promise<RedisTypes.redisValue | null> {
        if (!key) {
            throw new APIError(REDIS_ERROR_MESSAGE.KEY_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            return await redisRepositories.get(key);
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.GET_ONE_ERROR}: ${error}`);
            throw error;
        }
    }

    static async setValue(key: RedisTypes.redisKey, value: RedisTypes.redisValue | null): Promise<RedisTypes.redisValue | null> {
        if (!key || !value) {
            throw new APIError(REDIS_ERROR_MESSAGE.KEY_VALUE_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        if (key === redisRepositories.visitorCounterKey) {
            try {
                await counterService.setVisiter(Number(value));
            } catch (error) {
                console.error(`${REDIS_ERROR_MESSAGE.SET_VISITER_ERROR}: ${error}`);
                throw error;
            }
        }

        try {
            return await redisRepositories.set(key, value);
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.SET_VALUE_ERROR}: ${error}`);
            throw error;
        }
    }

    static async deleteKey(key: RedisTypes.redisKey): Promise<number> {
        if (!key) {
            throw new APIError(REDIS_ERROR_MESSAGE.KEY_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        const redisRecord: RedisTypes.redisValue | null = await this.getByKey(key);
        if (!redisRecord) {
            throw new APIError(REDIS_ERROR_MESSAGE.KEY_NOT_FOUND_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            return await redisRepositories.delete(key);
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.DELETE_ERROR}: ${error}`);
            throw error;
        }
    }

    static async getVisitorCounter(): Promise<RedisTypes.redisValue> {
        try {
            const visitorCounter: string | null = await redisRepositories.get(redisRepositories.visitorCounterKey);
            if (!visitorCounter) return await this.initRedis();
            return visitorCounter;
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.GET_COUNTER_ERROR}: ${error}`);
            throw error;
        }
    }

    static async createItem(key: RedisTypes.redisKey, value: RedisTypes.redisValue | null): Promise<RedisTypes.redisValue | null> {
        if (!key || !value) {
            throw new APIError(REDIS_ERROR_MESSAGE.KEY_VALUE_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        const redisRecord: RedisTypes.redisValue | null = await this.getByKey(key);
        if (redisRecord) {
            throw new APIError(REDIS_ERROR_MESSAGE.KEY_ALREADY_EXISTS_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            return await redisRepositories.set(key, value);
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.CREATE_ERROR}: ${error}`);
            throw error;
        }
    }
}
