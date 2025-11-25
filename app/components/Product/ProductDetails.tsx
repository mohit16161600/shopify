'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBanner from '@/app/components/Home/header/TopBanner';
import MainHeader from '@/app/components/Home/header/MainHeader';
import Footer from '@/app/components/Footer';
// import { productDetails } from '@/app/lib/productDetails';
// import { products } from '@/app/lib/newproducts';
import ProductCard from '@/app/components/Home/ProductCard';
import { useCart } from '@/app/context/CartContext';

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { addToCart, cartItems } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    router.push('/checkout');
  };

  // Get frequently bought together products
  // Currently empty in DB, so this will be empty
  const frequentlyBoughtProducts: any[] = [];
  /* 
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
  */

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
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${selectedImageIndex === index
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
              <div className="flex flex-col gap-3">
                {product.variants.map((variant) => {
                  const discountPercentage = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
                  const coins = Math.round(variant.price * 0.05);
                  const months = parseInt(variant.name) || 1;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setQuantity(1);
                      }}
                      className={`w-full flex items-center p-3 rounded-lg border transition-all ${selectedVariant.id === variant.id
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                    >
                      {/* Radio Circle */}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${selectedVariant.id === variant.id
                        ? 'border-green-600'
                        : 'border-gray-400'
                        }`}>
                        {selectedVariant.id === variant.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left text-sm md:text-base text-gray-700">
                        <span>
                          {months} {months > 1 ? 'months' : 'month'} ({months} {months > 1 ? 'Units' : 'Unit'}):
                        </span>
                        <span className="font-bold mx-1">
                          ₹{variant.price.toLocaleString()}
                        </span>
                        <span className="text-green-600 font-medium">
                          @{discountPercentage}% off
                        </span>
                        <span className="text-gray-600 ml-1">
                          {' '}[Get {coins} Sheopals Coins]
                        </span>
                      </div>
                    </button>
                  );
                })}
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
                  className="w-10 h-10 rounded-lg border border-gray-600 text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center text-gray-600">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-600 text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Loyalty Coins */}
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#8A6E1A] bg-[#FFF8E7] px-4 py-2 rounded-full border border-[#E8CF68]">
              <span className="text-lg">🪙</span>
              <span>Earn {Math.round(selectedVariant.price * 0.05) * quantity} Sheopals Coins</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg transition flex items-center justify-center gap-2 text-sm md:text-base relative"
              >
                <img
                  src="/image/shopping-cart.png"
                  alt="Cart"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                Add to Cart
                {cartItems.find(item => item.productId === product.id && item.variant.id === selectedVariant.id)?.quantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {cartItems.find(item => item.productId === product.id && item.variant.id === selectedVariant.id)?.quantity}
                  </span>
                )}
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
        {product.description && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}

        {/* Key Benefits */}
        {product.keyBenefits && product.keyBenefits.length > 0 && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.keyBenefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: benefit }} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Ingredients */}
        {product.keyIngredients && product.keyIngredients.length > 0 && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Ingredients</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {product.keyIngredients.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {item.image && (
                    <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border border-gray-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to Use */}
        {product.howToUse && (product.howToUse.steps?.length > 0 || product.howToUse.media) && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.howToUse.headline || 'How to Use'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.howToUse.media && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={product.howToUse.media}
                    title="How to Use"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="space-y-4">
                {product.howToUse.steps && product.howToUse.steps.map((step: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Celebrity / Doctor Advice */}
        {(product.celebrity || product.doctorAdvice) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {product.celebrity && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{product.celebrity.headline || 'Celebrity Endorsement'}</h2>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={product.celebrity.media}
                    title={product.celebrity.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="font-bold text-lg">{product.celebrity.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.celebrity.profession}</p>
                <p className="text-gray-700 italic">"{product.celebrity.description}"</p>
              </div>
            )}
            {product.doctorAdvice && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{product.doctorAdvice.headline || 'Doctor Advice'}</h2>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={product.doctorAdvice.media}
                    title="Doctor Advice"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {product.doctorAdvice.description && <p className="text-gray-700">{product.doctorAdvice.description}</p>}
              </div>
            )}
          </div>
        )}

        {/* FAQs */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {product.faqs.map((faq: any, index: number) => (
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
        )}

        {/* Testimonials */}
        {product.testimonials && product.testimonials.length > 0 && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Real Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {product.testimonials.map((testimonial: any, index: number) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden">
                  {testimonial.type === 'youtube' ? (
                    <iframe
                      src={testimonial.url.replace('watch?v=', 'embed/')}
                      title="Customer Review"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Video Placeholder</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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

