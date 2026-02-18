"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  X,
  User,
  Lock,
  Shield,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserRecord {
  id: number
  username: string
  role: "administrador" | "operador"
  active: boolean
}

const INITIAL_USERS: UserRecord[] = [
  { id: 1, username: "admin", role: "administrador", active: true },
  { id: 2, username: "operador01", role: "operador", active: true },
  { id: 3, username: "operador02", role: "operador", active: true },
  { id: 4, username: "operador03", role: "operador", active: false },
  { id: 5, username: "operador04", role: "operador", active: true },
  { id: 6, username: "operador05", role: "operador", active: false },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  // Form state
  const [formUsername, setFormUsername] = useState("")
  const [formPassword, setFormPassword] = useState("")
  const [formRole, setFormRole] = useState<"administrador" | "operador">("operador")

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditingUser(null)
    setFormUsername("")
    setFormPassword("")
    setFormRole("operador")
    setModalOpen(true)
  }

  const openEdit = (user: UserRecord) => {
    setEditingUser(user)
    setFormUsername(user.username)
    setFormPassword("")
    setFormRole(user.role)
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!formUsername.trim()) return

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, username: formUsername, role: formRole }
            : u
        )
      )
    } else {
      const newUser: UserRecord = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        username: formUsername,
        role: formRole,
        active: false,
      }
      setUsers((prev) => [...prev, newUser])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    setDeleteConfirm(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Administra los usuarios del sistema.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="gradient-primary flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Nuevo Usuario
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Usuario</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Rol</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Estado</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-card-foreground">{user.username}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.role === "administrador"
                          ? "bg-accent/10 text-accent"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Shield className="h-3 w-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        user.active ? "text-emerald-600" : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          user.active ? "bg-emerald-500" : "bg-muted-foreground/40"
                        }`}
                      />
                      {user.active ? "Conectado" : "Desconectado"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        aria-label={`Editar ${user.username}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {deleteConfirm === user.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`Eliminar ${user.username}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-card-foreground">
                {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-card-foreground"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-card-foreground">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Nombre de usuario"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {!editingUser && (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-card-foreground">Contrasena</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Contrasena"
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-card-foreground">Rol</Label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormRole("operador")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      formRole === "operador"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    Operador
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormRole("administrador")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      formRole === "administrador"
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    Administrador
                  </button>
                </div>
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="gradient-primary flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                >
                  {editingUser ? "Guardar" : "Crear"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
