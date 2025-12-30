import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatBubbleProps {
  message: string
  isUser: boolean
  timestamp?: string
}

export function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex gap-4 mb-6 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        {isUser ? (
          <>
            <AvatarFallback className="bg-accent text-accent-foreground">You</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
          </>
        )}
      </Avatar>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${
            isUser ? "bg-accent text-accent-foreground" : "card-glow text-foreground"
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        {timestamp && <span className="text-xs text-foreground/50 mt-1">{timestamp}</span>}
      </div>
    </div>
  )
}
