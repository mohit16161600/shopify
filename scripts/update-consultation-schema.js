const { createConnection } = require('./db-utils');

async function main() {
    const connection = await createConnection();

    try {
        console.log('Connected to database.');

        // Modify column definition
        console.log('Modifying status column...');

        // First, we might need to map existing values if we were in production, 
        // but for dev we'll just alter it. 
        // Note: 'open' -> 'pending', 'closed' -> 'completed'.
        // Since we can't easily do a mapping in a single ALTER for ENUM change if values don't match,
        // we'll just force the change. Data might be truncated or set to empty string if it doesn't match,
        // but since we are in dev/test, this is acceptable.
        // A safer way is to update values first.

        await connection.execute("UPDATE consult_doctors SET status = 'pending' WHERE status = 'open'");
        await connection.execute("UPDATE consult_doctors SET status = 'completed' WHERE status = 'closed'");

        await connection.execute(`
            ALTER TABLE consult_doctors
            MODIFY COLUMN status ENUM('pending', 'completed', 'deleted') NOT NULL DEFAULT 'pending'
        `);
        console.log('Column status modified successfully.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
