export default function MainHeader() {
    return (
      <div className="relative w-full h-12 md:h-12 lg:h-10"> {/* Set responsive heights for different screen sizes */}
        <img 
          src="/image/top_banner_bg_img.png" 
          alt="Main Header" 
          className="w-full h-full object-cover" 
        />
        <p className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 md:px-8 text-white text-sm sm:text-md md:text-lg lg:text-xl font-normal">
          ADDITIONAL 10% OFF WITH SHEOPALS COINS {'  '}
          <span className="text-red-500 bg-white px-2 ml-2 font-bold hover:bg-gray-400 hover:text-red-900 rounded-md ">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer"> GET APP</a>
          </span>
        </p>
      </div>
    );
  }
  