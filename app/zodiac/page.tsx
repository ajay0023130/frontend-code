"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ZodiacCard } from "@/components/zodiac-card"

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

export default function ZodiacPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">The 12 Zodiac Signs</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Explore the cosmic characteristics, personality traits, and cosmic insights for each zodiac sign
          </p>
        </div>
      </section>

      {/* Zodiac Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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

      <Footer />
    </div>
  )
}
