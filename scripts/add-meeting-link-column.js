const { createConnection } = require('./db-utils');

async function main() {
    const connection = await createConnection();

    try {
        console.log('Connected to database.');

        // Check if column exists
        const [columns] = await connection.execute(`
      SHOW COLUMNS FROM consult_doctors LIKE 'meet_link'
    `);

        if (columns.length === 0) {
            console.log('Adding meet_link column...');
            await connection.execute(`
        ALTER TABLE consult_doctors
        ADD COLUMN meet_link VARCHAR(255) AFTER remarks
      `);
            console.log('Column meet_link added.');
        } else {
            console.log('Column meet_link already exists.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
