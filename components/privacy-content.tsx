"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface PolicySection {
  number: string
  title: string
  content: string[]
  bullets?: string[]
}

const sections: PolicySection[] = [
  {
    number: "01",
    title: "Information We Collect",
    content: [
      "We may collect limited information in the following ways:",
      "Information you provide directly -- when you contact us or request updates, you may provide:",
    ],
    bullets: [
      "Name",
      "Email address",
      "Company name",
      "Message content or inquiry details",
    ],
  },
  {
    number: "02",
    title: "Automatically Collected Information",
    content: ["We may collect basic technical information such as:"],
    bullets: ["Browser type", "Device information", "General website usage analytics"],
  },
  {
    number: "03",
    title: "How We Use Information",
    content: ["Railix uses collected information to:"],
    bullets: [
      "Respond to inquiries and communications",
      "Provide requested updates about Railix",
      "Improve website functionality and user experience",
      "Support security and operational integrity",
    ],
  },
  {
    number: "04",
    title: "Sharing of Information",
    content: [
      "Railix does not share your personal information except in limited circumstances, such as:",
    ],
    bullets: [
      "With service providers supporting website operations",
      "To comply with applicable legal obligations",
      "To protect the security or integrity of Railix",
    ],
  },
  {
    number: "05",
    title: "Data Security",
    content: [
      "We maintain reasonable administrative and technical safeguards designed to protect information against unauthorized access, misuse, or disclosure. However, no method of transmission or storage is completely secure.",
    ],
  },
  {
    number: "06",
    title: "Data Retention",
    content: ["We retain information only as long as necessary to:"],
    bullets: [
      "Respond to inquiries",
      "Maintain business records",
      "Meet legal or regulatory requirements where applicable",
    ],
  },
  {
    number: "07",
    title: "External Links",
    content: [
      "Our website may contain links to third-party sites. Railix is not responsible for the privacy practices of external websites.",
    ],
  },
  {
    number: "08",
    title: "Changes to This Policy",
    content: [
      'We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last updated" date.',
    ],
  },
]

export function PrivacyContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-animate]")
        gsap.fromTo(
          els,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.3,
          },
        )
      }

      if (sectionsRef.current) {
        const blocks = sectionsRef.current.querySelectorAll("[data-section]")
        gsap.fromTo(
          blocks,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      if (contactRef.current) {
        gsap.fromTo(
          contactRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
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
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        {/* Hero / Title block */}
        <div ref={heroRef} className="max-w-3xl mb-20">
          <span
            data-animate
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
          >
            Legal
          </span>

          <h1
            data-animate
            className="mt-4 font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight text-foreground"
          >
            PRIVACY POLICY
          </h1>

          <p
            data-animate
            className="mt-6 max-w-xl font-mono text-sm text-muted-foreground leading-relaxed"
          >
            {'Railix Inc. (\u201CRailix,\u201D \u201Cwe,\u201D \u201Cour,\u201D or \u201Cus\u201D) values your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit our website or contact us.'}
          </p>

          <p
            data-animate
            className="mt-3 max-w-xl font-mono text-xs text-muted-foreground/70 leading-relaxed"
          >
            Railix is currently developing modern payment infrastructure and
            preparing for a future public launch. This website is provided for
            informational purposes only.
          </p>

          <p
            data-animate
            className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50"
          >
            Last updated: February 2026
          </p>
        </div>

        {/* Policy sections */}
        <div ref={sectionsRef} className="max-w-3xl space-y-12">
          {sections.map((section) => (
            <div
              key={section.number}
              data-section
              className="border-l border-border/30 pl-6"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[10px] text-accent tracking-widest">
                  {section.number}
                </span>
                <h2 className="font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight text-foreground">
                  {section.title.toUpperCase()}
                </h2>
              </div>

              {section.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-mono text-xs text-muted-foreground leading-relaxed mb-2"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="space-y-1.5 mt-2">
                  {section.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-mono text-[11px] text-foreground/70 leading-relaxed"
                    >
                      <span className="text-accent mt-0.5 shrink-0">&mdash;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Contact for privacy */}
        <div
          ref={contactRef}
          className="max-w-3xl mt-16 pt-12 border-t border-border/20"
        >
          <div className="border-l border-border/30 pl-6">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-[10px] text-accent tracking-widest">
                09
              </span>
              <h2 className="font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight text-foreground">
                CONTACT US
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-2">
              For privacy-related questions, please contact:
            </p>
            <div className="space-y-1">
              <p className="font-mono text-xs text-foreground/80">Railix Inc.</p>
              <a
                href="mailto:contact@railix.com"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200 underline underline-offset-4 decoration-border"
              >
                contact@railix.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
