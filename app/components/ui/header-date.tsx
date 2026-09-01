"use client"

import { useEffect, useState } from "react"

/**
 * Sempre reflete a data atual do dispositivo de quem está vendo a tela —
 * calculada no navegador, nunca congelada no momento do build/deploy.
 */
export function HeaderDate({ className }: { className?: string }) {
  const [date, setDate] = useState<string | null>(null)

  useEffect(() => {
    setDate(new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }))
  }, [])

  return <span className={className}>{date}</span>
}
