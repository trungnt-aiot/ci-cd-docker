import { RedisTypes } from '../types/redis.types';
import { BaseRepository } from './base.repository';
import type { PoolConnection, QueryResult } from 'mysql2/promise';

class CounterRepositories extends BaseRepository {
    async getVisiter(): Promise<RedisTypes.redisValue> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                const [rows] = await conn.query('SELECT visiter FROM counter');
                const visiter: RedisTypes.redisValue = (rows as { visiter: string }[])[0]?.visiter ?? null;

                return visiter ?? (await this.initDefaultValue());
            });
        } catch (error) {
            console.error('Error fetching visitor count:', error);
            throw error;
        }
    }

    async setVisiter(newValue: number): Promise<QueryResult> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                const [result] = await conn.query('UPDATE counter SET visiter = ?', [newValue]);

                return result;
            });
        } catch (error) {
            console.error('Error updating visitor count:', error);
            throw error;
        }
    }

    async initDefaultValue(): Promise<RedisTypes.redisValue> {
        try {
            return await this.withConnection(async (conn: PoolConnection) => {
                await conn.query('INSERT INTO counter (visiter) VALUES (?)', [this.defaultValue]);

                return String(this.defaultValue);
            });
        } catch (error) {
            console.error('Error initializing default visitor count:', error);
            throw error;
        }
    }
}

export const counterRepositories = new CounterRepositories();
