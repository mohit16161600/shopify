export default function ProductCard({ item }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400 text-sm">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300 text-sm">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white  rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Product Image with Discount Badge */}
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-auto rounded-lg object-cover" 
        />
        {item.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {item.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-3">

      {/* Rating */}
      <div className="flex items-center gap-2 mb-1">
        {renderStars(item.rating)}
        <span className="text-xs text-gray-600">
          {item.rating} ({item.reviews})
        </span>
      </div>

      {/* Brand Name */}
      <p className="text-xs text-gray-500 mb-1 ">{item.brand}</p>

      {/* Product Name */}
      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-10">
        {item.name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
        {item.originalPrice > item.price && (
          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
        )}
      </div>

      {/* Loyalty Reward */}
      <p className="text-xs text-gray-600 mb-3">Earn {item.loyaltyCoins} Coins</p>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition">
          <img 
            src="/image/shopping-cart.png" 
            alt="Add to Cart" 
            className="w-5 h-5" 
          />
        </button>
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition text-sm">
          BUY NOW
        </button>
      </div>
    </div>
    </div>
  );
}
  