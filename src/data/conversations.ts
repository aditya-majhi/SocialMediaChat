export interface User {
    id: number;
    username: string;
    fullName: string | null;
    avatar: string | null;
}

export interface Conversation {
    id: number;
    name: string | null;
    type: "direct" | "group";
    participants: UserWithStatus[];
    lastMessage: {
        content: string;
        timestamp: string;
        senderId: number;
    };
    unreadCount: number;
}

export interface UserWithStatus extends User {
    status: "online" | "offline" | "away";
    initials: string;
    color: string;
}

// Sample users for our static conversations
const users: UserWithStatus[] = [
    {
        id: 1,
        username: "current_user",
        fullName: "Current User",
        status: "online",
        avatar: null,
        initials: "ME",
        color: "bg-primary text-white"
    },
    {
        id: 2,
        username: "sarah_chen",
        fullName: "Sarah Chen",
        status: "online",
        avatar: null,
        initials: "SC",
        color: "bg-blue-100 text-primary"
    },
    {
        id: 3,
        username: "alex_johnson",
        fullName: "Alex Johnson",
        status: "online",
        avatar: null,
        initials: "AJ",
        color: "bg-amber-100 text-amber-600"
    },
    {
        id: 4,
        username: "thomas_nelson",
        fullName: "Thomas Nelson",
        status: "offline",
        avatar: null,
        initials: "TN",
        color: "bg-red-100 text-red-600"
    },
    {
        id: 5,
        username: "emily_martinez",
        fullName: "Emily Martinez",
        status: "online",
        avatar: null,
        initials: "EM",
        color: "bg-purple-100 text-purple-600"
    },
    {
        id: 6,
        username: "michael_davis",
        fullName: "Michael Davis",
        status: "offline",
        avatar: null,
        initials: "MD",
        color: "bg-green-100 text-green-600"
    }
];

// Create sample conversations
export const conversations: Conversation[] = [
    {
        id: 1,
        name: null,
        type: "direct",
        participants: [users[0], users[1]],
        lastMessage: {
            content: "I've sent you the files you requested, let me know if you need anything else!",
            timestamp: "12:42 PM",
            senderId: 2
        },
        unreadCount: 0
    },
    {
        id: 2,
        name: "Design Team",
        type: "group",
        participants: [users[0], users[1], users[2], users[4], users[5]],
        lastMessage: {
            content: "Meeting at 2pm to discuss the new project requirements",
            timestamp: "Yesterday",
            senderId: 5
        },
        unreadCount: 0
    },
    {
        id: 3,
        name: null,
        type: "direct",
        participants: [users[0], users[2]],
        lastMessage: {
            content: "Hey, are you free this weekend for the conference?",
            timestamp: "Yesterday",
            senderId: 3
        },
        unreadCount: 0
    },
    {
        id: 4,
        name: "Marketing Department",
        type: "group",
        participants: [users[0], users[3], users[5]],
        lastMessage: {
            content: "The new campaign assets are ready for review",
            timestamp: "Tuesday",
            senderId: 6
        },
        unreadCount: 0
    },
    {
        id: 5,
        name: null,
        type: "direct",
        participants: [users[0], users[3]],
        lastMessage: {
            content: "Thanks for your help with the project!",
            timestamp: "Monday",
            senderId: 4
        },
        unreadCount: 0
    }
];

export function getConversationName(conversation: Conversation, currentUserId: number): string {
    if (conversation.name) {
        return conversation.name;
    }

    // For direct messages, show the other person's name
    const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
    return otherParticipant?.fullName || "Unknown";
}

export function getParticipantCount(conversation: Conversation): string {
    const count = conversation.participants.length;
    return `${count} ${count === 1 ? 'participant' : 'participants'}`;
}

export function getCurrentUser(): UserWithStatus {
    return users[0];
}

export function getAllUsers(): UserWithStatus[] {
    return users;
}
