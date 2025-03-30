import { UserWithStatus } from "./conversations";

export interface Message {
    id: number;
    conversationId: number;
    sender: UserWithStatus;
    content: string;
    timestamp: string;
    sentDate: string;
    media?: {
        type: "image" | "file";
        url: string;
        fileName?: string;
        fileSize?: string;
    };
}

const yesterdayMessages: Message[] = [
    // Design Team - Conversation ID: 2
    {
        id: 1,
        conversationId: 2,
        sender: {
            id: 5,
            username: "emily_martinez",
            fullName: "Emily Martinez",
            status: "online",
            avatar: null,
            initials: "EM",
            color: "bg-purple-100 text-purple-600"
        },
        content: "Hi team, I've uploaded the new design mockups for the landing page. Could everyone please review and provide feedback by EOD?",
        timestamp: "10:30 AM",
        sentDate: "Yesterday"
    },
    {
        id: 2,
        conversationId: 2,
        sender: {
            id: 5,
            username: "emily_martinez",
            fullName: "Emily Martinez",
            status: "online",
            avatar: null,
            initials: "EM",
            color: "bg-purple-100 text-purple-600"
        },
        content: "Here's a preview of the homepage:",
        timestamp: "10:32 AM",
        sentDate: "Yesterday",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
        }
    },
    {
        id: 3,
        conversationId: 2,
        sender: {
            id: 3,
            username: "alex_johnson",
            fullName: "Alex Johnson",
            status: "online",
            avatar: null,
            initials: "AJ",
            color: "bg-amber-100 text-amber-600"
        },
        content: "Looks good! I like the color palette. Maybe we could add more contrast to the CTA buttons?",
        timestamp: "10:45 AM",
        sentDate: "Yesterday"
    },
    {
        id: 4,
        conversationId: 2,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "I agree with Alex. The overall layout is clean, but the buttons could use more emphasis. Also, what about adding some testimonials in that empty space below the hero section?",
        timestamp: "11:15 AM",
        sentDate: "Yesterday"
    },

    // Sarah Chen Direct Messages - Conversation ID: 1
    {
        id: 7,
        conversationId: 1,
        sender: {
            id: 2,
            username: "sarah_chen",
            fullName: "Sarah Chen",
            status: "online",
            avatar: null,
            initials: "SC",
            color: "bg-blue-100 text-primary"
        },
        content: "Hey! Did you get a chance to look at the client presentation I sent over?",
        timestamp: "11:30 AM",
        sentDate: "Yesterday"
    },
    {
        id: 8,
        conversationId: 1,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "Yes, it looks fantastic! I really like the approach you took with the market analysis section.",
        timestamp: "12:05 PM",
        sentDate: "Yesterday"
    },
    {
        id: 9,
        conversationId: 1,
        sender: {
            id: 2,
            username: "sarah_chen",
            fullName: "Sarah Chen",
            status: "online",
            avatar: null,
            initials: "SC",
            color: "bg-blue-100 text-primary"
        },
        content: "Thanks! I spent extra time on that part. By the way, here are those files you requested:",
        timestamp: "12:30 PM",
        sentDate: "Yesterday",
        media: {
            type: "file",
            url: "#",
            fileName: "client_data_2023.xlsx",
            fileSize: "3.8 MB"
        }
    },

    // Alex Johnson Direct Messages - Conversation ID: 3
    {
        id: 10,
        conversationId: 3,
        sender: {
            id: 3,
            username: "alex_johnson",
            fullName: "Alex Johnson",
            status: "online",
            avatar: null,
            initials: "AJ",
            color: "bg-amber-100 text-amber-600"
        },
        content: "Hey, are you free this weekend for the conference?",
        timestamp: "3:15 PM",
        sentDate: "Yesterday"
    },
    {
        id: 11,
        conversationId: 3,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "Yes, I've already booked my ticket. Are you presenting anything?",
        timestamp: "4:20 PM",
        sentDate: "Yesterday"
    },
    {
        id: 12,
        conversationId: 3,
        sender: {
            id: 3,
            username: "alex_johnson",
            fullName: "Alex Johnson",
            status: "online",
            avatar: null,
            initials: "AJ",
            color: "bg-amber-100 text-amber-600"
        },
        content: "I'll be doing a short talk on UX design trends. Here's a preview of one of my slides:",
        timestamp: "5:00 PM",
        sentDate: "Yesterday",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
        }
    },

    // Marketing Department - Conversation ID: 4
    {
        id: 13,
        conversationId: 4,
        sender: {
            id: 6,
            username: "michael_davis",
            fullName: "Michael Davis",
            status: "offline",
            avatar: null,
            initials: "MD",
            color: "bg-green-100 text-green-600"
        },
        content: "Team, we need to finalize the Q4 marketing strategy by Friday. Any updates?",
        timestamp: "9:00 AM",
        sentDate: "Yesterday"
    },
    {
        id: 14,
        conversationId: 4,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "I've completed the social media calendar and budget allocation. Will share the document by end of day.",
        timestamp: "10:15 AM",
        sentDate: "Yesterday"
    },
    {
        id: 15,
        conversationId: 4,
        sender: {
            id: 3,
            username: "thomas_nelson",
            fullName: "Thomas Nelson",
            status: "offline",
            avatar: null,
            initials: "TN",
            color: "bg-red-100 text-red-600"
        },
        content: "The campaign assets are ready for review. Take a look at the main banner:",
        timestamp: "2:30 PM",
        sentDate: "Yesterday",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
        }
    },

    // Thomas Nelson Direct Messages - Conversation ID: 5
    {
        id: 16,
        conversationId: 5,
        sender: {
            id: 4,
            username: "thomas_nelson",
            fullName: "Thomas Nelson",
            status: "offline",
            avatar: null,
            initials: "TN",
            color: "bg-red-100 text-red-600"
        },
        content: "Hey, I wanted to thank you for your help with the project last week. It really made a difference.",
        timestamp: "11:30 AM",
        sentDate: "Yesterday"
    },
    {
        id: 17,
        conversationId: 5,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "No problem at all! It was a great learning experience for me too.",
        timestamp: "12:45 PM",
        sentDate: "Yesterday"
    },
    {
        id: 18,
        conversationId: 5,
        sender: {
            id: 4,
            username: "thomas_nelson",
            fullName: "Thomas Nelson",
            status: "offline",
            avatar: null,
            initials: "TN",
            color: "bg-red-100 text-red-600"
        },
        content: "By the way, here's that book I mentioned. It's a great resource for UX design principles.",
        timestamp: "1:30 PM",
        sentDate: "Yesterday",
        media: {
            type: "file",
            url: "#",
            fileName: "ux_design_handbook.pdf",
            fileSize: "12.3 MB"
        }
    }
];

const todayMessages: Message[] = [
    // Design Team - Conversation ID: 2
    {
        id: 5,
        conversationId: 2,
        sender: {
            id: 5,
            username: "emily_martinez",
            fullName: "Emily Martinez",
            status: "online",
            avatar: null,
            initials: "EM",
            color: "bg-purple-100 text-purple-600"
        },
        content: "I've updated the design based on your feedback:",
        timestamp: "9:05 AM",
        sentDate: "Today",
        media: {
            type: "file",
            url: "#",
            fileName: "homepage-redesign-v2.fig",
            fileSize: "4.2 MB"
        }
    },
    {
        id: 6,
        conversationId: 2,
        sender: {
            id: 4,
            username: "thomas_nelson",
            fullName: "Thomas Nelson",
            status: "offline",
            avatar: null,
            initials: "TN",
            color: "bg-red-100 text-red-600"
        },
        content: "Perfect! This looks much better. The testimonials section is a great addition.",
        timestamp: "9:47 AM",
        sentDate: "Today"
    },
    {
        id: 19,
        conversationId: 2,
        sender: {
            id: 2,
            username: "sarah_chen",
            fullName: "Sarah Chen",
            status: "online",
            avatar: null,
            initials: "SC",
            color: "bg-blue-100 text-primary"
        },
        content: "Agreed! The revised color scheme makes the call-to-action buttons really stand out now.",
        timestamp: "10:15 AM",
        sentDate: "Today"
    },

    // Sarah Chen Direct Messages - Conversation ID: 1
    {
        id: 20,
        conversationId: 1,
        sender: {
            id: 2,
            username: "sarah_chen",
            fullName: "Sarah Chen",
            status: "online",
            avatar: null,
            initials: "SC",
            color: "bg-blue-100 text-primary"
        },
        content: "Morning! Just checking if you're all set for the client meeting at 2pm?",
        timestamp: "8:30 AM",
        sentDate: "Today"
    },
    {
        id: 21,
        conversationId: 1,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "Good morning! Yes, I've prepared all the materials and will be ready to present the analytics section.",
        timestamp: "8:45 AM",
        sentDate: "Today"
    },
    {
        id: 22,
        conversationId: 1,
        sender: {
            id: 2,
            username: "sarah_chen",
            fullName: "Sarah Chen",
            status: "online",
            avatar: null,
            initials: "SC",
            color: "bg-blue-100 text-primary"
        },
        content: "Great! I've sent you the final presentation deck. We should aim to wrap up within 45 minutes.",
        timestamp: "9:00 AM",
        sentDate: "Today"
    },
    {
        id: 23,
        conversationId: 1,
        sender: {
            id: 2,
            username: "sarah_chen",
            fullName: "Sarah Chen",
            status: "online",
            avatar: null,
            initials: "SC",
            color: "bg-blue-100 text-primary"
        },
        content: "I've sent you the files you requested, let me know if you need anything else!",
        timestamp: "12:42 PM",
        sentDate: "Today",
        media: {
            type: "file",
            url: "#",
            fileName: "client_presentation_final.pptx",
            fileSize: "5.7 MB"
        }
    },

    // Alex Johnson Direct Messages - Conversation ID: 3
    {
        id: 24,
        conversationId: 3,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "What time does your talk start on Saturday?",
        timestamp: "9:30 AM",
        sentDate: "Today"
    },
    {
        id: 25,
        conversationId: 3,
        sender: {
            id: 3,
            username: "alex_johnson",
            fullName: "Alex Johnson",
            status: "online",
            avatar: null,
            initials: "AJ",
            color: "bg-amber-100 text-amber-600"
        },
        content: "It's scheduled for 11:15 AM in the main hall. Would be great to see you there!",
        timestamp: "10:05 AM",
        sentDate: "Today"
    },

    // Marketing Department - Conversation ID: 4
    {
        id: 26,
        conversationId: 4,
        sender: {
            id: 6,
            username: "michael_davis",
            fullName: "Michael Davis",
            status: "offline",
            avatar: null,
            initials: "MD",
            color: "bg-green-100 text-green-600"
        },
        content: "The new campaign assets are ready for review",
        timestamp: "8:15 AM",
        sentDate: "Today",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
        }
    },
    {
        id: 27,
        conversationId: 4,
        sender: {
            id: 1,
            username: "current_user",
            fullName: "Current User",
            status: "online",
            avatar: null,
            initials: "ME",
            color: "bg-primary text-white"
        },
        content: "These look great! The colors align perfectly with our brand guidelines.",
        timestamp: "9:30 AM",
        sentDate: "Today"
    }
];

// Combine all messages
export const messages: Message[] = [...yesterdayMessages, ...todayMessages];

export function getMessagesByConversation(conversationId: number): Message[] {
    return messages.filter(message => message.conversationId === conversationId);
}

export function getUniqueMessageDates(messages: Message[]): string[] {
    const uniqueDates = new Set<string>();
    messages.forEach(message => uniqueDates.add(message.sentDate));
    return Array.from(uniqueDates);
}
