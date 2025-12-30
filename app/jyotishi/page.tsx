"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JyotishiCard } from "@/components/jyotishi-card"
import { LogOut, MessageCircle } from "lucide-react"
import Link from "next/link"

const JYOTISHI_LIST = [
  {
    id: 1,
    name: "Acharya Sharma",
    specialty: "Vedic Astrology",
    experience: 25,
    rating: 4.9,
    reviewCount: 328,
    price: 500,
    priceType: "min",
    availability: "Online now",
    avatar: "AS",
    languages: ["Hindi", "English", "Sanskrit"],
  },
  {
    id: 2,
    name: "Pt. Rajesh Kumar",
    specialty: "Kundli Reading",
    experience: 18,
    rating: 4.8,
    reviewCount: 256,
    price: 400,
    priceType: "min",
    availability: "Available in 2 hrs",
    avatar: "RK",
    languages: ["Hindi", "English"],
  },
  {
    id: 3,
    name: "Dr. Priya Gupta",
    specialty: "Numerology",
    experience: 15,
    rating: 4.7,
    reviewCount: 189,
    price: 350,
    priceType: "min",
    availability: "Online now",
    avatar: "PG",
    languages: ["Hindi", "English", "Marathi"],
  },
  {
    id: 4,
    name: "Swami Anand",
    specialty: "Tarot Reading",
    experience: 12,
    rating: 4.6,
    reviewCount: 142,
    price: 300,
    priceType: "min",
    availability: "Available in 1 hr",
    avatar: "SA",
    languages: ["English", "Hindi"],
  },
  {
    id: 5,
    name: "Vaidya Deepak",
    specialty: "Planetary Remedies",
    experience: 20,
    rating: 4.9,
    reviewCount: 295,
    price: 450,
    priceType: "min",
    availability: "Online now",
    avatar: "VD",
    languages: ["Hindi", "Sanskrit", "English"],
  },
  {
    id: 6,
    name: "Jyotishi Neha",
    specialty: "Love & Relationships",
    experience: 10,
    rating: 4.8,
    reviewCount: 167,
    price: 250,
    priceType: "min",
    availability: "Available soon",
    avatar: "JN",
    languages: ["English", "Hindi"],
  },
]

export default function JyotishiPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState("all")
  const [user, setUser] = useState<any>(null)
  const [selectedTab, setSelectedTab] = useState("directory")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleChat = (jyotishiId: number) => {
    router.push(`/jyotishi/${jyotishiId}/chat`)
  }

  const handleCall = (jyotishiId: number) => {
    router.push(`/jyotishi/${jyotishiId}/call`)
  }

  const filteredJyotishi = JYOTISHI_LIST.filter((jyotishi) => {
    const matchesSearch =
      jyotishi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jyotishi.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterSpecialty === "all" || jyotishi.specialty === filterSpecialty

    return matchesSearch && matchesFilter
  })

  const specialties = ["all", ...new Set(JYOTISHI_LIST.map((j) => j.specialty))]

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Connect with Expert Jyotishi</h1>
            <p className="text-foreground/70">Welcome, {user?.name || user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/history">
              <Button variant="outline">View History</Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setSelectedTab("directory")}
            className={selectedTab === "directory" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
            variant={selectedTab === "directory" ? "default" : "outline"}
          >
            Browse Jyotishi
          </Button>
          <Button
            onClick={() => setSelectedTab("history")}
            className={selectedTab === "history" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
            variant={selectedTab === "history" ? "default" : "outline"}
          >
            My Consultations
          </Button>
        </div>

        {selectedTab === "directory" ? (
          <>
            {/* Search and Filter */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Input
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-4 py-2 rounded-md bg-card border border-border text-foreground"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === "all" ? "All Specialties" : specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Jyotishi Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJyotishi.map((jyotishi) => (
                <JyotishiCard
                  key={jyotishi.id}
                  {...jyotishi}
                  onChat={() => handleChat(jyotishi.id)}
                  onCall={() => handleCall(jyotishi.id)}
                />
              ))}
            </div>

            {filteredJyotishi.length === 0 && (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">No Jyotishi found matching your search.</p>
              </div>
            )}
          </>
        ) : (
          <Card className="card-glow p-8 text-center">
            <p className="text-foreground/70 mb-4">Your consultation history will appear here.</p>
            <Button onClick={() => setSelectedTab("directory")} className="gap-2">
              <MessageCircle size={18} />
              Browse Jyotishi
            </Button>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
