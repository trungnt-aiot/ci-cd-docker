import { NextFunction, Request, Response } from 'express';
import { redisServices } from '../services/redis.services';
import { RedisTypes } from '../types/redis.types';
import { REDIS_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

class RedisController {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const items: RedisTypes.redisSchema[] = await redisServices.items();

            res.status(RESPONSE_STATUS_CODE.OK).json({
                items,
            });
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.GET_ALL_ERROR}: ${error}`);
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        const key: RedisTypes.redisKey = req.params.key;

        try {
            const value: RedisTypes.redisValue | null = await redisServices.getByKey(key);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                key,
                value,
            });
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.GET_ONE_ERROR}: ${error}`);
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const key: RedisTypes.redisKey = req.params.key;
        const newValue: RedisTypes.redisValue = req.body.value;

        try {
            const result: RedisTypes.redisValue | null = await redisServices.setValue(key, newValue);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                result,
            });
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.UPDATE_ERROR}: ${error}`);
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const key: RedisTypes.redisKey = req.params.key;

        try {
            const result: number = await redisServices.deleteKey(key);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                result,
            });
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.DELETE_ERROR}: ${error}`);
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { key, value }: RedisTypes.redisSchema = req.body;

        try {
            const result: RedisTypes.redisValue | null = await redisServices.createItem(key, value);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                result,
            });
        } catch (error) {
            console.error(`${REDIS_ERROR_MESSAGE.CREATE_ERROR}: ${error}`);
            next(error);
        }
    }
}

export const redisController = new RedisController();
