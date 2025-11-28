const { createConnection } = require('./db-utils');

async function main() {
    const connection = await createConnection();

    try {
        console.log('Connected to database.');

        // Create table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS review (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pro_name VARCHAR(255) NOT NULL,
                cust_name VARCHAR(255) NOT NULL,
                pro_image VARCHAR(255),
                star INT DEFAULT 5,
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Table review created or already exists.');

        // Check if data exists
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM review');

        if (rows[0].count === 0) {
            console.log('Seeding data...');
            const reviews = [
                {
                    pro_name: 'I2 IMMUNITY INCREASER',
                    cust_name: 'Priya Nair',
                    pro_image: '/products/immunity-booster.png', // Placeholder path
                    star: 5,
                    content: "I've been using I2 Immunity Booster Drops daily and they really work. I haven't caught a seasonal cold since starting, and I feel less tired overall. It's a simple yet effective way to keep the immune system strong."
                },
                {
                    pro_name: 'HERB69 BOOSTER',
                    cust_name: 'Arjun Mehta',
                    pro_image: '/products/herb69.png', // Placeholder path
                    star: 5,
                    content: "Herb69 has truly improved my strength and stamina. Within a month, I noticed a boost in energy, confidence, and overall performance. It feels good to rely on a herbal product that actually delivers results."
                },
                {
                    pro_name: 'MORINGA POWDER',
                    cust_name: 'Sunita Rani',
                    pro_image: '/products/moringa.png', // Placeholder path
                    star: 5,
                    content: "This Moringa powder is fresh, high quality, and easy to use. I mix it into my morning smoothies and it keeps me active throughout the day. It's been great for boosting immunity and overall energy levels."
                },
                {
                    pro_name: 'DIABETIC CARE',
                    cust_name: 'Rahul Sharma',
                    pro_image: '/products/diabetic-care.png', // Placeholder path
                    star: 4,
                    content: "I've tried many products for blood sugar control, but this one stands out. It's natural and has helped stabilize my levels significantly. Highly recommended for anyone looking for a safe alternative."
                }
            ];

            const sql = 'INSERT INTO review (pro_name, cust_name, pro_image, star, content) VALUES (?, ?, ?, ?, ?)';

            for (const review of reviews) {
                await connection.execute(sql, [
                    review.pro_name,
                    review.cust_name,
                    review.pro_image,
                    review.star,
                    review.content
                ]);
            }
            console.log('Data seeded successfully.');
        } else {
            console.log('Table already has data, skipping seed.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
