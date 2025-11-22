'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TopBanner from '@/app/components/Home/header/TopBanner';
import MainHeader from '@/app/components/Home/header/MainHeader';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/Home/ProductCard';
import { products as newProducts } from '@/app/lib/newproducts';
import { products as bestSellerProducts } from '@/app/lib/bestseller';
import { products as powerpackProducts } from '@/app/lib/powerpackcombo';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);

  // Combine all products
  const allProducts = [...newProducts, ...bestSellerProducts, ...powerpackProducts];

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <MainHeader />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Search Products</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searchQuery.trim() && (
          <div>
            <p className="text-gray-700 mb-4">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No products found for "${searchQuery}"`
              }
            </p>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} item={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600 text-lg mb-4">No products match your search.</p>
                <Link
                  href="/"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Show all products if no search query */}
        {!searchQuery.trim() && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-900">Loading...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

