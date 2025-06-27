import express, { Router } from 'express';
import { notesController } from '../controllers/notes.controller';

const router: Router = express.Router();

router.get('/', notesController.getAll);
router.get('/:id', notesController.getOne);
router.post('/', notesController.create);
router.patch('/:id', notesController.update);

export { router };
