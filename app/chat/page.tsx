"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatBubble } from "@/components/chat-bubble"
import { Button } from "@/components/ui/button"
import { Send, Paperclip } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Astrologer. I'm here to provide cosmic guidance tailored to your unique birth chart and current planetary influences. How can I assist you today?",
      isUser: false,
      timestamp: "Now",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, isUser: true, timestamp: "Now" }])
      setInput("")

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Thank you for your question. Based on the current planetary positions and your cosmic alignment, I can sense a period of significant transformation ahead. Mercury's influence suggests clarity in communication, while Venus brings harmony to your relationships.",
            isUser: false,
            timestamp: "Now",
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto pb-4">
          <div className="space-y-6">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-border pt-6">
          <div className="flex gap-3">
            <button className="p-2 hover:bg-secondary/10 rounded-lg smooth-transition" aria-label="Attach file">
              <Paperclip size={20} className="text-foreground/60" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask your cosmic question..."
              className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={handleSend} className="bg-gradient-to-r from-purple-500 to-pink-500 gap-2">
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
