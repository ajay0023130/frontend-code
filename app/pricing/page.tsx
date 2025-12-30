"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const PRICING_PLANS = [
  {
    name: "Cosmic Explorer",
    price: "Free",
    description: "Start your celestial journey",
    features: ["Daily horoscopes", "Zodiac information", "1 tarot reading per day", "Basic AI consultations"],
  },
  {
    name: "Celestial Guide",
    price: "$9.99",
    period: "/month",
    description: "Enhanced cosmic guidance",
    features: [
      "Everything in Cosmic Explorer",
      "Unlimited tarot readings",
      "Birth chart analysis",
      "Detailed AI guidance",
      "Weekly numerology insights",
    ],
    highlighted: true,
  },
  {
    name: "Cosmic Oracle",
    price: "$29.99",
    period: "/month",
    description: "Premium celestial access",
    features: [
      "Everything in Celestial Guide",
      "Priority AI support",
      "Personal birth chart consultation",
      "Monthly compatibility reports",
      "Custom reading schedules",
      "Exclusive celestial events",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Simple, Cosmic Pricing</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Choose the perfect plan for your celestial journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, idx) => (
            <Card
              key={idx}
              className={`card-glow p-8 flex flex-col ${plan.highlighted ? "border-accent border-2 scale-105" : ""}`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>
                <div className="text-4xl font-bold mb-1">
                  {plan.price}
                  {plan.period && <span className="text-lg text-foreground/60">{plan.period}</span>}
                </div>
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                Choose Plan
              </Button>

              <div className="flex-1 space-y-3">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    <Check size={18} className="text-accent flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
