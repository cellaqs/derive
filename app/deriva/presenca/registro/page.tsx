"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import DrawingCanvas, { CANVAS_DRAWING_KEY, clearDrawing } from "../../../components/ui/drawing-canvas"
import { formatTime } from "../../../lib/utils"
import { saveDesenho } from "../../../lib/drawing-store"
import { saveDerivaCompleta } from "../../../lib/deriva-store"
import { AddRoundIcon, ArrowLeftIcon } from "../../../components/ui/icons"
import { HeaderDate } from "../../../components/ui/header-date"

export default function RegistroDesenhos() {
  const router = useRouter()
  const [time] = useState(() => formatTime(new Date()))
  const [nota, setNota] = useState("")
  const [hasDrawing, setHasDrawing] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem("presenca_nota")
    if (saved) setNota(saved)
    setHasDrawing(!!localStorage.getItem(CANVAS_DRAWING_KEY))
  }, [])

  function handleNota(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNota(e.target.value)
    sessionStorage.setItem("presenca_nota", e.target.value)
  }

  function handleRegistrar() {
    const dataUrl = localStorage.getItem(CANVAS_DRAWING_KEY)
    if (!dataUrl) return
    saveDesenho({ dataUrl, createdAt: new Date().toISOString(), mode: "modo presença" })
    saveDerivaCompleta({
      principal: sessionStorage.getItem("presenca_principal") ?? "deriva concluída em silêncio.",
      date: new Date().toISOString(),
      mode: "desenho",
    })
    clearDrawing()
    sessionStorage.removeItem("presenca_nota")
    sessionStorage.removeItem("presenca_principal")
    router.push("/arquivo/desenhos")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">

        <div className="flex flex-1 flex-col justify-between px-5 pt-5 pb-5">

          {/* Topo */}
          <div className="flex flex-col gap-[30px]">
            <header className="flex items-center justify-between">
              <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
                cap. III — registro
              </p>
              <div className="flex items-center gap-[10px]">
                <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
                <HeaderDate className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]" />
              </div>
            </header>

            <div className="flex flex-col gap-[10px]">
              {/* Drawing pad — container clips to 200px, canvas extends to FULL_HEIGHT */}
              <div className="relative h-[200px] w-full overflow-hidden border border-dashed border-[#6a6962] bg-[#eeede9]">
                <DrawingCanvas className="absolute left-0 top-0 w-full" />

                {/* placeholder shown when canvas is empty */}
                {!hasDrawing && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
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
                )}

                {/* Expandir */}
                <Link
                  href="/deriva/presenca/registro/expandir"
                  className="absolute right-[11.5px] top-[11.5px] border border-[#c8382a] bg-[#faf6f2] px-[10px] py-[4px]"
                >
                  <span className="font-sans text-[9px] font-semibold uppercase tracking-[2.16px] text-[#c8382a]">
                    expandir
                  </span>
                </Link>
              </div>

              {/* Label */}
              <div className="flex items-center justify-between">
                <p className="font-sans text-[9px] uppercase tracking-[2.16px] text-[#c8382a]">
                  um esboço
                </p>
                <p className="font-sans text-[9px] uppercase tracking-[2.16px] text-[#6a6962]">
                  {time}
                </p>
              </div>
            </div>

            {/* Nota */}
            <div className="flex flex-col gap-[10px] border-b border-[#6a6962] pb-[30px]">
              <p className="font-editorial italic text-[15px] leading-[22.5px] text-[#1a1a18]">
                o que ficou
              </p>
              <textarea
                value={nota}
                onChange={handleNota}
                placeholder="uma frase. uma palavra. qualquer coisa."
                rows={3}
                className="w-full resize-none bg-transparent font-editorial italic text-[15px] leading-[22.5px] text-[#1a1a18] placeholder:text-[#a7a6a1] outline-none"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-[10px]">
            <button
              onClick={handleRegistrar}
              disabled={!hasDrawing}
              className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#1a1a18] px-4 transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white">
                registrar desenho
              </span>
              <AddRoundIcon className="size-6 text-white" />
            </button>

            <Link
              href="/deriva/presenca/timer"
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
