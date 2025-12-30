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
import { Mail, Lock, Star } from "lucide-react"

export default function AstrologerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (email && password) {
      // Store astrologer session in localStorage
      localStorage.setItem("astrologer", JSON.stringify({ email, id: Date.now(), type: "astrologer" }))
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
            <h1 className="text-3xl font-bold mb-2">Astrologer Portal</h1>
            <p className="text-foreground/60">Access your professional dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-accent" size={18} />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-accent" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-foreground/60">
              Don't have an account?{" "}
              <Link href="/auth/astrologer-signup" className="text-accent hover:underline font-semibold">
                Register
              </Link>
            </p>
            <p className="text-foreground/60 mt-2">
              User?{" "}
              <Link href="/auth/login" className="text-accent hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
