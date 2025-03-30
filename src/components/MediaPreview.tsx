import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  onClick: () => void;
  className?: string;
}

export function ImagePreview({
  src,
  alt,
  onClick,
  className,
}: ImagePreviewProps) {
  return (
    <motion.div
      className={cn("rounded-lg overflow-hidden cursor-pointer", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt || "Image preview"}
        className="w-full h-auto rounded-lg"
      />
    </motion.div>
  );
}

interface FilePreviewProps {
  fileName: string;
  fileSize: string;
  onDownload: () => void;
  className?: string;
}

export function FilePreview({
  fileName,
  fileSize,
  onDownload,
  className,
}: FilePreviewProps) {
  return (
    <motion.div
      className={cn(
        "p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center",
        className
      )}
      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="mr-3 p-2 bg-primary bg-opacity-10 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-800 truncate">
          {fileName}
        </p>
        <p className="text-xs text-neutral-500">{fileSize}</p>
      </div>
      <motion.button
        className="ml-2 p-1.5 rounded-full hover:bg-neutral-200 focus:outline-none transition-colors duration-200"
        onClick={onDownload}
        whileTap={{ scale: 0.95 }}
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
