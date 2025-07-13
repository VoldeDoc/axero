import { motion } from "framer-motion";

const integrations = [
  {
    name: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M22.46 5.924c-.793.352-1.646.59-2.542.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 11.2 9.03a12.72 12.72 0 0 1-9.23-4.68 4.48 4.48 0 0 0 1.39 5.98A4.44 4.44 0 0 1 2 9.13v.057a4.48 4.48 0 0 0 3.6 4.39c-.4.11-.82.17-1.25.17-.31 0-.6-.03-.89-.08a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.39-.01-.58a9.1 9.1 0 0 0 2.23-2.3z"/>
      </svg>
    ),
    color: "text-blue-400"
  },
  {
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M21.8 8.001a2.75 2.75 0 0 0-1.93-1.94C18.13 5.5 12 5.5 12 5.5s-6.13 0-7.87.56A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.93 1.94C5.87 18.5 12 18.5 12 18.5s6.13 0 7.87-.56a2.75 2.75 0 0 0 1.93-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z"/>
      </svg>
    ),
    color: "text-red-500"
  },
  {
    name: "WordPress",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" className="fill-gray-800 dark:fill-white" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489l-2.03-5.573c-.347-.96.018-1.6.94-1.6h.02c.77 0 1.13.44 1.47 1.08l1.16 2.13 1.16-2.13c.34-.64.7-1.08 1.47-1.08h.02c.92 0 1.287.64.94 1.6l-2.03 5.573C19.135 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" className="fill-white dark:fill-gray-900"/>
      </svg>
    ),
    color: "text-gray-800 dark:text-white"
  },
  {
    name: "Google Slides",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <rect x="3" y="3" width="18" height="18" rx="3" className="fill-yellow-400" />
        <rect x="7" y="7" width="10" height="7" rx="1" className="fill-white" />
      </svg>
    ),
    color: "text-yellow-400"
  },
  {
    name: "Outlook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <rect x="2" y="6" width="20" height="12" rx="2" className="fill-blue-600" />
        <rect x="6" y="9" width="12" height="6" rx="1" className="fill-white" />
        <rect x="2" y="6" width="20" height="12" rx="2" className="fill-none stroke-blue-800 dark:stroke-blue-300" strokeWidth="1.5"/>
      </svg>
    ),
    color: "text-blue-600"
  },
  {
    name: "Google",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" fill="#fff" />
        <path d="M21.6 12.227c0-.638-.057-1.252-.163-1.84H12v3.48h5.44a4.65 4.65 0 0 1-2.01 3.05v2.54h3.24c1.9-1.75 2.99-4.33 2.99-7.23z" fill="#4285F4"/>
        <path d="M12 22c2.7 0 4.97-.89 6.63-2.41l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.59-4.13H3.1v2.59A9.99 9.99 0 0 0 12 22z" fill="#34A853"/>
        <path d="M6.41 13.88A5.99 5.99 0 0 1 6 12c0-.65.11-1.28.31-1.88V7.53H3.1A9.99 9.99 0 0 0 2 12c0 1.64.39 3.19 1.1 4.47l3.31-2.59z" fill="#FBBC05"/>
        <path d="M12 6.5c1.47 0 2.78.51 3.81 1.51l2.86-2.86C16.97 3.89 14.7 3 12 3A9.99 9.99 0 0 0 3.1 7.53l3.31 2.59C7.2 8.26 9.4 6.5 12 6.5z" fill="#EA4335"/>
      </svg>
    ),
    color: ""
  },
  {
    name: "Teams",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <circle cx="6.5" cy="10.5" r="2.5" className="fill-blue-400" />
        <rect x="10" y="7" width="8" height="10" rx="2" className="fill-blue-600" />
        <circle cx="17.5" cy="13.5" r="1.5" className="fill-blue-300" />
      </svg>
    ),
    color: "text-blue-600"
  },
  {
    name: "Hangouts",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <rect x="3" y="3" width="18" height="18" rx="5" className="fill-green-500" />
        <path d="M8 10h4v2H8v2l-3-3 3-3v2zm8 0h-4v2h4v2l3-3-3-3v2z" className="fill-white"/>
      </svg>
    ),
    color: "text-green-500"
  },
  {
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <rect x="2" y="2" width="20" height="20" rx="5" className="fill-blue-700" />
        <rect x="6" y="8" width="2" height="8" className="fill-white" />
        <circle cx="7" cy="6" r="1" className="fill-white" />
        <rect x="10" y="12" width="2" height="4" className="fill-white" />
        <rect x="14" y="10" width="2" height="6" className="fill-white" />
      </svg>
    ),
    color: "text-blue-700"
  }
];

export default function IntegrationsShowcase() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10 dark:bg-blue-300/10"
            style={{
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
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
              repeatType: "loop" as const,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Integrate everything that makes your business run
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            In addition to the flexibility and extensibility provided by our APIs and widgets, we integrate with systems you already use, out of the box!
          </motion.p>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Maintain a single source of truth to keep your organization running smoothly and efficiently.
          </motion.p>
        </div>
        {/* Floating icons */}
        <div className="relative flex flex-wrap justify-center gap-8 min-h-[120px]">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              animate={{
                y: [0, -20, 0, 20, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                repeatType: "loop" as const,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.2,
                filter: "drop-shadow(0 0 16px rgba(59,130,246,0.25))"
              }}
              className={`flex flex-col items-center justify-center ${integration.color} transition-all duration-300`}
              tabIndex={0}
              aria-label={integration.name}
            >
              <div className="bg-white dark:bg-gray-900 rounded-full shadow-lg p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                {integration.icon}
              </div>
              <span className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-200 opacity-80">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}