import { counterRepositories } from './../repositories/counter.repositories';
import { RedisTypes } from '../types/redis.types';
import { QueryResult } from 'mysql2/promise';
import { APIError } from '../utils/error.handler.utils';
import { COUNTER_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

class CounterServices {
    async getVisiter(): Promise<RedisTypes.redisValue> {
        try {
            return await counterRepositories.getVisiter();
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.GET_COUNTER_ERROR}: ${error}`);
            throw error;
        }
    }

    async setVisiter(newValue: number): Promise<QueryResult> {
        if (newValue < 0) {
            throw new APIError(COUNTER_ERROR_MESSAGE.NEGATIVE_VISITER_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        const visiter: RedisTypes.redisValue = await this.getVisiter();

        if (!visiter) {
            throw new APIError(COUNTER_ERROR_MESSAGE.NOT_INITIALIZED_VISITER_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            return await counterRepositories.setVisiter(newValue);
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.SET_COUNTER_ERROR}: ${error}`);
            throw error;
        }
    }
}

export const counterServices = new CounterServices();
