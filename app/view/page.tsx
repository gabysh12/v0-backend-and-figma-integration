"use client"

import { useEffect, useState } from "react"
import { Clock, Users } from "lucide-react"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"

interface Turn {
  number: number
  status: "current" | "waiting"
}

const MOCK_TURNS: Turn[] = [
  { number: 42, status: "current" },
  { number: 43, status: "waiting" },
  { number: 44, status: "waiting" },
  { number: 45, status: "waiting" },
]

export default function ViewPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [turns] = useState<Turn[]>(MOCK_TURNS)

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const currentTurn = turns.find((t) => t.status === "current")
  const nextTurns = turns.filter((t) => t.status === "waiting")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Logo />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{currentTime.toLocaleTimeString("es-AR")}</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium">Turno en atencion</span>
        </div>

        {currentTurn ? (
          <div className="gradient-primary flex h-40 w-40 flex-col items-center justify-center rounded-2xl shadow-lg">
            <span className="text-sm font-medium text-primary-foreground/70">TURNO</span>
            <span className="text-6xl font-bold text-primary-foreground">
              {currentTurn.number}
            </span>
          </div>
        ) : (
          <div className="flex h-40 w-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border">
            <span className="text-sm text-muted-foreground">Sin turnos</span>
          </div>
        )}

        {nextTurns.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Proximos turnos</span>
            <div className="flex gap-4">
              {nextTurns.map((turn) => (
                <div
                  key={turn.number}
                  className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border border-border bg-card shadow-sm"
                >
                  <span className="text-xs text-muted-foreground">TURNO</span>
                  <span className="text-2xl font-bold text-card-foreground">{turn.number}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
