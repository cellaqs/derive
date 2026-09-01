"use client"

import { useEffect, useState } from "react"

/**
 * Sempre reflete a data atual do dispositivo de quem está vendo a tela —
 * calculada no navegador, nunca congelada no momento do build/deploy.
 */
export function HeaderDate({ className }: { className?: string }) {
  const [date, setDate] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    const mes = now.toLocaleDateString("pt-BR", { month: "long" })
    setDate(`${mes} · ${now.getFullYear()}`)
  }, [])

  return <span className={className}>{date}</span>
}
