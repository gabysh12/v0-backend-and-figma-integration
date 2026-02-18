import Link from "next/link"
import { Monitor, Eye, LogIn } from "lucide-react"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <Logo size="large" />

        <p className="text-center text-muted-foreground">
          Sistema de gestion de turnos para tu negocio.
        </p>

        <div className="flex w-full flex-col gap-3">
          <Link
            href="/view"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-card-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <Eye className="h-4 w-4" />
            Ver Turnos
          </Link>

          <Link
            href="/totem"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-card-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <Monitor className="h-4 w-4" />
            Totem
          </Link>

          <Link
            href="/login"
            className="gradient-primary flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            <LogIn className="h-4 w-4" />
            Iniciar Sesion
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  )
}
