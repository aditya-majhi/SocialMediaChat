import { cn } from "@/lib/utils";

type StatusType = "online" | "offline" | "away" | "typing";

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  return (
    <>
      {status === "typing" ? (
        <div
          className={cn(
            "px-3 py-1 rounded-full bg-neutral-100 text-xs text-neutral-500 flex items-center",
            className
          )}
        >
          <div className="mr-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
          <span>typing</span>
          <div className="typing-indicator ml-1 flex">
            <span className="animate-typing"></span>
            <span className="animate-typing animation-delay-300"></span>
            <span className="animate-typing animation-delay-600"></span>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
            status === "online" && "bg-secondary",
            status === "offline" && "bg-neutral-400",
            status === "away" && "bg-amber-400",
            className
          )}
        />
      )}
    </>
  );
}
