import { db } from "../config/mysql";
import type { PoolConnection, Pool } from "mysql2/promise";

export class counterRepositories {
    static db: Pool = db;
    static defaultValue: number = 0;

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

    static async getVisiter() {
        return await this.withConnection(async (conn)=> {
            const [result] = await conn.query("SELECT visiter FROM counter")
            const visiter: number | null = (result as any)[0]?.visiter ?? null;

            return  visiter ?? await this.initDefaultValue()
        })
    }

    static async setVisiter(newValue: number) {
        return await this.withConnection(async (conn)=> {
            const [result] = await conn.query("UPDATE counter SET visiter = ?", [newValue])

            return result
        })
    }

    static async initDefaultValue() {
        return await this.withConnection(async (conn)=> {
            await conn.query("INSERT INTO counter (visiter) VALUES (?)", [this.defaultValue])

            return this.defaultValue
        })
    }
}