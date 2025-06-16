import { useState, useEffect } from 'react';
import { BellIcon, XMarkIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon, StarIcon, WifiIcon, BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import useHotels from '@/hooks/useHotel';
import { useCountryTranslate } from '@/hooks/useCountry';

interface Deal {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  amenities: {
    wifi: boolean;
    gym: boolean;
    parking: boolean;
  };
}

interface NotificationForm {
  name: string;
  email: string;
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

export default function TonightDeals() {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 0, seconds: 0 });
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [likedDeals, setLikedDeals] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [notificationForm, setNotificationForm] = useState<NotificationForm>({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use hooks
  const { formatPrice } = useCountryTranslate();
  const { loading, error, getTonightDeals } = useHotels();

  // Fetch deals on component mount
  useEffect(() => {
    fetchTonightDeals();
  }, []);

  const fetchTonightDeals = async () => {
    try {
      console.log('🚀 Starting to fetch tonight deals...');
      
      const dealsData = await getTonightDeals();
      console.log('📦 Received deals data:', dealsData);
      
      if (!Array.isArray(dealsData)) {
        console.error('❌ Deals data is not an array:', dealsData);
        setDeals([]);
        return;
      }
      
      // Transform to Deal interface
      const transformedDeals: Deal[] = dealsData.map((hotel, index) => {
        console.log(`🔄 Transforming deal ${index + 1}:`, hotel);
        
        return {
          id: hotel.id || `deal-${index}`,
          name: hotel.name || 'Unknown Hotel',
          address: hotel.address || 'Address not available',
          image: hotel.image || 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          rating: hotel.rating || 4.0,
          price: hotel.price || 0,
          originalPrice: hotel.originalPrice,
          discount: hotel.discount,
          amenities: hotel.amenities || {
            wifi: false,
            gym: false,
            parking: false
          }
        };
      });
      
      setDeals(transformedDeals);
      console.log(`✅ Successfully loaded ${transformedDeals.length} deals`);
    } catch (error) {
      console.error('❌ Failed to fetch deals:', error);
      setDeals([]);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          return { hours: 7, minutes: 0, seconds: 0 };
        }
        
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        }
        
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleLike = (dealId: string) => {
    const newLikedDeals = new Set(likedDeals);
    if (newLikedDeals.has(dealId)) {
      newLikedDeals.delete(dealId);
    } else {
      newLikedDeals.add(dealId);
    }
    setLikedDeals(newLikedDeals);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(deals.length / getItemsPerSlide()));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(deals.length / getItemsPerSlide()) - 1 : prevIndex - 1
    );
  };

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Notification signup:', notificationForm);
    
    setIsSubmitting(false);
    setIsNotifyModalOpen(false);
    setNotificationForm({ name: '', email: '' });
    
    alert('Successfully subscribed! We\'ll notify you when new deals are available.');
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  // Loading state with skeleton
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full mb-4 animate-pulse">
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
            
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-6 animate-pulse" />

            {/* Action Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="w-28 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
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
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-4">Error: {error}</p>
            <button 
              onClick={fetchTonightDeals}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No deals state
  if (deals.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tonight's Exclusive Deals
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              No deals available at the moment. Check back later!
            </p>
            <button 
              onClick={fetchTonightDeals}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Refresh Deals
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Countdown */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ClockIcon className="w-4 h-4" />
            <span>
              Starts in {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tonight's Exclusive Deals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Limited-time offers on premium accommodations. Don't miss out! ({deals.length} deals available)
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              View All Deals
            </button>
            
            <button
              onClick={() => setIsNotifyModalOpen(true)}
              className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-500 dark:hover:text-red-400 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              <BellIcon className="w-5 h-5" />
              Notify Me
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {deals.length > getItemsPerSlide() && (
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
              {Array.from({ length: Math.ceil(deals.length / getItemsPerSlide()) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {deals
                      .slice(slideIndex * getItemsPerSlide(), (slideIndex + 1) * getItemsPerSlide())
                      .map((deal) => (
                        <div key={deal.id} className="group">
                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                            {/* Image Container */}
                            <div className="relative">
                              <img
                                src={deal.image}
                                alt={deal.name}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                                }}
                              />
                              
                              {/* Like Button */}
                              <button
                                onClick={() => toggleLike(deal.id)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                aria-label={likedDeals.has(deal.id) ? 'Unlike' : 'Like'}
                              >
                                {likedDeals.has(deal.id) ? (
                                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                                ) : (
                                  <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                )}
                              </button>

                              {/* Discount Badge */}
                              {deal.discount && (
                                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                                  {Math.round(deal.discount)}% OFF
                                </div>
                              )}
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                              {/* Address */}
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
                                {deal.address}
                              </p>

                              {/* Name */}
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                {deal.name}
                              </h3>

                              {/* Rating */}
                              <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
                                    {deal.rating.toFixed(1)}
                                  </span>
                                </div>
                              </div>

                              {/* Amenities */}
                              <div className="flex items-center gap-3 mb-4">
                                <div className={`flex items-center gap-1 ${deal.amenities.wifi ? 'text-green-600' : 'text-gray-300'}`}>
                                  <WifiIcon className="w-4 h-4" />
                                  <span className="text-xs">WiFi</span>
                                </div>
                                <div className={`flex items-center gap-1 ${deal.amenities.gym ? 'text-green-600' : 'text-gray-300'}`}>
                                  <BuildingOfficeIcon className="w-4 h-4" />
                                  <span className="text-xs">Gym</span>
                                </div>
                                <div className={`flex items-center gap-1 ${deal.amenities.parking ? 'text-green-600' : 'text-gray-300'}`}>
                                  <MapPinIcon className="w-4 h-4" />
                                  <span className="text-xs">Parking</span>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                      {formatPrice(deal.price)}
                                    </span>
                                    {deal.originalPrice && (
                                      <span className="text-lg text-gray-500 line-through">
                                        {formatPrice(deal.originalPrice)}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-500">per night</span>
                                </div>
                              </div>

                              {/* Book Button */}
                              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                                Book Deal
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
          {deals.length > getItemsPerSlide() && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(deals.length / getItemsPerSlide()) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notification Modal */}
        {isNotifyModalOpen && (
          <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={() => setIsNotifyModalOpen(false)}
              aria-hidden="true"
            />
            
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
              <div 
                className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left shadow-xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Get Notified
                  </h3>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsNotifyModalOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Be the first to know when new exclusive deals are available!
                </p>

                {/* Form */}
                <form onSubmit={handleNotificationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={notificationForm.name}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={notificationForm.email}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsNotifyModalOpen(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Notify Me'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}