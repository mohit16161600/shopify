'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function ProductCard({ item }) {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (item.variants && item.variants.length > 0) {
      addToCart(item, item.variants[0], 1);
    } else {
      // Fallback for products without variants
      const basicVariant = {
        id: 'default',
        name: 'Default',
        price: item.price,
        originalPrice: item.originalPrice
      };
      addToCart(item, basicVariant, 1);
    }
  };

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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Product Image with Discount Badge */}
      <Link href={`/product/${item.id}`}>
        <div className="relative cursor-pointer">
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
      </Link>
      <div className="p-3">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-1">
          {renderStars(item.rating)}
          <span className="text-xs text-gray-600">
            {item.rating} ({item.reviews})
          </span>
        </div>

        {/* Brand Name */}
        <p className="text-xs text-gray-500 mb-1">{item.brand}</p>

        {/* Product Name */}
        <Link href={`/product/${item.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-10 hover:text-green-600 transition cursor-pointer">
            {item.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
          {item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
          )}
        </div>

        {/* Loyalty Reward */}
        <p className="inline-flex items-center gap-2 mb-4 text-xs font-bold text-[#8A6E1A] 
       bg-[#FFF8E7] px-4 py-1.5 rounded-full border border-[#E8CF68] shadow-[0_2px_6px_rgba(232,207,104,0.5)]">

          <span className="w-6 h-6 bg-gradient-to-br from-[#FFE58A] to-[#E8CF68] 
          rounded-full shadow-inner flex items-center justify-center text-lg">
            🪙
          </span>

          <span className="tracking-wide">Earn {item.loyaltyCoins} Coins</span>
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition relative"
          >
            <img
              src="/image/shopping-cart.png"
              alt="Add to Cart"
              className="w-5 h-5"
            />
            {cartItems.filter(cartItem => cartItem.productId === item.id).reduce((total, cartItem) => total + cartItem.quantity, 0) > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {cartItems.filter(cartItem => cartItem.productId === item.id).reduce((total, cartItem) => total + cartItem.quantity, 0)}
              </span>
            )}
          </button>
          <Link href={`/product/${item.id}`} className="flex-1">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition text-sm">
              BUY NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
