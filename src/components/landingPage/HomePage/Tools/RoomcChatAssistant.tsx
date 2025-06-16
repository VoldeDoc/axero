import React, { useState, useRef, useEffect } from "react";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { AIVirtualAssistant } from "@/services/ai-server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

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

interface RoomChatAssistantProps {
  roomContext?: RoomContext;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomChatAssistant({
  roomContext,
  isOpen,
  onClose,
}: RoomChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: roomContext
        ? `Hi! I'm here to help you with questions about ${
            roomContext.hotelName || "this hotel"
          } and the ${
            roomContext.roomType || "room"
          }. What would you like to know?`
        : "Hi! I'm here to help you with any hotel or travel questions. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const generateAIResponse = async (question: string): Promise<string> => {
    const response = await AIVirtualAssistant(
      question,
      roomContext || {},
      messages
    );

    if (roomContext) {
      return `Based on the information about ${
        roomContext.hotelName || "this hotel"
      }, here's what I can tell you about "${question}": ${response}`;
    } else {
      return `Here's what I can tell you about "${question}": ${response}`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    const currentQuestion = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      // Generate AI response
      const response = await generateAIResponse(currentQuestion);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your question. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    // Focus input and scroll to bottom
    setTimeout(() => {
      inputRef.current?.focus();
      scrollToBottom();
    }, 100);
  };

  const quickQuestions = roomContext
    ? [
        "What amenities are included?",
        "What's the cancellation policy?",
        "Is breakfast included?",
        "What's nearby the hotel?",
        "How far is it from the airport?",
      ]
    : [
        "How do I find the best hotel deals?",
        "What should I look for when booking?",
        "What amenities are most important?",
        "How far in advance should I book?",
        "What's the difference between room types?",
      ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl transform transition-transform flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-green-600 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Hotel Assistant</h3>
              <p className="text-sm text-green-100">
                {roomContext
                  ? "Ask about this room"
                  : "Ask me anything about hotels"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-green-100 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: "calc(100vh - 240px)" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-green-500 text-white rounded-br-sm"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === "user"
                      ? "text-green-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-sm max-w-[85%]">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions - Only show for first message */}
        {messages.length === 1 && !isLoading && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick questions:
            </p>
            <div className="space-y-2">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left text-sm p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 shadow-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                roomContext
                  ? "Ask about this room..."
                  : "Ask me anything about hotels..."
              }
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
