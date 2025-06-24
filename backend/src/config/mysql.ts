import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: Number(process.env.SQL_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export async function connectMysql() {
    db.getConnection()
        .then((connection) => {
            console.log("Connect to mysql successfully!")
            connection.release()
        })
        .catch((err) => {
            console.log("Connect to mysql failure! err: ", err)
        })
}