import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatusIndicator } from "@/components/StatusIndicator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  UserWithStatus,
  getConversationName,
  getCurrentUser,
} from "@/data/conversations";
import { useSound } from "@/hooks/use-sound";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: number | null;
  onSelectConversation: (id: number) => void;
  className?: string;
  isMobile?: boolean;
}

export function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  className,
  isMobile = false,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { play } = useSound();
  const currentUser = getCurrentUser();

  const filteredConversations = conversations.filter((conversation) =>
    getConversationName(conversation, currentUser.id)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (id: number) => {
    // Only play sound when opening a chat
    play("selectConversation");
    onSelectConversation(id);
  };

  const getOtherParticipant = (
    conversation: Conversation
  ): UserWithStatus | undefined => {
    if (conversation.type === "direct") {
      return conversation.participants.find((p) => p.id !== currentUser.id);
    }
    return undefined;
  };

  const getAvatar = (conversation: Conversation) => {
    if (conversation.type === "direct") {
      const otherUser = getOtherParticipant(conversation);
      return {
        initials: otherUser?.initials || "",
        color: otherUser?.color || "",
      };
    } else {
      return {
        initials: conversation.name?.substring(0, 2) || "GR",
        color: "bg-purple-100 text-purple-600",
      };
    }
  };

  return (
    <motion.div
      className={cn(
        "bg-white w-full md:w-80 lg:w-96 border-r border-neutral-200 flex flex-col z-20",
        className,
        isMobile && activeConversationId !== null && "hidden md:flex"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <div className="p-4 border-b border-neutral-200">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search messages"
            className="w-full bg-neutral-100 rounded-full py-2 pl-10 pr-4 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <AnimatePresence>
          {filteredConversations.map((conversation) => {
            const isActive = conversation.id === activeConversationId;
            const avatar = getAvatar(conversation);
            const otherUser = getOtherParticipant(conversation);

            return (
              <motion.div
                key={conversation.id}
                className={cn(
                  "hover:bg-neutral-50 dark:hover:bg-gray-700 p-4 border-b border-neutral-200 cursor-pointer transition-colors duration-200",
                  isActive && "bg-blue-50"
                )}
                onClick={() => handleSelectConversation(conversation.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  overflow: "hidden",
                }}
                transition={{ type: "spring", damping: 25, stiffness: 500 }}
                whileHover={{
                  backgroundColor: isActive
                    ? "rgb(239 246 255)"
                    : "rgb(249 250 251)",
                }}
              >
                <div className="flex items-start">
                  <div className="relative mr-3 flex-shrink-0">
                    <Avatar className={cn("h-12 w-12", avatar.color)}>
                      <AvatarFallback>{avatar.initials}</AvatarFallback>
                    </Avatar>
                    {otherUser && (
                      <StatusIndicator
                        status={
                          otherUser.status === "online" ? "online" : "offline"
                        }
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-neutral-800 truncate">
                        {getConversationName(conversation, currentUser.id)}
                      </h3>
                      <span className="text-xs text-neutral-500">
                        {conversation.lastMessage.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 truncate mt-1">
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-neutral-200 bg-white">
        <Button
          className="w-full bg-primary hover:bg-blue-600 text-white rounded-full py-2 px-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200"
          onClick={() => {
            play("notification");
            alert(
              "This would open a new message dialog in a complete application. Demo data is used for this prototype."
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          New Message
        </Button>
      </div>
    </motion.div>
  );
}
