import { useState } from 'react';

interface Testimonial {
  id: number;
  leftBg?: string;
  leftText?: string;
  leftTextColor?: string;
  leftExtra?: React.ReactNode;
  content: React.ReactNode;
}

const testimonialsData: Testimonial[] = [
  // "The one we liked the best"
  {
    id: 1,
    leftBg: "bg-gradient-to-br from-red-600 via-red-500 to-pink-500 shadow-xl",
    leftText: "Movement Mortgage",
    leftTextColor: "text-white drop-shadow-lg",
    content: (
      <div className="space-y-6">
        <div>
          <div className="font-extrabold text-2xl text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
            <svg width={28} height={28} fill="none" viewBox="0 0 48 48">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#6366f1" />
              <circle cx="24" cy="24" r="10" fill="#fff" />
              <path d="M24 16v8l6 4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            </svg>
            The one we liked the best
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            “We ended up choosing among Axero, Igloo, and Jive. We did free trials of all three, but we kept going back to Axero. It was the one we liked the best.”
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg shadow">
              CB
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Chris Brooks</h4>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Applications Manager</div>
              <a href="#" className="text-blue-600 dark:text-blue-400 underline font-semibold text-sm">Read their story</a>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // "The ease of use"
  {
    id: 2,
    leftBg: "bg-gradient-to-br from-black via-gray-900 to-gray-800 shadow-xl",
    leftText: "TED",
    leftTextColor: "text-red-600 font-extrabold drop-shadow-lg",
    content: (
      <div className="space-y-6">
        <div>
          <div className="font-extrabold text-2xl text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
            <svg width={28} height={28} fill="none" viewBox="0 0 48 48">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#6366f1" />
              <circle cx="24" cy="24" r="10" fill="#fff" />
              <path d="M24 16v8l6 4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            </svg>
            The ease of use
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            “The biggest difference is the ease of use for content contributors. People are creating blogs, wikis, and events without any training. It fosters a culture of accountability and content ownership.”
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-white font-bold text-lg shadow">
              SS
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Sina Sima</h4>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Technical Program Manager</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // "An easy choice"
  {
    id: 3,
    leftExtra: (
      <img
        src="https://www.roosevelt.edu/-/media/Images/roosevelt/logo/ru-logo-vertical-blue.ashx"
        alt="Roosevelt University"
        className="w-28 h-auto mx-auto rounded-xl shadow-lg bg-white p-2"
      />
    ),
    content: (
      <div className="space-y-6 flex flex-col items-center justify-center h-full">
        <div>
          <div className="font-extrabold text-2xl text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
            <svg width={28} height={28} fill="none" viewBox="0 0 48 48">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#6366f1" />
              <circle cx="24" cy="24" r="10" fill="#fff" />
              <path d="M24 16v8l6 4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            </svg>
            An easy choice
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            “We were looking for an intuitive, easy-to-maintain interactive intranet platform with a robust search function that fit the budget. Signing up with Axero was an easy choice.”
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img
              src="https://www.roosevelt.edu/-/media/Images/roosevelt/logo/ru-logo-vertical-blue.ashx"
              alt="Roosevelt University"
              className="w-12 h-12 rounded-full bg-white p-1 shadow"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Liz Foster</h4>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Lead Communications Coordinator</div>
              <a href="#" className="text-blue-600 dark:text-blue-400 underline font-semibold text-sm">Read their story</a>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left Side */}
          <div
            className={`flex flex-col items-center justify-center rounded-3xl p-10 min-w-[180px] md:min-w-[220px] max-w-xs transition-all duration-500 ${
              testimonialsData[currentIndex].leftBg || ""
            }`}
          >
            {testimonialsData[currentIndex].leftText && (
              <span
                className={`text-3xl md:text-4xl font-extrabold tracking-tight ${testimonialsData[currentIndex].leftTextColor || ""} mb-2`}
              >
                {testimonialsData[currentIndex].leftText}
              </span>
            )}
            {testimonialsData[currentIndex].leftExtra && testimonialsData[currentIndex].leftExtra}
          </div>
          {/* Right Side */}
          <div className="flex-1 bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-10 md:p-14 relative overflow-hidden flex flex-col justify-center border border-blue-100 dark:border-blue-900 transition-all duration-500">
            {testimonialsData[currentIndex].content}
            {/* Navigation */}
            <div className="flex justify-between mt-10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/80 dark:bg-gray-700/80 shadow-lg rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors border border-gray-200 dark:border-gray-700"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/80 dark:bg-gray-700/80 shadow-lg rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors border border-gray-200 dark:border-gray-700"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-500'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}