import { mySQLDB } from '../config/mysql';
import type { PoolConnection, Pool } from 'mysql2/promise';
import { RedisTypes } from '../types/redis.types';

export class counterRepositories {
    static mySQLDB: Pool = mySQLDB;
    static defaultValue: number = 0;

    static async withConnection<T>(callback: (conn: PoolConnection) => Promise<T>) {
        const conn = await this.mySQLDB.getConnection();
        try {
            return await callback(conn);
        } finally {
            conn.release();
        }
    }

    static async getVisiter() {
        return await this.withConnection(async (conn) => {
            const [rows] = await conn.query('SELECT visiter FROM counter');
            const visiter: RedisTypes.redisValue = (rows as { visiter: string }[])[0]?.visiter ?? null;

            return visiter ?? (await this.initDefaultValue());
        });
    }

    static async setVisiter(newValue: number) {
        return await this.withConnection(async (conn) => {
            const [result] = await conn.query('UPDATE counter SET visiter = ?', [newValue]);

            return result;
        });
    }

    static async initDefaultValue() {
        return await this.withConnection(async (conn) => {
            await conn.query('INSERT INTO counter (visiter) VALUES (?)', [this.defaultValue]);

            return this.defaultValue;
        });
    }
}
