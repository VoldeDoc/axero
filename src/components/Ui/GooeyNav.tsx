import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

type NavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: NavItem[];
  particleCount?: number;
  particleDistances?: number[];
  particleR?: number;
  initialActiveIndex?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: number[];
};

const GooeyNav = ({ 
  items, 
  initialActiveIndex = 0,
  particleCount = 15,
  colors = [1, 2, 3, 4, 5, 6, 7, 8]
}: GooeyNavProps) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Generate stable particle data
  const particleData = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * 360;
      const distanceVariation = (i % 3) * 20;
      return {
        size: 4 + (i % 4), // Sizes between 4-8px
        distance: 40 + distanceVariation, // Distances between 40-80px
        angle: angle,
        colorIndex: colors[i % colors.length]
      };
    });
  }, [particleCount, colors]);

  // Calculate dynamic widths based on text length
  const getItemWidth = useCallback((index: number) => {
    const label = items[index]?.label || '';
    const baseWidth = 80;
    const charWidth = 8;
    return Math.max(baseWidth, label.length * charWidth + 32);
  }, [items]);

  // Calculate cumulative position for blob placement
  const getBlobPosition = useCallback((targetIndex: number) => {
    let position = 0;
    for (let i = 0; i < targetIndex; i++) {
      position += getItemWidth(i) + 8;
    }
    return position;
  }, [getItemWidth]);

  const handleNavClick = (index: number) => {
    if (index !== activeIndex && !isTransitioning) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsTransitioning(true);
      setActiveIndex(index);
      setAnimationKey(prev => prev + 1);
      
      // Reset transition state after animation completes
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Color palette for particles
  const getParticleColor = (colorIndex: number) => {
    const colorMap = {
      1: 'bg-red-400',
      2: 'bg-blue-400', 
      3: 'bg-green-400',
      4: 'bg-yellow-400',
      5: 'bg-purple-400',
      6: 'bg-pink-400',
      7: 'bg-indigo-400',
      8: 'bg-orange-400',
    };
    return colorMap[colorIndex as keyof typeof colorMap] || 'bg-orange-400';
  };

  const blobWidth = getItemWidth(activeIndex);
  const blobLeft = getBlobPosition(activeIndex);

  return (
    <nav className="relative overflow-visible">
      {/* ONLY colorful particles during transitions - NO orange background */}
      {isTransitioning && (
        <div key={`particles-${animationKey}`} className="absolute top-1/2 -translate-y-1/2 z-0">
          {/* Gooey particles explosion ONLY */}
          {particleData.map((particle, i) => {
            const delay = i * 35;
            
            return (
              <div
                key={`particle-${animationKey}-${i}`}
                className={`absolute rounded-full ${getParticleColor(particle.colorIndex)}`}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${blobLeft + blobWidth / 2}px`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                  animation: `particle-${animationKey}-${i} 0.7s ease-out ${delay}ms forwards`,
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Clean navigation items container */}
      <div className="relative flex items-center gap-2">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <a
              key={index}
              href={item.href}
              className={`
                relative flex items-center justify-center text-sm font-medium transition-all duration-200 ease-out rounded-full z-10 whitespace-nowrap cursor-pointer
                ${isActive
                  ? 'text-orange-600 dark:text-white font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }
              `}
              style={{
                width: `${getItemWidth(index)}px`,
                height: '48px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(index);
              }}
            >
              {/* Clean text styling - NO orange background effects */}
              <span className="relative z-10 transition-all duration-200 text-center block">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Dynamic keyframes for particle animations ONLY */}
      {isTransitioning && (
        <style key={`styles-${animationKey}`}>{`
          ${particleData.map((particle, i) => {
            const x = Math.cos(particle.angle * Math.PI / 180) * particle.distance;
            const y = Math.sin(particle.angle * Math.PI / 180) * particle.distance;
            
            return `
              @keyframes particle-${animationKey}-${i} {
                0% {
                  transform: translate(-50%, -50%) scale(0);
                  opacity: 0;
                }
                35% {
                  transform: translate(calc(-50% + ${x * 0.4}px), calc(-50% + ${y * 0.4}px)) scale(1.2);
                  opacity: 0.9;
                }
                100% {
                  transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0);
                  opacity: 0;
                }
              }
            `;
          }).join('')}
        `}</style>
      )}
    </nav>
  );
};

export default GooeyNav;