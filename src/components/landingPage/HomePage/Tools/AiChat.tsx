import { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import IntranetAssistant from './IntranetAssistant';

// Define the correct context for the intranet assistant
interface IntranetContext {
  department?: string;
  team?: string;
  location?: string;
  announcement?: string;
  policies?: string[];
  events?: string[];
  description?: string;
  images?: string[];
}

interface ChatButtonProps {
  intranetContext?: IntranetContext;
  className?: string;
}

export default function ChatButton({ intranetContext, className = '' }: ChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 ${className}`}
        title="Ask Intranet Assistant"
        aria-label="Open Intranet Assistant"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      <IntranetAssistant
        intranetContext={intranetContext}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}