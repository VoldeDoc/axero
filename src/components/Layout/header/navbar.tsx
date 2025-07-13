import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GooeyNav from "@/components/Ui/GooeyNav";
import ToggleBtn from "@/components/Ui/toggleButton";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

// Navigation items for GooeyNav
const navItems = [
  { label: "Platform", href: "platform" },
  { label: "Use Cases", href: "use-cases" },
  { label: "Industries", href: "#industries" },
  { label: "Client Experience", href: "#client-experience" },
  { label: "Resources", href: "#resources" },
  { label: "About Us", href: "#about-us" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
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

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
        <nav className="container mx-auto flex justify-between items-center py-4 px-4 md:px-10">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img
                src="eofnpc0cx99-bg-removed-VizXpress.png"
                alt="navbar logo"
                className="h-14"
              />
            </Link>
            {/* GooeyNav for desktop */}
            <div className="hidden md:flex" style={{ height: '60px', position: 'relative' }}>
              <GooeyNav
                items={navItems}
                particleCount={12}
                initialActiveIndex={0}
                colors={[1, 2, 3, 4, 5, 6, 7, 8]}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                ${isDarkMode ? "bg-white text-blue-600" : "text-gray-700 dark:text-gray-300"}
              `}
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>
          <div className="md:hidden">
            <ToggleBtn
              navbarOpen={navbarOpen}
              handleToggle={handleToggle}
              className={`${isDarkMode
                  ? "bg-white text-gray-900"
                  : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                } p-2 rounded-lg transition-colors`}
            />
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${navbarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={handleToggle}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform md:hidden ${navbarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-800">
              <Link to="/" onClick={handleToggle}>
                <img src="Axero-cenbfa-cropped-VizXpress.png" alt="Logo" className="h-20" />
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
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={handleToggle}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile Theme Toggle */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  onClick={toggleTheme}
                  className={`flex items-center w-full p-4 rounded-xl transition-colors
                    ${isDarkMode ? "bg-white" : "bg-gray-50 dark:bg-gray-800"}
                    hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-4
                    ${isDarkMode ? "bg-white" : "bg-blue-100 dark:bg-blue-900"}
                  `}>
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}