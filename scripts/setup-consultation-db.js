const { createConnection } = require('./db-utils');

async function main() {
    const connection = await createConnection();

    try {
        console.log('Connected to database.');

        // Create table
        await connection.execute(`
      CREATE TABLE IF NOT EXISTS consult_doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        weight VARCHAR(50),
        height VARCHAR(50),
        age INT,
        health_issues TEXT,
        consult_time TIME,
        consult_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Table consult_doctors created or already exists.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
