import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export function getPool() {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
}

export async function query(sql: string, params: any[] = []) {
    const pool = getPool();
    const [results] = await pool.execute(sql, params);
    return results;
}
