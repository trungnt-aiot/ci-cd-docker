import { mySQLDB } from '../config/mysql';
import fs from 'fs/promises';
import path from 'path';
import { PoolConnection } from 'mysql2/promise';
import { MIGRATE_ERROR_MESSAGE } from '../utils/enum.utils';

export async function migrateDB() {
    try {
        console.log('Starting database migration...');

        const sqlFiles: string[] = await fs.readdir(path.join(__dirname, 'sql'));
        console.log('SQL files found:', sqlFiles);
        for (const file of sqlFiles) {
            const filePath: string = path.join(__dirname, 'sql', file);
            const sql: string = await fs.readFile(filePath, 'utf-8');
            const connection: PoolConnection = await mySQLDB.getConnection();
            await connection.query(sql);
            connection.release();
            console.log(`Executed sql file: ${file}`);
        }
        console.log('SQL script executed successfully');
    } catch (err) {
        console.error(`${MIGRATE_ERROR_MESSAGE.MIGRATE_DB_ERROR}: ${err}`);
    }
}
