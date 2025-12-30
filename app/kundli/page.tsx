"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { KundliForm, type KundliFormData } from "@/components/kundli-form"
import { KundliDisplay } from "@/components/kundli-display"
import { Sparkles, BookOpen, Info } from "lucide-react"
import Link from "next/link"

export default function KundliPage() {
  const [step, setStep] = useState<"info" | "form" | "result">("info")
  const [formData, setFormData] = useState<KundliFormData | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (data: KundliFormData) => {
    setIsLoading(true)
    // Simulate calculation
    setTimeout(() => {
      setFormData(data)
      setStep("result")
      setIsLoading(false)
    }, 2000)
  }

  const handleProceedToPayment = () => {
    // Redirect to payment/checkout
    window.location.href = "/checkout?product=kundli-report"
  }

  const handleDownload = () => {
    // Generate and download PDF
    alert("Downloading Kundli PDF...")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 flex justify-center">
            <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-accent text-sm font-medium">
              Vedic Birth Chart Analysis
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            <span className="glow-text">Create Your Kundli</span>
          </h1>

          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Discover your Janam Kundli (birth chart) and unlock the secrets of your destiny through Vedic astrology.
          </p>
        </div>
      </section>

      {step === "info" && (
        <>
          {/* About Kundli */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-6">What is Kundli?</h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  Kundli, also known as Janam Kundli or birth chart, is the foundation of Vedic astrology. It's a
                  celestial map created at the exact moment of your birth, capturing the positions of all planets and
                  celestial bodies.
                </p>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  Your Kundli reveals your personality traits, life purpose, karmic lessons, and potential challenges.
                  It guides you in making important life decisions about career, relationships, health, and spiritual
                  growth.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  A detailed Kundli analysis helps you understand your strengths, overcome obstacles, and align with
                  your cosmic destiny.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="card-glow p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles size={20} className="text-accent" />
                    Accurate Calculations
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Based on your exact birth time, date, and location for precise planetary placements
                  </p>
                </Card>

                <Card className="card-glow p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen size={20} className="text-accent" />
                    Detailed Report
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Comprehensive interpretation including personality, career, relationships, and health
                  </p>
                </Card>

                <Card className="card-glow p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Info size={20} className="text-accent" />
                    Personal Guidance
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Remedies and personalized suggestions to enhance positive influences in your life
                  </p>
                </Card>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">What Your Kundli Reveals</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Life Path & Purpose",
                    desc: "Understand your soul's mission and life direction",
                  },
                  {
                    title: "Career Guidance",
                    desc: "Identify ideal professions and timing for success",
                  },
                  {
                    title: "Love & Compatibility",
                    desc: "Relationship patterns and partnership insights",
                  },
                  {
                    title: "Health Insights",
                    desc: "Physical and mental wellness predispositions",
                  },
                  {
                    title: "Financial Prospects",
                    desc: "Wealth creation opportunities and challenges",
                  },
                  {
                    title: "Spiritual Growth",
                    desc: "Karmic lessons and spiritual evolution path",
                  },
                ].map((item, idx) => (
                  <Card key={idx} className="card-glow p-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-foreground/60 text-sm">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                onClick={() => setStep("form")}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 gap-2 text-lg"
              >
                <Sparkles size={20} />
                Get Your Kundli Now
              </Button>
            </div>
          </section>
        </>
      )}

      {step === "form" && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Provide Your Birth Details</h2>
            <p className="text-foreground/70">Accurate information ensures precise Kundli calculations</p>
          </div>

          <Card className="card-glow p-8">
            <KundliForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </Card>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setStep("info")}>
              Back
            </Button>
          </div>
        </section>
      )}

      {step === "result" && formData && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <Button variant="outline" onClick={() => setStep("form")} className="mb-4">
              Create New Kundli
            </Button>
            <h2 className="text-3xl font-bold mb-2">Your Kundli Analysis</h2>
            <p className="text-foreground/70">Review your birth chart and cosmic insights</p>
          </div>

          <KundliDisplay
            data={formData}
            isPaid={isPaid}
            onProceedToPayment={handleProceedToPayment}
            onDownload={handleDownload}
          />

          {/* Payment CTA */}
          {!isPaid && (
            <Card className="card-glow p-8 mt-8 text-center space-y-4 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-yellow-500/10">
              <h3 className="text-2xl font-bold">Unlock Full Kundli Report</h3>
              <p className="text-foreground/70 max-w-xl mx-auto">
                Get detailed interpretations, remedies, timing for important life events, and personalized guidance from
                our Vedic astrologers.
              </p>
              <Link href="/checkout?product=kundli-report">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto">
                  <Sparkles size={20} />
                  Purchase Full Report - $29.99
                </Button>
              </Link>
            </Card>
          )}
        </section>
      )}

      <Footer />
    </div>
  )
}
