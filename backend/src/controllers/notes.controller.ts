import { NextFunction, Request, Response } from 'express';
import { noteService } from '../services/note.services';
import { QueryResult } from 'mysql2';
import { NotesTypes } from '../types/notes.types';
import { NOTES_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

export class notesController {
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notes: QueryResult = await noteService.getAllNotes();

            res.status(RESPONSE_STATUS_CODE.OK).json({
                notes,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.GET_ALL_NOTES_ERROR}: ${error}`);
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: NotesTypes.NoteID = req.params.id;

        try {
            const note: QueryResult | null = await noteService.getOne(id);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                note,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.GET_ONE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title, content }: NotesTypes.CreatedNote = req.body;

        try {
            const newNote: QueryResult = await noteService.createNote(title, content);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                newNote,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.CREATE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: NotesTypes.NoteID = req.params.id;

        try {
            const note: QueryResult = await noteService.deleteNote(id);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                note,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.DELETE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title, content }: NotesTypes.CreatedNote = req.body;
        const id: NotesTypes.NoteID = req.params.id;

        try {
            const note: QueryResult = await noteService.updateNote(id, title, content);

            res.status(RESPONSE_STATUS_CODE.OK).json({
                note,
            });
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.UPDATE_NOTE_ERROR}: ${error}`);
            next(error);
        }
    }
}
