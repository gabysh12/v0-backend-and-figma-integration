"use client"

import { useState } from "react"
import { Bell, CheckCircle2, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"

export default function OperatorPage() {
  const router = useRouter()
  const [currentTurn, setCurrentTurn] = useState<number | null>(47)
  const [bellRinging, setBellRinging] = useState(false)
  const [completing, setCompleting] = useState(false)

  const handleCompleteTurn = () => {
    setCompleting(true)
    setTimeout(() => {
      setCurrentTurn((prev) => (prev ? prev + 1 : null))
      setCompleting(false)
    }, 800)
  }

  const handleRingBell = () => {
    setBellRinging(true)
    setTimeout(() => setBellRinging(false), 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>operador01</span>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
        <h1 className="text-xl font-semibold text-foreground">Panel del Operador</h1>

        {currentTurn ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Turno asignado actualmente
              </span>
              <div className="gradient-primary flex h-36 w-36 flex-col items-center justify-center rounded-2xl shadow-lg">
                <span className="text-xs font-medium text-primary-foreground/70">TURNO</span>
                <span className="text-6xl font-bold text-primary-foreground">{currentTurn}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleCompleteTurn}
                disabled={completing}
                className="gradient-primary flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                {completing ? "Finalizando..." : "Turno Atendido"}
              </button>

              <button
                onClick={handleRingBell}
                disabled={bellRinging}
                className={`flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-all ${
                  bellRinging
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <Bell className={`h-4 w-4 ${bellRinging ? "animate-bounce" : ""}`} />
                {bellRinging ? "Sonando..." : "Llamar Turno"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border p-12">
            <span className="text-muted-foreground">No hay turnos asignados</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
