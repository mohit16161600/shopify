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
                        <div key={post.id} className="relative aspect-square group overflow-hidden rounded-xl cursor-pointer">
                            {/* Since we don't have real URLs yet, using a colored placeholder if image fails, 
                                but trying to use the structure. For now, let's use a reliable placeholder 
                                or just the structure. I'll use a generic placeholder service for visual confirmation 
                                if the shopify links are guessed. */}
                            <div className="w-full h-full bg-gray-200 relative">
                                {/* Using a placeholder image for now to ensure visibility */}
                                <Image
                                    src={`https://placehold.co/400x400/e2e8f0/475569?text=Post+${post.id}`}
                                    alt={post.alt}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {post.type === 'video' && (
                                    <div className="absolute top-3 right-3 text-white">
                                        <svg className="w-6 h-6 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 text-white font-bold">
                                        View Post
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#1a5d1a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#144514] transition-colors"
                >
                    Visit Instagram
                </a>
            </div>
        </div>
    );
}
