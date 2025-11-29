export default function WhyChooseUs() {
  const sections = [
    {
      number: '01',
      heading: 'Supported By Science, Curated For Perfection',
      description: 'At Sheopal’s, we believe that modern problems need modern solutions. Thus, we refine Ayurveda with scientific research with the help of leading Ayurvedic practitioners and scientists. All products are made under a license issued by the State Drug Authority by AYUSH, strict quality checking, and supported by science.',
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M20,40 Q30,20 50,30 Q70,40 80,50 Q90,60 85,80 Q80,100 60,110 Q40,120 30,100 Q20,80 20,60 Z" fill="#22c55e" opacity="0.8" />
          <path d="M30,50 Q40,35 55,45 Q70,55 75,70 Q80,85 70,95 Q60,105 50,90 Q40,75 35,60 Z" fill="#16a34a" opacity="0.6" />
          <circle cx="15" cy="30" r="4" fill="#ef4444" opacity="0.8" />
          <circle cx="25" cy="25" r="3" fill="#dc2626" opacity="0.7" />
        </svg>
      )
    },
    {
      number: '02',
      heading: 'Not Just Ingredients— We Source The Best of Nature for Ayurvedic Potency',
      description: 'Our commitments to purity and potency motivate us to select every herb, not only for its popularity but also for its active benefits and effectiveness. Best source natural herbs and sun-dried and then grinded with traditional grinding method to bring you the best products. All the products are produced under GMP-certified facilities and free from any harmful chemicals.',
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <ellipse cx="80" cy="150" rx="20" ry="25" fill="#ef4444" opacity="0.8" />
          <circle cx="75" cy="140" r="2" fill="#dc2626" />
          <circle cx="85" cy="145" r="2" fill="#dc2626" />
          <path d="M70,130 Q75,125 80,130 Q85,125 90,130" stroke="#22c55e" strokeWidth="2" fill="none" />
          <ellipse cx="120" cy="160" rx="18" ry="22" fill="#dc2626" opacity="0.7" />
          <circle cx="100" cy="120" r="3" fill="#fbbf24" opacity="0.8" />
        </svg>
      )
    },
    {
      number: '03',
      heading: 'Ayurveda is Not Just a Medicine, It’s a Way of Living',
      description: 'Get expert advice, curated fitness plan according to your body type with personalized diet and guided wellness practice to enhance the effectiveness of Ayurveda. Ayurveda takes 90 days to transform your health.',
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <ellipse cx="100" cy="80" rx="25" ry="40" fill="#ec4899" opacity="0.6" transform="rotate(-20 100 80)" />
          <ellipse cx="100" cy="80" rx="25" ry="40" fill="#f472b6" opacity="0.5" transform="rotate(20 100 80)" />
          <ellipse cx="80" cy="120" rx="30" ry="15" fill="#22c55e" opacity="0.5" />
          <ellipse cx="120" cy="120" rx="30" ry="15" fill="#16a34a" opacity="0.5" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header Section */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Sheopal’s — Your Trusted Ayurvedic Online Shop For Health & Wellness
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            At Sheopal’s, we put your health as our top priority and believe that wellness starts with nature; thus, our Ayurvedic formulations are designed to harmonize mind, body, and soul, delivering the best-sourced natural benefits to your doorsteps. Experts at Sheopal’s work day and night to combine centuries-old Ayurvedic excellence with modern science to create the best of Ayurveda, which is safe, gentle, effective, and rooted in the ancient wisdom of traditional medicine.
          </p>
        </div>

        {/* Cards Section */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'} items-center bg-[#F0FDF4] rounded-[3rem] p-8 md:p-12 gap-8 md:gap-16`}
            >
              {/* Text Content */}
              <div className="flex-1">
                <div className="text-6xl md:text-7xl font-medium text-green-600 mb-4">
                  {section.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Illustration */}
              <div className="w-full md:w-1/5 flex justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64">
                  {section.illustration}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

