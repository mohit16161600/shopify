'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopBanner from '@/app/components/Home/header/TopBanner';
import MainHeader from '@/app/components/Home/header/MainHeader';
import Footer from '@/app/components/Footer';
import { useCart } from '@/app/context/CartContext';

// Dynamic configuration - can be moved to a config file or environment variables
const PAYMENT_CONFIG = {
  onlineDiscountPercent: 15, // 15% discount for online payment
  partialPaymentAmount: 200, // ₹200 for partial payment
  taxPercent: 18, // GST percentage
  freeShippingThreshold: 500, // Free shipping above this amount
  shippingCharge: 50
};

// Coupon type definition
type CouponType = {
  discount: number;
  type: 'percent' | 'fixed';
};

type AppliedCoupon = CouponType & {
  code: string;
};

// Coupon codes - can be moved to a database or API
const COUPONS: { [key: string]: CouponType } = {
  'SAVE10': { discount: 10, type: 'percent' }, // 10% discount
  'SAVE20': { discount: 20, type: 'percent' }, // 20% discount
  'FLAT100': { discount: 100, type: 'fixed' }, // ₹100 flat discount
  'WELCOME': { discount: 15, type: 'percent' }, // 15% discount
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.toUpperCase().trim();
    
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (COUPONS[code]) {
      setAppliedCoupon({ code, ...COUPONS[code] });
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleRemoveClick = (itemId: string) => {
    setItemToRemove(itemId);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    const orderData = {
      items: cartItems,
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      paymentMethodDiscount: paymentMethodDiscount,
      couponDiscount: couponDiscount,
      total: finalTotal,
      paymentMethod: formData.paymentMethod,
      paymentAmount: getPaymentAmount(),
      customer: formData,
      appliedCoupon: appliedCoupon?.code || null
    };
    
    console.log('Order placed:', orderData);
    
    setOrderPlaced(true);
    clearCart();
    
    // Redirect to order confirmation after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  // Calculate discounts and totals
  const subtotal = getCartTotal();
  const shipping = subtotal > PAYMENT_CONFIG.freeShippingThreshold ? 0 : PAYMENT_CONFIG.shippingCharge;
  
  // Calculate coupon discount
  const calculateCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percent') {
      return (subtotal * appliedCoupon.discount) / 100;
    } else {
      return Math.min(appliedCoupon.discount, subtotal); // Fixed discount, but not more than subtotal
    }
  };
  
  const couponDiscount = calculateCouponDiscount();
  const subtotalAfterCoupon = subtotal - couponDiscount;
  
  // Calculate payment method discount (15% for online payment)
  const paymentMethodDiscount = formData.paymentMethod === 'online' 
    ? (subtotalAfterCoupon * PAYMENT_CONFIG.onlineDiscountPercent) / 100 
    : 0;
  
  const subtotalAfterDiscounts = subtotalAfterCoupon - paymentMethodDiscount;
  const tax = subtotalAfterDiscounts * (PAYMENT_CONFIG.taxPercent / 100);
  const finalTotal = Math.round(subtotalAfterDiscounts + shipping + tax);
 

  // Get payment amount based on payment method
  const getPaymentAmount = () => {
    if (formData.paymentMethod === 'partial') {
      return PAYMENT_CONFIG.partialPaymentAmount;
    }
    return finalTotal;
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBanner />
        <MainHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
              <p className="text-gray-600 mb-6">Thank you for your order. We'll send you a confirmation email shortly.</p>
              <Link
                href="/"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBanner />
        <MainHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-6">Add some products to your cart to continue.</p>
              <Link
                href="/"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <MainHeader />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm lg:sticky lg:top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">{item.productName}</h3>
                      <p className="text-xs text-gray-600 mb-2">{item.variant.name}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-8 text-center text-gray-600">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                          <button
                            onClick={() => handleRemoveClick(item.id)}
                            className="text-xs text-red-600 hover:text-red-800 mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="mb-4 pb-4 border-b">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
                  >
                    Apply
                  </button>
                </form>
                {appliedCoupon && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 p-2 rounded">
                    <span className="text-sm text-green-700">
                      Coupon <strong>{appliedCoupon.code}</strong> applied
                    </span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="mt-2 text-sm text-red-600">{couponError}</p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold">-₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                {paymentMethodDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Online Payment Discount ({PAYMENT_CONFIG.onlineDiscountPercent}%)</span>
                    <span className="font-semibold">-₹{paymentMethodDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-800">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST {PAYMENT_CONFIG.taxPercent}%)</span>
                  <span className="font-semibold text-gray-800">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-lg text-gray-500">Total</span>
                  <span className="font-bold text-lg text-gray-800">₹{finalTotal.toFixed(2)}</span>
                </div>
                
                {formData.paymentMethod === 'partial' && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Pay Now</span>
                      <span className="font-semibold text-green-600">₹{getPaymentAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pay on Delivery</span>
                      <span className="font-semibold text-gray-800">₹{(finalTotal - getPaymentAmount()).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form onSubmit={handlePlaceOrder} className="space-y-4 md:space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="partial"
                      checked={formData.paymentMethod === 'partial'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">Partial Payment</p>
                          <p className="text-sm text-gray-600">Pay ₹{PAYMENT_CONFIG.partialPaymentAmount} now and rest on delivery</p>
                        </div>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">Online Payment</p>
                          <p className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</p>
                        </div>
                        <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                          {PAYMENT_CONFIG.onlineDiscountPercent}% OFF
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg transition"
              >
                {
                  formData.paymentMethod === "partial"
                    ? `Pay ₹${getPaymentAmount().toFixed(2)} Now - Place Order`
                    : formData.paymentMethod === "cod"
                    ? "Order Now"
                    : formData.paymentMethod === "online"
                    ? `Pay Now - ₹${getPaymentAmount().toFixed(2)}`
                    : ""
                }

                
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {itemToRemove && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Remove Item?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Do you really want to remove this item from your cart?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelRemove}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

