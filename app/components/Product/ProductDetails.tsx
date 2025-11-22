'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBanner from '@/app/components/Home/header/TopBanner';
import MainHeader from '@/app/components/Home/header/MainHeader';
import Footer from '@/app/components/Footer';
import { productDetails } from '@/app/lib/productDetails';
import { products } from '@/app/lib/newproducts';
import ProductCard from '@/app/components/Home/ProductCard';
import { useCart } from '@/app/context/CartContext';

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400 text-lg">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300 text-lg">★</span>
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    router.push('/checkout');
  };

  // Get frequently bought together products
  const frequentlyBoughtProducts = product.frequentlyBoughtTogether
    .map(id => {
      // Try to get from productDetails first, then fallback to products array
      const detailedProduct = productDetails[id];
      if (detailedProduct) {
        return {
          id: detailedProduct.id,
          name: detailedProduct.name,
          brand: detailedProduct.brand,
          price: detailedProduct.price,
          originalPrice: detailedProduct.originalPrice,
          discount: detailedProduct.discount,
          rating: detailedProduct.rating,
          reviews: detailedProduct.reviews,
          loyaltyCoins: detailedProduct.loyaltyCoins,
          image: detailedProduct.images[0]
        };
      }
      return products.find(p => p.id === id);
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <MainHeader />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                    selectedImageIndex === index
                      ? 'border-green-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-sm text-gray-500 uppercase">{product.brand}</p>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              {renderStars(product.rating)}
              <span className="text-lg text-gray-700">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  ₹{selectedVariant.price * quantity}
                </span>
                {selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-xl md:text-2xl text-gray-500 line-through">
                    ₹{selectedVariant.originalPrice * quantity}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-red-500 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                You save ₹{(selectedVariant.originalPrice - selectedVariant.price) * quantity}
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Select Package:
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1);
                    }}
                    className={`px-3 md:px-4 py-2 rounded-lg border-2 transition text-left ${
                      selectedVariant.id === variant.id
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs md:text-sm font-medium">{variant.name}</div>
                    <div className="text-xs text-gray-600">
                      ₹{variant.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Loyalty Coins */}
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#8A6E1A] bg-[#FFF8E7] px-4 py-2 rounded-full border border-[#E8CF68]">
              <span className="text-lg">🪙</span>
              <span>Earn {product.loyaltyCoins * quantity} Coins</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg transition flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <img
                  src="/image/shopping-cart.png"
                  alt="Cart"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg transition text-sm md:text-base"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Key Benefits */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.keyBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {product.faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between text-left py-2"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-gray-600">
                    {openFaqIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openFaqIndex === index && (
                  <p className="text-gray-700 mt-2 pl-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <div className="space-y-6">
            {product.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <div className="flex items-center gap-2">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-gray-500">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Bought Together */}
        {frequentlyBoughtProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {frequentlyBoughtProducts.map((p) => (
                <ProductCard key={p.id} item={p} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

