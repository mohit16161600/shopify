export default function MainHeader() {
    return (
      <div className="relative w-full h-12 md:h-14 lg:h-14"> {/* Set responsive heights for different screen sizes */}
        <img 
          src="/image/top_banner_bg_img.png" 
          alt="Main Header" 
          className="w-full h-full object-cover" 
        />
        <p className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 md:px-8 text-white text-sm sm:text-base md:text-lg lg:text-xl font-normal">
          ADDITIONAL 10% OFF WITH SHEOPALS COINS {'  '}
          <span className="text-red-600 bg-white px-2 ml-2 font-bold hover:bg-gray-100 hover:text-red-700 rounded-md transition">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700"> GET APP</a>
          </span>
        </p>
      </div>
    );
  }
  