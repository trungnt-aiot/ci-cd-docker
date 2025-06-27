import { mySQLDB } from '../config/mysql';
import type { PoolConnection, Pool } from 'mysql2/promise';

export class BaseRepository {
    readonly mySQLDB: Pool = mySQLDB;
    readonly defaultValue: number = 0;

    async withConnection<T>(callback: (conn: PoolConnection) => Promise<T>): Promise<T> {
        const conn = await this.mySQLDB.getConnection();
        try {
            return await callback(conn);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw error;
        } finally {
            conn.release();
        }
    }
}
