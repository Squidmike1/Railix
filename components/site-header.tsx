"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ScrambleTextOnHover } from "@/components/scramble-text"

function RailixLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Railix"
    >
      {/* Mark: abstract rail / chevron */}
      <rect x="0" y="2" width="4" height="24" fill="currentColor" />
      <polygon points="6,2 18,14 6,26 10,26 22,14 10,2" fill="currentColor" />
      <rect x="18" y="2" width="4" height="24" fill="currentColor" opacity="0.5" />

      {/* Wordmark */}
      <text
        x="30"
        y="22"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="24"
        fontWeight="400"
        letterSpacing="3"
        fill="currentColor"
      >
        RAILIX
      </text>
    </svg>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Entrance animation delay
    const timer = setTimeout(() => setVisible(true), 300)

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-transparent border-b border-transparent",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
      )}
    >
      {/* Logo */}
      <Link href="/" className="group flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300">
        <RailixLogo className="h-6 w-auto" />
      </Link>

      {/* Contact button */}
      <Link
        href="/contact"
        className="group inline-flex items-center gap-2 border border-foreground/20 px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
      >
        <ScrambleTextOnHover text="Contact" as="span" duration={0.4} />
      </Link>
    </header>
  )
}
