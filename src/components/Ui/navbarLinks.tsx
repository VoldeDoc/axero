import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// Define TypeScript interface for link structure
interface NavbarLink {
  title: string;
  url: string;
  dropdown?: { title: string; url: string }[];
}

const links: NavbarLink[] = [
  {
    title: "Hotels",
    url: "/hotels",
  },
  {
    title: "Tour Packages",
    url: "/packages",
  },
  {
    title: "List My Property",
    url: "/list-property",
  },
  { 
    title: "More",
    url: "#",
    dropdown: [
      { title: "Late night deals", url: "/late-night-deals" },
      { title: "Travel Diaries", url: "/travel-diaries" },
      { title: "Become a tour operator", url: "/tour-operator" },
      { title: "Become travel affiliate", url: "/travel-affiliate" },
      { title: "Refer & Earn", url: "/refer-earn" },
    ]
  },
];

export default function NavbarLinks() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleDropdownClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    toggleDropdown(index);
  };

  return (
    <>
      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        {links.map((link, index) =>
          link.dropdown ? (
            <div className="relative" key={index}>
              <button
                onClick={(e) => handleDropdownClick(e, index)}
                className="px-4 py-2 font-bold text-black dark:text-white hover:text-blue-500 transition-colors flex items-center"
              >
                {link.title}
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${openDropdown === index ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === index && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    {link.dropdown.map((sublink, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={sublink.url}
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {sublink.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={index}
              to={link.url}
              className={({ isActive }) =>
                `px-4 py-2 font-bold text-black dark:text-white hover:text-blue-500 transition-colors ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              {link.title}
            </NavLink>
          )
        )}
      </div>

      {/* Mobile Links */}
      <div className="md:hidden space-y-2">
        {links.map((link, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between">
              {link.dropdown ? (
                <button
                  onClick={(e) => handleDropdownClick(e, index)}
                  className="flex items-center justify-between w-full font-bold px-4 py-2 text-xl text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  {link.title}
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${openDropdown === index ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    `block font-bold px-4 py-2 text-xl w-full ${
                      isActive
                        ? "bg-blue-700 text-white rounded-lg"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    } transition-colors`
                  }
                >
                  {link.title}
                </NavLink>
              )}
            </div>
            {link.dropdown && openDropdown === index && (
              <div className="mt-2 ml-4 bg-gray-50 dark:bg-gray-700 border-l-2 border-blue-500 rounded-md">
                <ul className="py-2">
                  {link.dropdown.map((sublink, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={sublink.url}
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-600 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {sublink.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}