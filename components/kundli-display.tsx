"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Lock, Eye, Share2 } from "lucide-react"
import type { KundliFormData } from "./kundli-form"

interface KundliDisplayProps {
  data: KundliFormData
  isPaid?: boolean
  onDownload?: () => void
  onProceedToPayment?: () => void
}

export function KundliDisplay({ data, isPaid, onDownload, onProceedToPayment }: KundliDisplayProps) {
  // Generate mock celestial data based on birth info
  const generateMockPlacements = () => {
    const signs = [
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
    const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"]

    return planets.map((planet, idx) => ({
      planet,
      sign: signs[idx % 12],
      degree: Math.floor(Math.random() * 30),
      minutes: Math.floor(Math.random() * 60),
    }))
  }

  const placements = generateMockPlacements()

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <Card className="card-glow p-6">
        <h3 className="text-lg font-semibold mb-4">Janam Kundli Details</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-foreground/60 text-sm">Name</p>
            <p className="text-lg font-medium">{data.name}</p>
          </div>
          <div>
            <p className="text-foreground/60 text-sm">Date of Birth</p>
            <p className="text-lg font-medium">{new Date(data.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-foreground/60 text-sm">Time of Birth</p>
            <p className="text-lg font-medium">{data.timeOfBirth}</p>
          </div>
          <div>
            <p className="text-foreground/60 text-sm">Place of Birth</p>
            <p className="text-lg font-medium">{data.placeOfBirth}</p>
          </div>
        </div>
      </Card>

      {/* Kundli Chart Preview */}
      <Card className="card-glow p-8">
        <h3 className="text-lg font-semibold mb-6 text-center">Kundli Chart</h3>

        {/* 12 House Grid */}
        <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
          <div className="absolute inset-0 border-2 border-accent/30 rounded-lg" />
          <div className="absolute inset-0 grid grid-cols-3 gap-0">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border border-purple-500/20 flex items-center justify-center relative">
                <span className="text-xs font-bold text-accent">H{i + 1}</span>
                <div className="absolute text-xs text-foreground/60">{placements[i]?.planet}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Planetary Placements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground/80">Planetary Placements</h4>
          <div className="space-y-2">
            {placements.map((placement, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm p-3 bg-purple-500/10 rounded-lg">
                <span className="font-medium">{placement.planet}</span>
                <span className="text-accent">{placement.sign}</span>
                <span className="text-foreground/60">
                  {placement.degree}° {placement.minutes}'
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Kundli Interpretation */}
      {isPaid && (
        <Card className="card-glow p-6 space-y-4">
          <h3 className="text-lg font-semibold">Kundli Interpretation</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-accent mb-2">Personality & Life Path</h4>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Based on your Kundli, you are naturally intuitive and possess strong emotional intelligence. Your Moon
                placement suggests a deep connection with your inner self and others around you. Jupiter's favorable
                position indicates growth and expansion in various life areas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-accent mb-2">Career & Finance</h4>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Mercury's strong placement supports your communication skills and intellectual pursuits. This is an
                excellent period for career advancement. Financial gains are indicated through professional endeavors
                and smart investments aligned with your birth chart timing.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-accent mb-2">Love & Relationships</h4>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Venus in your chart indicates harmony in relationships. You value deep emotional connections and are
                likely to attract like-minded individuals. The period ahead shows promising developments in your
                personal relationships and romantic life.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-accent mb-2">Health & Wellness</h4>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Your health chart shows overall good vitality. Pay attention to stress management and maintain a
                balanced lifestyle. Regular meditation and physical activity will help harness your natural energy
                effectively.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Locked Content Message */}
      {!isPaid && (
        <Card className="card-glow p-8 text-center space-y-4">
          <Lock size={40} className="mx-auto text-accent" />
          <h3 className="text-xl font-semibold">Unlock Full Kundli Report</h3>
          <p className="text-foreground/70 max-w-sm mx-auto">
            Get detailed interpretation, remedies, and personalized insights by upgrading to a premium plan.
          </p>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {isPaid && onDownload && (
          <Button onClick={onDownload} className="gap-2 bg-transparent" variant="outline">
            <Download size={18} />
            Download Kundli PDF
          </Button>
        )}

        {!isPaid && onProceedToPayment && (
          <Button onClick={onProceedToPayment} className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
            <Lock size={18} />
            Unlock Full Report
          </Button>
        )}

        <Button variant="outline" className="gap-2 bg-transparent">
          <Share2 size={18} />
          Share Kundli
        </Button>

        <Button variant="outline" className="gap-2 bg-transparent">
          <Eye size={18} />
          View Details
        </Button>
      </div>
    </div>
  )
}
