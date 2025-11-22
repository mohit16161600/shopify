import ProductCard from "./ProductCard";
import { products } from "@/app/lib/bestseller";

export default function ProductSection() {
  return (
    <>
    <section className="py-2 px-5 ">
      <h2 className="text-2xl font-bold  text-gray-900">Best Sellers</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>

      <section className="flex justify-center mt-4 mb-8 ">
      <button className="bg-gray-950 text-white hover:bg-green-700 px-4 md:px-6 py-2 md:py-3 rounded-md cursor-pointer transition font-semibold">View All Products</button>
    </section>
    </>
  );
}

