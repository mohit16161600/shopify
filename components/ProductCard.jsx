export default function ProductCard({ item }) {
    return (
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
        <img src={item.image} className="rounded-lg" />
        <h3 className="mt-2 font-semibold">{item.name}</h3>
        <p className="text-gray-600">₹{item.price}</p>
  
        <button className="mt-3 w-full bg-black text-white py-2 rounded-lg">
          Add to Cart
        </button>
      </div>
    );
  }
  