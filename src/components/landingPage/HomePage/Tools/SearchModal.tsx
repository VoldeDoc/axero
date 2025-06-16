import { XMarkIcon, MapPinIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useHotels from '@/hooks/useHotel';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchFormData {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
}

interface LocationSuggestion {
  id: string;
  name: string;
  type: 'city' | 'hotel' | 'landmark' | 'country' | 'region';
  country?: string;
  region?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  hotelData?: any;
}

const schema = yup.object({
  destination: yup.string().required('Destination is required'),
  checkIn: yup.string().required('Check-in date is required'),
  checkOut: yup.string().required('Check-out date is required'),
  rooms: yup.number().min(1, 'At least 1 room required').required(),
  adults: yup.number().min(1, 'At least 1 adult required').required(),
  children: yup.number().min(0, 'Children cannot be negative').required(),
});

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // Location suggestions state
  const [locationQuery, setLocationQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the hotels hook
  const { getHotels, loading: hotelsLoading } = useHotels();

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<SearchFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      destination: '',
      checkIn: today,
      checkOut: tomorrow,
      rooms: 1,
      adults: 2,
      children: 0,
    }
  });

  const watchCheckIn = watch('checkIn');

  // Get location suggestions from your API only
  const getLocationSuggestions = async (query: string): Promise<LocationSuggestion[]> => {
    if (!query || query.length < 2) return [];
    
    try {
      const suggestions: LocationSuggestion[] = [];
      
      console.log('🔍 Searching hotels for destination suggestions:', query);
      
      // Get hotel suggestions from your API
      const hotelsResponse = await getHotels();
      
      if (hotelsResponse && hotelsResponse.hotels) {
        // Filter hotels by location/name matching query
        const matchingHotels = hotelsResponse.hotels.filter(hotel => 
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.address.toLowerCase().includes(query.toLowerCase()) ||
          hotel.location?.toLowerCase().includes(query.toLowerCase())
        );

        // Extract unique locations from hotels
        const cities = new Set<string>();
        const countries = new Set<string>();
        const regions = new Set<string>();
        
        matchingHotels.forEach(hotel => {
          // Add hotel as suggestion
          suggestions.push({
            id: `hotel-${hotel.id}`,
            name: hotel.name,
            type: 'hotel',
            country: hotel.location?.split(',').pop()?.trim(),
            region: hotel.location?.split(',')[0]?.trim(),
            hotelData: hotel
          });

          // Extract cities from hotel location
          if (hotel.location) {
            const locationParts = hotel.location.split(',').map(part => part.trim());
            
            // First part is usually city
            if (locationParts.length > 0 && locationParts[0].toLowerCase().includes(query.toLowerCase())) {
              cities.add(locationParts[0]);
            }
            
            // Last part is usually country
            if (locationParts.length > 1 && locationParts[locationParts.length - 1].toLowerCase().includes(query.toLowerCase())) {
              countries.add(locationParts[locationParts.length - 1]);
            }
            
            // Middle parts might be regions/states
            if (locationParts.length > 2) {
              locationParts.slice(1, -1).forEach(part => {
                if (part.toLowerCase().includes(query.toLowerCase())) {
                  regions.add(part);
                }
              });
            }
          }
          
          // Extract cities from hotel address
          if (hotel.address) {
            const addressParts = hotel.address.split(',').map(part => part.trim());
            addressParts.forEach(part => {
              if (part.toLowerCase().includes(query.toLowerCase()) && part.length > 2) {
                cities.add(part);
              }
            });
          }
        });

        // Add city suggestions
        Array.from(cities).forEach(city => {
          if (!suggestions.some(s => s.name.toLowerCase() === city.toLowerCase())) {
            suggestions.push({
              id: `city-${city.replace(/\s+/g, '-').toLowerCase()}`,
              name: city,
              type: 'city',
              region: city
            });
          }
        });

        // Add region suggestions
        Array.from(regions).forEach(region => {
          if (!suggestions.some(s => s.name.toLowerCase() === region.toLowerCase())) {
            suggestions.push({
              id: `region-${region.replace(/\s+/g, '-').toLowerCase()}`,
              name: region,
              type: 'region',
              region: region
            });
          }
        });

        // Add country suggestions
        Array.from(countries).forEach(country => {
          if (!suggestions.some(s => s.name.toLowerCase() === country.toLowerCase())) {
            suggestions.push({
              id: `country-${country.replace(/\s+/g, '-').toLowerCase()}`,
              name: country,
              type: 'country',
              country: country
            });
          }
        });

        console.log(`✅ Found ${suggestions.length} destination suggestions from API`);
      }

      // Remove duplicates and limit results
      const uniqueSuggestions = suggestions.filter((suggestion, index, self) =>
        index === self.findIndex(s => s.name.toLowerCase() === suggestion.name.toLowerCase())
      );

      // Sort suggestions by relevance (hotels first, then cities, then regions, then countries)
      const sortedSuggestions = uniqueSuggestions.sort((a, b) => {
        const typeOrder = { hotel: 0, city: 1, region: 2, country: 3, landmark: 4 };
        const aOrder = typeOrder[a.type] || 5;
        const bOrder = typeOrder[b.type] || 5;
        
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        
        // Secondary sort by name relevance (starts with query first)
        const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase());
        const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase());
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        
        // Tertiary sort alphabetically
        return a.name.localeCompare(b.name);
      });

      return sortedSuggestions.slice(0, 8);
      
    } catch (error) {
      console.error('❌ Error fetching destination suggestions:', error);
      return [];
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset({
        destination: '',
        checkIn: today,
        checkOut: tomorrow,
        rooms: 1,
        adults: 2,
        children: 0,
      });
      setRooms(1);
      setAdults(2);
      setChildren(0);
      setLocationQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  }, [isOpen, reset, today, tomorrow]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle location input changes with debouncing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (locationQuery.length >= 2) {
        setLoadingSuggestions(true);
        try {
          const results = await getLocationSuggestions(locationQuery);
          setSuggestions(results);
          setShowSuggestions(true);
          setSelectedSuggestionIndex(-1);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [locationQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleLocationSelect(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const increment = (field: 'rooms' | 'adults' | 'children') => {
    if (field === 'rooms') {
      const newValue = rooms + 1;
      setRooms(newValue);
      setValue('rooms', newValue);
    } else if (field === 'adults') {
      const newValue = adults + 1;
      setAdults(newValue);
      setValue('adults', newValue);
    } else {
      const newValue = children + 1;
      setChildren(newValue);
      setValue('children', newValue);
    }
  };

  const decrement = (field: 'rooms' | 'adults' | 'children') => {
    if (field === 'rooms' && rooms > 1) {
      const newValue = rooms - 1;
      setRooms(newValue);
      setValue('rooms', newValue);
    } else if (field === 'adults' && adults > 1) {
      const newValue = adults - 1;
      setAdults(newValue);
      setValue('adults', newValue);
    } else if (field === 'children' && children > 0) {
      const newValue = children - 1;
      setChildren(newValue);
      setValue('children', newValue);
    }
  };

  const handleLocationSelect = (suggestion: LocationSuggestion) => {
    setLocationQuery(suggestion.name);
    setValue('destination', suggestion.name);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationQuery(value);
    setValue('destination', value);
  };

  const onSubmit = (data: SearchFormData) => {
    console.log('🔍 Submitting search with data:', data);
    
    const searchParams = new URLSearchParams({
      destination: data.destination,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      rooms: data.rooms.toString(),
      adults: data.adults.toString(),
      children: data.children.toString(),
    });
    
    navigate(`/search-results?${searchParams.toString()}`);
    onClose();
  };

  // Get icon for suggestion type
  const getSuggestionIcon = (type: LocationSuggestion['type']) => {
    switch (type) {
      case 'hotel':
        return '🏨';
      case 'landmark':
        return '🏛️';
      case 'country':
        return '🏳️';
      case 'region':
        return '🌍';
      default:
        return '🏙️';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        {/* Modal panel */}
        <div 
          className="relative w-full max-w-2xl transform overflow-visible rounded-2xl bg-white dark:bg-gray-800 p-6 text-left shadow-xl transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Find Your Perfect Stay
            </h3>
            <button
              type="button"
              className="rounded-lg p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Destination with Suggestions */}
            <div className="relative" ref={suggestionsRef}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPinIcon className="w-5 h-5 inline mr-2" />
                Where are you going?
              </label>
              <input
                {...register('destination')}
                ref={inputRef}
                type="text"
                placeholder="Search destinations, cities, or hotels..."
                value={locationQuery}
                onChange={handleInputChange}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                autoComplete="off"
              />
              
              {/* Loading Indicator - Shows directly under input */}
              {loadingSuggestions && locationQuery.length >= 2 && (
                <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 mr-2"></div>
                  <span className="text-sm">Searching destinations...</span>
                </div>
              )}
              
              {/* Suggestions Dropdown - Shows after loading is complete */}
              {showSuggestions && !loadingSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => handleLocationSelect(suggestion)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0 ${
                        index === selectedSuggestionIndex ? 'bg-gray-50 dark:bg-gray-600' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-600 mr-3 flex-shrink-0">
                          <span className="text-sm">{getSuggestionIcon(suggestion.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white truncate">
                            {suggestion.name}
                          </div>
                          {(suggestion.country || suggestion.region) && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {suggestion.region && suggestion.region !== suggestion.name && `${suggestion.region}, `}
                              {suggestion.country && suggestion.country !== suggestion.name && suggestion.country}
                            </div>
                          )}
                          {suggestion.hotelData && (
                            <div className="text-xs text-green-600 dark:text-green-400">
                              {suggestion.hotelData.rating}⭐ • {suggestion.hotelData.location}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 capitalize ml-2 flex-shrink-0">
                          {suggestion.type}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* No Results Message */}
              {showSuggestions && !loadingSuggestions && suggestions.length === 0 && locationQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    <span className="text-sm">No destinations found for "{locationQuery}"</span>
                  </div>
                </div>
              )}
              
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
              )}
            </div>

            {/* Check-in and Check-out Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <CalendarIcon className="w-5 h-5 inline mr-2" />
                  Check-in
                </label>
                <input
                  {...register('checkIn')}
                  type="date"
                  min={today}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.checkIn && (
                  <p className="mt-1 text-sm text-red-600">{errors.checkIn.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <CalendarIcon className="w-5 h-5 inline mr-2" />
                  Check-out
                </label>
                <input
                  {...register('checkOut')}
                  type="date"
                  min={watchCheckIn || tomorrow}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.checkOut && (
                  <p className="mt-1 text-sm text-red-600">{errors.checkOut.message}</p>
                )}
              </div>
            </div>

            {/* Guests and Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                <UserGroupIcon className="w-5 h-5 inline mr-2" />
                Guests & Rooms
              </label>
              
              <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Rooms</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => decrement('rooms')}
                      disabled={rooms <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => increment('rooms')}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Adults</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Ages 13+</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => decrement('adults')}
                      disabled={adults <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{adults}</span>
                    <button
                      type="button"
                      onClick={() => increment('adults')}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Children</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Ages 0-12</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => decrement('children')}
                      disabled={children <= 0}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{children}</span>
                    <button
                      type="button"
                      onClick={() => increment('children')}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden inputs for form submission */}
            <input type="hidden" {...register('rooms')} value={rooms} />
            <input type="hidden" {...register('adults')} value={adults} />
            <input type="hidden" {...register('children')} value={children} />

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={hotelsLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {hotelsLoading ? 'Searching...' : 'Search Hotels'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}