import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface Community {
  id: number;
  name: string;
  memberCount: number;
  initials: string;
  color: string;
  description: string;
  unreadCount?: number;
}

interface CommunitiesListProps {
  className?: string;
}

interface CommunityDetailProps {
  community: Community;
  onBack: () => void;
}

function CommunityDetail({ community, onBack }: CommunityDetailProps) {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-neutral-200 flex items-center">
        {isMobile && (
          <button
            onClick={onBack}
            className="mr-2 p-2 rounded-full hover:bg-neutral-100 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-500"
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
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-neutral-800">
            {community.name}
          </h1>
          <p className="text-sm text-neutral-500">
            {community.memberCount.toLocaleString()} members
          </p>
        </div>
        <div className="ml-auto">
          <Avatar className={cn("h-10 w-10", community.color)}>
            <AvatarFallback>{community.initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-neutral-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-neutral-800 mb-2">
            About this community
          </h3>
          <p className="text-neutral-600 text-sm">{community.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-neutral-800 mb-4">
            Popular discussions
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200 rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <h4 className="font-medium text-neutral-800 text-sm">
                  Discussion topic {i}
                </h4>
                <p className="text-neutral-500 text-xs mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-neutral-400">23 replies</span>
                  <span className="text-xs text-neutral-400">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-neutral-800 mb-4">Active members</h3>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center p-2 hover:bg-neutral-50 rounded-lg cursor-pointer"
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">User {i}</div>
                  <div className="text-xs text-neutral-500">Active now</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-200">
        <Button className="w-full bg-primary hover:bg-blue-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          New Discussion
        </Button>
      </div>
    </div>
  );
}

export function CommunitiesList({ className }: CommunitiesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCommunityId, setActiveCommunityId] = useState<number | null>(
    null
  );
  const isMobile = useIsMobile();

  const communities: Community[] = [
    {
      id: 1,
      name: "Design Hub",
      memberCount: 245,
      initials: "DH",
      color: "bg-purple-100 text-purple-600",
      description: "Share design resources and feedback",
      unreadCount: 3,
    },
    {
      id: 2,
      name: "Developer Network",
      memberCount: 1204,
      initials: "DN",
      color: "bg-blue-100 text-blue-600",
      description: "Coding tips and tech discussions",
      unreadCount: 0,
    },
    {
      id: 3,
      name: "Photography",
      memberCount: 872,
      initials: "PH",
      color: "bg-amber-100 text-amber-600",
      description: "Share and critique photography",
      unreadCount: 12,
    },
    {
      id: 4,
      name: "Book Club",
      memberCount: 124,
      initials: "BC",
      color: "bg-green-100 text-green-600",
      description: "Monthly book discussions",
      unreadCount: 0,
    },
    {
      id: 5,
      name: "Fitness & Health",
      memberCount: 659,
      initials: "FH",
      color: "bg-red-100 text-red-600",
      description: "Workout tips and healthy recipes",
      unreadCount: 5,
    },
  ];

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCommunity = activeCommunityId
    ? communities.find((c) => c.id === activeCommunityId)
    : null;

  const handleBack = () => {
    setActiveCommunityId(null);
  };

  return (
    <div className={cn("flex h-full relative", className)}>
      {/* Communities List */}
      <motion.div
        className={cn(
          "bg-white w-full border-r border-neutral-200 flex flex-col z-20",
          activeCommunityId !== null && isMobile
            ? "absolute transform -translate-x-full"
            : ""
        )}
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          translateX: activeCommunityId !== null && isMobile ? "-100%" : "0%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          maxHeight: "100%",
          overflowY: "auto",
          width: isMobile || !activeCommunityId ? "100%" : "auto",
        }}
      >
        <div className="p-4 border-b border-neutral-200">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-neutral-800">
              Communities
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Connect with like-minded people
            </p>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search communities"
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
            {filteredCommunities.map((community) => (
              <motion.div
                key={community.id}
                className={`hover:bg-neutral-50 p-4 border-b border-neutral-200 cursor-pointer transition-colors duration-200 ${
                  activeCommunityId === community.id ? "bg-neutral-100" : ""
                }`}
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
                onClick={() => setActiveCommunityId(community.id)}
              >
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0">
                    <Avatar className={cn("h-12 w-12", community.color)}>
                      <AvatarFallback>{community.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-neutral-800 truncate">
                        {community.name}
                      </h3>
                      {community.unreadCount && community.unreadCount > 0 && (
                        <Badge
                          className="bg-primary text-white"
                          variant="outline"
                        >
                          {community.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 truncate mt-1">
                      {community.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-neutral-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      {community.memberCount.toLocaleString()} members
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-neutral-200 bg-white">
          <Button
            className="w-full bg-primary hover:bg-blue-600 text-white rounded-full py-2 px-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200"
            onClick={() => {
              alert(
                "This would create a new community in a complete application. Demo data is used for this prototype."
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
            Create Community
          </Button>
        </div>
      </motion.div>

      {/* Community Detail */}
      {activeCommunity && (
        <motion.div
          className={cn(
            "flex-1 z-10 h-full",
            !isMobile && "ml-4",
            isMobile && activeCommunityId === null
              ? "absolute right-0 transform translate-x-full"
              : ""
          )}
          initial={isMobile ? { translateX: "100%" } : { opacity: 0 }}
          animate={
            isMobile
              ? { translateX: activeCommunityId !== null ? "0%" : "100%" }
              : { opacity: 1 }
          }
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <CommunityDetail community={activeCommunity} onBack={handleBack} />
        </motion.div>
      )}
    </div>
  );
}
