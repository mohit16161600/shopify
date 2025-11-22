import ProductCard from "./ProductCard";
import { products } from "@/app/lib/powerpackcombo";

export default function ProductSection() {
  return (
    <div>
      <section className="py-2 px-5 ">
      <h2 className="text-2xl font-bold  text-gray-900">Powerpack Combo</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>
    <section className="flex justify-center mt-4 mb-8 ">
    <button className="bg-gray-950 text-amber-50 hover:bg-green-700 hover:text-white px-2 py-2 rounded-md bg cursor-pointer">View All Products</button>
  </section>
    </div>
  );
}

