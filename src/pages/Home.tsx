import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/layout/Sidebar";
import { ConversationList } from "@/layout/ConversationList";
import { ChatArea } from "@/layout/ChatArea";
import { CommunitiesList } from "@/layout/CommunitiesList";
import { CallsList } from "@/layout/CallsList";
import { SavedItemsList } from "@/layout/SavedItemsList";
import { useMediaQuery } from "@/hooks/use-mobile";
import { conversations, getCurrentUser } from "@/data/conversations";

export default function Home() {
  const [activeTab, setActiveTab] = useState("messages");
  const [activeConversationId, setActiveConversationId] = useState<
    number | null
  >(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const currentUser = getCurrentUser();

  // Set initial active conversation
  useEffect(() => {
    if (conversations.length > 0 && activeConversationId === null) {
      setActiveConversationId(2); // Start with the second conversation (design team)
    }

    // Cleanup function to ensure we restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Effect to handle sidebar state
  useEffect(() => {
    // Reset body overflow when sidebar is closed
    if (!isSidebarVisible) {
      document.body.style.overflow = "";
    }
  }, [isSidebarVisible]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Close the sidebar when changing tabs on mobile
    if (isMobile) {
      // We don't want to automatically open and close it anymore
      // as that was causing issues with menu visibility
      setIsSidebarVisible(false);
    }

    // Reset active conversation when switching from messages tab
    if (tab !== "messages") {
      setActiveConversationId(null);
    }
  };

  // Handle selecting a conversation
  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
    // Close the sidebar when selecting a conversation on mobile
    if (isMobile) {
      setIsSidebarVisible(false);
    }
  };

  // Handle mobile back button
  const handleBack = () => {
    if (isMobile) {
      setActiveConversationId(null);
    }
  };

  // Handle mobile menu toggle
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);

    // Prevent scrolling on body when sidebar is open
    if (!isSidebarVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Find the active conversation
  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId
    ) || null;

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile header */}
      {isMobile && (
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden z-100 h-[60px] transition-colors fixed top-0 left-0 right-0">
          <button
            className="focus:outline-none p-2 hover:bg-neutral-100 rounded-full transition-colors"
            onClick={toggleSidebar}
            aria-label={isSidebarVisible ? "Close menu" : "Open menu"}
          >
            {isSidebarVisible ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <h1 className="text-lg font-semibold text-neutral-800 transition-colors">
            Flow Chat
          </h1>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium transition-colors">
            {currentUser.initials}
          </div>
        </header>
      )}

      <div
        className={`flex flex-1 overflow-hidden relative ${
          isMobile ? "pt-[60px]" : ""
        }`}
      >
        {/* Mobile overlay when sidebar is open */}
        {isMobile && isSidebarVisible && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden pt-[60px]"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Sidebar - always present in DOM but visibility controlled by animation */}
        <motion.div
          className={`fixed left-0 md:relative md:inset-auto z-40 ${
            isMobile ? "w-full max-w-[280px] md:w-auto" : ""
          } ${isMobile ? "top-[60px] bottom-0" : "h-full"}`}
          initial={{ x: isMobile ? "-100%" : 0 }}
          animate={{
            x: isMobile && !isSidebarVisible ? "-100%" : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Sidebar
            currentUser={currentUser}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            className="h-full"
          />
        </motion.div>

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Messages Tab Content */}
          {activeTab === "messages" && (
            <>
              {/* Conversation List */}
              <motion.div
                className={`md:relative z-10 w-full md:w-auto ${
                  isMobile && activeConversationId !== null
                    ? "absolute translate-x-[-100%]"
                    : "translate-x-0"
                }`}
                animate={{
                  translateX:
                    isMobile && activeConversationId !== null ? "-100%" : "0%",
                }}
                transition={{ duration: 0.2 }}
              >
                <ConversationList
                  conversations={conversations}
                  activeConversationId={activeConversationId}
                  onSelectConversation={handleSelectConversation}
                  isMobile={isMobile}
                  className="h-full"
                />
              </motion.div>

              {/* Chat Area */}
              <motion.div
                className={`flex-1 absolute inset-0 md:relative md:inset-auto ${
                  isMobile && activeConversationId === null
                    ? "translate-x-[100%]"
                    : "translate-x-0"
                }`}
                animate={{
                  translateX:
                    isMobile && activeConversationId === null ? "100%" : "0%",
                }}
                transition={{ duration: 0.2 }}
              >
                <ChatArea
                  conversation={activeConversation}
                  onBack={handleBack}
                  className="h-full"
                />
              </motion.div>
            </>
          )}

          {/* Other tabs content with full width */}
          {activeTab === "communities" && (
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <CommunitiesList className="h-full" />
            </motion.div>
          )}

          {activeTab === "calls" && (
            <motion.div
              className="flex-1 w-full md:w-full lg:w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ maxWidth: "100%" }}
            >
              <CallsList className="h-full w-full" />
            </motion.div>
          )}

          {activeTab === "saved" && (
            <motion.div
              className="flex-1 w-full md:w-full lg:w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ maxWidth: "100%" }}
            >
              <SavedItemsList className="h-full w-full" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
