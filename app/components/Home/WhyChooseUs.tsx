export default function WhyChooseUs() {
  const sections = [
    {
      number: '01',
      heading: 'FORMULATED BY EXPERTS AT Sheopals ACADEMY OF AYURVEDA',
      description: 'Experts at Sheopals Academy of Ayurveda, PhD.\'s, and Sheopals with over 50 years of cumulative experience build formulations with scientifically and clinically tested ingredients, to make our proprietary products that help you reach your health goals.'
    },
    {
      number: '02',
      heading: 'THE BEST INGREDIENTS PASSED THROUGH TOUGHEST PROCESS',
      description: 'We go the extra mile to source the best ingredients like Shilajit from 18000 Ft. in the Himalayas, Aloe Vera from the Thar Desert, and Noni from Andamans. Our Hair Oils are made with herbs slowly heated with Oil for days or Body butter with Ghee 100 times washed. We manufacture our products in GMP-certified facilities, of which 8 are USFDA approved.'
    },
    {
      number: '03',
      heading: 'HOLISTIC SOLUTIONS FOR EVERY NEED',
      description: 'Be it acne, hair fall, or diabetes, we don\'t stop at just giving you products as that is just one element of solving your problem. We also give free health expert advice, personalized diet plans, and lifestyle recommendations including Yoga Asanas.'
    }
  ];
  const ChooseUs = [
    {
        mainHeading: 'Why Sheopals',
        subHeading: 'Healthy Body, Healthy Mind',
        description: 'Sheopals is a leading Ayurvedic brand that provides holistic solutions for every need. We offer a wide range of products for hair, skin, and body care. Our products are made with the best ingredients and are manufactured in GMP-certified facilities.'
    }
];
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="px-4 md:px-6 py-6 md:py-10 bg-gradient-to-b from-[#FFF8E7] to-white rounded-xl md:rounded-2xl shadow-md border border-yellow-200">
  
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black mb-2 md:mb-3 tracking-wide">
            {ChooseUs[0].mainHeading}
        </h2>

        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-green-600 mb-4 md:mb-6">
            {ChooseUs[0].subHeading}
        </h3>

        <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed bg-white/60 p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
            {ChooseUs[0].description}
        </p>

      </div>

    
    <section className="py-6 md:py-6 bg-white relative overflow-hidden">
      {/* Decorative botanical illustrations - Monstera leaves (top left) */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-56 md:h-64 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Large Monstera leaf */}
          <path d="M20,40 Q30,20 50,30 Q70,40 80,50 Q90,60 85,80 Q80,100 60,110 Q40,120 30,100 Q20,80 20,60 Z" 
                fill="#22c55e" opacity="0.4" />
          <path d="M30,50 Q40,35 55,45 Q70,55 75,70 Q80,85 70,95 Q60,105 50,90 Q40,75 35,60 Z" 
                fill="#16a34a" opacity="0.3" />
          {/* Small red leaves */}
          <circle cx="15" cy="30" r="4" fill="#ef4444" opacity="0.5" />
          <circle cx="25" cy="25" r="3" fill="#dc2626" opacity="0.4" />
        </svg>
      </div>

      {/* Lotus flower (top right) */}
      <div className="absolute top-10 right-0 w-32 h-32 md:w-44 md:h-44 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Lotus petals */}
          <ellipse cx="100" cy="80" rx="25" ry="40" fill="#ec4899" opacity="0.4" transform="rotate(-20 100 80)" />
          <ellipse cx="100" cy="80" rx="25" ry="40" fill="#f472b6" opacity="0.3" transform="rotate(20 100 80)" />
          <ellipse cx="100" cy="80" rx="25" ry="40" fill="#ec4899" opacity="0.35" transform="rotate(60 100 80)" />
          <ellipse cx="100" cy="80" rx="25" ry="40" fill="#f472b6" opacity="0.3" transform="rotate(-60 100 80)" />
          {/* Leaves */}
          <ellipse cx="80" cy="120" rx="30" ry="15" fill="#22c55e" opacity="0.3" />
          <ellipse cx="120" cy="120" rx="30" ry="15" fill="#16a34a" opacity="0.3" />
        </svg>
      </div>

      {/* Strawberries with WhatsApp icon (bottom right) */}
      <div className="absolute bottom-0 right-10 w-36 h-36 md:w-48 md:h-48 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Strawberry 1 */}
          <ellipse cx="80" cy="150" rx="20" ry="25" fill="#ef4444" opacity="0.5" />
          <circle cx="75" cy="140" r="2" fill="#dc2626" />
          <circle cx="85" cy="145" r="2" fill="#dc2626" />
          <circle cx="80" cy="150" r="2" fill="#dc2626" />
          {/* Leaves */}
          <path d="M70,130 Q75,125 80,130 Q85,125 90,130" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.5" />
          {/* Strawberry 2 */}
          <ellipse cx="120" cy="160" rx="18" ry="22" fill="#dc2626" opacity="0.4" />
          <circle cx="115" cy="150" r="1.5" fill="#b91c1c" />
          <circle cx="125" cy="155" r="1.5" fill="#b91c1c" />
          {/* Small yellow flowers */}
          <circle cx="100" cy="120" r="3" fill="#fbbf24" opacity="0.6" />
          <circle cx="110" cy="115" r="2.5" fill="#f59e0b" opacity="0.5" />
          {/* WhatsApp icon overlay */}
          <circle cx="140" cy="140" r="12" fill="#25D366" opacity="0.7" />
          <path d="M135,140 L140,145 L150,135" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {sections.map((section, index) => (
            <div key={index} className="relative">
              {/* Large Number */}
              <div className="mb-4">
                <span className="text-6xl md:text-7xl font-bold text-orange-600 leading-none">
                  {section.number}
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-lg md:text-xl font-bold text-black uppercase mb-4 leading-tight">
                {section.heading}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

