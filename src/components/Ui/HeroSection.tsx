import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig);
  const textY = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -100]), springConfig);
  const imageY = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 100]), springConfig);

  // Images for carousel
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Team collaboration"
    },
    {
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Digital workspace"
    },
    {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Business meeting"
    },
    {
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Office collaboration"
    }
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Enhanced floating particles with better visibility in light mode
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => {
        const size = 2 + Math.random() * 3;
        const colors = [
          'bg-blue-500/40 dark:bg-blue-400/30',
          'bg-purple-500/40 dark:bg-purple-400/30',
          'bg-pink-500/40 dark:bg-pink-400/30',
          'bg-indigo-500/40 dark:bg-indigo-400/30',
          'bg-cyan-500/40 dark:bg-cyan-400/30'
        ];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${colors[i % colors.length]} rounded-full shadow-lg`}
            style={{
              width: size,
              height: size,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -150 - 100],
              opacity: [0, 0.8, 0.8, 0],
              scale: [null, Math.random() * 0.5 + 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 4 + 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        );
      })}
    </div>
  );

  // Advanced character-by-character text animation
  const AnimatedTextReveal = ({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) => {
    return (
      <motion.span className={`inline-block ${className}`}>
        {children.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ 
              opacity: 0, 
              y: 50,
              rotateX: -90,
              scale: 0.8
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              scale: 1
            }}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.05,
              ease: [0.33, 1, 0.68, 1],
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            whileHover={{
              y: -5,
              color: "#3b82f6",
              transition: { duration: 0.2 }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  // Word-by-word reveal with wave effect
  const WaveTextReveal = ({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) => {
    const words = children.split(' ');
    
    return (
      <motion.span className={`inline-block ${className}`}>
        {words.map((word, wordIndex) => (
          <motion.span key={wordIndex} className="inline-block mr-2">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={{ 
                  opacity: 0, 
                  y: 80,
                  rotateY: 90,
                  scale: 0.3
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateY: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.8,
                  delay: delay + wordIndex * 0.1 + charIndex * 0.03,
                  ease: [0.23, 1, 0.32, 1],
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                whileHover={{
                  scale: 1.2,
                  rotateZ: Math.random() * 10 - 5,
                  color: "#8b5cf6",
                  transition: { duration: 0.3 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  // Glitch text effect for special words
  const GlitchText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
    return (
      <motion.span
        className="relative inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      >
        <motion.span
          className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: "200% 200%" }}
        >
          {children}
        </motion.span>
        
        {/* Glitch layers */}
        <motion.span
          className="absolute top-0 left-0 text-red-500 opacity-70"
          animate={{
            x: [0, -1, 1, 0],
            opacity: [0, 0.7, 0, 0]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          {children}
        </motion.span>
        
        <motion.span
          className="absolute top-0 left-0 text-cyan-500 opacity-70"
          animate={{
            x: [0, 1, -1, 0],
            opacity: [0, 0.7, 0, 0]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 0.1
          }}
        >
          {children}
        </motion.span>
      </motion.span>
    );
  };

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Enhanced Floating Particles */}
      <FloatingParticles />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            style={{ y: textY }}
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium shadow-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50"
            >
              <motion.div
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"
                animate={{ 
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.7)",
                    "0 0 0 8px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                🏆 Award-Winning Platform
              </motion.span>
            </motion.div>

            {/* Enhanced Main Heading */}
            <div className="space-y-6">
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <div className="text-gray-900 dark:text-white mb-2">
                  <AnimatedTextReveal delay={0.4}>An Intranet Platform</AnimatedTextReveal>
                </div>
                <div className="mb-2">
                  <WaveTextReveal delay={0.8}>as </WaveTextReveal>
                  <GlitchText delay={1.2}>Dynamic as Your</GlitchText>
                </div>
                <div className="text-gray-900 dark:text-white relative">
                  <AnimatedTextReveal delay={1.6}>Organization</AnimatedTextReveal>
                  
                  {/* Enhanced animated underline */}
                  <motion.div
                    className="absolute -bottom-3 left-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0, scaleX: 0, opacity: 0 }}
                    animate={{ width: "100%", scaleX: 1, opacity: 1 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 2.2, 
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 100
                    }}
                  />
                </div>
              </motion.h1>
            </div>

            {/* Enhanced Description with better animations */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 1, 
                delay: 2.5,
                type: "spring",
                stiffness: 150
              }}
              className="relative"
            >
              <motion.p 
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7, duration: 0.8 }}
                >
                  Hundreds of companies use Axero's award-winning platform to{' '}
                </motion.span>
                <motion.span 
                  className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3, duration: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                >
                  boost efficiency and productivity
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.2, duration: 0.5 }}
                  />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.4, duration: 0.8 }}
                >
                  , and drive their business forward. Stop the endless searching – find what you need instantly, all in one place.
                </motion.span>
              </motion.p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 3.8,
                type: "spring",
                stiffness: 200
              }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.span 
                  className="relative z-10"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Get Started Free
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              <motion.button
                className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="relative z-10"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Watch Demo
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 4.2 }}
            >
              {[
                { number: "500+", label: "Companies" },
                { number: "99%", label: "Uptime" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center group cursor-pointer"
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 4.4 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 5
                  }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.5 
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div 
                    className="text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.6 + index * 0.2 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="relative"
            style={{ y: imageY }}
          >
            <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: currentImageIndex === index ? 1 : 0,
                      scale: currentImageIndex === index ? 1 : 1.1
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                ))}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20" />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-80"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-70"
                animate={{
                  y: [0, 15, 0],
                  rotate: [360, 180, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Progress Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      currentImageIndex === index 
                        ? 'bg-white' 
                        : 'bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center"
          animate={{ borderColor: ["rgba(156, 163, 175, 1)", "rgba(59, 130, 246, 1)", "rgba(156, 163, 175, 1)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              backgroundColor: ["rgba(156, 163, 175, 1)", "rgba(59, 130, 246, 1)", "rgba(156, 163, 175, 1)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;