"use client"

import { useState, Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Lock } from "lucide-react"
import { useSearchParams } from "next/navigation"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const product = searchParams.get("product") || "kundli-report"
  const [step, setStep] = useState<"checkout" | "confirm" | "success">("checkout")
  const [isProcessing, setIsProcessing] = useState(false)

  const productDetails = {
    "kundli-report": {
      name: "Complete Kundli Report",
      price: 29.99,
      description: "Full birth chart analysis with detailed interpretations",
      features: [
        "Accurate Kundli calculation",
        "Detailed planetary placements",
        "Life purpose & career guidance",
        "Relationship insights",
        "Health & wellness analysis",
        "Personalized remedies",
        "PDF download",
      ],
    },
    "premium-consultation": {
      name: "1-on-1 Astrology Consultation",
      price: 99.99,
      description: "Personal session with expert astrologer",
      features: [
        "60-minute consultation",
        "Personal Kundli analysis",
        "Career guidance",
        "Relationship counseling",
        "Health recommendations",
        "Timing for life events",
        "Recording included",
      ],
    },
  }

  const current = productDetails[product as keyof typeof productDetails] || productDetails["kundli-report"]

  const handleProceedPayment = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setStep("confirm")
      setIsProcessing(false)
    }, 500)
  }

  const handleConfirmPayment = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setStep("success")
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {step === "checkout" && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <Card className="card-glow p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{current.name}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{current.description}</p>
                  <ul className="space-y-2">
                    {current.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle size={16} className="text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Subtotal</span>
                    <span>${current.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Tax</span>
                    <span>${(current.price * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${(current.price * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Billing Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
              <Card className="card-glow p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <Input placeholder="123" />
                  </div>
                </div>

                <Button
                  onClick={handleProceedPayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 gap-2 text-lg py-6"
                >
                  <Lock size={18} />
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              </Card>

              <p className="text-xs text-foreground/50 mt-4 text-center">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <Card className="card-glow p-8 max-w-md mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-bold">Confirm Your Payment</h2>

            <div className="bg-secondary/10 p-4 rounded-lg space-y-2">
              <p className="text-foreground/70 text-sm">Product</p>
              <p className="font-semibold">{current.name}</p>
              <div className="border-t border-border pt-2 mt-2">
                <p className="text-foreground/70 text-sm mb-1">Amount</p>
                <p className="text-3xl font-bold text-accent">${(current.price * 1.1).toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
              >
                {isProcessing ? "Processing..." : "Confirm Payment"}
              </Button>
              <Button onClick={() => setStep("checkout")} variant="outline" className="w-full">
                Back
              </Button>
            </div>
          </Card>
        )}

        {step === "success" && (
          <Card className="card-glow p-8 max-w-md mx-auto space-y-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-green-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-foreground/70">Your Kundli report is ready for download</p>
            </div>

            <div className="bg-secondary/10 p-4 rounded-lg">
              <p className="text-foreground/70 text-sm mb-2">Order ID</p>
              <p className="font-mono font-bold">#KDL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">Download Your Report</Button>

            <Button variant="outline" className="w-full bg-transparent">
              Back to Home
            </Button>
          </Card>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
