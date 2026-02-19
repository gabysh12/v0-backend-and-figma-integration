"use client"

import Image from "next/image"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 flex flex-col items-center gap-4">
        <Image
          src="/posta_logo.svg"
          alt="P.O.S.TA"
          width={186}
          height={44}
          priority
        />
        <Logo size="large" />
      </div>
      <div className="w-full max-w-sm">
        {children}
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  )
}
