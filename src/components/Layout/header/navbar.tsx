import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarLinks from "@/components/Ui/navbarLinks";
import ToggleBtn from "@/components/Ui/toggleButton";
import { ChevronDownIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface Country {
  name: string;
  code: string;
  currency: string;
  flag: string;
  language: string; // Added language property
}

const countries: Country[] = [
  { name: "United States", code: "US", currency: "USD", flag: "🇺🇸", language: "en" },
  { name: "United Kingdom", code: "UK", currency: "GBP", flag: "🇬🇧", language: "en" },
  { name: "Canada", code: "CA", currency: "CAD", flag: "🇨🇦", language: "en" },
  { name: "Australia", code: "AU", currency: "AUD", flag: "🇦🇺", language: "en" },
  { name: "Germany", code: "DE", currency: "EUR", flag: "🇩🇪", language: "de" },
  { name: "France", code: "FR", currency: "EUR", flag: "🇫🇷", language: "fr" },
  { name: "Japan", code: "JP", currency: "JPY", flag: "🇯🇵", language: "ja" },
  { name: "India", code: "IN", currency: "INR", flag: "🇮🇳", language: "hi" },
  { name: "Nigeria", code: "NG", currency: "NGN", flag: "🇳🇬", language: "en" },
  { name: "Brazil", code: "BR", currency: "BRL", flag: "🇧🇷", language: "pt" },
];

// // Exchange rates (NGN as base currency)
// const exchangeRates: Record<string, number> = {
//   "USD": 0.0013,
//   "GBP": 0.0010,
//   "CAD": 0.0017,
//   "AUD": 0.0019,
//   "EUR": 0.0011,
//   "JPY": 0.15,
//   "INR": 0.10,
//   "NGN": 1,
//   "BRL": 0.0063,
// };

// Declare global Google Translate function
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[8]); // Default to Nigeria
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Initialize theme and country from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedCountry = localStorage.getItem('selectedCountry');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedCountry) {
      const country = countries.find(c => c.code === savedCountry);
      if (country) setSelectedCountry(country);
    }
  }, []);

  // Initialize Google Translate
  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,de,ja,hi,pt,es,ar,zh,ko,ru,it,nl,sv,pl,tr',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
      }, 'google_translate_element');
    };

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    localStorage.setItem('selectedCountry', country.code);
    setShowCountryDropdown(false);
    
    // Trigger Google Translate to the selected language
    if (window.google && window.google.translate) {
      const translateElement = window.google.translate.TranslateElement.getInstance();
      if (translateElement) {
        // Change language automatically
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = country.language;
          selectElement.dispatchEvent(new Event('change'));
        }
      }
    }
  };


  // const formatPrice = (price: number): string => {
  //   const rate = exchangeRates[selectedCountry.currency] || 1;
  //   const convertedPrice = price * rate;
    
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: selectedCountry.currency,
  //     minimumFractionDigits: selectedCountry.currency === 'JPY' ? 0 : 2
  //   }).format(convertedPrice);
  // };

  return (
    <>
      <style>{`
        .gradient-shimmer {
          background: linear-gradient(
            -45deg,
            #22c55e,
            #16a34a,
            #15803d,
            #166534,
            #22c55e
          );
          background-size: 400% 400%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Hide Google Translate elements but keep functionality */
        #google_translate_element {
          display: none !important;
        }
        
        .goog-te-banner-frame {
          display: none !important;
        }
        
        .goog-te-menu-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }
        
        .goog-te-combo {
          display: none !important;
        }
        
        /* Style translated text */
        .goog-te-highlight {
          background: transparent !important;
          box-shadow: none !important;
        }
        
        /* Ensure dark mode compatibility */
        .goog-te-spinner-pos {
          display: none !important;
        }
      `}</style>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <header className="w-full bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
        <nav className="container mx-auto flex justify-between items-center py-4 px-4 md:px-10">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img
                src="assets/images/logo1.png"
                alt="navbar logo"
                className="h-14"
              />
            </Link>
            <div className="hidden md:flex">
              <NavbarLinks />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {/* Country Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-xl mr-1">{selectedCountry.flag}</span>
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCountryDropdown && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  <div className="p-2">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => selectCountry(country)}
                        className={`w-full flex items-center px-3 py-2 text-left text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors rounded-md ${
                          selectedCountry.code === country.code 
                            ? 'bg-blue-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-xl mr-3">{country.flag}</span>
                        <div className="flex-1">
                          <div className="font-medium">{country.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{country.currency}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {/* Login Button */}
            <Link to="/auth/signin">
              <button className="gradient-shimmer text-white rounded-lg px-8 py-2 hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">
                Login
              </button>
            </Link>
          </div>
          <div className="md:hidden">
            <ToggleBtn navbarOpen={navbarOpen} handleToggle={handleToggle} />
          </div>
        </nav>
        
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
            navbarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleToggle}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform md:hidden ${
            navbarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-800">
              <Link to="/" onClick={handleToggle}>
                <img src="assets/images/logo.png" alt="Logo" className="h-20" />
              </Link>
              <button
                onClick={handleToggle}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <NavbarLinks />
              
              {/* Mobile Theme Toggle */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  onClick={toggleTheme}
                  className="flex items-center w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 mr-4">
                    {isDarkMode ? <SunIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" /> : <MoonIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Switch to {isDarkMode ? 'light' : 'dark'} theme
                    </div>
                  </div>
                </button>
              </div>

              {/* Mobile Country Selector */}
              <div>
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 mr-4">
                      <span className="text-xl">{selectedCountry.flag}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">{selectedCountry.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{selectedCountry.currency}</div>
                    </div>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showCountryDropdown && (
                  <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => selectCountry(country)}
                        className={`w-full flex items-center p-3 text-left rounded-lg transition-colors ${
                          selectedCountry.code === country.code 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-xl mr-3">{country.flag}</span>
                        <div>
                          <div className="font-medium">{country.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{country.currency}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Login Button */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <Link to="/auth/signin" onClick={handleToggle}>
                <button className="gradient-shimmer text-white w-full rounded-xl px-8 py-4 hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out font-semibold text-lg">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}