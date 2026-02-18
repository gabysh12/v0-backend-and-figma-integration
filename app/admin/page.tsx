"use client"

import { Users, UserCheck, Clock, TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const HOURLY_DATA = [
  { hour: "08:00", turnos: 5 },
  { hour: "09:00", turnos: 12 },
  { hour: "10:00", turnos: 18 },
  { hour: "11:00", turnos: 24 },
  { hour: "12:00", turnos: 15 },
  { hour: "13:00", turnos: 8 },
  { hour: "14:00", turnos: 20 },
  { hour: "15:00", turnos: 22 },
  { hour: "16:00", turnos: 16 },
  { hour: "17:00", turnos: 10 },
]

const DAILY_DATA = [
  { day: "Lun", turnos: 85 },
  { day: "Mar", turnos: 92 },
  { day: "Mie", turnos: 78 },
  { day: "Jue", turnos: 110 },
  { day: "Vie", turnos: 130 },
  { day: "Sab", turnos: 45 },
  { day: "Dom", turnos: 0 },
]

const STATS = [
  {
    label: "Turnos hoy",
    value: "142",
    icon: Clock,
    change: "+12%",
  },
  {
    label: "Operadores activos",
    value: "4",
    icon: UserCheck,
    subtitle: "de 6 totales",
  },
  {
    label: "Tiempo promedio",
    value: "8 min",
    icon: TrendingUp,
    change: "-5%",
  },
  {
    label: "En espera",
    value: "7",
    icon: Users,
  },
]

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumen de actividad y estadisticas de turnos.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-card-foreground">{stat.value}</span>
                {stat.change && (
                  <span
                    className={`text-xs font-medium ${
                      stat.change.startsWith("+") ? "text-emerald-600" : "text-primary"
                    }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
              {stat.subtitle && (
                <span className="text-xs text-muted-foreground">{stat.subtitle}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hourly chart */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-card-foreground">
            Demanda por hora (hoy)
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={HOURLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "#64748B" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="turnos" fill="#06B6D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily chart */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-card-foreground">
            Demanda por dia (semana)
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={DAILY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748B" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="turnos"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
