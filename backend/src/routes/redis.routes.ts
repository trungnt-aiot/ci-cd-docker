import { redisController } from './../controllers/redis.controller';
import express from 'express';

const router = express.Router()

router.get('/', redisController.getAll)
router.post('/', redisController.create)
router.get('/:key', redisController.getOne)
router.patch('/:key', redisController.update)
router.delete('/:key', redisController.delete)

export { router }