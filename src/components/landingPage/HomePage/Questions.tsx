import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useCountryTranslate } from '@/hooks/useCountry';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What makes thetravelhunters different?",
    answer: "The ease of booking a hotel, and the assurance that your booking confirmation slip is golden. When you have it, you can always head to the hotel."
  },
  {
    id: 2,
    question: "How fast do you process cancellations?",
    answer: "Typically, we process refunds on cancellations under 6 hours. This is to ensure that customers can make the travel decisions that suits them."
  },
  {
    id: 3,
    question: "Can I book a hotel without payment?",
    answer: "Yes. Some hotels have this payment option."
  },
  {
    id: 4,
    question: "Can I reach you at any time?",
    answer: "Yes, you are able to reach our customer support center 24 hours, everyday."
  },
  {
    id: 5,
    question: "What is late-night deals and how does it work?",
    answer: "You find available hotel rooms at night for the lowest prices, and you can book instantly and go to bed. It is designed for Travelers, clubbers, and Night-owls. You may cancel until 10:30pm, and you won't be charged any fee."
  },
  {
    id: 6,
    question: "What is the quality of hotels here?",
    answer: "All hotels on our website are properly vetted, ensuring that you can book hotels and go take a nap. You also get to see all details of the room before you make payment."
  },
  {
    id: 7,
    question: "What is Book-on hold?",
    answer: "You pay 20% payment to make reservations for selected hotels."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1])); // First item open by default
  
  // Use the hook for country context
  const { selectedCountry } = useCountryTranslate();

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-blue-25 to-sky-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Image and Title */}
          <div className="lg:sticky lg:top-8">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Questions travellers ask
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Everything you need to know about traveling in {selectedCountry.name}
              </p>
            </div>
            
            {/* Image Container */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 p-2">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Travelers asking questions"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
                />
                
                {/* Floating Question Bubbles */}
                <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-bounce">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="absolute top-20 right-8 bg-blue-500 text-white rounded-full p-2 shadow-lg animate-pulse">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>

                <div className="absolute bottom-8 left-8 bg-green-500 text-white rounded-lg px-3 py-2 shadow-lg text-sm font-medium">
                  24/7 Support
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/50 dark:bg-blue-400/20 rounded-full -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-200/50 dark:bg-sky-400/20 rounded-full -z-10" />
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors hover:bg-blue-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.has(item.id) ? (
                        <ChevronUpIcon className="w-6 h-6 text-blue-500 transform transition-transform duration-200" />
                      ) : (
                        <ChevronDownIcon className="w-6 h-6 text-gray-400 transform transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openItems.has(item.id)
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <div className="border-t border-blue-100 dark:border-gray-600 pt-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Support Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Still have questions?</h4>
                  <p className="text-blue-100 text-sm">Our support team is available 24/7 to help you.</p>
                </div>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}