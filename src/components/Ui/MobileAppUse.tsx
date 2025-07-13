import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Official badge images for Play Store and App Store
const PlayStoreIcon = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
    alt="Get it on Google Play"
    className="h-10 mr-2"
    style={{ background: "white", borderRadius: 8 }}
  />
);

const AppleIcon = () => (
  <img
    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
    alt="Download on the App Store"
    className="h-10 mr-2"
    style={{ background: "white", borderRadius: 8 }}
  />
);

const typingText = "Your intranet anywhere";

export default function MobileAppShowcase() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const isPhoneInView = useInView(phoneRef, { once: false, amount: 0.5 });
  const [typed, setTyped] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  // Typing animation tied to scroll
  useEffect(() => {
    if (!isPhoneInView) return;
    setTyped("");
    setTypingIndex(0);

    const handleScroll = () => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visible = Math.max(
        0,
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
      );
      const percent = Math.min(1, Math.max(0, visible / rect.height));
      const charsToShow = Math.floor(percent * typingText.length);
      setTypingIndex(charsToShow);
      setTyped(typingText.slice(0, charsToShow));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPhoneInView]);

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-400/10 dark:bg-blue-300/10"
            style={{
              width: `${10 + Math.random() * 18}px`,
              height: `${10 + Math.random() * 18}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0, 30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Performance continuity with the Axero mobile app.
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Stay connected to your team from wherever you are. Our mobile app engages deskless workers and employees on-the-go with a perfect blend of simplicity and use-ability. Easy to use and easy to manage, everything you need fits in your pocket.
          </motion.p>
          <motion.button
            className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl overflow-hidden"
            whileHover={{
              scale: 1.07,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Axero gives you mobility
          </motion.button>
        </div>

        {/* Phone Animation */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
            ref={phoneRef}
            className="relative"
            initial={{ opacity: 0, y: 120, scale: 0.8 }}
            animate={isPhoneInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, type: "spring" }}
            style={{ perspective: 1200 }}
          >
            {/* Phone SVG (modern iPhone-like) */}
            <motion.div
              className="w-[260px] h-[520px] rounded-[2.5rem] bg-gradient-to-br from-gray-200 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900 shadow-2xl border-[6px] border-white dark:border-gray-800 flex flex-col items-center justify-end overflow-hidden"
              style={{ boxShadow: "0 0 60px 10px #a5b4fc, 0 0 40px 10px #c4b5fd" }}
              animate={{
                y: [0, -24, 0, 24, 0],
                rotateX: [0, 8, -8, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Speaker and camera */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-16 h-2 rounded-full bg-gray-400/60 dark:bg-gray-700/60 mb-1" />
                <div className="w-4 h-4 rounded-full bg-gray-400/60 dark:bg-gray-700/60" />
              </div>
              {/* Screen */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 flex flex-col items-center justify-end pb-16 pt-24">
                {/* Axero Intranet Icon */}
                <motion.div
                  className="flex flex-col items-center mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={isPhoneInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="4" width="40" height="40" rx="12" fill="#6366f1" />
                    <circle cx="24" cy="24" r="10" fill="#fff" />
                    <path d="M24 16v8l6 4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="mt-2 text-base font-bold text-blue-700 dark:text-blue-200">Axero Intranet</span>
                </motion.div>
                {/* Typing Animation */}
                <motion.div
                  className="w-[180px] h-12 bg-white/90 dark:bg-gray-900/90 rounded-xl flex items-center px-4 shadow-lg border border-blue-100 dark:border-blue-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPhoneInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <span className="text-blue-700 dark:text-blue-200 font-semibold text-lg flex">
                    {typed}
                    {typingIndex < typingText.length && (
                      <motion.span
                        className="ml-1 w-2 h-6 bg-blue-700 dark:bg-blue-200 rounded"
                        animate={{
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </span>
                </motion.div>
              </div>
              {/* Animated confetti */}
              {isPhoneInView && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#6366f1", "#a21caf", "#f59e42", "#10b981", "#f43f5e", "#fbbf24"][i % 6],
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`
                      }}
                      animate={{
                        y: [0, -40 - Math.random() * 40, 0],
                        x: [0, Math.random() * 30 - 15, 0],
                        opacity: [1, 0.7, 1],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Lower Section */}
        <div className="max-w-2xl mx-auto text-center mt-8">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-200 mb-2 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <svg width={32} height={32} viewBox="0 0 48 48" fill="none">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#6366f1" />
              <circle cx="24" cy="24" r="10" fill="#fff" />
              <path d="M24 16v8l6 4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Your intranet. Anytime.
          </motion.h3>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The office is one tap away. Connect people and take action like never before by giving your employees the ultimate mobile experience. From communications and calendars to files and content, your employees have access to your intranet anywhere, anytime. Available on iOS and Android devices.
          </motion.p>
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <motion.div
                className="flex items-center bg-transparent rounded-xl shadow-none hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <PlayStoreIcon />
              </motion.div>
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <motion.div
                className="flex items-center bg-transparent rounded-xl shadow-none hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <AppleIcon />
              </motion.div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}