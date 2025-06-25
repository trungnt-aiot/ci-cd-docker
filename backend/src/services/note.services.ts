import { NoteRepository } from '../repositories/note.repositories';
import { QueryResult } from 'mysql2/promise';
import { NotesTypes } from '../types/notes.types';
import { APIError } from '../utils/error.handler.utils';
import { NOTES_ERROR_MESSAGE, RESPONSE_STATUS_CODE } from '../utils/enum.utils';

export class noteService {
    static async getAllNotes(): Promise<QueryResult> {
        try {
            return await NoteRepository.getNotesList();
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.GET_ALL_NOTES_ERROR}: ${error}`);
            throw error;
        }
    }

    static async getOne(id: NotesTypes.NoteID): Promise<QueryResult | null> {
        if (!id) {
            throw new APIError(NOTES_ERROR_MESSAGE.ID_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }
        try {
            return await NoteRepository.getNoteById(id);
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.GET_ONE_NOTE_ERROR}: ${error}`);
            throw error;
        }
    }

    static async createNote(title: NotesTypes.NoteTitle, content: NotesTypes.NoteContent): Promise<QueryResult> {
        if (!title || !content) {
            throw new APIError(NOTES_ERROR_MESSAGE.TITLE_CONTENT_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            return await NoteRepository.createNote(title, content);
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.CREATE_NOTE_ERROR}: ${error}`);
            throw error;
        }
    }

    static async deleteNote(id: NotesTypes.NoteID): Promise<QueryResult> {
        if (!id) {
            throw new APIError(NOTES_ERROR_MESSAGE.ID_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        const note: QueryResult | null = await this.getOne(id);
        if (!note) {
            throw new APIError(NOTES_ERROR_MESSAGE.NOTE_NOT_FOUND_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            return await NoteRepository.deleteNote(id);
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.DELETE_NOTE_ERROR}: ${error}`);
            throw error;
        }
    }

    static async updateNote(id: NotesTypes.NoteID, title: NotesTypes.NoteTitle, content: NotesTypes.NoteContent): Promise<QueryResult> {
        if (!id || !title || !content) {
            throw new APIError(NOTES_ERROR_MESSAGE.ID_TITLE_CONTENT_REQUIRED_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        const note: QueryResult | null = await this.getOne(id);
        if (!note) {
            throw new APIError(NOTES_ERROR_MESSAGE.NOTE_NOT_FOUND_ERROR, RESPONSE_STATUS_CODE.BAD_REQUEST);
        }

        try {
            return await NoteRepository.updateNote(id, title, content);
        } catch (error) {
            console.error(`${NOTES_ERROR_MESSAGE.UPDATE_NOTE_ERROR}: ${error}`);
            throw error;
        }
    }
}
