import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageBubble } from "@/components/MessageBubble";
import { StatusIndicator } from "@/components/StatusIndicator";
import { Lightbox } from "@/components/LightBox";
import {
  Message,
  getMessagesByConversation,
  getUniqueMessageDates,
} from "@/data/messages";
import {
  Conversation,
  getParticipantCount,
  getCurrentUser,
} from "@/data/conversations";
import { useSound } from "@/hooks/use-sound";

interface ChatAreaProps {
  conversation: Conversation | null;
  onBack: () => void;
  className?: string;
}

export function ChatArea({ conversation, onBack, className }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();
  const { play } = useSound();

  // Get messages for the active conversation
  useEffect(() => {
    if (conversation) {
      const conversationMessages = getMessagesByConversation(conversation.id);
      setMessages(conversationMessages);

      // Simulate typing indicator
      const randomDelay = Math.random() * 10000 + 3000; // Between 3-13 seconds
      const typingTimer = setTimeout(() => {
        setShowTypingIndicator(true);

        // Hide typing indicator after a few seconds
        const hideTimer = setTimeout(() => {
          setShowTypingIndicator(false);
        }, 4000);

        return () => clearTimeout(hideTimer);
      }, randomDelay);

      return () => clearTimeout(typingTimer);
    }
  }, [conversation]);

  // Show typing indicator when user is typing
  useEffect(() => {
    if (inputValue.length > 0) {
      setShowTypingIndicator(false); // Hide any existing typing indicators
    }
  }, [inputValue]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !conversation) return;

    const newMessage: Message = {
      id: Math.max(0, ...messages.map((m) => m.id)) + 1,
      conversationId: conversation.id,
      sender: currentUser,
      content: inputValue,
      timestamp: formatTime(new Date()),
      sentDate: "Today",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    play("messageSent");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMediaPreview = (url: string) => {
    setLightboxImage(url);
    setLightboxOpen(true);
  };

  const handleFileDownload = (fileName: string) => {
    // In a real app, this would initiate a file download
    console.log(`Downloading file: ${fileName}`);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  // Group messages by date
  const messagesByDate = messages.reduce<Record<string, Message[]>>(
    (acc, message) => {
      if (!acc[message.sentDate]) {
        acc[message.sentDate] = [];
      }
      acc[message.sentDate].push(message);
      return acc;
    },
    {}
  );

  // Get unique dates
  const dates = getUniqueMessageDates(messages);

  if (!conversation) {
    return (
      <div
        className={cn(
          "flex-1 flex flex-col items-center justify-center bg-neutral-50",
          className
        )}
      >
        <p className="text-neutral-500">
          Select a conversation to start messaging
        </p>
      </div>
    );
  }

  // Determine if the conversation is a direct message or group
  const isDirectMessage = conversation.type === "direct";
  const otherParticipant = isDirectMessage
    ? conversation.participants.find((p) => p.id !== currentUser.id)
    : null;

  return (
    <motion.div
      className={cn("flex-1 flex flex-col bg-white", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <div className="flex items-center">
          <div className="md:hidden mr-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-1 rounded-full hover:bg-neutral-100 focus:outline-none"
              onClick={onBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
          </div>

          <div className="relative mr-3">
            <Avatar
              className={cn(
                "h-10 w-10",
                isDirectMessage && otherParticipant
                  ? otherParticipant.color
                  : "bg-purple-100 text-purple-600"
              )}
            >
              <AvatarFallback>
                {isDirectMessage && otherParticipant
                  ? otherParticipant.initials
                  : conversation.name?.substring(0, 2) || "GR"}
              </AvatarFallback>
            </Avatar>

            {isDirectMessage && otherParticipant && (
              <StatusIndicator
                status={
                  otherParticipant.status === "online" ? "online" : "offline"
                }
                className="h-2.5 w-2.5"
              />
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-800">
              {isDirectMessage && otherParticipant
                ? otherParticipant.fullName
                : conversation.name}
            </h2>
            <p className="text-xs text-neutral-500">
              {isDirectMessage
                ? otherParticipant?.status === "online"
                  ? "Online"
                  : "Offline"
                : getParticipantCount(conversation)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full hover:bg-neutral-100 focus:outline-none transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full hover:bg-neutral-100 focus:outline-none transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full hover:bg-neutral-100 focus:outline-none transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-container bg-neutral-50">
        <AnimatePresence>
          {dates.map((date) => {
            return (
              <div key={date}>
                {/* Day separator */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-4 py-1 rounded-full bg-neutral-200 text-xs text-neutral-600">
                    {date}
                  </div>
                </motion.div>

                {/* Messages for this date */}
                {messagesByDate[date]?.map((message, index) => {
                  const isCurrentUser = message.sender.id === currentUser.id;
                  const showAvatar =
                    index === 0 ||
                    messagesByDate[date][index - 1]?.sender.id !==
                      message.sender.id;

                  return (
                    <MessageBubble
                      key={message.id}
                      isCurrentUser={isCurrentUser}
                      senderName={
                        !isCurrentUser
                          ? message.sender.fullName || undefined
                          : undefined
                      }
                      senderInitials={message.sender.initials}
                      senderColor={message.sender.color}
                      content={message.content}
                      timestamp={message.timestamp}
                      media={message.media}
                      onMediaPreview={handleMediaPreview}
                      onFileDownload={handleFileDownload}
                      showAvatar={showAvatar}
                    />
                  );
                })}
              </div>
            );
          })}

          {/* Typing indicator */}
          {showTypingIndicator && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StatusIndicator status="typing" />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-neutral-200 p-4 bg-white">
        <div className="flex items-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full hover:bg-neutral-100 focus:outline-none transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </Button>

          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Type a message..."
              className="w-full border border-neutral-300 rounded-full py-2 pl-4 pr-10 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 transition-all duration-200"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 focus:outline-none transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </div>

          <Button
            className="p-2 bg-primary hover:bg-blue-600 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200"
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
                transform="rotate(90 12 12)"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        imageUrl={lightboxImage}
        onClose={() => setLightboxOpen(false)}
      />
    </motion.div>
  );
}
