import { MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="afsmyj5hkqp-bg-removed-VizXpress.png" alt="Axero Logo" className="h-32 w-32" />
            </div>
            {/* Address */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Intranet Software - Axero</h3>
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-sm leading-relaxed">
                  401 Park Avenue South,<br />
                  10th Floor,<br />
                  New York, NY 10016
                </p>
              </div>
              <div className="text-sm mt-2">
                <a href="tel:+18552937655" className="text-green-400 hover:underline font-semibold">+1-855-AXERO-55</a>
              </div>
            </div>
            {/* Social Media */}
            <div className="flex space-x-3 mt-4">
              <a href="#" aria-label="Twitter" className="hover:text-blue-400">
                <svg className="w-6 h-6 text-gray-400 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-blue-600">
                <svg className="w-6 h-6 text-gray-400 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-500">
                <svg className="w-6 h-6 text-gray-400 hover:text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
                <svg className="w-6 h-6 text-gray-400 hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-red-600">
                <svg className="w-6 h-6 text-gray-400 hover:text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.993 2.993 0 00-2.107-2.117C19.163 3.5 12 3.5 12 3.5s-7.163 0-9.391.569A2.993 2.993 0 00.502 6.186C0 8.414 0 12 0 12s0 3.586.502 5.814a2.993 2.993 0 002.107 2.117C4.837 20.5 12 20.5 12 20.5s7.163 0 9.391-.569a2.993 2.993 0 002.107-2.117C24 15.586 24 12 24 12s0-3.586-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm hover:text-green-400 transition">About Axero</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Newsroom</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Careers</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Contact Us</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Why Axero?</a>
            </nav>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm hover:text-green-400 transition">Feature Tour</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Mobile Intranet App</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Security and Compliance</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Intranet Integrations</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Intranet Pricing</a>
            </nav>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Use Cases</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm hover:text-green-400 transition">Employee Intranet</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Internal Communications</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Knowledge Management</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Team Collaboration</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Workplace Culture</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Remote Work</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">On Premise Intranet</a>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm hover:text-green-400 transition">What is an Intranet?</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">How to Launch an Intranet</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Intranet Blog</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Intranet ROI Calculator</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Free Intranet eBooks & Guides</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">Company intranet ideas</a>
              <a href="#" className="block text-sm hover:text-green-400 transition">HR Glossary</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Axero Solutions. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-green-400 transition">Terms</a>
              <a href="#" className="hover:text-green-400 transition">Privacy</a>
              <a href="#" className="hover:text-green-400 transition">GDPR</a>
              <a href="#" className="hover:text-green-400 transition">Cookies</a>
              <a href="#" className="hover:text-green-400 transition">Security</a>
              <a href="#" className="hover:text-green-400 transition">Support</a>
              <a href="#" className="hover:text-green-400 transition">Site Map</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;