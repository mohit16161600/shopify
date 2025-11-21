import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function ProductSection() {
  return (
    <section className="py-10 px-5">
      <h2 className="text-2xl font-bold text-center">Our Best Sellers</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  );
}
