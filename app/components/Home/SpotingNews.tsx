'use client';

export default function EasyShoppingPlatform() {
  const platforms = [
    {
      id: 1,
      name: 'ls.com',
      logo: './image/platforms/netmeds.avif',
      alt: 'ls.com pharmacy',
      fallbackText: 'ls.com'
    },
    {
      id: 2,
      name: 'Myntra',
      logo: './image/platforms/MYNTRA_2.avif',
      alt: 'Myntra',
      fallbackText: 'Myntra'
    },
    {
      id: 3,
      name: 'Snapdeal',
      logo: './image/platforms/SNAPDEAL_2.avif',
      alt: 'Snapdeal',
      fallbackText: 'Snapdeal'
    },
    {
      id: 4,
      name: 'PharmEasy',
      logo: './image/platforms/PHARMEASY_2.avif',
      alt: 'PharmEasy',
      fallbackText: 'PharmEasy'
    },
    {
      id: 5,
      name: 'Amazon',
      logo: './image/platforms/background-replacer-result_b9a7c1df-7b93-4878-8067-205c260de72e.png',
      alt: 'Amazon',
      fallbackText: 'Amazon'
    },
    {
      id: 6,
      name: 'Tata 1mg',
      logo: './image/platforms/background-replacer-result_2_ec1ef416-f3fc-4da5-9b5c-79b02cd2414b.avif',
      alt: 'Tata 1mg',
      fallbackText: 'Tata 1mg'
    },
    {
      id: 7,
      name: 'Amazon',
      logo: './image/platforms/background-replacer-result_3.png',
      alt: 'Amazon',
      fallbackText: 'Amazon'
    },
    {
      id: 8,
      name: 'Meesho',
      logo: './image/platforms/meesho.avif',
      alt: 'Meesho',
      fallbackText: 'Meesho'
    }
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedPlatforms = [...platforms, ...platforms];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-black">
          Spotlight on the News
        </h2>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex platform-scroll">
            {duplicatedPlatforms.map((platform, index) => (
              <div
                key={`${platform.id}-${index}`}
                className="flex-shrink-0 mx-4 md:mx-8 flex items-center justify-center min-w-[120px] md:min-w-[200px]"
              >
                <a
                  href="#"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity min-h-[64px]"
                >
                  <img
                    src={platform.logo}
                    alt={platform.alt}
                    className="h-16 w-auto object-contain"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.platform-fallback');
                        if (fallback) {
                          fallback.classList.remove('hidden');
                        }
                      }
                    }}
                  />
                  <span className="platform-fallback hidden text-xl font-bold text-gray-700">
                    {platform.fallbackText}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

