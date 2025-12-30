"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ZodiacCard } from "@/components/zodiac-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

const ZODIAC_SIGNS = [
  { name: "Aries", symbol: "♈", date: "Mar 21 - Apr 19", element: "Fire", color: "from-red-500 to-orange-500" },
  { name: "Taurus", symbol: "♉", date: "Apr 20 - May 20", element: "Earth", color: "from-green-500 to-teal-500" },
  { name: "Gemini", symbol: "♊", date: "May 21 - Jun 20", element: "Air", color: "from-yellow-500 to-lime-500" },
  { name: "Cancer", symbol: "♋", date: "Jun 21 - Jul 22", element: "Water", color: "from-blue-500 to-cyan-500" },
  { name: "Leo", symbol: "♌", date: "Jul 23 - Aug 22", element: "Fire", color: "from-orange-500 to-red-500" },
  { name: "Virgo", symbol: "♍", date: "Aug 23 - Sep 22", element: "Earth", color: "from-teal-500 to-green-500" },
  { name: "Libra", symbol: "♎", date: "Sep 23 - Oct 22", element: "Air", color: "from-pink-500 to-purple-500" },
  { name: "Scorpio", symbol: "♏", date: "Oct 23 - Nov 21", element: "Water", color: "from-purple-600 to-indigo-500" },
  {
    name: "Sagittarius",
    symbol: "♐",
    date: "Nov 22 - Dec 21",
    element: "Fire",
    color: "from-yellow-600 to-orange-500",
  },
  { name: "Capricorn", symbol: "♑", date: "Dec 22 - Jan 19", element: "Earth", color: "from-slate-600 to-gray-500" },
  { name: "Aquarius", symbol: "♒", date: "Jan 20 - Feb 18", element: "Air", color: "from-cyan-500 to-blue-500" },
  { name: "Pisces", symbol: "♓", date: "Feb 19 - Mar 20", element: "Water", color: "from-indigo-500 to-purple-500" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="starry-bg absolute inset-0 opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 flex justify-center">
            <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-accent text-sm font-medium">
              Welcome to Your Cosmic Journey
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            <span className="glow-text">Your Life.</span>
            <br />
            <span className="glow-text">Your Stars.</span>
            <br />
            <span className="glow-text">Your Guidance.</span>
          </h1>

          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
            Discover personalized astrological insights powered by celestial wisdom and AI. Your journey to cosmic
            understanding starts here.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 gap-2 text-lg"
              >
                <Sparkles size={20} />
                Ask AI Astrologer
              </Button>
            </Link>
            <Link href="/jyotishi">
              <Button
                size="lg"
                variant="outline"
                className="border-accent/50 hover:bg-accent/10 text-lg bg-transparent gap-2"
              >
                Find Expert Jyotishi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Horoscope Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6">Today's Cosmic Forecast</h2>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Get daily horoscopes tailored to your zodiac sign. Explore love, career, health, and more with celestial
              guidance designed just for you.
            </p>
            <Link href="/horoscope">
              <Button className="gap-2">
                View Daily Readings <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Card className="card-glow p-6 text-center hover:scale-105 smooth-transition">
              <div className="text-3xl mb-2">❤️</div>
              <h3 className="font-semibold mb-2">Love</h3>
              <p className="text-sm text-foreground/60">Matters of the heart</p>
            </Card>
            <Card className="card-glow p-6 text-center hover:scale-105 smooth-transition">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold mb-2">Career</h3>
              <p className="text-sm text-foreground/60">Professional growth</p>
            </Card>
            <Card className="card-glow p-6 text-center hover:scale-105 smooth-transition">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="font-semibold mb-2">Health</h3>
              <p className="text-sm text-foreground/60">Wellness & vitality</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Zodiac Signs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">12 Zodiac Signs</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore the unique characteristics, strengths, and cosmic traits of each zodiac sign. Find your sign and
            discover your destiny.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ZODIAC_SIGNS.map((sign) => (
            <ZodiacCard
              key={sign.name}
              name={sign.name}
              symbol={sign.symbol}
              date={sign.date}
              element={sign.element}
              color={sign.color}
            />
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Comprehensive astrological services tailored to your cosmic needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Daily Horoscopes", desc: "Personalized daily cosmic forecasts", icon: "🌙" },
            { title: "Tarot Readings", desc: "Single card and 3-card spreads", icon: "🔮" },
            { title: "AI Astrologer", desc: "Chat with cosmic intelligence", icon: "✨" },
            { title: "Expert Jyotishi", desc: "Connect with professional astrologers", icon: "👨‍🔬" },
            { title: "Numerology", desc: "Life path and destiny numbers", icon: "🔢" },
            { title: "Compatibility", desc: "Love and relationship insights", icon: "💕" },
          ].map((service, idx) => (
            <Card key={idx} className="card-glow p-6 hover:scale-105 smooth-transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-foreground/60 text-sm">{service.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="card-glow p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Your Cosmic Destiny?</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            Join thousands of users discovering their life path through celestial guidance.
          </p>
          <Link href="/jyotishi">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500">
              Connect with Expert Jyotishi
            </Button>
          </Link>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
