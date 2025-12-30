"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  MessageCircle,
  Phone,
  CreditCard,
  Lock,
  LogOut,
  User,
  TrendingUp,
  Download,
  Calendar,
} from "lucide-react"
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

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [walletBalance, setWalletBalance] = useState(5000)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")

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

    const wallet = localStorage.getItem("wallet_balance")
    if (wallet) {
      setWalletBalance(Number.parseInt(wallet))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }
    alert("Password changed successfully!")
    setShowChangePassword(false)
    setNewPassword("")
  }

  const handleAddMoney = (amount: number) => {
    const newBalance = walletBalance + amount
    setWalletBalance(newBalance)
    localStorage.setItem("wallet_balance", newBalance.toString())
    alert(`₹${amount} added to wallet! New balance: ₹${newBalance}`)
  }

  const chatSessions = consultations.filter((c) => c.type === "chat")
  const callSessions = consultations.filter((c) => c.type === "call")
  const totalSpent = consultations.reduce((sum, c) => sum + c.cost, 0)

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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-foreground/70">Welcome back, {user.email}</p>
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
                <p className="text-foreground/60 text-sm">Wallet Balance</p>
                <p className="text-3xl font-bold text-accent">₹{walletBalance}</p>
              </div>
              <Wallet className="text-accent" size={24} />
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs bg-transparent"
              onClick={() => handleAddMoney(500)}
            >
              Add Money
            </Button>
          </Card>

          <Card className="card-glow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Total Spent</p>
                <p className="text-3xl font-bold">₹{totalSpent}</p>
              </div>
              <TrendingUp size={24} className="text-pink-400" />
            </div>
          </Card>

          <Card className="card-glow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Chat Sessions</p>
                <p className="text-3xl font-bold">{chatSessions.length}</p>
              </div>
              <MessageCircle className="text-blue-400" size={24} />
            </div>
          </Card>

          <Card className="card-glow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Call Sessions</p>
                <p className="text-3xl font-bold">{callSessions.length}</p>
              </div>
              <Phone className="text-green-400" size={24} />
            </div>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50">
            <TabsTrigger value="history" className="gap-2">
              <Calendar size={16} />
              History
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard size={16} />
              Payments
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock size={16} />
              Security
            </TabsTrigger>
          </TabsList>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Consultation History</h2>
              <Link href="/history">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

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
              <div className="space-y-3">
                {consultations.slice(0, 5).map((consultation) => (
                  <Card key={consultation.id} className="card-glow p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {consultation.type === "chat" ? (
                            <MessageCircle size={16} className="text-blue-400" />
                          ) : (
                            <Phone size={16} className="text-green-400" />
                          )}
                          <h3 className="font-semibold">{consultation.jyotishiName}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-accent capitalize">
                            {consultation.type}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/60">{formatDate(consultation.timestamp)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-accent">₹{consultation.cost}</p>
                        <p className="text-xs text-foreground/60">{formatDuration(consultation.duration)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>

            {consultations.length === 0 ? (
              <Card className="card-glow p-8 text-center">
                <p className="text-foreground/70">No payments yet.</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {consultations.map((consultation) => (
                  <Card key={consultation.id} className="card-glow p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{consultation.jyotishiName}</h3>
                        <p className="text-sm text-foreground/60">{formatDate(consultation.timestamp)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-accent">₹{consultation.cost}</p>
                          <p className="text-xs text-green-400">Completed</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Download size={14} />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

            <Card className="card-glow p-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Email Address</label>
                  <p className="text-lg font-semibold">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">User ID</label>
                  <p className="text-lg font-semibold font-mono">{user.id}</p>
                </div>

                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Account Created</label>
                  <p className="text-lg font-semibold">{new Date(user.id).toLocaleDateString("en-IN")}</p>
                </div>

                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Total Consultations</label>
                  <p className="text-lg font-semibold">{consultations.length}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Security Settings</h2>

            {!showChangePassword ? (
              <Card className="card-glow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold mb-1">Change Password</h3>
                    <p className="text-sm text-foreground/60">Update your account password</p>
                  </div>
                  <Button onClick={() => setShowChangePassword(true)} className="gap-2">
                    <Lock size={16} />
                    Change Password
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="card-glow p-6">
                <div className="space-y-4">
                  <h3 className="font-bold">Enter New Password</h3>
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleChangePassword} className="bg-gradient-to-r from-purple-500 to-pink-500">
                      Update Password
                    </Button>
                    <Button variant="outline" onClick={() => setShowChangePassword(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
