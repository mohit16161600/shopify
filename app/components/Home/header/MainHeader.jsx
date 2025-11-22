export default function MainHeader() {
    return (
      <div className="flex items-center justify-between p-4 bg-white gap-5"> {/* Main container for header */}
        {/* logo at left */}
        <div className="flex items-center justify-start ">
          <img src="/image/Logo2.avif" alt="Logo" className="w-auto h-10" />
        </div>
  
        {/* search bar at center */}
        <div className="flex items-center justify-end flex-grow mx-4">
          <input type="text" placeholder="Search" className="w-full h-10 rounded-md border-2 border-gray-300" />
        </div>
        
        <div className="flex items-center justify-end hidden ">
            <button className="bg-green-900 text-white px-4 py-2 rounded-md">Login</button>
        </div>
        
        <div className="flex items-center justify-end hidden md:block lg:block ">
        <button className="bg-green-900 text-white px-4 py-2 rounded-md">Get App</button>
        </div>

        <div className="flex items-center justify-end  ">
        <button className="bg-green-900 text-white px-4 py-2 rounded-md">Order</button>
        </div>
        

        <div className="flex items-center justify-end  ">
            <img src="/image/shopping-cart.png" alt="User" className="w-10 h-10" />
        </div>

        
      </div>
    );
  }
  