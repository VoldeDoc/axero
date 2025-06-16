import { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  UsersIcon, 
  TagIcon, 
  XCircleIcon 
} from '@heroicons/react/24/solid';

export default function Headline() {
  const [currentMiddleIndex, setCurrentMiddleIndex] = useState(0);

  const middleMessages = [
    {
      title: "Thousands of travelers trust us.",
      subtitle: "Why wouldn't you?",
      icon: <UsersIcon className="w-6 h-6 text-green-600" />
    },
    {
      title: "50% off Hotels Tonight.",
      subtitle: "Starts in 9hr :6m",
      icon: <TagIcon className="w-6 h-6 text-green-600" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMiddleIndex((prevIndex) => 
        (prevIndex + 1) % middleMessages.length
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 py-3">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-green-700 dark:text-green-400">
                Instant booking confirmation.
              </h3>
              <p className="text-xs text-green-600 dark:text-green-500">
                Your hotel is confirmed in less than 2 mins.
              </p>
            </div>
          </div>

          {/* Middle Section with Animation */}
          <div className="flex items-center justify-center space-x-3 relative overflow-hidden">
            {middleMessages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentMiddleIndex
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-4'
                }`}
              >
                {message.icon}
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-green-700 dark:text-green-400">
                    {message.title}
                  </h3>
                  <p className="text-xs text-green-600 dark:text-green-500">
                    {message.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-end space-x-3">
            <XCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="text-right">
              <h3 className="text-sm font-semibold text-green-700 dark:text-green-400">
                Free cancellation.
              </h3>
              <p className="text-xs text-green-600 dark:text-green-500">
                Instant refunds on canceled bookings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}