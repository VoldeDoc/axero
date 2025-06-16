export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RoomContext {
  hotelName?: string;
  roomType?: string;
  price?: number;
  amenities?: string[];
  location?: string;
  rating?: number;
  description?: string;
  images?: string[];
}