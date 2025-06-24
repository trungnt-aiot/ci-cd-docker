import express from 'express';
import { counterController } from '../controllers/counter.controller';

const router = express.Router()

router.get('/', counterController.get)
router.patch('/', counterController.increment)
router.patch('/set', counterController.setCounter)

export { router }