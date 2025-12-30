"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PhoneOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

const JYOTISHI_DATA: Record<string, any> = {
  "1": { name: "Acharya Sharma", specialty: "Vedic Astrology", price: 500 },
  "2": { name: "Pt. Rajesh Kumar", specialty: "Kundli Reading", price: 400 },
  "3": { name: "Dr. Priya Gupta", specialty: "Numerology", price: 350 },
  "4": { name: "Swami Anand", specialty: "Tarot Reading", price: 300 },
  "5": { name: "Vaidya Deepak", specialty: "Planetary Remedies", price: 450 },
  "6": { name: "Jyotishi Neha", specialty: "Love & Relationships", price: 250 },
}

export default function CallPage() {
  const router = useRouter()
  const params = useParams()
  const jyotishiId = params.id as string
  const jyotishi = JYOTISHI_DATA[jyotishiId]
  const [callTime, setCallTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOff, setIsSpeakerOff] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleEndCall = () => {
    // Save to history
    const history = JSON.parse(localStorage.getItem("consultation_history") || "[]")
    const consultation = {
      id: Date.now(),
      jyotishiId,
      jyotishiName: jyotishi.name,
      type: "call",
      timestamp: new Date().toISOString(),
      duration: callTime,
      cost: Math.ceil(callTime / 60) * jyotishi.price,
    }
    history.push(consultation)
    localStorage.setItem("consultation_history", JSON.stringify(history))
    router.push("/jyotishi")
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const callCost = Math.ceil(callTime / 60) * jyotishi.price

  if (!user || !jyotishi) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Link href="/jyotishi" className="mb-6 inline-block">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>

          <Card className="card-glow p-8 text-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {jyotishi.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </span>
            </div>

            {/* Jyotishi Info */}
            <h2 className="text-2xl font-bold mb-2">{jyotishi.name}</h2>
            <p className="text-accent font-semibold mb-6">{jyotishi.specialty}</p>

            {/* Call Status */}
            <div className="mb-8">
              <p className="text-sm text-green-400 font-semibold mb-2">Call Connected</p>
              <div className="text-5xl font-mono font-bold text-accent mb-2">{formatTime(callTime)}</div>
              <p className="text-foreground/60">Total cost: ₹{callCost}</p>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={() => setIsMuted(!isMuted)}
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                className="rounded-full w-16 h-16"
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>

              <Button
                onClick={() => setIsSpeakerOff(!isSpeakerOff)}
                variant={isSpeakerOff ? "destructive" : "outline"}
                size="lg"
                className="rounded-full w-16 h-16"
              >
                {isSpeakerOff ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </Button>
            </div>

            {/* End Call Button */}
            <Button onClick={handleEndCall} className="w-full bg-destructive hover:bg-red-700 gap-2 text-lg py-6">
              <PhoneOff size={20} />
              End Call
            </Button>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
