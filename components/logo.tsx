import Link from "next/link"

export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const textSize = size === "large" ? "text-4xl" : "text-2xl"
  return (
    <Link href="/" className={`${textSize} font-bold tracking-tight`}>
      <span className="gradient-text">TuTurno</span>
    </Link>
  )
}
