"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { ArrowRightIcon } from "../../components/ui/icons"

const DERIVAS_PRESENCA = [
  { principal: "siga qualquer som que pareça fora de lugar. não volte pelo mesmo caminho." },
  { principal: "escolha uma cor e siga apenas objetos dessa cor por onde quer que levem." },
  { principal: "ande na velocidade de quem não tem pressa. observe quem tem." },
  { principal: "entre na primeira rua à esquerda que pareça desconhecida. repita até perder a referência." },
  { principal: "siga o cheiro mais forte que encontrar. deixe ele guiar cada esquina." },
  { principal: "caminhe sem olhar para frente. use apenas a visão periférica para navegar." },
]

function lastWordRed(text: string) {
  const clean = text.replace(/\.$/, "")
  const lastSpace = clean.lastIndexOf(" ")
  const before = clean.slice(0, lastSpace + 1)
  const last = clean.slice(lastSpace + 1)
  return (
    <>
      {before}
      <span className="text-[#c8382a]">{last}</span>
      {"."}
    </>
  )
}

export default function DerivaModoPresenca() {
  const [deriva, setDeriva] = useState(DERIVAS_PRESENCA[0])

  useEffect(() => {
    const idx = Math.floor(Math.random() * DERIVAS_PRESENCA.length)
    setDeriva(DERIVAS_PRESENCA[idx])
    sessionStorage.setItem("presenca_principal", DERIVAS_PRESENCA[idx].principal)
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

          {/* Instrução */}
          <div className="flex flex-col gap-6">
            <p
              className="font-serif text-[34px] leading-[124%] tracking-[-1.32px] text-[#1a1a18]"
            >
              {lastWordRed(deriva.principal)}
            </p>
            <p className="font-editorial italic text-[14px] leading-[15px] text-[#393936]">
              40 minutos de deriva. telefone guardado, sem fotos.
            </p>
          </div>

          {/* Bottom actions */}
          <div className="flex flex-col gap-4">
            <Link
              href="/deriva/presenca/timer"
              className="group flex items-center justify-between border-b border-t border-[#1a1a18] pl-1 pr-4 py-5 transition-colors duration-200 hover:border-[#c8382a]"
            >
              <p className="font-sans text-[12px] uppercase tracking-[3.36px] text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]">
                guardar celular e ir
              </p>
              <ArrowRightIcon className="size-6 text-[#1a1a18] transition-colors duration-200 group-hover:text-[#c8382a]" />
            </Link>

            <Link
              href="/deriva/inicio"
              className="flex items-center gap-2 text-[#1a1a18]/70 transition-opacity hover:opacity-100"
            >
              <span className="font-sans text-[9px] leading-none">←</span>
              <span className="font-sans text-[9px] uppercase tracking-[0.28em]">encerrar deriva</span>
            </Link>
          </div>

        </div>

        <Navbar active="II" />
      </section>
    </main>
  )
}
