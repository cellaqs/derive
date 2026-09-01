"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getRegistros, type RegistroEntry } from "../lib/store"
import { formatDate } from "../lib/utils"
import { SettingsIcon, ArrowRightIcon } from "../components/ui/icons"

function ImageCard({ entry, tall }: { entry: RegistroEntry; tall?: boolean }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <div
        className="relative w-full overflow-hidden"
        style={{ height: tall ? "160px" : "112px" }}
      >
        <Image
          src={entry.photoBase64}
          alt={entry.text}
          fill
          className="object-cover"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="font-editorial italic text-[12px] leading-[15px] text-[#32322f]">
          &#8220;{entry.text}&#8221;
        </p>
        <div className="flex items-center justify-between">
          <p className="font-sans text-[8px] uppercase tracking-[1.76px] text-[#84837d]">
            {entry.location}
          </p>
          <p className="font-sans text-[8px] uppercase tracking-[1.76px] text-[#84837d]">
            {formatDate(entry.date)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ArquivoClient() {
  const [registros, setRegistros] = useState<RegistroEntry[]>([])

  useEffect(() => {
    setRegistros(getRegistros())
  }, [])

  const count = registros.length
  const km = (count * 1.77).toFixed(1).replace(".", ",")
  const leftCol = registros.filter((_, i) => i % 2 === 0)
  const rightCol = registros.filter((_, i) => i % 2 !== 0)

  return (
    <div className="flex flex-1 flex-col gap-[30px]">

      {/* Cabeçalho: título + ícone de settings + stats + tabs */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-6">
          {/* Título + settings */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col tracking-[-1.56px]">
              <h1 className="font-serif text-[52px] leading-[52px] text-[#1a1a18]">
                arquivo
              </h1>
              <p className="font-editorial italic text-[26px] leading-normal text-[#6a6962]">
                de campo
              </p>
            </div>
            <button className="mt-1 p-1 transition-opacity hover:opacity-60" aria-label="Configurações">
              <SettingsIcon />
            </button>
          </div>

          {/* Stats com border-bottom */}
          <div className="flex items-end justify-between border-b border-[#393936] pb-[22px]">
            <div className="flex items-end gap-2">
              <span className="font-serif text-[28px] leading-[28px] text-[#1a1a18]">
                {String(count).padStart(2, "0")}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962] mb-[2px]">
                {count === 1 ? "deriva" : "derivas"}
              </span>
            </div>
            <span className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
              {km} km
            </span>
          </div>
        </div>

        {/* Tabs: Fotos | Desenhos | Derivas completas */}
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center py-1 border-b-[1.5px] border-[#c8382a]">
            <span className="font-sans text-[8px] uppercase tracking-[1.92px] text-[#1a1a18]">
              fotos
            </span>
          </div>
          <Link href="/arquivo/desenhos" className="flex items-center justify-center py-1">
            <span className="font-sans text-[8px] uppercase tracking-[1.92px] text-[#a7a6a1] transition-colors hover:text-[#1a1a18]">
              desenhos
            </span>
          </Link>
          <Link href="/arquivo/derivas" className="flex items-center justify-center py-1">
            <span className="font-sans text-[8px] uppercase tracking-[1.92px] text-[#a7a6a1] transition-colors hover:text-[#1a1a18]">
              derivas completas
            </span>
          </Link>
        </div>
      </div>

      {/* Estado vazio */}
      {count === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <p className="font-editorial italic text-[15px] leading-[22px] text-[#1a1a18]/40">
            nenhum registro ainda.
          </p>
          <p className="font-sans text-[9px] uppercase tracking-[2px] text-[#1a1a18]/30">
            inicie uma deriva para começar
          </p>
        </div>
      )}

      {/* Grid 2 colunas */}
      {count > 0 && (
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-5">
            {leftCol.map((entry, i) => (
              <ImageCard key={entry.id} entry={entry} tall={i % 2 === 0} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-5 pt-8">
            {rightCol.map((entry, i) => (
              <ImageCard key={entry.id} entry={entry} tall={i % 2 !== 0} />
            ))}
          </div>
        </div>
      )}

      {/* Botão NOVA DERIVA */}
      <div className="mt-auto pt-4">
        <Link
          href="/deriva/inicio"
          className="group flex h-[56px] w-full items-center justify-between border-b border-t border-[#1a1a18] pl-1 pr-4 transition-colors duration-200 hover:border-[#c8382a]"
        >
          <span
            className="font-sans uppercase text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]"
            style={{ fontSize: "12px", letterSpacing: "3.36px" }}
          >
            nova deriva
          </span>
          <ArrowRightIcon className="size-6 text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]" />
        </Link>
      </div>

    </div>
  )
}
