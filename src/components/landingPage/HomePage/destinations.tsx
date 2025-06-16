import { useState } from 'react';
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Destination {
  id: number;
  name: string;
  state: string;
  description: string;
  image: string;
  hotelsCount: number;
  popularFor: string[];
}

const destinationsData: Destination[] = [
  {
    id: 1,
    name: "Lagos",
    state: "Lagos State",
    description: "Nigeria's commercial capital with vibrant nightlife and beautiful beaches",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 450,
    popularFor: ["Business", "Beaches", "Nightlife"]
  },
  {
    id: 2,
    name: "Abuja",
    state: "Federal Capital Territory",
    description: "The modern capital city known for its architectural marvels and government buildings",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 320,
    popularFor: ["Government", "Business", "Culture"]
  },
  {
    id: 3,
    name: "Calabar",
    state: "Cross River State",
    description: "Home to pristine beaches, rich culture, and the famous Calabar Carnival",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 180,
    popularFor: ["Carnival", "Beaches", "Culture"]
  },
  {
    id: 4,
    name: "Port Harcourt",
    state: "Rivers State",
    description: "The oil city with beautiful gardens, rivers, and vibrant cultural heritage",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 240,
    popularFor: ["Oil Industry", "Rivers", "Business"]
  },
  {
    id: 5,
    name: "Kano",
    state: "Kano State",
    description: "Ancient city rich in history, traditional architecture, and vibrant markets",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 150,
    popularFor: ["History", "Markets", "Culture"]
  },
  {
    id: 6,
    name: "Ibadan",
    state: "Oyo State",
    description: "Historic city known for its universities, ancient palaces, and cultural sites",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 200,
    popularFor: ["Education", "History", "Culture"]
  },
  {
    id: 7,
    name: "Jos",
    state: "Plateau State",
    description: "The city on the plateau with cool weather, beautiful landscapes, and tin mining heritage",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 120,
    popularFor: ["Cool Weather", "Tourism", "Mining"]
  },
  {
    id: 8,
    name: "Enugu",
    state: "Enugu State",
    description: "The coal city known for its hills, hospitality, and emerging business district",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: 160,
    popularFor: ["Coal Heritage", "Hills", "Business"]
  }
];

export default function TopDestinations() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Top Destinations in Nigeria
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the most beautiful and exciting places to visit across Nigeria
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinationsData.map((destination) => (
            <div
              key={destination.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Hotels Count Badge */}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 dark:text-white">
                  {destination.hotelsCount}+ hotels
                </div>

                {/* Location Icon */}
                <div className="absolute bottom-3 left-3 flex items-center text-white">
                  <MapPinIcon className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">{destination.state}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Destination Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {destination.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Popular For Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.popularFor.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {destination.popularFor.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                      +{destination.popularFor.length - 2}
                    </span>
                  )}
                </div>

                {/* Explore Button */}
                <button
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    hoveredCard === destination.id
                      ? 'bg-green-500 text-white transform scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                >
                  <span>Explore {destination.name}</span>
                  <ArrowRightIcon 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredCard === destination.id ? 'translate-x-1' : ''
                    }`} 
                  />
                </button>
              </div>

              {/* Hover Effect Border */}
              <div 
                className={`absolute inset-0 border-2 border-green-500 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                  hoveredCard === destination.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            <span>View All Destinations</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}