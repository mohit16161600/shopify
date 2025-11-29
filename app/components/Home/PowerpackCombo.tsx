'use client';

import { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import Link from 'next/link';

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?category=Combos');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching powerpack combo products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section className="py-2 px-5 ">
        <h2 className="text-2xl font-bold  text-gray-900">Powerpack Combo</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {products.slice(0, 4).map((p: any) => (
            <ProductCard key={p.id} item={p} />
          ))}
        </div>
      </section>
      <section className="flex justify-center mt-4 mb-8 ">
        <Link href="/category?view_category=Combos">
          <button className="bg-gray-950 text-white hover:bg-green-700 px-4 md:px-6 py-2 md:py-3 rounded-md cursor-pointer transition font-semibold">View All Products</button>
        </Link>
      </section>
    </div>
  );
}

