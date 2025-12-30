"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Lock, Check } from "lucide-react"

interface PaymentDialogProps {
  isOpen: boolean
  onClose: () => void
  product: string
  price: number
  onPaymentSuccess?: () => void
}

export function PaymentDialog({ isOpen, onClose, product, price, onPaymentSuccess }: PaymentDialogProps) {
  const [step, setStep] = useState<"details" | "confirm" | "success">("details")
  const [formData, setFormData] = useState({
    email: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = () => {
    // Simulate payment processing
    setStep("success")
    setTimeout(() => {
      onPaymentSuccess?.()
      onClose()
      setStep("details")
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="card-glow w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-secondary/10 rounded-lg"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {step === "details" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
              <p className="text-foreground/60">{product}</p>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg">
              <p className="text-foreground/70 text-sm">Total Amount</p>
              <p className="text-3xl font-bold text-accent">${price.toFixed(2)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <Input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Full name on card"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <Input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry</label>
                  <Input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <Input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={() => setStep("confirm")}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 gap-2"
              >
                <Lock size={18} />
                Pay Now
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Confirm Payment</h2>
            <div className="space-y-3 text-left bg-secondary/10 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-foreground/70">Product</span>
                <span className="font-medium">{product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Amount</span>
                <span className="font-medium">${price.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-accent">${price.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                Back
              </Button>
              <Button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                Confirm & Pay
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check size={32} className="text-green-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-foreground/70">Your Kundli report is now available for download.</p>
            </div>

            <Button onClick={onClose} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
              Download Your Report
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
