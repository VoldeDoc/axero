import { useState, useEffect } from 'react';
import { HeartIcon, StarIcon, WifiIcon, BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import useHotels from '@/hooks/useHotel';
import { useCountryTranslate } from '@/hooks/useCountry';

interface Stay {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  amenities: {
    wifi: boolean;
    gym: boolean;
    parking: boolean;
  };
}

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
    {/* Image Skeleton */}
    <div className="relative">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      
      {/* Like Button Skeleton */}
      <div className="absolute top-3 right-3 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
      
      {/* Discount Badge Skeleton */}
      <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
    </div>

    {/* Card Content Skeleton */}
    <div className="p-5">
      {/* Address Skeleton */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />

      {/* Name Skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
      </div>

      {/* Rating Skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
      </div>

      {/* Amenities Skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6 animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10 animate-pulse" />
        </div>
      </div>

      {/* Price Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    </div>
  </div>
);

export default function RecommendedStays() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedStays, setLikedStays] = useState<Set<string>>(new Set());
  const [stays, setStays] = useState<Stay[]>([]);
  
  // Use hooks
  const { formatPrice } = useCountryTranslate();
  const { loading, error, getRecommendedStays } = useHotels();

  // Fetch recommended stays on component mount
  useEffect(() => {
    fetchRecommendedStays();
  }, []);

  const fetchRecommendedStays = async () => {
    try {
      console.log('🏨 Starting to fetch recommended stays...');
      
      const staysData = await getRecommendedStays();
      console.log(' Received stays data:', staysData);
      
      if (!Array.isArray(staysData)) {
        console.error(' Stays data is not an array:', staysData);
        setStays([]);
        return;
      }

      if (staysData.length === 0) {
        console.log(' No stays found, showing empty state');
        setStays([]);
        return;
      }
      
      // Transform to Stay interface
      const transformedStays: Stay[] = staysData.map((hotel, index) => {
        console.log(`🔄 Transforming stay ${index + 1}:`, hotel);
        
        try {
          return {
            id: hotel.id || `stay-${index}`,
            name: hotel.name || 'Unknown Hotel',
            address: hotel.address || 'Address not available',
            image: hotel.image || 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: Math.max(1, Math.min(5, hotel.rating || 4.0)), // Ensure rating is between 1-5
            price: Math.max(0, hotel.price || 0), // Ensure price is not negative
            originalPrice: hotel.originalPrice,
            amenities: hotel.amenities || {
              wifi: false,
              gym: false,
              parking: false
            }
          };
        } catch (transformError) {
          console.error(` Error transforming stay ${index + 1}:`, transformError);
          return {
            id: `error-stay-${index}`,
            name: 'Hotel (Details Loading...)',
            address: 'Address not available',
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.0,
            price: 0,
            amenities: { wifi: false, gym: false, parking: false }
          };
        }
      }).filter(stay => stay !== null); // Remove any null stays
      
      setStays(transformedStays);
      console.log(` Successfully loaded ${transformedStays.length} recommended stays`);
    } catch (error) {
      console.error(' Failed to fetch recommended stays:', error);
     
      setStays([]);
    }
  };

  const toggleLike = (stayId: string) => {
    const newLikedStays = new Set(likedStays);
    if (newLikedStays.has(stayId)) {
      newLikedStays.delete(stayId);
    } else {
      newLikedStays.add(stayId);
    }
    setLikedStays(newLikedStays);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(stays.length / getItemsPerSlide()));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(stays.length / getItemsPerSlide()) - 1 : prevIndex - 1
    );
  };

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
    }
    return 1; // sm
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8 md:mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-6 animate-pulse" />
            
            {/* Action Button Skeleton */}
            <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-4">Error: {error}</p>
            <button 
              onClick={fetchRecommendedStays}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No stays state
  if (stays.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recommended Stays for You
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              No recommended stays available at the moment. Check back later!
            </p>
            <button 
              onClick={fetchRecommendedStays}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Refresh Stays
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Stays for You
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Accommodations with the best offers for a memorable stay. ({stays.length} stays available)
          </p>

          {/* Action Button */}
          <button 
            onClick={fetchRecommendedStays}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Stays
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {stays.length > getItemsPerSlide() && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous slides"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next slides"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(stays.length / getItemsPerSlide()) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stays
                      .slice(slideIndex * getItemsPerSlide(), (slideIndex + 1) * getItemsPerSlide())
                      .map((stay) => (
                        <div key={stay.id} className="group">
                          {/* Card */}
                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                            {/* Image Container */}
                            <div className="relative">
                              <img
                                src={stay.image}
                                alt={stay.name}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                                }}
                              />
                              
                              {/* Like Button */}
                              <button
                                onClick={() => toggleLike(stay.id)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                aria-label={likedStays.has(stay.id) ? 'Unlike' : 'Like'}
                              >
                                {likedStays.has(stay.id) ? (
                                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                                ) : (
                                  <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                )}
                              </button>

                              {/* Discount Badge */}
                              {stay.originalPrice && (
                                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                                  {Math.round(((stay.originalPrice - stay.price) / stay.originalPrice) * 100)}% OFF
                                </div>
                              )}
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                              {/* Address */}
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
                                {stay.address}
                              </p>

                              {/* Name */}
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                {stay.name}
                              </h3>

                              {/* Rating */}
                              <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
                                    {stay.rating.toFixed(1)}
                                  </span>
                                </div>
                              </div>

                              {/* Amenities */}
                              <div className="flex items-center gap-3 mb-4">
                                <div className={`flex items-center gap-1 ${stay.amenities.wifi ? 'text-green-600' : 'text-gray-300'}`}>
                                  <WifiIcon className="w-4 h-4" />
                                  <span className="text-xs">WiFi</span>
                                </div>
                                <div className={`flex items-center gap-1 ${stay.amenities.gym ? 'text-green-600' : 'text-gray-300'}`}>
                                  <BuildingOfficeIcon className="w-4 h-4" />
                                  <span className="text-xs">Gym</span>
                                </div>
                                <div className={`flex items-center gap-1 ${stay.amenities.parking ? 'text-green-600' : 'text-gray-300'}`}>
                                  <MapPinIcon className="w-4 h-4" />
                                  <span className="text-xs">Parking</span>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                      {formatPrice(stay.price)}
                                    </span>
                                    {stay.originalPrice && (
                                      <span className="text-lg text-gray-500 line-through">
                                        {formatPrice(stay.originalPrice)}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-500">per night</span>
                                </div>
                              </div>

                              {/* Book Button */}
                              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {stays.length > getItemsPerSlide() && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(stays.length / getItemsPerSlide()) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}