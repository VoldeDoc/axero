import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation } from 'framer-motion';

const TestimonialsCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [smileyPosition, setSmileyPosition] = useState({ x: 0, y: 0 });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const testimonials = [
    {
      platform: "Capterra",
      rating: 4.4,
      totalReviews: 5,
      mainReview: {
        rating: 4.5,
        reviewCount: 53,
        text: "A modern collaboration platform with brilliant customer support.",
        gradient: "from-blue-500 to-cyan-500",
        color: "#3B82F6"
      }
    },
    {
      platform: "G2",
      rating: 4.2,
      totalReviews: 60,
      mainReview: {
        rating: 4.2,
        reviewCount: 60,
        text: "A solid, flexible, modern intranet solution.",
        gradient: "from-purple-500 to-pink-500",
        color: "#8B5CF6"
      }
    },
    {
      platform: "SoftwareAdvice",
      rating: 4.5,
      totalReviews: 5,
      mainReview: {
        rating: 4.5,
        reviewCount: 53,
        text: "An all-in-one solution for all business communication and collaboration needs.",
        gradient: "from-green-500 to-emerald-500",
        color: "#10B981"
      }
    }
  ];

  // Auto-move cards with pause on hover - FIXED
  useEffect(() => {
    if (isInView && !isPaused) {
      const interval = setInterval(() => {
        setCurrentCardIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, testimonials.length, isPaused]);

  // Enhanced GIF-like animated smiley face
  const AnimatedSmiley = () => {
    const [blinkState, setBlinkState] = useState(false);
    const [moodState, setMoodState] = useState('happy');

    useEffect(() => {
      // Random blinking
      const blinkInterval = setInterval(() => {
        setBlinkState(true);
        setTimeout(() => setBlinkState(false), 150);
      }, 2000 + Math.random() * 3000);

      // Random mood changes
      const moodInterval = setInterval(() => {
        const moods = ['happy', 'excited', 'love', 'wink'];
        setMoodState(moods[Math.floor(Math.random() * moods.length)]);
      }, 3000);

      return () => {
        clearInterval(blinkInterval);
        clearInterval(moodInterval);
      };
    }, []);

    return (
      <motion.div
        className="absolute z-50 pointer-events-none"
        style={{
          x: smileyPosition.x,
          y: smileyPosition.y,
        }}
        initial={{ scale: 0, rotate: -360, opacity: 0 }}
        animate={{ 
          scale: [0, 1.2, 1], 
          rotate: [0, 20, -10, 0],
          opacity: 1,
          y: [0, -15, 0, -8, 0],
        }}
        exit={{ 
          scale: [1, 1.3, 0], 
          rotate: [0, 180, 360],
          opacity: 0 
        }}
        transition={{
          duration: 1.2,
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.8, ease: "backOut" },
          rotate: { duration: 1, ease: "easeInOut" }
        }}
      >
        {/* Floating sparkles around smiley */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2"
            style={{
              left: Math.cos((i * Math.PI * 2) / 8) * 60 + 40,
              top: Math.sin((i * Math.PI * 2) / 8) * 60 + 40,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Main smiley SVG */}
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="drop-shadow-2xl"
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) hue-rotate(0deg)",
              "drop-shadow(0 0 40px rgba(255, 215, 0, 0.6)) hue-rotate(30deg)",
              "drop-shadow(0 0 60px rgba(255, 215, 0, 0.9)) hue-rotate(60deg)",
              "drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) hue-rotate(0deg)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Glow background */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#glowGradient)"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Define gradients */}
          <defs>
            <radialGradient id="faceGradient" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#FFE55C" />
              <stop offset="70%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </radialGradient>
            <radialGradient id="glowGradient" cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          
          {/* Face */}
          <motion.circle
            cx="50"
            cy="50"
            r="38"
            fill="url(#faceGradient)"
            stroke="#FF8C00"
            strokeWidth="2"
            animate={{ 
              scale: moodState === 'excited' ? [1, 1.05, 1] : [1, 1.02, 1],
              rotate: moodState === 'love' ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Left Eye - Looking down at text */}
          <motion.g>
            {blinkState ? (
              <motion.path
                d="M 32 38 Q 38 42 44 38"
                stroke="#333"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.1 }}
              />
            ) : moodState === 'love' ? (
              <motion.text
                x="38"
                y="43"
                fontSize="12"
                fill="red"
                textAnchor="middle"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                ❤️
              </motion.text>
            ) : moodState === 'wink' ? (
              <motion.path
                d="M 32 38 Q 38 42 44 38"
                stroke="#333"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            ) : (
              <motion.ellipse
                cx="38"
                cy="42" // Eyes looking down
                rx="5"
                ry="7"
                fill="#333"
                animate={{
                  cy: hoveredCard !== null ? 44 : 42, // Look further down when hovering
                  scaleY: moodState === 'excited' ? [1, 0.7, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            {/* Eye highlight */}
            {!blinkState && moodState !== 'love' && (
              <motion.circle 
                cx="40" 
                cy="40" 
                r="2" 
                fill="white"
                animate={{ 
                  opacity: [1, 0.8, 1],
                  cy: hoveredCard !== null ? 42 : 40
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.g>
          
          {/* Right Eye - Looking down at text */}
          <motion.g>
            {blinkState || moodState === 'wink' ? (
              <motion.path
                d="M 56 38 Q 62 42 68 38"
                stroke="#333"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.1 }}
              />
            ) : moodState === 'love' ? (
              <motion.text
                x="62"
                y="43"
                fontSize="12"
                fill="red"
                textAnchor="middle"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              >
                ❤️
              </motion.text>
            ) : (
              <motion.ellipse
                cx="62"
                cy="42" // Eyes looking down
                rx="5"
                ry="7"
                fill="#333"
                animate={{
                  cy: hoveredCard !== null ? 44 : 42, // Look further down when hovering
                  scaleY: moodState === 'excited' ? [1, 0.7, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            {/* Eye highlight */}
            {!blinkState && moodState !== 'love' && moodState !== 'wink' && (
              <motion.circle 
                cx="64" 
                cy="40" 
                r="2" 
                fill="white"
                animate={{ 
                  opacity: [1, 0.8, 1],
                  cy: hoveredCard !== null ? 42 : 40
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            )}
          </motion.g>
          
          {/* Mouth */}
          <motion.path
            d={
              moodState === 'excited' 
                ? "M 30 65 Q 50 85 70 65"
                : moodState === 'love'
                ? "M 35 65 Q 50 78 65 65"
                : "M 35 65 Q 50 78 65 65"
            }
            stroke="#333"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: moodState === 'excited' 
                ? [
                    "M 30 65 Q 50 85 70 65",
                    "M 30 67 Q 50 87 70 67",
                    "M 30 65 Q 50 85 70 65"
                  ]
                : [
                    "M 35 65 Q 50 78 65 65",
                    "M 35 67 Q 50 80 65 67",
                    "M 35 65 Q 50 78 65 65"
                  ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Tongue for excited mode */}
          {moodState === 'excited' && (
            <motion.ellipse
              cx="50"
              cy="75"
              rx="8"
              ry="4"
              fill="#FF69B4"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            />
          )}
          
          {/* Cheek blush */}
          <motion.circle
            cx="25"
            cy="55"
            r="6"
            fill="#FFB6C1"
            opacity="0.7"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: moodState === 'love' ? [0.7, 1, 0.7] : [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle
            cx="75"
            cy="55"
            r="6"
            fill="#FFB6C1"
            opacity="0.7"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: moodState === 'love' ? [0.7, 1, 0.7] : [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />

          {/* Floating hearts for love mode */}
          {moodState === 'love' && (
            <>
              <motion.text
                x="20"
                y="30"
                fontSize="8"
                fill="red"
                animate={{
                  y: [30, 15, 30],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💕
              </motion.text>
              <motion.text
                x="80"
                y="35"
                fontSize="6"
                fill="pink"
                animate={{
                  y: [35, 20, 35],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                💖
              </motion.text>
            </>
          )}
        </motion.svg>

        {/* Bouncing text */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/80 px-2 py-1 rounded-full"
          animate={{
            y: [0, -5, 0],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Reading...
        </motion.div>
      </motion.div>
    );
  };

  // Enhanced star rating with better animations
  const StarRating = ({ rating, animate = false }: { rating: number; animate?: boolean }) => {
    const stars = Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(rating);
      const partial = i === Math.floor(rating) && rating % 1 !== 0;
      
      return (
        <motion.div
          key={i}
          className="relative"
          initial={animate ? { scale: 0, rotate: -360 } : false}
          animate={animate ? { scale: 1, rotate: 0 } : false}
          transition={animate ? { 
            duration: 0.6, 
            delay: i * 0.1,
            type: "spring",
            stiffness: 300 
          } : undefined}
        >
          <motion.svg
            className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            whileHover={{ 
              scale: 1.3, 
              rotate: 360,
              filter: "drop-shadow(0 0 8px rgba(255, 193, 7, 0.8))"
            }}
            transition={{ duration: 0.3 }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
          
          {partial && (
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${(rating % 1) * 100}%` }}
              initial={animate ? { width: 0 } : false}
              animate={animate ? { width: `${(rating % 1) * 100}%` } : false}
              transition={animate ? { duration: 1, delay: i * 0.1 + 0.4 } : undefined}
            >
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      );
    });

    return <div className="flex space-x-1">{stars}</div>;
  };

  // Enhanced 3D card with FIXED movement issues
  const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isActive = currentCardIndex === index;
    const cardControls = useAnimation();

    useEffect(() => {
      if (isInView) {
        const getPosition = () => {
          if (isActive) {
            return { x: 0, opacity: 1, scale: 1, rotateY: 0, rotateX: 0 };
          } else if (index < currentCardIndex || (currentCardIndex === 0 && index === testimonials.length - 1)) {
            return { x: -600, opacity: 0.2, scale: 0.7, rotateY: -60, rotateX: 20 };
          } else {
            return { x: 600, opacity: 0.2, scale: 0.7, rotateY: 60, rotateX: 20 };
          }
        };

        cardControls.start({
          ...getPosition(),
          transition: {
            duration: 1.8, // Even slower transition
            type: "spring",
            stiffness: 40, // Further reduced stiffness
            damping: 30,   // Increased damping
            mass: 1.5      // Increased mass
          }
        });
      }
    }, [currentCardIndex, index, isActive, cardControls, isInView, testimonials.length]);

    const handleMouseEnter = () => {
      if (isActive) {
        setHoveredCard(index);
        setIsPaused(true); // Pause card movement
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          setSmileyPosition({
            x: rect.left + rect.width / 2 - 50,
            y: rect.top - 180
          });
        }
      }
    };

    const handleMouseLeave = () => {
      setHoveredCard(null);
      setIsPaused(false); // Resume card movement
    };

    return (
      <motion.div
        ref={cardRef}
        className="relative group perspective-1000"
        initial={{ opacity: 0, x: 600, rotateY: 60 }}
        animate={cardControls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // COMPLETELY REMOVED whileHover to prevent movement
        style={{ 
          transformStyle: "preserve-3d",
          filter: isActive ? "none" : "blur(1px)"
        }}
      >
        {/* Cool floating elements around active card */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: testimonial.mainReview.color,
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Main Card - IMPROVED LIGHT MODE COLORS */}
        <motion.div
          className="relative bg-white dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-300 dark:border-gray-700/50 overflow-hidden"
          style={{
            background: hoveredCard === index 
              ? `linear-gradient(135deg, ${testimonial.mainReview.color}30, ${testimonial.mainReview.color}50)`
              : undefined,
            boxShadow: hoveredCard === index
              ? `0 40px 80px rgba(0, 0, 0, 0.3), 0 0 80px ${testimonial.mainReview.color}60`
              : isActive 
                ? `0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px ${testimonial.mainReview.color}20`
                : "0 15px 30px rgba(0, 0, 0, 0.08)"
          }}
          animate={{
            // REMOVED scale animation to prevent movement
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5 dark:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, ${testimonial.mainReview.color} 2px, transparent 2px)`,
              backgroundSize: '30px 30px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '30px 30px', '0px 0px']
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Particle explosion on hover */}
          {hoveredCard === index && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: testimonial.mainReview.color }}
                  initial={{
                    x: Math.random() * 300,
                    y: Math.random() * 200,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: [
                      Math.random() * 300,
                      Math.random() * 400 - 50,
                      Math.random() * 300
                    ],
                    y: [
                      Math.random() * 200,
                      Math.random() * 300 - 50,
                      Math.random() * 200
                    ],
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Platform Header - IMPROVED LIGHT MODE COLORS */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            <motion.h3 
              className={`text-2xl font-bold transition-colors duration-300 ${
                hoveredCard === index 
                  ? 'text-white drop-shadow-lg' 
                  : 'text-gray-800 dark:text-white'
              }`}
              animate={{
                // REMOVED scale animation
                textShadow: hoveredCard === index 
                  ? `0 0 30px ${testimonial.mainReview.color}` 
                  : "0 0 0px transparent"
              }}
              transition={{ duration: 0.4 }}
            >
              Axero on {testimonial.platform}
            </motion.h3>
            
            <motion.div 
              className="flex items-center space-x-3"
              // REMOVED whileHover
            >
              <StarRating rating={testimonial.rating} animate={isInView && isActive} />
              <motion.span 
                className={`text-sm font-semibold transition-colors duration-300 ${
                  hoveredCard === index 
                    ? 'text-white' 
                    : 'text-gray-700 dark:text-gray-400'
                }`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 1 }}
              >
                {testimonial.rating}/5
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Main Review - IMPROVED LIGHT MODE COLORS */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <StarRating rating={testimonial.mainReview.rating} />
              <motion.span 
                className={`text-xl font-bold transition-colors duration-300 ${
                  hoveredCard === index 
                    ? 'text-white' 
                    : 'text-gray-800 dark:text-white'
                }`}
                animate={{
                  // REMOVED scale animation
                }}
              >
                {testimonial.mainReview.rating}/5
              </motion.span>
              <motion.span 
                className={`text-sm font-medium transition-colors duration-300 ${
                  hoveredCard === index 
                    ? 'text-white/90' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 1.2 }}
              >
                | {testimonial.mainReview.reviewCount} reviews
              </motion.span>
            </div>

            <motion.blockquote 
              className={`text-xl font-medium leading-relaxed transition-colors duration-300 ${
                hoveredCard === index 
                  ? 'text-white' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.8 }}
              // REMOVED whileHover to prevent movement
            >
              "{testimonial.mainReview.text}"
            </motion.blockquote>
          </motion.div>

          {/* Animated quote marks */}
          <motion.div
            className="absolute top-6 right-6 opacity-20"
            animate={{
              rotate: hoveredCard === index ? [0, 15, -15, 0] : 0,
              scale: hoveredCard === index ? [1, 1.2, 1] : 1,
              color: hoveredCard === index ? testimonial.mainReview.color : undefined
            }}
            transition={{ duration: 2, repeat: hoveredCard === index ? Infinity : 0 }}
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Enhanced 3D Shadow */}
        <motion.div
          className="absolute inset-0 rounded-3xl -z-10"
          style={{
            background: `linear-gradient(135deg, ${testimonial.mainReview.color}30, transparent)`,
            transform: "translateZ(-40px) translateY(30px)",
            filter: "blur(20px)"
          }}
          animate={{
            opacity: hoveredCard === index ? 0.8 : isActive ? 0.4 : 0.2,
            // REMOVED scale animation
          }}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative py-24 bg-gradient-to-br from-gray-100 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
      {/* Enhanced background with moving elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-400/15 dark:via-purple-400/15 dark:to-pink-400/15"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating geometric shapes */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 opacity-15 dark:opacity-10"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transform rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Floating Smiley - positioned above text */}
      <AnimatePresence mode="wait">
        {hoveredCard !== null && <AnimatedSmiley />}
      </AnimatePresence>

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Trusted by{' '}
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Thousands
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            See what industry leaders are saying about our platform
          </motion.p>
        </motion.div>

        {/* Moving Cards Container */}
        <div className="relative h-[600px] mb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="absolute w-full max-w-lg">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Card indicators */}
        <motion.div 
          className="flex justify-center space-x-6 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={index}
              className={`relative w-5 h-5 rounded-full transition-all duration-500 ${
                currentCardIndex === index 
                  ? 'scale-125' 
                  : 'hover:scale-110'
              }`}
              style={{
                backgroundColor: currentCardIndex === index 
                  ? testimonial.mainReview.color 
                  : '#D1D5DB'
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentCardIndex(index)}
              animate={{
                boxShadow: currentCardIndex === index
                  ? `0 0 20px ${testimonial.mainReview.color}60`
                  : "0 0 0px transparent"
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: testimonial.mainReview.color }}
                animate={{
                  scale: currentCardIndex === index ? [1, 1.3, 1] : 1,
                  opacity: currentCardIndex === index ? [0.3, 0.6, 0.3] : 0
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.button
            className="group px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span className="relative z-10">
              Join Happy Customers
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
            
            {/* Sparkle effects on hover */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsCards;