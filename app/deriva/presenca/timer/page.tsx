"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "../../../components/Navbar"
import { ArrowRightIcon } from "../../../components/ui/icons"

const DURATION = 40 * 60 // 40 minutes in seconds

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function DerivaModoPresencaTimer() {
  const [remaining, setRemaining] = useState(DURATION)

  useEffect(() => {
    const KEY = "presenca_start"
    let start = parseInt(sessionStorage.getItem(KEY) ?? "0", 10)

    if (!start) {
      start = Date.now()
      sessionStorage.setItem(KEY, String(start))
    }

    function tick() {
      const elapsed = Math.floor((Date.now() - start) / 1000)
      const left = Math.max(0, DURATION - elapsed)
      setRemaining(left)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">
        <div className="flex flex-1 flex-col justify-between px-5 pt-5 pb-5">

          {/* Label */}
          <div className="flex justify-center">
            <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
              modo presença
            </p>
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-sans text-[12px] uppercase tracking-[3.52px] text-[#1a1a18]">
              você está lá fora
            </p>
            <p
              className="font-serif italic text-[88px] leading-none text-[#c8382a]"
              aria-live="polite"
              aria-label={`tempo restante: ${formatTime(remaining)}`}
            >
              {formatTime(remaining)}
            </p>
          </div>

          {/* Encerrar */}
          <Link
            href="/deriva/presenca/registro"
            onClick={() => sessionStorage.removeItem("presenca_start")}
            className="group flex items-center justify-between border-b border-t border-[#1a1a18] pl-1 pr-4 py-5 transition-colors duration-200 hover:border-[#c8382a]"
          >
            <p className="font-sans text-[12px] uppercase tracking-[3.36px] text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]">
              encerrar deriva
            </p>
            <ArrowRightIcon className="size-6 text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]" />
          </Link>

        </div>

        <Navbar active="II" />
      </section>
    </main>
  )
}
