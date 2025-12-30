"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ZodiacCardProps {
  name: string
  symbol: string
  date: string
  element: string
  color: string
}

export function ZodiacCard({ name, symbol, date, element, color }: ZodiacCardProps) {
  return (
    <Link href={`/zodiac/${name.toLowerCase()}`}>
      <Card className={`group cursor-pointer card-glow overflow-hidden hover:scale-105 smooth-transition h-full`}>
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="text-5xl mb-4">{symbol}</div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{date}</p>
            <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
              {element}
            </div>
          </div>
          <Button variant="ghost" className="w-full mt-4 text-accent hover:bg-accent/10 group-hover:text-accent">
            Explore →
          </Button>
        </div>
      </Card>
    </Link>
  )
}
