import express, { Router } from 'express';
import { NotesController } from '../controllers/notes.controller';

const router: Router = express.Router();

router.get('/', NotesController.getAll);
router.get('/:id', NotesController.getOne);
router.post('/', NotesController.create);
router.patch('/:id', NotesController.update);

export { router };
