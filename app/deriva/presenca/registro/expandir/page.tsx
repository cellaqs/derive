"use client"

import Link from "next/link"
import { useCallback, useRef } from "react"
import Navbar from "../../../../components/Navbar"
import DrawingCanvas, { clearDrawing } from "../../../../components/ui/drawing-canvas"
import { ArrowLeftIcon } from "../../../../components/ui/icons"

export default function RegistroDesenhosExpandido() {
  const refreshKey = useRef(0)

  const handleClear = useCallback(() => {
    clearDrawing()
    // força remount do canvas limpando o localStorage antes
    refreshKey.current += 1
    window.location.reload()
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">

        <div className="flex flex-1 flex-col px-5 pt-5 pb-5">
          <div className="flex flex-1 flex-col gap-[10px]">

            {/* Drawing pad full height */}
            <div className="relative flex-1 border border-dashed border-[#6a6962] bg-[#eeede9]">
              <DrawingCanvas className="absolute inset-0 h-full w-full" />

              {/* placeholder */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
                <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {Array.from({ length: 3 }).map((_, row) =>
                    Array.from({ length: 5 }).map((_, col) => (
                      <circle key={`${row}-${col}`} cx={16 + col * 12} cy={13 + row * 12} r="1.5" fill="#84837d" />
                    ))
                  )}
                </svg>
                <p className="font-sans text-[8px] uppercase tracking-[2.08px] text-[#84837d]">
                  desenhe aqui
                </p>
              </div>

              {/* Limpar */}
              <button
                onClick={handleClear}
                className="absolute right-[11.5px] top-[11.5px] border border-[#c8382a] bg-[#faf6f2] px-[10px] py-[4px]"
              >
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[2.16px] text-[#c8382a]">
                  limpar
                </span>
              </button>
            </div>

            {/* Voltar */}
            <Link
              href="/deriva/presenca/registro"
              className="flex h-[40px] w-full items-center justify-between rounded-[2px] bg-[#c8382a] px-4 transition-opacity hover:opacity-90"
            >
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white">
                voltar
              </span>
              <ArrowLeftIcon className="size-6 text-white" />
            </Link>

          </div>
        </div>

        <Navbar active="III" />
      </section>
    </main>
  )
}
