"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ExperimentData {
  title: string
  medium: string
  description: string
  span: string
  bullets?: string[]
}

const EXPERIMENTS: ExperimentData[] = [
  {
    title: "Settlement Rails",
    medium: "In Development",
    description:
      "Core payment settlement infrastructure designed for speed, finality, and auditability across digital commerce.",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Stablecoin Settlement",
    medium: "In Development",
    description:
      "Settlement rails designed to support stablecoin-native flows with clear lifecycle states.",
    span: "col-span-1 row-span-1",
    bullets: [
      "Launching with controlled access and staged rollout",
      "Designed for transparent settlement tracking",
      "Built to support future programmable settlement primitives",
      "Intended for modern commerce and treasury flows",
    ],
  },
  {
    title: "Treasury & Reconciliation",
    medium: "In Development",
    description:
      "Automated treasury movement and real-time reconciliation for enterprise-grade operations.",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Cross-Border Payments",
    medium: "In Development",
    description: "Foundations for clearer global movement of value.",
    span: "col-span-1 row-span-1",
    bullets: [
      "Reduce complexity through standardized flow states",
      "Transparency for reconciliation and operational review",
      "Designed to support multiple corridors as rollout expands",
      "Focus on predictable settlement paths",
    ],
  },
  {
    title: "API Platform",
    medium: "In Development",
    description:
      "API-first platform enabling developers and enterprises to build on programmable payment rails.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Compliance & Risk",
    medium: "Foundational Layer",
    description: "Controls designed into the operating model from day one.",
    span: "col-span-1 row-span-1",
    bullets: [
      "Identity verification and customer risk profiling",
      "Sanctions awareness and screening foundations",
      "Activity monitoring and escalation workflows",
      "Recordkeeping and audit-ready reporting mindset",
    ],
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<ExperimentData | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)
  const smoothPos = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  const animatePanel = useCallback(() => {
    const el = panelRef.current
    if (!el) return
    smoothPos.current.x += (mousePos.x - smoothPos.current.x) * 0.15
    smoothPos.current.y += (mousePos.y - smoothPos.current.y) * 0.15
    el.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`
    frameRef.current = requestAnimationFrame(animatePanel)
  }, [mousePos])

  useEffect(() => {
    if (hoveredCard) {
      frameRef.current = requestAnimationFrame(animatePanel)
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [hoveredCard, animatePanel])

  const onCardHover = useCallback((data: ExperimentData | null) => {
    setHoveredCard(data)
  }, [])

  const onSectionMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left + 20, y: e.clientY - rect.top - 10 })
    },
    [],
  )

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12"
      onMouseMove={onSectionMouseMove}
    >
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02 / Infrastructure
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            WHAT WE&apos;RE BUILDING
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Modular payment infrastructure components, each purpose-built for the
          demands of modern digital commerce.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
      >
        {EXPERIMENTS.map((item, idx) => (
          <CardItem
            key={item.title}
            data={item}
            idx={idx}
            stickyHover={idx === 0}
            onHover={onCardHover}
          />
        ))}
      </div>

      <div
        ref={panelRef}
        className={cn(
          "hidden md:block absolute top-0 left-0 z-50 pointer-events-none",
          hoveredCard?.bullets ? "opacity-100" : "opacity-0",
        )}
        style={{
          willChange: "transform",
          transitionProperty: "opacity",
          transitionDuration: "300ms",
        }}
      >
        {hoveredCard?.bullets && (
          <div className="w-[340px] border border-accent/30 bg-background/95 backdrop-blur-md p-5 shadow-lg">
            <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 mb-3">
              {hoveredCard.medium}
            </span>
            <h4 className="font-[var(--font-bebas)] text-xl tracking-tight text-foreground mb-2">
              {hoveredCard.title}
            </h4>
            <p className="font-mono text-[11px] text-muted-foreground leading-relaxed mb-3">
              {hoveredCard.description}
            </p>
            <ul className="space-y-1.5">
              {hoveredCard.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 font-mono text-[10px] text-foreground/70 leading-relaxed"
                >
                  <span className="text-accent mt-px shrink-0">&mdash;</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

function CardItem({
  data,
  idx,
  stickyHover = false,
  onHover,
}: {
  data: ExperimentData
  idx: number
  stickyHover?: boolean
  onHover: (d: ExperimentData | null) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [tapped, setTapped] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const [scrollActive, setScrollActive] = useState(false)
  const hasBullets = Boolean(data.bullets?.length)

  useEffect(() => {
    if (!stickyHover || !ref.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        onEnter: () => setScrollActive(true),
      })
    }, ref)
    return () => ctx.revert()
  }, [stickyHover])

  const active = hovered || scrollActive

  return (
    <article
      ref={ref}
      className={cn(
        "group relative border border-border/40 p-5 flex flex-col justify-between cursor-pointer overflow-hidden",
        "transition-all duration-500",
        data.span,
        active && "border-accent/60",
      )}
      onMouseEnter={() => {
        setHovered(true)
        if (hasBullets) onHover(data)
      }}
      onMouseLeave={() => {
        setHovered(false)
        onHover(null)
      }}
      onClick={() => hasBullets && setTapped((p) => !p)}
      onFocus={() => {
        setHovered(true)
        if (hasBullets) onHover(data)
      }}
      onBlur={() => {
        setHovered(false)
        onHover(null)
      }}
      tabIndex={0}
      role={hasBullets ? "button" : undefined}
      aria-expanded={hasBullets ? tapped : undefined}
    >
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="relative z-10">
        <span
          className={cn(
            "inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 transition-all duration-300",
            active
              ? "text-accent bg-accent/10 border border-accent/20"
              : "text-muted-foreground",
          )}
        >
          {data.medium}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
            active ? "text-accent" : "text-foreground",
          )}
        >
          {data.title}
        </h3>
      </div>

      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500 max-w-[280px]",
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {data.description}
        </p>
      </div>

      {hasBullets && (
        <div
          className={cn(
            "md:hidden relative z-10 overflow-hidden transition-all duration-500",
            tapped ? "max-h-[400px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0",
          )}
        >
          <ul className="space-y-2">
            {data.bullets!.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 font-mono text-[11px] text-foreground/70 leading-relaxed"
              >
                <span className="text-accent mt-px shrink-0">&mdash;</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          active ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(idx + 1).padStart(2, "0")}
      </span>

      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          active ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
