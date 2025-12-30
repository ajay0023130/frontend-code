import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4 glow-text">JyotishAI</h3>
            <p className="text-foreground/60 text-sm">
              Discover your cosmic destiny through AI-powered astrology, personalized Kundli readings, and spiritual
              guidance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/60 hover:text-accent smooth-transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/horoscope" className="text-foreground/60 hover:text-accent smooth-transition">
                  Daily Horoscope
                </Link>
              </li>
              <li>
                <Link href="/zodiac" className="text-foreground/60 hover:text-accent smooth-transition">
                  Zodiac Signs
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/chat" className="text-foreground/60 hover:text-accent smooth-transition">
                  AI Astrologer
                </Link>
              </li>
              <li>
                <Link href="/tarot" className="text-foreground/60 hover:text-accent smooth-transition">
                  Tarot Readings
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-foreground/60 hover:text-accent smooth-transition">
                  Premium Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-foreground/60 hover:text-accent smooth-transition cursor-pointer">
                <Mail size={16} />
                <span>hello@jyotishai.com</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60 hover:text-accent smooth-transition cursor-pointer">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {currentYear} JyotishAI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-accent smooth-transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent smooth-transition">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-accent smooth-transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
