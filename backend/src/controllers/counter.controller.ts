import { NextFunction, Request, Response } from 'express';
import { RedisServices } from '../services/redis.services';
import { RedisTypes } from '../types/redis.types';
import { COUNTER_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

export class CounterController {
    static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const visitorCounter: RedisTypes.redisValue = await RedisServices.getCounter();

            res.status(RESPONSE_STATUS_CODE.OK).json({
                visitorCounter,
            });
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.GET_COUNTER_ERROR}: ${error}`);
            next(error);
        }
    }

    static async increment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const visitorCounter: RedisTypes.redisValue = await RedisServices.incrementCounter();

            res.status(RESPONSE_STATUS_CODE.OK).json({
                visitorCounter,
            });
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.INCREMENT_COUNTER_ERROR}: ${error}`);
            next(error);
        }
    }

    static async setCounter(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newValue: RedisTypes.redisValue = req.body.newValue;

            await RedisServices.setValue(await RedisServices.getVisitorCounter(), newValue);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                newValue,
            });
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.SET_COUNTER_ERROR}: ${error}`);
            next(error);
        }
    }
}
