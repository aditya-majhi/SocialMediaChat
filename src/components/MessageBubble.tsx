import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImagePreview, FilePreview } from "./MediaPreview";

interface MessageBubbleProps {
  isCurrentUser: boolean;
  senderName?: string;
  senderInitials: string;
  senderColor: string;
  content: string;
  timestamp: string;
  media?: {
    type: "image" | "file";
    url: string;
    fileName?: string;
    fileSize?: string;
  };
  onMediaPreview?: (url: string) => void;
  onFileDownload?: (fileName: string) => void;
  showAvatar?: boolean;
}

export function MessageBubble({
  isCurrentUser,
  senderName,
  senderInitials,
  senderColor,
  content,
  timestamp,
  media,
  onMediaPreview,
  onFileDownload,
  showAvatar = true,
}: MessageBubbleProps) {
  // Animation variants for messages
  const bubbleVariants = {
    initial: {
      opacity: 0,
      x: isCurrentUser ? 20 : -20,
      y: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    hover: {
      y: -1,
    },
  };

  return (
    <motion.div
      className={cn("flex items-end", isCurrentUser && "justify-end")}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={bubbleVariants}
    >
      {!isCurrentUser && showAvatar && (
        <div className="flex-shrink-0 mr-2">
          <Avatar className={cn("h-8 w-8", senderColor)}>
            <AvatarFallback>{senderInitials}</AvatarFallback>
          </Avatar>
        </div>
      )}

      <div
        className={cn(
          "max-w-xs lg:max-w-md",
          isCurrentUser ? "text-right" : ""
        )}
      >
        {!isCurrentUser && senderName && (
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium text-neutral-700 mr-2">
              {senderName}
            </span>
            <span className="text-xs text-neutral-500">{timestamp}</span>
          </div>
        )}
        {isCurrentUser && (
          <div className="flex items-center justify-end mb-1">
            <span className="text-xs text-neutral-500">{timestamp}</span>
          </div>
        )}

        <motion.div
          className={cn(
            "px-4 py-2 shadow-sm",
            isCurrentUser
              ? "bg-primary text-white rounded-2xl rounded-br-none"
              : "bg-white rounded-2xl rounded-bl-none"
          )}
          variants={{
            hover: {
              y: -1,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          <p
            className={cn(
              "text-sm",
              isCurrentUser ? "text-white" : "text-neutral-800"
            )}
          >
            {content}
          </p>

          {media && (
            <div className="mt-2">
              {media.type === "image" && (
                <ImagePreview
                  src={media.url}
                  onClick={() => onMediaPreview?.(media.url)}
                />
              )}

              {media.type === "file" && media.fileName && media.fileSize && (
                <FilePreview
                  fileName={media.fileName}
                  fileSize={media.fileSize}
                  onDownload={() => onFileDownload?.(media.fileName || "")}
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
