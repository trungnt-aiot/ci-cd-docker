import { Request, Response } from 'express';
import { redisRepositories } from '../repositories/redis.repositories';
import { redisServices } from '../services/redis.services';
import { RedisTypes } from '../types/redis.types';

export class counterController {
    static async get(req: Request, res: Response) {
        const visitorCounter: RedisTypes.redisKey = await redisServices.getCounter();

        console.log('GET /api/counter: ', visitorCounter);

        res.status(200).send({
            visitorCounter,
        });
    }

    static async increment(req: Request, res: Response) {
        const visitorCounter: RedisTypes.redisValue = await redisServices.incrementCounter();

        console.log('PATCH /api/counter: ', visitorCounter);

        res.status(200).send({
            visitorCounter,
        });
    }

    static async setCounter(req: Request, res: Response) {
        const newValue: RedisTypes.redisValue = req.body.newValue;

        console.log(newValue);

        await redisRepositories.set('visitorCounter', newValue);

        res.status(200).send({
            newValue,
        });
    }
}
