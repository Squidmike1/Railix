"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative z-10 py-12 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Copyright */}
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Railix Inc. &mdash; Montana, United
          States
        </p>

        {/* Legal links */}
        <div className="flex items-center gap-6">
          <a
            href="/legal/privacy"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <span className="text-border">|</span>
          <a
            href="/legal/terms"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  )
}
