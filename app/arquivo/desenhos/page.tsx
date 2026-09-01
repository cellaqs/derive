"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import { getDesenhos, type DrawingEntry } from "../../lib/drawing-store"
import { SettingsIcon, ArrowRightIcon } from "../../components/ui/icons"
import { HeaderDate } from "../../components/ui/header-date"
import DrawingThumbnail from "../../components/ui/drawing-thumbnail"

export default function ArquivoDesenhos() {
  const [desenhos, setDesenhos] = useState<DrawingEntry[]>([])

  useEffect(() => {
    setDesenhos(getDesenhos())
  }, [])

  const count = desenhos.length

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">
        <div className="flex flex-1 flex-col px-5 pt-5 pb-4">

          {/* Header */}
          <header className="mb-8 flex items-center justify-between">
            <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
              cap. IV — arquivo
            </p>
            <div className="flex items-center gap-[10px]">
              <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
              <HeaderDate className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]" />
            </div>
          </header>

          <div className="flex flex-col gap-[10px] flex-1">
            {/* Título + settings + stats */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col tracking-[-1.56px]">
                  <h1 className="font-serif text-[52px] leading-[52px] text-[#1a1a18]">arquivo</h1>
                  <p className="font-editorial italic text-[26px] leading-normal text-[#6a6962]">de campo</p>
                </div>
                <button className="mt-1 p-1 transition-opacity hover:opacity-60" aria-label="Configurações">
                  <SettingsIcon />
                </button>
              </div>

              <div className="flex items-end justify-between border-b border-[#393936] pb-[22px]">
                <div className="flex items-end gap-2">
                  <span className="font-serif text-[28px] leading-[28px] text-[#1a1a18]">
                    {String(count).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962] mb-[2px]">
                    {count === 1 ? "esboço" : "esboços"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-5">
              <Link href="/arquivo" className="flex items-center justify-center py-1">
                <span className="font-sans text-[8px] uppercase tracking-[1.92px] text-[#a7a6a1] transition-colors hover:text-[#1a1a18]">
                  fotos
                </span>
              </Link>
              <div className="flex items-center justify-center py-1 border-b-[1.5px] border-[#c8382a]">
                <span className="font-sans text-[8px] uppercase tracking-[1.92px] text-[#1a1a18]">
                  desenhos
                </span>
              </div>
              <Link href="/arquivo/derivas" className="flex items-center justify-center py-1">
                <span className="font-sans text-[8px] uppercase tracking-[1.92px] text-[#a7a6a1] transition-colors hover:text-[#1a1a18]">
                  derivas completas
                </span>
              </Link>
            </div>

            {/* Lista de desenhos */}
            <div className="flex flex-col gap-[30px] mt-2 flex-1">
              {count === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                  <p className="font-editorial italic text-[15px] leading-[22px] text-[#1a1a18]/40">
                    nenhum esboço ainda.
                  </p>
                  <p className="font-sans text-[9px] uppercase tracking-[2px] text-[#1a1a18]/30">
                    finalize uma deriva presença para começar
                  </p>
                </div>
              ) : (
                desenhos.map((d, i) => (
                  <div key={d.id} className="flex flex-col gap-[10px]">
                    <div className="relative h-[150px] w-full overflow-hidden bg-[#f0e9df]">
                      <DrawingThumbnail dataUrl={d.dataUrl} className="absolute inset-0" />
                    </div>
                    <div className="flex items-center justify-between font-sans text-[9px] uppercase tracking-[2.16px]">
                      <span className="text-[#c8382a]">esboço {i + 1}</span>
                      <span className="text-[#6a6962]">{d.mode}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Nova deriva */}
            <div className="mt-auto pt-4">
              <Link
                href="/deriva/inicio"
                className="group flex h-[56px] w-full items-center justify-between border-b border-t border-[#1a1a18] pl-1 pr-4 transition-colors duration-200 hover:border-[#c8382a]"
              >
                <span className="font-sans uppercase text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]" style={{ fontSize: "12px", letterSpacing: "3.36px" }}>
                  nova deriva
                </span>
                <ArrowRightIcon className="size-6 text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]" />
              </Link>
            </div>
          </div>
        </div>

        <Navbar active="IV" />
      </section>
    </main>
  )
}
