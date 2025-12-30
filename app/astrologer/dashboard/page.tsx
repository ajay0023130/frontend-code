"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Calendar, Clock, Star, MessageCircle, Phone, User, Settings, LogOut, Download } from "lucide-react"

export default function AstrologerDashboardPage() {
  const router = useRouter()
  const [astrologer, setAstrologer] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [earnings, setEarnings] = useState(0)
  const [consultations, setConsultations] = useState<any[]>([])

  useEffect(() => {
    const storedAstrologer = localStorage.getItem("astrologer")
    if (!storedAstrologer) {
      router.push("/auth/astrologer-login")
    } else {
      const astroData = JSON.parse(storedAstrologer)
      setAstrologer(astroData)

      const profileData = localStorage.getItem("astrologer_profile")
      if (profileData) setProfile(JSON.parse(profileData))

      const earningsData = localStorage.getItem("astrologer_earnings")
      if (earningsData) setEarnings(Number.parseInt(earningsData))

      const consultationsData = localStorage.getItem("astrologer_consultations")
      if (consultationsData) setConsultations(JSON.parse(consultationsData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("astrologer")
    localStorage.removeItem("astrologer_profile")
    localStorage.removeItem("astrologer_earnings")
    localStorage.removeItem("astrologer_consultations")
    router.push("/")
  }

  const chatConsultations = consultations.filter((c) => c.type === "chat")
  const callConsultations = consultations.filter((c) => c.type === "call")
  const totalClients = new Set(consultations.map((c) => c.userId)).size

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

  if (!astrologer || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome, {astrologer.name}</h1>
            <p className="text-foreground/70">{profile.specialty} Expert</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="card-glow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-foreground/60 text-sm">Total Earnings</p>
                <p className="text-3xl font-bold text-accent">₹{earnings}</p>
              </div>
              <TrendingUp className="text-accent" size={24} />
            </div>
            <p className="text-xs text-foreground/60">Pending payout available</p>
          </Card>

          <Card className="card-glow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Total Consultations</p>
                <p className="text-3xl font-bold">{consultations.length}</p>
              </div>
              <Calendar className="text-green-400" size={24} />
            </div>
          </Card>

          <Card className="card-glow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Total Clients</p>
                <p className="text-3xl font-bold">{totalClients}</p>
              </div>
              <User className="text-blue-400" size={24} />
            </div>
          </Card>

          <Card className="card-glow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Rating</p>
                <p className="text-3xl font-bold">{profile.rating.toFixed(1)}</p>
              </div>
              <Star className="text-yellow-400" size={24} />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="consultations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50">
            <TabsTrigger value="consultations" className="gap-2">
              <Calendar size={16} />
              Consultations
            </TabsTrigger>
            <TabsTrigger value="earnings" className="gap-2">
              <TrendingUp size={16} />
              Earnings
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Clock size={16} />
              Schedule
            </TabsTrigger>
          </TabsList>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Your Consultations</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Card className="card-glow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm">Chat Sessions</p>
                    <p className="text-2xl font-bold">{chatConsultations.length}</p>
                  </div>
                  <MessageCircle className="text-blue-400" size={24} />
                </div>
              </Card>
              <Card className="card-glow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm">Call Sessions</p>
                    <p className="text-2xl font-bold">{callConsultations.length}</p>
                  </div>
                  <Phone className="text-green-400" size={24} />
                </div>
              </Card>
            </div>

            {consultations.length === 0 ? (
              <Card className="card-glow p-8 text-center">
                <p className="text-foreground/70">
                  No consultations yet. Complete your profile to start accepting bookings.
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {consultations.slice(0, 5).map((consultation, idx) => (
                  <Card key={idx} className="card-glow p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {consultation.type === "chat" ? (
                            <MessageCircle size={16} className="text-blue-400" />
                          ) : (
                            <Phone size={16} className="text-green-400" />
                          )}
                          <h3 className="font-semibold">{consultation.clientName}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-accent capitalize">
                            {consultation.type}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/60">{formatDate(consultation.timestamp)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-accent">₹{consultation.earnings}</p>
                        <p className="text-xs text-foreground/60">{formatDuration(consultation.duration)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Earnings & Payouts</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="card-glow p-6">
                <p className="text-foreground/60 text-sm mb-2">Available Balance</p>
                <p className="text-3xl font-bold text-accent">₹{earnings}</p>
              </Card>
              <Card className="card-glow p-6">
                <p className="text-foreground/60 text-sm mb-2">This Month</p>
                <p className="text-3xl font-bold">
                  ₹
                  {consultations
                    .filter((c) => new Date(c.timestamp).getMonth() === new Date().getMonth())
                    .reduce((sum, c) => sum + c.earnings, 0)}
                </p>
              </Card>
              <Card className="card-glow p-6">
                <p className="text-foreground/60 text-sm mb-2">Total Earned</p>
                <p className="text-3xl font-bold">{consultations.reduce((sum, c) => sum + c.earnings, 0)}</p>
              </Card>
            </div>

            <Card className="card-glow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold mb-1">Payout Request</h3>
                  <p className="text-sm text-foreground/60">Request withdrawal to your bank account</p>
                </div>
                <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Download size={16} />
                  Request Payout
                </Button>
              </div>
            </Card>

            <div className="space-y-3">
              <h3 className="font-bold">Recent Transactions</h3>
              {consultations.slice(0, 5).map((consultation, idx) => (
                <Card key={idx} className="card-glow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{consultation.clientName}</p>
                      <p className="text-xs text-foreground/60">{formatDate(consultation.timestamp)}</p>
                    </div>
                    <p className="font-bold text-accent">+₹{consultation.earnings}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Professional Profile</h2>

            <Card className="card-glow p-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Name</label>
                    <p className="text-lg font-semibold">{astrologer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Email</label>
                    <p className="text-lg font-semibold">{astrologer.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Specialty</label>
                    <p className="text-lg font-semibold">{profile.specialty}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Experience</label>
                    <p className="text-lg font-semibold">{astrologer.experience} years</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Hourly Rate</label>
                    <p className="text-lg font-semibold">₹{profile.hourlyRate}/hour</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Languages</label>
                    <p className="text-lg font-semibold">{profile.languages.join(", ")}</p>
                  </div>
                </div>

                <Button className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Settings size={16} />
                  Edit Profile
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Availability & Schedule</h2>

            <Card className="card-glow p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/60 mb-3 block">Current Status</label>
                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">Online Now</Button>
                    <Button variant="outline">Set Availability</Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <label className="text-sm text-foreground/60 mb-3 block">Your Schedule</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                      <span>Monday - Friday</span>
                      <span className="text-sm text-foreground/60">10 AM - 8 PM</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                      <span>Saturday - Sunday</span>
                      <span className="text-sm text-foreground/60">2 PM - 10 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
