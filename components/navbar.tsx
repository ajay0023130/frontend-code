"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon, User, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [astrologer, setAstrologer] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    const storedAstrologer = localStorage.getItem("astrologer")
    if (storedAstrologer) {
      setAstrologer(JSON.parse(storedAstrologer))
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/horoscope", label: "Daily Horoscope" },
    { href: "/kundli", label: "Make Kundli" },
    { href: "/jyotishi", label: "Find Jyotishi" },
    { href: "/chat", label: "AI Astrologer" },
    { href: "/zodiac", label: "Zodiac" },
    { href: "/tarot", label: "Tarot" },
    { href: "/pricing", label: "Pricing" },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">✨</span>
            </div>
            <span className="font-bold text-xl glow-text hidden sm:inline">JyotishAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 hover:text-accent smooth-transition hover:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-secondary/10 smooth-transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user && !astrologer ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : astrologer ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/astrologer/dashboard">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <LayoutDashboard size={16} />
                    Astrologer
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    localStorage.removeItem("astrologer")
                    setUser(null)
                    router.push("/")
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2 items-center bg-transparent">
                  <User size={16} />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary/10 rounded-lg smooth-transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-foreground/80 hover:bg-secondary/10 rounded-lg smooth-transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && !astrologer ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-destructive"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : astrologer ? (
              <>
                <Link href="/astrologer/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <LayoutDashboard size={16} />
                    Astrologer Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    localStorage.removeItem("astrologer")
                    setUser(null)
                    setIsOpen(false)
                    router.push("/")
                  }}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-destructive"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <User size={16} />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
