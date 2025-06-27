import { NextFunction, Request, Response } from 'express';
import { redisServices } from '../services/redis.services';
import { RedisTypes } from '../types/redis.types';
import { COUNTER_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

class CounterController {
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const visitorCounter: RedisTypes.redisValue = await redisServices.getCounter();

            res.status(RESPONSE_STATUS_CODE.OK).json({
                visitorCounter,
            });
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.GET_COUNTER_ERROR}: ${error}`);
            next(error);
        }
    }

    async increment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const visitorCounter: RedisTypes.redisValue = await redisServices.incrementCounter();

            res.status(RESPONSE_STATUS_CODE.OK).json({
                visitorCounter,
            });
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.INCREMENT_COUNTER_ERROR}: ${error}`);
            next(error);
        }
    }

    async setCounter(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newValue: RedisTypes.redisValue = req.body.newValue;

            await redisServices.setValue(await redisServices.getVisitorCounter(), newValue);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                newValue,
            });
        } catch (error) {
            console.error(`${COUNTER_ERROR_MESSAGE.SET_COUNTER_ERROR}: ${error}`);
            next(error);
        }
    }
}

export const counterController = new CounterController();
