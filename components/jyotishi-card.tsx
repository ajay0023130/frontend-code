"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, MessageCircle, Phone, Clock } from "lucide-react"

interface JyotishiCardProps {
  id: number
  name: string
  specialty: string
  experience: number
  rating: number
  reviewCount: number
  price: number
  priceType: string
  availability: string
  avatar: string
  languages: string[]
  onChat: () => void
  onCall: () => void
}

export function JyotishiCard({
  name,
  specialty,
  experience,
  rating,
  reviewCount,
  price,
  priceType,
  availability,
  languages,
  onChat,
  onCall,
}: JyotishiCardProps) {
  return (
    <Card className="card-glow p-6 hover:scale-105 smooth-transition">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-accent text-sm font-semibold">{specialty}</p>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Clock size={14} className="text-muted" />
            <span className="text-foreground/70">{experience} years experience</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-accent fill-accent" />
          <span className="font-semibold">{rating}</span>
          <span className="text-foreground/60 text-sm">({reviewCount} reviews)</span>
        </div>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <span key={lang} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-accent">
            {lang}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/70">Price</p>
          <p className="text-lg font-bold">
            {price === 0 ? "Free" : `₹${price}`}
            <span className="text-xs text-foreground/60 font-normal"> /{priceType}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-green-400 font-semibold mb-1">{availability}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button onClick={onChat} variant="outline" className="flex-1 gap-2 bg-transparent" size="sm">
          <MessageCircle size={16} />
          Chat
        </Button>
        <Button onClick={onCall} className="flex-1 gap-2 bg-gradient-to-r from-purple-500 to-pink-500" size="sm">
          <Phone size={16} />
          Call
        </Button>
      </div>
    </Card>
  )
}
