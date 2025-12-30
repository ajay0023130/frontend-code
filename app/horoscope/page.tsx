"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HoroscopeTab } from "@/components/horoscope-tab"
import { Button } from "@/components/ui/button"
import { Heart, Briefcase, Apple, Sparkles } from "lucide-react"

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
]

export default function HoroscopePage() {
  const [selectedZodiac, setSelectedZodiac] = useState("Aries")
  const [activeTab, setActiveTab] = useState("love")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const horoscopeData = {
    love: {
      title: "Love & Relationships",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-pink-500/20",
      description: `The stars align favorably for ${selectedZodiac} in matters of the heart. Venus is positioned to enhance your romantic prospects and deepen existing relationships. A profound connection awaits those open to vulnerability and authentic expression.`,
    },
    career: {
      title: "Career & Finance",
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-blue-500/20",
      description: `Mercury's influence brings clarity to professional pursuits for ${selectedZodiac}. This is an excellent time for negotiations and new projects. Financial opportunities emerge through diligent effort and strategic thinking.`,
    },
    health: {
      title: "Health & Wellness",
      icon: <Apple className="w-5 h-5" />,
      color: "bg-green-500/20",
      description: `Mars energizes your vitality and physical well-being. Focus on balance and self-care as the cosmic influences support holistic wellness. Listen to your body's needs and prioritize rejuvenation.`,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-12 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Daily Horoscope</h1>
            <p className="text-foreground/70">Get your personalized cosmic forecast for today</p>
          </div>

          {/* Date Selector */}
          <div className="flex justify-center mb-8">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Zodiac Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-semibold mb-6">Select Your Zodiac Sign</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign}
              onClick={() => setSelectedZodiac(sign)}
              className={`py-3 px-2 rounded-lg font-medium smooth-transition text-sm ${
                selectedZodiac === sign
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border hover:border-accent text-foreground"
              }`}
            >
              {sign}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {["love", "career", "health"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium smooth-transition ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Horoscope Content */}
        <HoroscopeTab
          title={horoscopeData[activeTab as keyof typeof horoscopeData].title}
          icon={horoscopeData[activeTab as keyof typeof horoscopeData].icon}
          description={horoscopeData[activeTab as keyof typeof horoscopeData].description}
          color={horoscopeData[activeTab as keyof typeof horoscopeData].color}
        />

        <div className="mt-8 flex justify-center">
          <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
            <Sparkles size={18} />
            Ask Deeper AI Guidance
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
