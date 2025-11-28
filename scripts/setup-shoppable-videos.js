const { createConnection } = require('./db-utils');

async function main() {
    const connection = await createConnection();

    try {
        console.log('Connected to database.');

        // Create table
        await connection.execute(`
      CREATE TABLE IF NOT EXISTS shoppable_videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        video_url VARCHAR(255) NOT NULL,
        thumbnail_url VARCHAR(255),
        product_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Table shoppable_videos created or already exists.');

        // Check if data exists
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM shoppable_videos');
        if (rows[0].count === 0) {
            console.log('Seeding data...');
            const videos = [
                {
                    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    thumbnail_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
                    product_id: '1',
                    status: 'active'
                },
                {
                    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    thumbnail_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
                    product_id: '2',
                    status: 'active'
                },
                {
                    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    thumbnail_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
                    product_id: '3',
                    status: 'active'
                }
            ];

            for (const video of videos) {
                await connection.execute(
                    'INSERT INTO shoppable_videos (video_url, thumbnail_url, product_id, status) VALUES (?, ?, ?, ?)',
                    [video.video_url, video.thumbnail_url, video.product_id, video.status]
                );
            }
            console.log('Seeded 3 videos.');
        } else {
            console.log('Table already has data. Skipping seed.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
