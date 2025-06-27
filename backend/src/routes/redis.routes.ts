import { RedisController } from './../controllers/redis.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', RedisController.getAll);
router.post('/', RedisController.create);
router.get('/:key', RedisController.getOne);
router.patch('/:key', RedisController.update);
router.delete('/:key', RedisController.delete);

export { router };
