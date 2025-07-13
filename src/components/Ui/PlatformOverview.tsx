import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const PlatformOverview = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const features = [
    {
      title: "Data Ingestion",
      description: "Axero ingests data from outside sources enabling centralization of business data and applications",
      icon: "🔄",
      color: "#3B82F6",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "400+ REST APIs",
      description: "Over 400 Rest APIs endpoints facilitate limitless flexibility and creation of workflows to meet specific business challenges",
      icon: "🚀",
      color: "#8B5CF6",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Custom Templates",
      description: "Leverage our pre-built templates, or build your own to dynamically pull and display data from the platform or external APIs and databases",
      icon: "🎨",
      color: "#10B981",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  // Auto-cycle through features
  useEffect(() => {
    if (isInView && !isHovered) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovered, features.length]);

  // Animated Platform Visualization
  const AnimatedPlatform = () => {
    return (
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Central Hub */}
        <motion.div
          className="relative z-20"
          animate={{
            rotate: [0, 360],
            scale: isHovered ? 1.1 : 1
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3 }
          }}
        >
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 40px rgba(59, 130, 246, 0.4)",
                "0 0 80px rgba(147, 51, 234, 0.6)",
                "0 0 40px rgba(236, 72, 153, 0.4)",
                "0 0 40px rgba(59, 130, 246, 0.4)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div
              className="text-4xl font-bold text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AXERO
            </motion.div>
          </motion.div>

          {/* Pulsing rings */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
              animate={{
                scale: [1, 2, 3],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>

        {/* Orbiting Data Sources */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          const radius = 180;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          const icons = ['📊', '💼', '🔧', '📈', '🌐', '⚡', '🔒', '💡'];
          const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];

          return (
            <motion.div
              key={i}
              className="absolute z-10"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`
              }}
              animate={{
                x: [x, x * 1.2, x],
                y: [y, y * 1.2, y],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            >
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg backdrop-blur-lg border border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${colors[i]}20, ${colors[i]}40)`,
                  boxShadow: `0 8px 32px ${colors[i]}30`
                }}
                whileHover={{ scale: 1.3, zIndex: 30 }}
                animate={{
                  y: [0, -10, 0],
                  boxShadow: [
                    `0 8px 32px ${colors[i]}30`,
                    `0 16px 48px ${colors[i]}50`,
                    `0 8px 32px ${colors[i]}30`
                  ]
                }}
                transition={{
                  y: { duration: 2 + i * 0.1, repeat: Infinity },
                  boxShadow: { duration: 3, repeat: Infinity }
                }}
              >
                {icons[i]}
              </motion.div>

              {/* Data flow lines */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-left"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          );
        })}

        {/* Floating API endpoints */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Integration arrows */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'left center',
                transform: `rotate(${i * 60}deg)`
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Animated Platform */}
          <motion.div
            className="relative h-[600px]"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <AnimatedPlatform />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Header */}
            <div className="space-y-6">
              <motion.h2
                className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.span
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  If you dream it,
                </motion.span>{" "}
                we can build it
              </motion.h2>

              <motion.h3
                className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                One app. All integrated.{" "}
                <motion.span
                  className="text-blue-600 dark:text-blue-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  End of story.
                </motion.span>
              </motion.h3>

              <motion.p
                className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Axero is more than just an Intranet, it redefines what is possible with an employee's digital experience. Our platform makes it easy to create custom experiences for you to connect your employees with the tools and information that matter most.
              </motion.p>

              <motion.div
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 px-6 py-3 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  We did the heavy lifting so your people don't have to.
                </span>
              </motion.div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-white dark:bg-gray-800 shadow-2xl border-transparent'
                      : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800'
                  }`}
                  style={{
                    background: activeFeature === index 
                      ? `linear-gradient(135deg, ${feature.color}10, ${feature.color}20)`
                      : undefined,
                    boxShadow: activeFeature === index
                      ? `0 20px 40px ${feature.color}30`
                      : undefined
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                  onMouseEnter={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Active indicator */}
                  <AnimatePresence>
                    {activeFeature === index && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                        style={{ backgroundColor: feature.color }}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`
                      }}
                      animate={{
                        scale: activeFeature === index ? [1, 1.1, 1] : 1,
                        rotate: activeFeature === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 2, repeat: activeFeature === index ? Infinity : 0 }}
                    >
                      {feature.icon}
                    </motion.div>

                    <div className="flex-1 space-y-2">
                      <motion.h4
                        className={`text-xl font-bold transition-colors duration-300 ${
                          activeFeature === index
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-800 dark:text-gray-200'
                        }`}
                        animate={{
                          scale: activeFeature === index ? 1.05 : 1
                        }}
                      >
                        {feature.title}
                      </motion.h4>

                      <motion.p
                        className={`text-lg transition-colors duration-300 ${
                          activeFeature === index
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                        animate={{
                          opacity: activeFeature === index ? 1 : 0.8
                        }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>

                    {/* Animated arrow */}
                    <motion.div
                      className="flex-shrink-0"
                      animate={{
                        x: activeFeature === index ? [0, 5, 0] : 0,
                        opacity: activeFeature === index ? 1 : 0.5
                      }}
                      transition={{ duration: 1.5, repeat: activeFeature === index ? Infinity : 0 }}
                    >
                      <svg
                        className="w-6 h-6"
                        style={{ color: feature.color }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Particle effects for active feature */}
                  {activeFeature === index && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{ backgroundColor: feature.color }}
                          initial={{
                            x: Math.random() * 300,
                            y: Math.random() * 100,
                            scale: 0,
                            opacity: 0
                          }}
                          animate={{
                            x: [
                              Math.random() * 300,
                              Math.random() * 350,
                              Math.random() * 300
                            ],
                            y: [
                              Math.random() * 100,
                              Math.random() * 120,
                              Math.random() * 100
                            ],
                            scale: [0, 1, 0],
                            opacity: [0, 0.6, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <motion.button
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span className="relative z-10">
                  Start Building Your Platform
                </motion.span>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />

                {/* Button sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${20 + (i % 2) * 60}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;