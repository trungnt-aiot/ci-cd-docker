import { Request, Response } from 'express';
import { redisServices } from '../services/redis.services';
import { RedisTypes } from '../types/redis.types';

export class redisController {
    static async getAll(req: Request, res: Response) {
        const items: RedisTypes.redisSchema[] = await redisServices.items();

        console.log(items);

        res.status(200).send({
            items,
        });
    }

    static async getOne(req: Request, res: Response) {
        const key: RedisTypes.redisKey = req.params.key;
        const value = await redisServices.getByKey(key);

        res.status(200).send({
            key,
            value,
        });
    }

    static async update(req: Request, res: Response) {
        const key: RedisTypes.redisKey = req.params.key;
        const newValue: RedisTypes.redisValue = req.body.value;

        console.log(key, newValue);

        const result = await redisServices.setValue(key, newValue);

        res.status(200).send({
            result,
        });
    }

    static async delete(req: Request, res: Response) {
        const key: RedisTypes.redisValue = req.params.key;

        console.log('key:', key);

        const result = await redisServices.deleteKey(key);

        res.status(200).send({
            result,
        });
    }

    static async create(req: Request, res: Response) {
        const { key, value } = req.body;

        const result = await redisServices.setValue(key, value);

        res.status(200).send({
            result,
        });
    }
}
