"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AnimatedNoise } from "@/components/animated-noise"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { DrawText } from "@/components/draw-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ContactCard {
  label: string
  title: string
  email: string
  description: string
  bullets: string[]
}

const contactCards: ContactCard[] = [
  {
    label: "General",
    title: "General inquiries",
    email: "contact@railix.com",
    description: "Product, early access, and business outreach.",
    bullets: [
      "Company name + use case recommended",
      "Best for partnerships and integrations",
      "Response times may vary during development",
    ],
  },
  {
    label: "Compliance",
    title: "Compliance inquiries",
    email: "compliance@railixpay.com",
    description: "Compliance and risk-related questions.",
    bullets: [
      "Policies and controls overview requests",
      "Risk and compliance communications",
      "Institutional diligence support",
    ],
  },
]

export function ContactContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-animate]")
        gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.6,
          },
        )
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-card]")
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative min-h-screen">
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center pl-6 md:pl-28 pr-6 md:pr-12 pt-24">
          <AnimatedNoise opacity={0.03} />

          {/* Left vertical label */}
          <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
              CONTACT
            </span>
          </div>

          <div ref={heroRef} className="flex-1 w-full">
            <DrawText
              text="CONTACT"
              className="text-foreground"
              duration={0.06}
              delay={0.3}
              stagger={0.06}
            />

            <p
              data-animate
              className="mt-8 max-w-lg font-mono text-sm text-muted-foreground leading-relaxed"
            >
              Railix is currently in development. For early access requests or
              inquiries, reach out below.
            </p>

            <p
              data-animate
              className="mt-4 font-mono text-[10px] uppercase tracking-widest text-accent"
            >
              Currently under development. Public launch coming soon.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-24 pl-6 md:pl-28 pr-6 md:pr-12">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              01 / Reach Out
            </span>
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl"
          >
            {contactCards.map((card, index) => (
              <ContactCardItem key={index} card={card} index={index} />
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section
          ref={ctaRef}
          className="py-24 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                02 / Connect
              </span>
              <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
                GET IN TOUCH
              </h2>
              <p className="mt-4 max-w-md font-mono text-xs text-muted-foreground leading-relaxed">
                For early access requests or updates, email us.
              </p>
            </div>

            <div className="flex items-center gap-8 self-start md:self-auto">
              <a
                href="mailto:contact@railix.com"
                className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
              >
                <ScrambleTextOnHover
                  text="Email Railix"
                  as="span"
                  duration={0.6}
                />
                <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
              </a>
              <a
                href="/"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>


      </div>
    </main>
  )
}

function ContactCardItem({
  card,
  index,
}: {
  card: ContactCard
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const isActive = isHovered || isTapped

  return (
    <article
      data-card
      className={cn(
        "group relative border border-border/40 p-6 md:p-8 flex flex-col justify-between min-h-[260px] cursor-pointer overflow-hidden transition-all duration-500",
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsTapped((prev) => !prev)}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="button"
      aria-expanded={isActive}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Top */}
      <div className="relative z-10">
        <span
          className={cn(
            "inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 transition-all duration-300",
            isActive
              ? "text-accent bg-accent/10 border border-accent/20"
              : "text-muted-foreground",
          )}
        >
          {card.label}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {card.title}
        </h3>
      </div>

      {/* Bottom content - revealed on hover/focus/tap */}
      <div className="relative z-10 flex flex-col gap-3 mt-6">
        <p
          className={cn(
            "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {card.description}
        </p>

        {/* Bullet details */}
        <ul
          className={cn(
            "space-y-1.5 transition-all duration-500 overflow-hidden",
            isActive
              ? "opacity-100 translate-y-0 max-h-[300px]"
              : "opacity-0 translate-y-4 max-h-0",
          )}
        >
          {card.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-mono text-[11px] text-foreground/70 leading-relaxed"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.4s",
                transitionTimingFunction: "ease",
                transitionDelay: isActive ? `${(i + 1) * 60}ms` : "0ms",
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translateY(0)"
                  : "translateY(6px)",
              }}
            >
              <span className="text-accent mt-0.5 shrink-0">&mdash;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Email link */}
        <a
          href={`mailto:${card.email}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center gap-2 font-mono text-xs transition-all duration-500 hover:text-accent underline underline-offset-4 decoration-border mt-2",
            isActive
              ? "opacity-100 translate-y-0 text-foreground"
              : "opacity-0 translate-y-2 text-foreground/80",
          )}
        >
          {card.email}
          <BitmapChevron className="w-3 h-3 transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
        </a>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
