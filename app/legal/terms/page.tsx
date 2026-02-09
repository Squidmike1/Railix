import type { Metadata } from "next"
import { TermsContent } from "@/components/terms-content"

export const metadata: Metadata = {
  title: "Terms of Use — Railix Inc.",
  description:
    "Terms of Use for Railix Inc. Read about the terms governing your use of the Railix website.",
}

export default function TermsPage() {
  return <TermsContent />
}
