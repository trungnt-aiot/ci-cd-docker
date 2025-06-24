import { db } from "../config/mysql";
import fs from 'fs/promises';
import path from 'path';

export async function migrateDB() {
  try {
    console.log("Starting database migration...");

    const sqlFiles = await fs.readdir(path.join(__dirname, 'sql'));
    console.log("SQL files found:", sqlFiles);
    for (const file of sqlFiles) {
      const filePath = path.join(__dirname, 'sql', file);
      const sql = await fs.readFile(filePath, 'utf-8');
      const connection = await db.getConnection();
      await connection.query(sql);
      connection.release();
    }
    console.log("SQL script executed successfully");
  } catch (err) {
    console.error("Failed to execute SQL script:", err);
  }
}
