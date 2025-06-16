import { useState } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useCountryTranslate } from '@/hooks/useCountry';

interface Testimonial {
  id: number;
  name: string;
  message: string;
  rating: number;
  avatar?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Yusuf O.",
    message: "Thank you for your support. I had a good time at the hotel.",
    rating: 5,
  },
  {
    id: 2,
    name: "Matilda S.",
    message: "The customer service was absolutely amazing.",
    rating: 5,
  },
  {
    id: 3,
    name: "Stanley C.",
    message: "Thank you for the service rendered.",
    rating: 5,
  },
  {
    id: 4,
    name: "Godfrey E.",
    message: "I enjoyed my stay and the service. Thank you.",
    rating: 5,
  },
  {
    id: 5,
    name: "Attahiru A.",
    message: "Great service. Keep it up. I will definitely book again.",
    rating: 5,
  },
];

// iPhone 14 Pro SVG Icon Component
const IPhone14ProIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="5"
      y="2"
      width="14"
      height="20"
      rx="3"
      ry="3"
      fill="url(#gradient)"
      stroke="#1f2937"
      strokeWidth="0.5"
    />
    <rect
      x="6"
      y="4"
      width="12"
      height="16"
      rx="1"
      fill="#000"
    />
    <circle cx="9" cy="5" r="0.5" fill="#333" />
    <rect x="10" y="4.5" width="4" height="1" rx="0.5" fill="#333" />
    <circle cx="12" cy="20.5" r="0.5" fill="#666" />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Use the hook for country context
  const { selectedCountry } = useCountryTranslate();

  // Auto-play testimonials
  useState(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  });

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Feedback from our customers
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            What our customers have to say about their experience in {selectedCountry.name}.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/50 to-blue-100/50 dark:from-green-900/20 dark:to-blue-900/20 rounded-full translate-y-12 -translate-x-12" />
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-6 italic leading-relaxed">
                  "{testimonialsData[currentIndex].message}"
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {renderStars(testimonialsData[currentIndex].rating)}
                </div>

                {/* Customer Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-3">
                    <IPhone14ProIcon className="w-8 h-8" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        {testimonialsData[currentIndex].name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Verified Customer from {selectedCountry.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              {/* Quote */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.message}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <IPhone14ProIcon className="w-6 h-6" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}