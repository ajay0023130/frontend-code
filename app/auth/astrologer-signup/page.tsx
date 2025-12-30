"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Lock, User, Star } from "lucide-react"

export default function AstrologerSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    experience: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.name && formData.email && formData.password && formData.specialty && formData.experience) {
      const astrologerData = {
        email: formData.email,
        name: formData.name,
        id: Date.now(),
        type: "astrologer",
        specialty: formData.specialty,
        experience: Number.parseInt(formData.experience),
      }
      localStorage.setItem("astrologer", JSON.stringify(astrologerData))
      localStorage.setItem(
        "astrologer_profile",
        JSON.stringify({
          specialty: formData.specialty,
          experience: Number.parseInt(formData.experience),
          hourlyRate: 500,
          rating: 4.5,
          reviewCount: 0,
          languages: ["Hindi", "English"],
          availability: "Online now",
        }),
      )
      localStorage.setItem("astrologer_earnings", "0")
      localStorage.setItem("astrologer_consultations", "[]")
      localStorage.setItem("astrologer_schedule", "[]")
      router.push("/astrologer/dashboard")
    } else {
      setError("Please fill in all fields")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <Card className="card-glow w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Star className="text-accent" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Register as Astrologer</h1>
            <p className="text-foreground/60">Join JyotishAI and reach thousands of clients</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-accent" size={18} />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-accent" size={18} />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Specialty</label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              >
                <option value="">Select Specialty</option>
                <option value="Vedic Astrology">Vedic Astrology</option>
                <option value="Kundli Reading">Kundli Reading</option>
                <option value="Numerology">Numerology</option>
                <option value="Tarot Reading">Tarot Reading</option>
                <option value="Planetary Remedies">Planetary Remedies</option>
                <option value="Love & Relationships">Love & Relationships</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-accent" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-foreground/60">
              Already have an account?{" "}
              <Link href="/auth/astrologer-login" className="text-accent hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
