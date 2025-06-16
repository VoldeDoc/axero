import { useState } from 'react';
import { ArrowRightIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCountryTranslate } from '@/hooks/useCountry';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorImage: string;
  coverImage: string;
  readTime: string;
  likes: number;
  comments: number;
  category: string;
}

const storiesData: Story[] = [
  {
    id: 1,
    title: "48 Hours in Lagos: A Food Lover's Paradise",
    excerpt: "From street food in Balogun Market to fine dining in Victoria Island, discover the incredible culinary landscape of Nigeria's commercial capital...",
    author: "Amara Okafor",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    likes: 234,
    comments: 18,
    category: "Food & Culture"
  },
  {
    id: 2,
    title: "Hidden Gems of Abuja: Beyond the City Center",
    excerpt: "Discover the untold stories and secret spots that make Nigeria's capital city a treasure trove for adventurous travelers...",
    author: "Kemi Adebayo",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "7 min read",
    likes: 189,
    comments: 24,
    category: "Adventure"
  },
  {
    id: 3,
    title: "Calabar Carnival: A Cultural Extravaganza",
    excerpt: "Experience the vibrant colors, rhythmic music, and cultural richness of Africa's biggest street carnival through my lens...",
    author: "Emeka Nwosu",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "6 min read",
    likes: 312,
    comments: 45,
    category: "Festival"
  }
];

export default function TravelStories() {
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());
  
  // Use the hook for country context
  const { selectedCountry } = useCountryTranslate();

  const toggleLike = (storyId: number) => {
    const newLikedStories = new Set(likedStories);
    if (newLikedStories.has(storyId)) {
      newLikedStories.delete(storyId);
    } else {
      newLikedStories.add(storyId);
    }
    setLikedStories(newLikedStories);
  };

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Travel Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-0">
              Share your travel experiences across {selectedCountry.name}
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors group">
            <span>View More</span>
            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {storiesData.map((story) => (
            <article 
              key={story.id} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {story.category}
                </div>

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(story.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  {likedStories.has(story.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={story.authorImage}
                    alt={story.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {story.author}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {story.readTime}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                  {story.excerpt}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <HeartIcon className="w-4 h-4" />
                      <span className="text-sm">{story.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <ChatBubbleLeftIcon className="w-4 h-4" />
                      <span className="text-sm">{story.comments}</span>
                    </div>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Have a story to share?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our community of travelers and inspire others with your unique experiences and adventures across {selectedCountry.name} and beyond.
          </p>
          
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            <span>Read More Stories</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}