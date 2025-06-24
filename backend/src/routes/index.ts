import express from 'express';
import { router as counterRoutes } from './counter.routes';
import { router as noteRoutes } from './notes.routes';
import { router as redisRoutes } from './redis.routes';

const router = express.Router()

router.use('/counter', counterRoutes)
router.use('/note', noteRoutes)
router.use('/redis', redisRoutes)

export { router }