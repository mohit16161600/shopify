'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function MainHeader() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
      <div className="flex flex-wrap items-center justify-between p-2 md:p-4 bg-white gap-2 md:gap-5">
        {/* logo at left */}
        <Link href="/" className="flex items-center justify-start flex-shrink-0">
          <img src="/image/Logo2.avif" alt="Logo" className="w-auto h-8 md:h-10" />
        </Link>
  
        {/* search bar at center - hidden on mobile, shown on tablet+ */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const query = formData.get('q');
            if (query && query.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
            }
          }}
          className="hidden md:flex items-center justify-end grow mx-2 md:mx-4 order-3 md:order-2 w-full md:w-auto"
        >
          <input 
            type="text" 
            name="q"
            placeholder="Search products..." 
            className="w-full h-8 md:h-10 rounded-md border-2 border-gray-300 px-2 md:px-4 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
          />
        </form>
        
        {/* Mobile search icon - shown only on mobile */}
        <Link href="/search" className="md:hidden flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 order-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
        
        <div className="hidden">
            <button className="bg-green-900 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-sm md:text-base">Login</button>
        </div>
        
        <div className="hidden lg:flex items-center justify-end">
          <button className="bg-green-900 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-sm md:text-base">Get App</button>
        </div>

        <Link href="/checkout" className="hidden sm:flex items-center justify-end order-4">
          <button className="bg-green-900 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm whitespace-nowrap">Order</button>
        </Link>
        
        {/* Cart with count */}
        <Link href="/checkout" className="flex items-center justify-end relative order-5 flex-shrink-0">
          <div className="relative">
            <img src="/image/shopping-cart.png" alt="Cart" className="w-8 h-8 md:w-10 md:h-10" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    );
  }
  