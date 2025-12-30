"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, User, Clock } from "lucide-react"
import Link from "next/link"

const JYOTISHI_DATA: Record<string, any> = {
  "1": { name: "Acharya Sharma", specialty: "Vedic Astrology", price: 500 },
  "2": { name: "Pt. Rajesh Kumar", specialty: "Kundli Reading", price: 400 },
  "3": { name: "Dr. Priya Gupta", specialty: "Numerology", price: 350 },
  "4": { name: "Swami Anand", specialty: "Tarot Reading", price: 300 },
  "5": { name: "Vaidya Deepak", specialty: "Planetary Remedies", price: 450 },
  "6": { name: "Jyotishi Neha", specialty: "Love & Relationships", price: 250 },
}

interface Message {
  id: string
  text: string
  sender: "user" | "jyotishi"
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const jyotishiId = params.id as string
  const jyotishi = JYOTISHI_DATA[jyotishiId]
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [user, setUser] = useState<any>(null)
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(storedUser))
    }

    // Load chat history from localStorage
    const chatHistory = localStorage.getItem(`chat_${jyotishiId}`)
    if (chatHistory) {
      setMessages(JSON.parse(chatHistory))
    }

    // Simulate greeting
    const timer = setTimeout(() => {
      const greeting: Message = {
        id: Date.now().toString(),
        text: `Namaste! I'm ${jyotishi.name}, a specialist in ${jyotishi.specialty}. How can I help you today?`,
        sender: "jyotishi",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, greeting])
    }, 500)

    return () => clearTimeout(timer)
  }, [jyotishiId, router, jyotishi])

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")

    // Save to localStorage
    localStorage.setItem(`chat_${jyotishiId}`, JSON.stringify(updatedMessages))

    // Save to history
    const history = JSON.parse(localStorage.getItem("consultation_history") || "[]")
    const consultation = {
      id: Date.now(),
      jyotishiId,
      jyotishiName: jyotishi.name,
      type: "chat",
      timestamp: new Date().toISOString(),
      duration: sessionTime,
      cost: jyotishi.price,
      messageCount: updatedMessages.length,
    }
    history.push(consultation)
    localStorage.setItem("consultation_history", JSON.stringify(history))

    // Simulate response
    setTimeout(() => {
      const responses = [
        "That's an interesting question. Let me analyze your cosmic position...",
        "Based on your planetary alignment, I see positive energies around you.",
        "This requires deeper insight. Tell me more about your situation.",
        "The stars are aligned in your favor. Continue with faith and patience.",
        "Your remedies should include proper meditation and planetary rituals.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const jyotishiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "jyotishi",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, jyotishiMessage])
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!user || !jyotishi) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Chat Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/jyotishi">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <div>
              <h2 className="font-bold text-lg">{jyotishi.name}</h2>
              <p className="text-sm text-foreground/60">{jyotishi.specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Clock size={16} className="text-accent" />
                <span className="font-mono">{formatTime(sessionTime)}</span>
              </div>
              <p className="text-sm text-foreground/60">₹{jyotishi.price}/min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-8 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-xs ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "user" ? "bg-blue-500" : "bg-purple-500"
                }`}
              >
                <User size={16} />
              </div>
              <Card
                className={`p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500"
                    : "card-glow bg-purple-950/50"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="border-t border-border bg-card/50">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto px-4 py-4 flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 gap-2">
            <Send size={18} />
            Send
          </Button>
        </form>
      </div>

      <Footer />
    </div>
  )
}
