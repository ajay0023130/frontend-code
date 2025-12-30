"use client"

import type React from "react"
import { Card } from "@/components/ui/card"

interface HoroscopeTabProps {
  title: string
  icon: React.ReactNode
  description: string
  color: string
}

export function HoroscopeTab({ title, icon, description, color }: HoroscopeTabProps) {
  return (
    <Card className="card-glow p-6">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  )
}
