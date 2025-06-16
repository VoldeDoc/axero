import { useState } from "react";
import axiosClient from "@/services/axios-client";

interface Amenity {
  icon: string;
  amenity: string;
  subItem: string;
}

interface Room {
  id: number;
  room_name: string;
  rooms_rates_per_night: number;
  rooms_capacity: number;
  rooms_type: string;
  rooms_class: string;
  rooms_bed_type: string;
  rooms_amenities: Amenity[];
  late_night_deals: boolean;
  late_night_room_rate_off: number;
  roomimages: Array<{
    id: number;
    image_url: string;
  }>;
  hotel: Hotel;
}

interface Hotel {
  id: number;
  hotel_name: string;
  property_type: string;
  describe_property: string;
  star_rating: number;
  location_building_address: string;
  location_state: string;
  location_city: string;
  location_country: string;
  amenities: Amenity[];
  main_photo: string[];
  exterior_photo: Array<{
    caption: string;
    imgPath: string;
  }>;
  check_in_time: string;
  check_out_time: string;
  hotel_late_night_deals: boolean;
  number_likes: number;
  number_clickes: number;
  state: {
    name: string;
    slug: string;
    country: {
      name: string;
    };
  };
  country: {
    name: string;
  };
  district: {
    name: string;
  };
}

interface HotelWithRooms {
  id: number;
  rooms: Room[];
}

interface HotelsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HotelWithRooms[];
}

// Transformed interfaces for components
interface TransformedHotel {
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
  description?: string;
  location?: string;
  images?: string[];
  rooms?: Room[];
}

function useHotels() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = axiosClient();

  // Helper function to extract amenities safely
  const extractAmenities = (amenities: Amenity[] = []) => {
    return {
      wifi: amenities.some(a => 
        a?.subItem?.toLowerCase().includes('wifi') || 
        a?.subItem?.toLowerCase().includes('internet')
      ),
      gym: amenities.some(a => 
        a?.subItem?.toLowerCase().includes('gym') || 
        a?.subItem?.toLowerCase().includes('fitness')
      ),
      parking: amenities.some(a => 
        a?.subItem?.toLowerCase().includes('parking')
      )
    };
  };

  // Helper function to transform API data
  const transformHotelData = (hotelData: HotelWithRooms): TransformedHotel[] => {
    console.log('🔄 Transforming hotel data:', hotelData);
        if (!hotelData || !hotelData.rooms || !Array.isArray(hotelData.rooms) || hotelData.rooms.length === 0) {
      console.log(' No rooms found in hotel data');
      return [];
    }

    return hotelData.rooms.map((room, index) => {
      console.log(`🏨 Processing room ${index + 1}:`, room);
      
      const hotel = room.hotel;
      if (!hotel) {
        console.log(` No hotel data in room ${index + 1}`);
        return null;
      }

      const basePrice = room.rooms_rates_per_night || 0;
      const hasDiscount = room.late_night_deals && room.late_night_room_rate_off > 0;
      const discountedPrice = hasDiscount ? basePrice - (basePrice * room.late_night_room_rate_off / 100) : basePrice;
      
      const transformedHotel: TransformedHotel = {
        id: `${hotel.id}-${room.id}`,
        name: `${hotel.hotel_name || 'Unknown Hotel'} - ${room.room_name || 'Room'}`,
        address: hotel.location_building_address || 'Address not available',
        image: room.roomimages?.[0]?.image_url || 
               hotel.main_photo?.[0] || 
               hotel.exterior_photo?.[0]?.imgPath ||
               'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        rating: hotel.star_rating || 4.0,
        price: discountedPrice,
        originalPrice: hasDiscount ? basePrice : undefined,
        discount: hasDiscount ? room.late_night_room_rate_off : undefined,
        amenities: extractAmenities([...(hotel.amenities || []), ...(room.rooms_amenities || [])]),
        description: hotel.describe_property || '',
        location: `${hotel.location_city || ''}, ${hotel.location_state || ''}`.replace(/^,\s*|,\s*$/g, ''),
        images: [
          ...(room.roomimages?.map(img => img.image_url) || []),
          ...(hotel.main_photo || []),
          ...(hotel.exterior_photo?.map(img => img.imgPath) || [])
        ].filter(Boolean),
        rooms: [room]
      };
      
      console.log(` Transformed room ${index + 1}:`, transformedHotel);
      return transformedHotel;
    }).filter(Boolean) as TransformedHotel[];
  };

  // Get tonight deals with JSON format
  const getTonightDeals = async (): Promise<TransformedHotel[]> => {
    setLoading(true);
    setError(null);
    try {
      
      // Use format=json instead of format=api
      const response = await client.get('/hotel/hotels/?format=json&page=1');
      console.log(' Full API Response:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from API');
      }

      const data: HotelsResponse = response.data;
      
      // Validate response structure
      if (!data.results || !Array.isArray(data.results)) {
        console.error(' Invalid response structure. Expected results array, got:', data);
        throw new Error('Invalid API response structure');
      }

      console.log(` Found ${data.results.length} hotel entries`);
      
      const dealsHotels: TransformedHotel[] = [];
      
      data.results.forEach((hotelData, index) => {
        console.log(` Processing hotel ${index + 1}:`, hotelData);
        
        try {
          const hotels = transformHotelData(hotelData);
          
          // Look for deals first
          const hotelsWithDeals = hotels.filter(hotel => hotel.discount && hotel.discount > 0);
          
          if (hotelsWithDeals.length > 0) {
            console.log(` Found ${hotelsWithDeals.length} deals in hotel ${index + 1}`);
            dealsHotels.push(...hotelsWithDeals);
          } else {
            // No deals found, add regular hotels as fallback
            console.log(` No deals in hotel ${index + 1}, adding regular hotels`);
            dealsHotels.push(...hotels.slice(0, 2)); // Take first 2 as fallback
          }
        } catch (transformError) {
          console.error(`Error transforming hotel ${index + 1}:`, transformError);
        }
      });

      // If we need more hotels for next page
      if (dealsHotels.length < 6 && data.next) {
        try {
          console.log(' Fetching next page for more deals...');
          const nextResponse = await client.get(`${data.next.replace('format=api', 'format=json')}`);
          const nextData: HotelsResponse = nextResponse.data;
          
          nextData.results.forEach(hotelData => {
            try {
              const hotels = transformHotelData(hotelData);
              const hotelsWithDeals = hotels.filter(hotel => hotel.discount && hotel.discount > 0);
              
              if (hotelsWithDeals.length > 0) {
                dealsHotels.push(...hotelsWithDeals);
              } else {
                dealsHotels.push(...hotels.slice(0, 1)); // Add one regular hotel
              }
            } catch (transformError) {
              console.error('Error transforming next page hotel:', transformError);
            }
          });
        } catch (nextError) {
          console.log('Could not fetch next page:', nextError);
        }
      }

      const finalDeals = dealsHotels.slice(0, 12);
      console.log(` Returning ${finalDeals.length} deals:`, finalDeals);
      
      return finalDeals;
    } catch (error) {
      console.error(" Error fetching tonight deals:", error);
      setError("Failed to fetch tonight deals");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get all hotels
  const getHotels = async (params?: {
    page?: number;
    limit?: number;
    location?: string;
    priceRange?: { min: number; max: number };
  }) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('format', 'json'); // Use json format
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await client.get(`/hotel/hotels/?${queryParams.toString()}`);
      const data: HotelsResponse = response.data;
      
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid API response structure');
      }
      
      const transformedHotels: TransformedHotel[] = [];
      
      data.results.forEach(hotelData => {
        try {
          const hotels = transformHotelData(hotelData);
          transformedHotels.push(...hotels);
        } catch (transformError) {
          console.error('Error transforming hotel data:', transformError);
        }
      });

      return {
        hotels: transformedHotels,
        pagination: {
          count: data.count,
          next: data.next,
          previous: data.previous
        }
      };
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setError("Failed to fetch hotels");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get single hotel details
  const getHotelDetails = async (id: string): Promise<TransformedHotel> => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.get(`/hotel/hotels/${id}/?format=json`);
      const transformedHotels = transformHotelData(response.data);
      return transformedHotels[0] || null;
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      setError("Failed to fetch hotel details");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get recommended stays
  const getRecommendedStays = async (): Promise<TransformedHotel[]> => {
    try {
      const response = await getTonightDeals(); // Reuse the same logic
      return response.sort((a, b) => b.rating - a.rating).slice(0, 12);
    } catch (error) {
      console.error("Error fetching recommended stays:", error);
      throw error;
    }
  };

  // Search hotels
  const searchHotels = async (searchQuery: string): Promise<TransformedHotel[]> => {
    try {
      const response = await getHotels(); // Get all and filter
      return response.hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching hotels:", error);
      throw error;
    }
  };

  return {
    loading,
    error,
    getHotels,
    getHotelDetails,
    getTonightDeals,
    getRecommendedStays,
    searchHotels,
  };
}

export default useHotels;