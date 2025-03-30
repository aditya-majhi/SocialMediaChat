import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SavedItem {
  id: number;
  type: "message" | "file" | "link" | "image";
  title: string;
  description: string;
  date: string;
  sender?: string;
  thumbnail?: string;
}

interface SavedItemsListProps {
  className?: string;
}

export function SavedItemsList({ className }: SavedItemsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const savedItems: SavedItem[] = [
    {
      id: 1,
      type: "message",
      title: "Project timeline discussion",
      description:
        "We need to finalize the timeline for the new product launch by next week...",
      date: "2 days ago",
      sender: "Sarah Johnson",
    },
    {
      id: 2,
      type: "file",
      title: "Q1 Marketing Report.pdf",
      description: "Quarterly marketing performance summary",
      date: "1 week ago",
      sender: "Marketing Team",
    },
    {
      id: 3,
      type: "link",
      title: "Design System Documentation",
      description: "https://designsystem.company.com/docs",
      date: "2 weeks ago",
      sender: "David Chen",
    },
    {
      id: 4,
      type: "image",
      title: "Logo Concepts",
      description: "Final versions of the logo redesign",
      date: "3 weeks ago",
      sender: "Design Team",
      thumbnail: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      type: "message",
      title: "Meeting Notes: Client Presentation",
      description:
        "Key points from our client presentation meeting on Tuesday...",
      date: "1 month ago",
      sender: "Emily Davis",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "message":
        return (
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
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        );
      case "file":
        return (
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
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        );
      case "link":
        return (
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
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        );
      case "image":
        return (
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredItems = savedItems.filter((item) => {
    // Apply text search
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply type filter
    const matchesFilter = !activeFilter || item.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      className={cn(
        "bg-white w-full border-r border-neutral-200 flex flex-col z-20",
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <div className="p-4 border-b border-neutral-200">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-neutral-800">
            Saved Items
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Your bookmarked content
          </p>
        </div>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search saved items"
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
        <div className="flex space-x-2 overflow-x-auto py-1">
          <Button
            variant={activeFilter === null ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveFilter(null)}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "message" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() =>
              setActiveFilter(activeFilter === "message" ? null : "message")
            }
          >
            Messages
          </Button>
          <Button
            variant={activeFilter === "file" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() =>
              setActiveFilter(activeFilter === "file" ? null : "file")
            }
          >
            Files
          </Button>
          <Button
            variant={activeFilter === "link" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() =>
              setActiveFilter(activeFilter === "link" ? null : "link")
            }
          >
            Links
          </Button>
          <Button
            variant={activeFilter === "image" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() =>
              setActiveFilter(activeFilter === "image" ? null : "image")
            }
          >
            Images
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="hover:bg-neutral-50 p-4 border-b border-neutral-200 cursor-pointer transition-colors duration-200"
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
                whileHover={{ backgroundColor: "rgb(249 250 251)" }}
              >
                <div className="flex">
                  <div className="mr-3 flex-shrink-0 bg-neutral-100 text-neutral-600 p-3 rounded-lg">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-neutral-800 truncate">
                        {item.title}
                      </h3>
                      <span className="text-xs text-neutral-500">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 truncate mt-1">
                      {item.description}
                    </p>
                    {item.sender && (
                      <div className="text-xs text-neutral-500 mt-2">
                        Saved from {item.sender}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-neutral-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-800">
                No saved items found
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                {searchQuery
                  ? "Try a different search term"
                  : "Save messages, files, and links for quick access"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
