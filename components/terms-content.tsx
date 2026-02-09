"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TermsSection {
  number: string
  title: string
  content: string[]
  bullets?: string[]
}

const sections: TermsSection[] = [
  {
    number: "01",
    title: "Informational Website Only",
    content: [
      "Railix is currently developing modern payment infrastructure and preparing for a future public launch. This website is provided for informational purposes only.",
      "Nothing on this website constitutes an offer, solicitation, or commitment to provide financial services, money transmission services, or any regulated activity unless and until such services are formally launched and documented.",
    ],
  },
  {
    number: "02",
    title: "No Financial, Legal, or Regulatory Advice",
    content: [
      "The content on this website is provided for general informational purposes only and does not constitute legal, financial, tax, or regulatory advice.",
      "You should consult qualified professionals before making decisions related to financial or regulatory matters.",
    ],
  },
  {
    number: "03",
    title: "Use of the Website",
    content: ["You agree to use this website only for lawful purposes. You may not:"],
    bullets: [
      "Attempt to gain unauthorized access to the website or its systems",
      "Interfere with the security or operation of the website",
      "Use the website in a manner that violates applicable laws or regulations",
    ],
  },
  {
    number: "04",
    title: "Intellectual Property",
    content: [
      "All content on this website, including text, graphics, branding, design elements, and logos, is the property of Railix Inc. or its licensors and is protected by applicable intellectual property laws.",
      "You may not copy, reproduce, or distribute website content without prior written permission.",
    ],
  },
  {
    number: "05",
    title: "Third-Party Links",
    content: [
      "This website may include links to third-party websites. Railix is not responsible for the content, policies, or practices of any third-party sites.",
      "Accessing third-party links is at your own risk.",
    ],
  },
  {
    number: "06",
    title: "Disclaimer of Warranties",
    content: [
      'This website is provided "as is" and "as available." Railix makes no warranties of any kind, express or implied, regarding the website or its content.',
      "Railix does not guarantee uninterrupted availability or error-free operation.",
    ],
  },
  {
    number: "07",
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Railix Inc. shall not be liable for any indirect, incidental, consequential, or special damages arising out of or related to your use of this website.",
    ],
  },
  {
    number: "08",
    title: "Changes to These Terms",
    content: [
      'Railix may update these Terms from time to time. Updates will be posted on this page with a revised "Last updated" date.',
    ],
  },
]

export function TermsContent() {
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
            TERMS OF USE
          </h1>

          <p
            data-animate
            className="mt-6 max-w-xl font-mono text-sm text-muted-foreground leading-relaxed"
          >
            {
              'These Terms of Use (\u201CTerms\u201D) govern your access to and use of the Railix Inc. (\u201CRailix,\u201D \u201Cwe,\u201D \u201Cour,\u201D or \u201Cus\u201D) website.'
            }
          </p>

          <p
            data-animate
            className="mt-3 max-w-xl font-mono text-xs text-muted-foreground/70 leading-relaxed"
          >
            By accessing or using this website, you agree to these Terms. If you
            do not agree, you should not use this website.
          </p>

          <p
            data-animate
            className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50"
          >
            Last updated: February 2026
          </p>
        </div>

        {/* Terms sections */}
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
                      <span className="text-accent mt-0.5 shrink-0">
                        &mdash;
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
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
              If you have questions about these Terms, please contact:
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
