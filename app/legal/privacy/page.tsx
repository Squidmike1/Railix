import type { Metadata } from "next"
import { PrivacyContent } from "@/components/privacy-content"

export const metadata: Metadata = {
  title: "Privacy Policy — Railix Inc.",
  description:
    "Privacy Policy for Railix Inc. Learn how we collect, use, and protect your information.",
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
