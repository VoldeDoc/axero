import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageLayout from "@/components/Layout/LandingPageLayout";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchModal from "./Tools/SearchModal";
import RecommendedStays from "./recommendedStays";
import TonightDeals from "./nightDeal";
import TopDestinations from "./destinations";
import TravelRewards from "./Rewards";
import TravelStories from "./TravelStories";
import Testimonials from "./Testimonials";
import FAQ from "./Questions";
import { useCountryTranslate } from "@/hooks/useCountry";
import ChatButton from "./Tools/AiChat";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { selectedCountry } = useCountryTranslate();

  const words = ["Hotels", "Resorts", "Stays", "Apartments"];
  
  const backgroundImages = [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsSearchModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <LandingPageLayout>
      <>
        <div className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center">
            {backgroundImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url('${image}')`,
                  filter: "brightness(0.6)",
                }}
              />
            ))}
          </div>

          <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
            {/* Desktop Headline */}
            <h1 className="hidden md:block text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 animate-fade-in leading-tight">
              Verified{" "}
              <span className="relative inline-block align-top w-[200px] lg:w-[240px] xl:w-[300px] h-[1.2em]">
                {words.map((word, index) => (
                  <span
                    key={word}
                    className={`absolute left-1/2 top-0 transform -translate-x-1/2 transition-all duration-500 ease-in-out whitespace-nowrap text-white ${
                      index === currentWordIndex 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-5'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </span>{" "}
              for the best prices. No surprises!
            </h1>

            {/* Mobile Headline */}
            <h1 className="block md:hidden text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in leading-tight">
              Verified{" "}
              <span className="relative inline-block align-top w-[140px] sm:w-[120px] h-[1.2em]">
                {words.map((word, index) => (
                  <span
                    key={word}
                    className={`absolute left-1/2 top-0 transform -translate-x-1/2 transition-all duration-500 ease-in-out whitespace-nowrap text-white text-[0.95em] sm:text-[0.9em] ${
                      index === currentWordIndex 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </span>{" "}
              for the best prices. No surprises!
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 max-w-4xl opacity-90 px-4">
              Experience the vibrant cities that define {selectedCountry.name}
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-sm md:max-w-2xl lg:max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 md:p-6 mx-4">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <div className="flex-1">
                  <div 
                    className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 md:px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={handleSearchClick}
                  >
                    <MagnifyingGlassIcon className="text-gray-400 mr-2 md:mr-3 w-5 h-5 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Where are you going tonight?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={handleSearchClick}
                      className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 text-sm md:text-base cursor-pointer"
                      readOnly
                    />
                  </div>
                </div>
                <button
                  onClick={handleSearchClick}
                  className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-[length:400%_400%] animate-shimmer text-white rounded-lg px-6 md:px-8 py-3 hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out font-semibold text-sm md:text-base relative overflow-hidden group"
                >
                  <span className="relative z-10">Search</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 lg:gap-6 mt-8 md:mt-10 w-full max-w-4xl px-4">
              <button
                onClick={() => navigate("/hotels")}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-6 lg:px-8 py-3 lg:py-4 hover:bg-white/30 transition-all duration-300 font-medium text-base lg:text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Browse Hotels</span>
                <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button
                onClick={() => navigate("/packages")}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-6 lg:px-8 py-3 lg:py-4 hover:bg-white/30 transition-all duration-300 font-medium text-base lg:text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Tour Packages</span>
                <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button
                onClick={() => navigate("/list-property")}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-6 lg:px-8 py-3 lg:py-4 hover:bg-white/30 transition-all duration-300 font-medium text-base lg:text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">List Property</span>
                <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="block md:hidden mt-6 w-full max-w-xs px-4">
              <button
                onClick={() => navigate("/hotels")}
                className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-6 py-3 hover:bg-white/30 transition-all duration-300 font-medium text-base relative overflow-hidden group"
              >
                <span className="relative z-10">Browse Hotels</span>
                <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchModalOpen} 
          onClose={handleCloseModal} 
        />

        {/* Components */}
        <RecommendedStays/>
        <ChatButton />
        <TonightDeals/>
        <TopDestinations/>
        <TravelRewards/>
        <TravelStories/>
        <Testimonials/>
        <FAQ/>
      </>
    </LandingPageLayout>
  );
}