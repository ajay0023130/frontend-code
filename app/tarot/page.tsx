"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

const TAROT_SPREADS = [
  { name: "Single Card", desc: "Quick insight for your question" },
  { name: "3-Card Spread", desc: "Past, present, future guidance" },
]

const TAROT_CARDS = [
  { name: "The Magician", suit: "Major Arcana", number: "I" },
  { name: "The High Priestess", suit: "Major Arcana", number: "II" },
  { name: "The Empress", suit: "Major Arcana", number: "III" },
  { name: "The Emperor", suit: "Major Arcana", number: "IV" },
  { name: "The Hierophant", suit: "Major Arcana", number: "V" },
  { name: "The Lovers", suit: "Major Arcana", number: "VI" },
]

export default function TarotPage() {
  const [selectedSpread, setSelectedSpread] = useState("single")
  const [cards, setCards] = useState<typeof TAROT_CARDS>([])

  const drawCards = () => {
    const count = selectedSpread === "single" ? 1 : 3
    const drawn = Array.from({ length: count }, () => TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)])
    setCards(drawn)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Tarot Readings</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Unlock divine wisdom through ancient tarot arcana
          </p>
        </div>

        {/* Spread Selection */}
        <div className="flex justify-center gap-4 mb-12">
          {TAROT_SPREADS.map((spread) => (
            <button
              key={spread.name}
              onClick={() => {
                setSelectedSpread(spread.name.toLowerCase().replace(/\s+/g, ""))
                setCards([])
              }}
              className={`px-6 py-3 rounded-lg font-medium smooth-transition ${
                selectedSpread === spread.name.toLowerCase().replace(/\s+/g, "")
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              <div className="font-semibold">{spread.name}</div>
              <div className="text-sm text-foreground/60">{spread.desc}</div>
            </button>
          ))}
        </div>

        {/* Draw Button */}
        <div className="flex justify-center mb-12">
          <Button onClick={drawCards} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 gap-2">
            <Sparkles size={20} />
            Draw Cards
          </Button>
        </div>

        {/* Cards Display */}
        {cards.length > 0 && (
          <div
            className={`grid ${selectedSpread === "single" ? "grid-cols-1" : "grid-cols-3"} gap-6 max-w-4xl mx-auto`}
          >
            {cards.map((card, idx) => (
              <Card
                key={idx}
                className="card-glow p-8 text-center hover:scale-105 smooth-transition h-64 flex flex-col justify-center items-center"
              >
                <div className="text-5xl mb-4">🔮</div>
                <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{card.suit}</p>
                <div className="text-accent font-semibold text-lg">{card.number}</div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
