import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function CopilotShowcase() {
  const bubbleControls = useAnimation();

  useEffect(() => {
    const animateBubble = async () => {
      while (true) {
        await bubbleControls.start({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } });
        await new Promise(res => setTimeout(res, 1800));
        await bubbleControls.start({ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.5 } });
        await new Promise(res => setTimeout(res, 2200));
      }
    };
    animateBubble();
    return () => {};
  }, [bubbleControls]);

  return (
    <section className="relative py-24 bg-gradient-to-br from-indigo-50 via-blue-100 to-purple-100 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10 dark:bg-blue-300/10"
            style={{
              width: `${12 + Math.random() * 18}px`,
              height: `${12 + Math.random() * 18}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -40, 0, 40, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Animated Text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              Management with <span className="drop-shadow-lg">Axero Copilot</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Instead of digging through files to figure out a question, what if you could ask your intranet instead?
            </motion.p>
            <motion.div
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.05, 1], opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, repeat: Infinity }}
            >
              <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Axero Copilot, our brand new feature currently in beta, answers these questions with one massive YES!
              </span>
            </motion.div>
            <motion.ul
              className="space-y-3 mt-6"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              {[
                "Reduce wasted time during the workday",
                "Streamline learning and development",
                "Increase overall productivity and performance",
                "Elevate user experience with tailored recommendations",
                "Leverage your existing content in a permissioned environment"
              ].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center text-lg text-gray-800 dark:text-gray-200"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
                >
                  <motion.span
                    className="mr-3"
                    animate={{
                      scale: [1, 1.3, 1],
                      color: ["#6366f1", "#a21caf", "#6366f1"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: i * 0.2
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10" className="fill-blue-500/80 dark:fill-blue-400/80" />
                      <path d="M7 10.5l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.button
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl overflow-hidden"
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span className="relative z-10">
                  See More
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
          {/* Right Side - Animated Robot GIF with Speech Bubble */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -20, 0, 20, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Speech bubble */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-200 px-6 py-2 rounded-full shadow-lg border border-blue-200 dark:border-blue-700 font-bold text-lg z-20"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={bubbleControls}
              >
                Hi!
              </motion.div>
              {/* Replace the src below with your preferred robot/AI GIF */}
              <img
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjQ2MzIwZnZidTk4OGdkZ2RyeWw1Z3dlM2FtcjVmYmM4ODB3MTVwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fepKnAxq8tjIGTcxny/giphy.gif" // <-- Robot GIF
                alt="AI Robot"
                className="w-[320px] h-[320px] object-contain rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800 bg-white/80 dark:bg-gray-900/80"
              />
              {/* Optional: Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  boxShadow: "0 0 80px 20px #a5b4fc, 0 0 40px 10px #c4b5fd"
                }}
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}