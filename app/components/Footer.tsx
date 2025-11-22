import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company Information & Social Media */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Sheopal&apos;s®</h2>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Ayurvedic Health & Beauty Products
              </p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              We are a trusted brand in ayurvedic health and beauty care products, offering a diverse range of Hair & Skin care, Weight loss, Immunity Booster products.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="hover:opacity-80 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.372 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.87-1.878.093-.35.056-.475-.19-.785l-.607-2.405c-.15-.595-.3-1.193-.3-1.612 0-1.521 1.112-2.799 2.5-2.799 1.179 0 1.75.884 1.75 2.037 0 1.268-.805 2.35-1.2 3.65-.34 1.3.98 2.362 2.2 2.362 2.64 0 4.466-2.78 4.466-6.8 0-2.9-2.086-4.93-5.066-4.93-3.45 0-5.48 2.588-5.48 5.376 0 1.006.388 2.088.89 2.45.1.06.114.112.084.207l-.3 1.18c-.05.2-.16.24-.37.15-1.38-.64-2.24-2.65-2.24-4.27 0-3.45 2.52-6.62 7.27-6.62 3.82 0 6.78 2.78 6.78 6.48 0 3.8-2.39 6.85-5.83 6.85-1.14 0-2.21-.59-2.58-1.38l-.7 2.67c-.26.99-1.01 2.23-1.5 2.99z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Download Our App Section */}
            <div className="mt-8">
              <p className="text-sm font-medium mb-3">Download Our App</p>
              <div className="flex flex-row gap-3">
                <a href="#" className="inline-block">
                  <img 
                    src="/image/Google_Play_Store_badge_EN_svg.png" 
                    alt="Get it on Google Play" 
                    className="h-10 w-auto"
                  />
                </a>
                <a href="#" className="inline-block">
                  <img 
                    src="/image/Download_on_the_App_Store_Badge_svg.webp" 
                    alt="Download on the App Store" 
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <h3 className="text-lg font-semibold">Location</h3>
              </div>
              <p className="text-sm text-gray-400 ml-7">
                Plot no-E-44/10, Okhla phase-2,<br />
                New Delhi 110020 India
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <h3 className="text-lg font-semibold">Contact Us</h3>
              </div>
              <p className="text-sm text-gray-400 ml-7">
                +91 9999212172
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <h3 className="text-lg font-semibold">Email</h3>
              </div>
              <div className="text-sm text-gray-400 ml-7 space-y-1">
                <p>support@sheopals.com</p>
                <p>care@sheopals.in</p>
              </div>
            </div>
          </div>

          {/* Column 3: Legal Disclaimer */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal Disclaimer</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-sm text-gray-400 hover:text-white transition">
                  Term Of Use
                </Link>
              </li>
              <li>
                <Link href="/return-replacement" className="text-sm text-gray-400 hover:text-white transition">
                  Return & Replacement Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-cancellation" className="text-sm text-gray-400 hover:text-white transition">
                  Shipping & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/legal-disclaimer" className="text-sm text-gray-400 hover:text-white transition">
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/our-story" className="text-sm text-gray-400 hover:text-white transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonial" className="text-sm text-gray-400 hover:text-white transition">
                  Testimonial
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-sm text-gray-400 hover:text-white transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-sm text-gray-400 hover:text-white transition">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-sm text-gray-400 hover:text-white transition">
                  Join Affiliate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: E-commerce Platforms */}
        <div className="border-t border-gray-800 pt-8 mt-8 ">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-medium">Also Available on</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="#" className="text-white hover:opacity-80 transition font-semibold text-sm">
                  amazon
                </a>
                <a href="#" className="text-white hover:opacity-80 transition font-semibold text-sm">
                  Flipkart
                </a>
                <a href="#" className="text-white hover:opacity-80 transition font-semibold text-sm">
                  meesho
                </a>
                <a href="#" className="text-white hover:opacity-80 transition font-semibold text-sm">
                  TATA 1mg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}

