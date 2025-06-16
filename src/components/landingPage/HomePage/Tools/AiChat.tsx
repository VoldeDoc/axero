import  { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import RoomChatAssistant from './RoomcChatAssistant';

interface RoomContext {
  hotelName?: string;
  roomType?: string;
  price?: number;
  amenities?: string[];
  location?: string;
  rating?: number;
  description?: string;
  images?: string[];
}

interface ChatButtonProps {
  roomContext?: RoomContext;
  className?: string;
}

export default function ChatButton({ roomContext, className = '' }: ChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 ${className}`}
        title="Ask AI Assistant"
        aria-label="Open AI Chat Assistant"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      <RoomChatAssistant
        roomContext={roomContext}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}