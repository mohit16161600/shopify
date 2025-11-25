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
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Combine all products
  const allProducts = [...newProducts, ...bestSellerProducts, ...powerpackProducts];

  // Levenshtein distance for fuzzy search
  const levenshteinDistance = (a: string, b: string) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  useEffect(() => {
    if (query.trim()) {
      const lowerQuery = query.toLowerCase().trim();
      const results = allProducts.filter(product => {
        const name = product.name.toLowerCase();
        const brand = product.brand.toLowerCase();

        // Exact partial match (existing logic)
        if (name.includes(lowerQuery) || brand.includes(lowerQuery)) {
          return true;
        }

        // Fuzzy match
        // Split product name into words to check against query
        const words = [...name.split(' '), ...brand.split(' ')];
        return words.some(word => {
          const distance = levenshteinDistance(lowerQuery, word);
          // Allow max 3 edits, or fewer for short words
          const maxEdits = Math.min(3, Math.floor(word.length / 2));
          return distance <= maxEdits;
        });
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <MainHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Search Products</h1>

        {/* Search Results */}
        {query.trim() && (
          <div>
            <p className="text-gray-700 mb-4">
              {searchResults.length > 0
                ? `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''} for "${query}"`
                : `No products found for "${query}"`
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
        {!query.trim() && (
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

