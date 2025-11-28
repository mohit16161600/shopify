'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';

export default function MainHeader() {
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const cartCount = getCartCount();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : '';

  return (
    <div className="flex flex-wrap items-center justify-between p-2 md:p-4 bg-white gap-2 md:gap-5">
      {/* logo at left */}
      <Link href="/" className="flex items-center justify-start flex-shrink-0">
        <img src="/image/Logo2.avif" alt="Logo" className="w-auto h-8 md:h-10" />
      </Link>

      {/* search bar at center - hidden on mobile, shown on tablet+ */}
      {/* search bar at center - visible on all screens */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const query = formData.get('q');
          if (query && query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
          }
        }}
        className="flex items-center justify-end grow mx-2 md:mx-4 order-last md:order-2 w-full md:w-auto mt-2 md:mt-0"
      >
        <input
          type="text"
          name="q"
          placeholder="Search products..."
          className="w-full h-10 rounded-md border-2 border-gray-300 px-4 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </form>

      {/* <div className="hidden lg:flex items-center justify-end">
        <button className="bg-green-900 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-sm md:text-base">Get App</button>
      </div> */}

      {/* <Link href="/checkout" className="hidden sm:flex items-center justify-end order-4">
          <button className="bg-green-900 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm whitespace-nowrap">Order</button>
        </Link> */}

      {/* User Menu */}
      <div className="relative order-6 flex-shrink-0 z-500" ref={menuRef}>
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition"
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={user.firstName}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold text-sm md:text-base border-2 border-gray-300">
                  {userInitials || 'U'}
                </div>
              )}
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-green-900 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-sm md:text-base hover:bg-green-800 transition">
              Login
            </button>
          </Link>
        )}
      </div>

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

