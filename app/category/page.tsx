'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TopBanner from '@/app/components/Home/header/TopBanner';
import MainHeader from '@/app/components/Home/header/MainHeader';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/Home/ProductCard';

function CategoryContent() {
    const searchParams = useSearchParams();
    const viewCategory = searchParams.get('view_category');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!viewCategory) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/auth/search?view_category=${encodeURIComponent(viewCategory)}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched products:', data);
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [viewCategory]);

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBanner />
            <MainHeader />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    {viewCategory ? viewCategory : 'Products'}
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : (
                    <>
                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} item={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg p-8 text-center">
                                <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default function CategoryPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CategoryContent />
        </Suspense>
    );
}
