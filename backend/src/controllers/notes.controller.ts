import { NextFunction, Request, Response } from 'express';
import { noteServices } from '../services/note.services';
import { QueryResult } from 'mysql2';
import { NotesTypes } from '../types/notes.types';
import { NOTES_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

class NotesController {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notes: QueryResult = await noteServices.getAllNotes();

            res.status(RESPONSE_STATUS_CODE.OK).json({
                notes,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.GET_ALL_NOTES_ERROR}: ${error}`);
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: NotesTypes.NoteID = req.params.id;

        try {
            const note: QueryResult | null = await noteServices.getOne(id);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                note,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.GET_ONE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title, content }: NotesTypes.CreatedNote = req.body;

        try {
            const newNote: QueryResult = await noteServices.createNote(title, content);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                newNote,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.CREATE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: NotesTypes.NoteID = req.params.id;

        try {
            const note: QueryResult = await noteServices.deleteNote(id);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                note,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.DELETE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title, content }: NotesTypes.CreatedNote = req.body;
        const id: NotesTypes.NoteID = req.params.id;

        try {
            const note: QueryResult = await noteServices.updateNote(id, title, content);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                note,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.UPDATE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }
}

export const notesController = new NotesController();
