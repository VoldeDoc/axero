import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LandingPageLayout from '@/components/Layout/LandingPageLayout';
import { 
  FunnelIcon, 
  MapPinIcon, 
  StarIcon, 
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarIcon,
  HeartIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import useHotels from '@/hooks/useHotel';
import { useCountryTranslate } from '@/hooks/useCountry';

// Use the TransformedHotel interface from your hook
interface Hotel {
  id: string;
  name: string;
  address: string;
  location?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  amenities: {
    wifi: boolean;
    gym: boolean;
    parking: boolean;
  };
  description?: string;
  images?: string[];
  rooms?: any[];
}

interface SearchFilters {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
  sortBy: string;
}

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-1">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
      <div className="md:col-span-2 space-y-3">
        <div className="flex justify-between">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
          ))}
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
      </div>
    </div>
  </div>
);

// Error State Component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center py-12">
    <div className="text-red-400 mb-4">
      <ExclamationTriangleIcon className="w-16 h-16 mx-auto" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
      Unable to load hotels
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4">
      There was an error loading hotel data. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [likedHotels, setLikedHotels] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    sortBy: 'price'
  });

  // Get search parameters
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const rooms = searchParams.get('rooms') || '1';
  const adults = searchParams.get('adults') || '2';
  const children = searchParams.get('children') || '0';

  // Hooks
  const { formatPrice } = useCountryTranslate();
  const { loading: apiLoading, error: apiError, getHotels, searchHotels } = useHotels();

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();

  // Fetch hotels based on search parameters
  useEffect(() => {
    fetchHotels();
  }, [destination, checkIn, checkOut, rooms, adults, children]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Searching hotels with params:', {
        destination,
        checkIn,
        checkOut,
        rooms,
        adults,
        children
      });

      let hotelsData;

      if (destination) {
        // If we have a destination, use search function
        console.log('🎯 Searching by destination:', destination);
        hotelsData = await searchHotels(destination);
      } else {
        // Otherwise get all hotels
        console.log('📋 Getting all hotels');
        const response = await getHotels();
        hotelsData = response.hotels;
      }
      
      if (!Array.isArray(hotelsData)) {
        console.error('❌ Invalid API response format:', hotelsData);
        throw new Error('Invalid response format from API');
      }

      if (hotelsData.length === 0) {
        console.log('ℹ️ No hotels found for the search criteria');
        setHotels([]);
        return;
      }

      console.log(`✅ Successfully loaded ${hotelsData.length} hotels from API`);
      setHotels(hotelsData);
      
    } catch (error: any) {
      console.error('❌ Error fetching hotels:', error);
      setError(error.message || 'Failed to load hotels');
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    fetchHotels();
  };

  const toggleLike = (hotelId: string) => {
    const newLikedHotels = new Set(likedHotels);
    if (newLikedHotels.has(hotelId)) {
      newLikedHotels.delete(hotelId);
    } else {
      newLikedHotels.add(hotelId);
    }
    setLikedHotels(newLikedHotels);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredAndSortedHotels = hotels
    .filter(hotel => {
      // Price filter
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) return false;
      
      // Rating filter
      if (hotel.rating < filters.rating) return false;
      
      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasRequiredAmenities = filters.amenities.every(amenity => 
          hotel.amenities[amenity as keyof typeof hotel.amenities]
        );
        if (!hasRequiredAmenities) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      rating: 0,
      amenities: [],
      sortBy: 'price'
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (loading || apiLoading) {
    return (
      <LandingPageLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            {/* Header Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4 animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Skeleton */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4 animate-pulse" />
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Results Skeleton */}
              <div className="lg:col-span-3 space-y-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </LandingPageLayout>
    );
  }

  return (
    <LandingPageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          {/* API Error Banner */}
          {(error || apiError) && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>Error:</strong> {error || apiError}
                  </p>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={retryFetch}
                    className="text-sm text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {destination ? `Hotels in ${destination}` : 'Available Hotels'}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-2" />
                <span className="font-medium">Guests:</span> 
                <span className="ml-1">{adults} adults{children !== '0' && `, ${children} children`}</span>
              </div>
              
              <div className="flex items-center">
                <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                <span className="font-medium">Rooms:</span> 
                <span className="ml-1">{rooms}</span>
              </div>
              
              {checkIn && (
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Check-in:</span> 
                  <span className="ml-1">{formatDate(checkIn)}</span>
                </div>
              )}
              
              {checkOut && (
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Check-out:</span> 
                  <span className="ml-1">{formatDate(checkOut)}</span>
                </div>
              )}
            </div>
            
            {nights > 0 && (
              <div className="mt-3 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Duration:</span> 
                <span className="ml-1 text-green-600 dark:text-green-400 font-medium">
                  {nights} {nights === 1 ? 'night' : 'nights'}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-green-600 hover:text-green-700 dark:text-green-400"
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range (per night)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-green-500"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1, 0].map(rating => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => updateFilter('rating', rating)}
                          className="mr-2 accent-green-500"
                        />
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {rating > 0 ? `${rating}+ stars` : 'Any rating'}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {['wifi', 'gym', 'parking'].map(amenity => (
                      <label key={amenity} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFilter('amenities', [...filters.amenities, amenity]);
                            } else {
                              updateFilter('amenities', filters.amenities.filter(a => a !== amenity));
                            }
                          }}
                          className="mr-2 accent-green-500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {amenity === 'wifi' ? 'Free WiFi' : amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="name">Name (A to Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Mobile Filter Toggle & Results Count */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredAndSortedHotels.length} hotels found
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-700 dark:text-gray-300"
                  >
                    <FunnelIcon className="w-5 h-5 mr-2" />
                    Filters
                  </button>
                </div>
              </div>

              {/* Error State */}
              {error && !loading && hotels.length === 0 && (
                <ErrorState onRetry={retryFetch} />
              )}

              {/* Hotel Cards */}
              {!error && (
                <div className="space-y-6">
                  {filteredAndSortedHotels.map((hotel) => (
                    <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        <div className="md:col-span-1 relative">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                            }}
                          />
                          
                          {/* Like Button */}
                          <button
                            onClick={() => toggleLike(hotel.id)}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                            aria-label={likedHotels.has(hotel.id) ? 'Unlike' : 'Like'}
                          >
                            {likedHotels.has(hotel.id) ? (
                              <HeartSolidIcon className="w-5 h-5 text-red-500" />
                            ) : (
                              <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            )}
                          </button>

                          {/* Discount Badge */}
                          {hotel.originalPrice && (
                            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                              {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
                            </div>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {hotel.name}
                              </h3>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <div className="text-2xl font-bold text-green-600">
                                  {formatPrice(hotel.price)}
                                </div>
                                {hotel.originalPrice && (
                                  <div className="text-lg text-gray-500 line-through">
                                    {formatPrice(hotel.originalPrice)}
                                  </div>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                per night
                              </div>
                              {nights > 0 && (
                                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                                  {formatPrice(hotel.price * nights)} total
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-gray-600 dark:text-gray-400">{hotel.address}</span>
                          </div>
                          
                          <div className="flex items-center mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(hotel.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                              {hotel.rating}/5
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(hotel.amenities)
                              .filter(([_, value]) => value)
                              .map(([amenity], index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full capitalize"
                                >
                                  {amenity === 'wifi' ? 'Free WiFi' : amenity}
                                </span>
                              ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {hotel.location && `📍 ${hotel.location}`}
                            </div>
                            
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!error && !loading && filteredAndSortedHotels.length === 0 && hotels.length > 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <BuildingOfficeIcon className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No hotels match your filters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* No Hotels Found */}
              {!error && !loading && hotels.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <BuildingOfficeIcon className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No hotels found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {destination ? `No hotels found in "${destination}"` : 'No hotels available at the moment'}
                  </p>
                  <button
                    onClick={retryFetch}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
}