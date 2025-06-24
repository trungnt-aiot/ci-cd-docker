import { db } from "../config/mysql";
import type { PoolConnection, Pool } from "mysql2/promise";

export class NoteRepository {
    static db: Pool = db;

    static async withConnection<T>(
        callback: (conn: PoolConnection) => Promise<T>
    ) {
        const conn = await this.db.getConnection();
        try {
            return await callback(conn);
        } finally {
            conn.release();
        }
    }

    static async createNote(title: string, content: string) {
        return await this.withConnection(async (conn) => {
            const [result] = await conn.query(
                "INSERT INTO notes (title, content) VALUES (?, ?)",
                [title, content]
            );
            return result;
        });
    }

    static async updateNote(id: string, title: string, content: string) {
        return await this.withConnection(async (conn) => {
            const [result] = await conn.query(
                `UPDATE notes SET title = ?, content = ? WHERE id = ?`,
                [title, content, id]
            );
            return result;
        });
    }

    static async getNoteById(id: string) {
        return await this.withConnection(async (conn) => {
            const [result] = await conn.query(
                'SELECT * FROM notes WHERE id = ?',
                [id]
            )
            return result
        })
    }

    static async getNotesList() {
        return await this.withConnection(async (conn) => {
            const [results] = await conn.query(
                'SELECT * FROM notes'
            )
            return results
        })
    }

    static async deleteNote(id: string) {
        return await this.withConnection(async (conn) => {
            const [results] = await conn.query(
                'DELETE note where id = ?',
                [id]
            )
            return results
        })
    }

}
