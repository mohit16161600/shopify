import Image from 'next/image';

export default function InstagramFeed() {
    const posts = [
        {
            id: 1,
            type: 'video',
            src: 'https://www.instagram.com/reel/DPqvaeqD1P_/?igsh=Yms1cnprN3Y1MXk4', // Placeholder or valid URL if available
            alt: 'Instagram Post 1'
        },
        {
            id: 2,
            type: 'video',
            src: 'https://www.instagram.com/reel/DRUXJGrk8q-/?igsh=ajIwMWNpdXhxaWY0',
            alt: 'Instagram Post 2'
        },
        {
            id: 3,
            type: 'image',
            src: 'https://www.instagram.com/reel/DPqvaeqD1P_/?igsh=Yms1cnprN3Y1MXk4',
            alt: 'Instagram Post 3'
        },
        {
            id: 4,
            type: 'image',
            src: 'https://www.instagram.com/reel/DRUXJGrk8q-/?igsh=ajIwMWNpdXhxaWY0',
            alt: 'Instagram Post 4'
        }
    ];

    const getEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            // Remove query parameters
            urlObj.search = '';
            // Ensure it ends with /embed
            if (!urlObj.pathname.endsWith('/embed') && !urlObj.pathname.endsWith('/embed/')) {
                urlObj.pathname = urlObj.pathname.replace(/\/$/, '') + '/embed';
            }
            return urlObj.toString();
        } catch (e) {
            return url;
        }
    };

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Follow us on Instagram
                </h2>
                <p className="text-gray-500 mb-12">
                    Join our community for daily inspiration and a closer look at our creations
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {posts.map((post) => (
                        <div key={post.id} className="relative aspect-[9/16] group overflow-hidden rounded-xl bg-gray-100">
                            <iframe
                                src={getEmbedUrl(post.src)}
                                className="w-full h-full"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency={true}
                                allow="encrypted-media"
                                title={post.alt}
                            />
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
