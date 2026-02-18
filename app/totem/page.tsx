"use client"

import { useState } from "react"
import { Printer, Phone, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"

export default function TotemPage() {
  const [phone, setPhone] = useState("")
  const [printed, setPrinted] = useState(false)
  const [assignedNumber, setAssignedNumber] = useState<number | null>(null)

  const handlePrint = () => {
    // Simulate ticket printing
    const newNumber = Math.floor(Math.random() * 100) + 1
    setAssignedNumber(newNumber)
    setPrinted(true)
    setTimeout(() => {
      setPrinted(false)
      setPhone("")
      setAssignedNumber(null)
    }, 5000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <Logo size="large" />

        <p className="text-center text-lg text-muted-foreground">
          Retire su turno para ser atendido
        </p>

        {!printed ? (
          <div className="flex w-full flex-col items-center gap-6">
            <div className="w-full">
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                Telefono (opcional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ej: 11-2345-6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 text-lg"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Ingrese su numero para recibir notificaciones.
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="gradient-primary flex w-full items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <Printer className="h-6 w-6" />
              Imprimir Ticket
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Su turno es</p>
            <div className="gradient-primary flex h-28 w-28 items-center justify-center rounded-2xl">
              <span className="text-5xl font-bold text-primary-foreground">
                {assignedNumber}
              </span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Por favor, espere a ser llamado.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  )
}
