import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Call {
  id: number;
  contactName: string;
  contactInitials: string;
  contactColor: string;
  type: "incoming" | "outgoing" | "missed";
  date: string;
  time: string;
  duration?: string;
}

interface CallsListProps {
  className?: string;
}

export function CallsList({ className }: CallsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const calls: Call[] = [
    {
      id: 1,
      contactName: "Sarah Johnson",
      contactInitials: "SJ",
      contactColor: "bg-purple-100 text-purple-600",
      type: "incoming",
      date: "Today",
      time: "10:23 AM",
      duration: "14:32",
    },
    {
      id: 2,
      contactName: "Michael Chen",
      contactInitials: "MC",
      contactColor: "bg-blue-100 text-blue-600",
      type: "outgoing",
      date: "Today",
      time: "9:15 AM",
      duration: "5:45",
    },
    {
      id: 3,
      contactName: "Emily Davis",
      contactInitials: "ED",
      contactColor: "bg-amber-100 text-amber-600",
      type: "missed",
      date: "Yesterday",
      time: "4:32 PM",
    },
    {
      id: 4,
      contactName: "Marketing Team",
      contactInitials: "MT",
      contactColor: "bg-green-100 text-green-600",
      type: "incoming",
      date: "Yesterday",
      time: "2:10 PM",
      duration: "45:20",
    },
    {
      id: 5,
      contactName: "James Wilson",
      contactInitials: "JW",
      contactColor: "bg-red-100 text-red-600",
      type: "outgoing",
      date: "Feb 21",
      time: "11:05 AM",
      duration: "3:12",
    },
    {
      id: 6,
      contactName: "Sarah Johnson",
      contactInitials: "SJ",
      contactColor: "bg-purple-100 text-purple-600",
      type: "missed",
      date: "Feb 20",
      time: "6:43 PM",
    },
  ];

  const filteredCalls = calls.filter((call) =>
    call.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCallIcon = (type: "incoming" | "outgoing" | "missed") => {
    switch (type) {
      case "incoming":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-green-600 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
              transform="rotate(90 12 12)"
            />
          </svg>
        );
      case "outgoing":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-blue-600 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
              transform="rotate(-90 12 12)"
            />
          </svg>
        );
      case "missed":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-600 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
    }
  };

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
          <h1 className="text-xl font-semibold text-neutral-800">Calls</h1>
          <p className="text-sm text-neutral-500 mt-1">Recent call history</p>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search calls"
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
          {filteredCalls.map((call) => (
            <motion.div
              key={call.id}
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
              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0">
                  <Avatar className={cn("h-12 w-12", call.contactColor)}>
                    <AvatarFallback>{call.contactInitials}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-neutral-800 truncate">
                      {call.contactName}
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {call.time}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    {getCallIcon(call.type)}
                    <span className="text-sm text-neutral-600">
                      {call.type === "incoming"
                        ? "Incoming"
                        : call.type === "outgoing"
                        ? "Outgoing"
                        : "Missed"}{" "}
                      call
                    </span>
                    {call.duration && (
                      <span className="text-xs text-neutral-500 ml-2">
                        ({call.duration})
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {call.date}
                  </div>
                </div>
                <div className="ml-2 flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-neutral-100 text-primary transition-colors duration-200">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
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
              "This would open the dialer in a complete application. Demo data is used for this prototype."
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          New Call
        </Button>
      </div>
    </motion.div>
  );
}
