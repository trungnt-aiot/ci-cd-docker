import express, { Router } from 'express';
import { CounterController } from '../controllers/counter.controller';

const router: Router = express.Router();

router.get('/', CounterController.get);
router.patch('/', CounterController.increment);
router.patch('/set', CounterController.setCounter);

export { router };
