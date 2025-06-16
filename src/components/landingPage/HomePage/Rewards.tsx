import { useState } from 'react';
import { GiftIcon, StarIcon, CurrencyDollarIcon, GlobeAltIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function TravelRewards() {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    {
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      title: "Save ₦4,000",
      description: "On your first night"
    },
    {
      icon: <GiftIcon className="w-8 h-8" />,
      title: "Earn Money",
      description: "With every booking"
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Redeem Points",
      description: "Travel for less"
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: "World Travel",
      description: "Global destinations"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-400/5 dark:to-blue-400/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-transparent dark:from-green-400/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-200/30 to-transparent dark:from-blue-400/10 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12">
              {/* Left Content */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Travel more, <span className="text-green-600 dark:text-green-400">earn more</span>
                  </h2>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Get rewarded when you travel
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your trip just got even more affordable! Save{" "}
                    <span className="font-bold text-green-600 dark:text-green-400">₦4,000.00</span>{" "}
                    off your first night, earn money and redeem points to travel around the world for less.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Create Account
                      <ArrowRightIcon className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </span>
                  </button>
                  
                  <button className="flex-1 border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Sign In
                  </button>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-md group"
                    >
                      <div className="text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Main Circle */}
                  <div className="w-80 h-80 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center relative overflow-hidden">
                    {/* Inner Pattern */}
                    <div className="absolute inset-4 border-2 border-white/30 rounded-full" />
                    <div className="absolute inset-8 border-2 border-white/20 rounded-full" />
                    
                    {/* Center Content */}
                    <div className="text-center text-white z-10">
                      <div className="text-4xl font-bold mb-2">₦4,000</div>
                      <div className="text-lg font-medium">SAVED</div>
                      <div className="text-sm opacity-80">First Night</div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-8 right-8 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                      <GiftIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-12 left-8 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <StarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute top-20 left-12 w-8 h-8 bg-white/20 rounded-full animate-ping" />
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute top-0 left-1/2 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-3" />
                    <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-1/2 translate-y-2" />
                    <div className="absolute left-0 top-1/2 w-5 h-5 bg-purple-500 rounded-full transform -translate-y-1/2 -translate-x-2" />
                    <div className="absolute right-0 top-1/2 w-4 h-4 bg-pink-500 rounded-full transform -translate-y-1/2 translate-x-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}