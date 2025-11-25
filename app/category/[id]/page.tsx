'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import TopBanner from '@/app/components/Home/header/TopBanner';
import MainHeader from '@/app/components/Home/header/MainHeader';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/Home/ProductCard';

function CategoryContent() {
    const params = useParams();
    const categoryId = params.id;
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            if (!categoryId) return;

            try {
                setLoading(true);
                // Fetch products for this category
                const response = await fetch(`/api/products?categoryId=${categoryId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);

                    // Try to infer category name from the first product or fetch categories list
                    // For now, we'll try to fetch category details if needed, but let's see if we can get it from products
                    if (data.length > 0) {
                        // Assuming the API returns products with a category name or we can fetch it separately
                        // For now, let's just use a generic title or fetch categories
                    }
                }
            } catch (error) {
                console.error('Error fetching category products:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch('/api/categories');
                if (response.ok) {
                    const categories = await response.json();
                    const category = categories.find((c: any) => c.id == categoryId);
                    if (category) {
                        setCategoryName(category.name);
                    }
                }
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        if (categoryId) {
            fetchProducts();
            fetchCategoryDetails();
        }
    }, [categoryId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBanner />
            <MainHeader />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    {categoryName || 'Category Products'}
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
        <CategoryContent />
    );
}
