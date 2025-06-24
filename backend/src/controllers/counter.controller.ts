import { Request, Response } from "express";
import { redisServices } from "../services/redis.services";
import { redisRepositories } from "../repositories/redis.repositories";

export class counterController {
    static async get(req: Request, res: Response) {
        const visitorCounter = await redisServices.getCounter()

        console.log("GET /api/counter: ", visitorCounter)

        res.status(200).send({
            visitorCounter
        })
    }

    static async increment(req: Request, res: Response) {
        const visitorCounter = await redisServices.incrementCounter()

        console.log("PATCH /api/counter: ", visitorCounter)

        res.status(200).send({
            visitorCounter
        })
    }
    
    static async setCounter(req: Request, res: Response) {
        const newValue = req.body.newValue

        console.log(newValue)

        await redisRepositories.set("visitorCounter", newValue)

        res.status(200).send({
            newValue
        })
    }
}