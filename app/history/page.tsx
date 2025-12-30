"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle, Phone, Download } from "lucide-react"
import Link from "next/link"

interface Consultation {
  id: number
  jyotishiId: string | number
  jyotishiName: string
  type: "chat" | "call"
  timestamp: string
  duration: number
  cost: number
  messageCount?: number
}

export default function HistoryPage() {
  const router = useRouter()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(storedUser))
    }

    const history = localStorage.getItem("consultation_history")
    if (history) {
      setConsultations(JSON.parse(history).reverse())
    }
  }, [router])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const totalSpent = consultations.reduce((sum, c) => sum + c.cost, 0)

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/jyotishi">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold">Consultation History</h1>
            <p className="text-foreground/70">Your past sessions with Jyotishi experts</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="card-glow p-6">
            <p className="text-foreground/60 text-sm mb-2">Total Consultations</p>
            <p className="text-3xl font-bold">{consultations.length}</p>
          </Card>
          <Card className="card-glow p-6">
            <p className="text-foreground/60 text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold">₹{totalSpent}</p>
          </Card>
          <Card className="card-glow p-6">
            <p className="text-foreground/60 text-sm mb-2">Average Session</p>
            <p className="text-3xl font-bold">
              ₹{consultations.length > 0 ? Math.round(totalSpent / consultations.length) : 0}
            </p>
          </Card>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <Card className="card-glow p-8 text-center">
              <p className="text-foreground/70 mb-4">No consultations yet.</p>
              <Link href="/jyotishi">
                <Button className="gap-2">
                  <MessageCircle size={18} />
                  Browse Jyotishi
                </Button>
              </Link>
            </Card>
          ) : (
            consultations.map((consultation) => (
              <Card key={consultation.id} className="card-glow p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {consultation.type === "chat" ? (
                        <MessageCircle size={18} className="text-blue-400" />
                      ) : (
                        <Phone size={18} className="text-green-400" />
                      )}
                      <h3 className="font-bold text-lg">{consultation.jyotishiName}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-accent capitalize">
                        {consultation.type}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 mb-2">{formatDate(consultation.timestamp)}</p>
                    <div className="flex gap-4 text-sm">
                      <span>Duration: {formatDuration(consultation.duration)}</span>
                      {consultation.messageCount && <span>Messages: {consultation.messageCount}</span>}
                      <span className="text-accent font-semibold">₹{consultation.cost}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download size={16} />
                    Receipt
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
