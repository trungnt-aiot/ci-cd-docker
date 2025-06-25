import { BaseRepository } from './base.repository';
import type { PoolConnection, QueryResult } from 'mysql2/promise';
import { NotesTypes } from '../types/notes.types';

export class NoteRepository extends BaseRepository {
    static async createNote(title: NotesTypes.NoteTitle, content: NotesTypes.NoteContent): Promise<QueryResult> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                const [result] = await conn.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
                return result;
            });
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    }

    static async updateNote(id: NotesTypes.NoteID, title: NotesTypes.NoteTitle, content: NotesTypes.NoteContent): Promise<QueryResult> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                const [result] = await conn.query(`UPDATE notes SET title = ?, content = ? WHERE id = ?`, [title, content, id]);
                return result;
            });
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    }

    static async getNoteById(id: NotesTypes.NoteID): Promise<QueryResult | null> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                const [result] = await conn.query('SELECT * FROM notes WHERE id = ?', [id]);
                return result;
            });
        } catch (error) {
            console.error('Error fetching note by id:', error);
            throw error;
        }
    }

    static async getNotesList(): Promise<QueryResult> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                const [results] = await conn.query('SELECT * FROM notes');
                return results;
            });
        } catch (error) {
            console.error('Error fetching notes list:', error);
            throw error;
        }
    }

    static async deleteNote(id: string): Promise<QueryResult> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                const [results] = await conn.query('DELETE FROM notes WHERE id = ?', [id]);
                return results;
            });
        } catch (error) {
            console.error('Error deleting note:', error);
            throw error;
        }
    }
}
