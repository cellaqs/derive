"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRightIcon } from "../components/ui/icons"
import { verificarLogin } from "../lib/identity-store"

export default function Login() {
  const router = useRouter()
  const [identidade, setIdentidade] = useState("")
  const [codigo, setCodigo] = useState("")
  const [erro, setErro] = useState(false)
  const [verificando, setVerificando] = useState(false)

  const handleEntrar = async () => {
    if (!identidade.trim() || !codigo.trim() || verificando) return
    setVerificando(true)
    const ok = await verificarLogin(identidade, codigo)
    setVerificando(false)
    if (!ok) {
      setErro(true)
      return
    }
    setErro(false)
    router.push("/intro")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] px-5 pb-5 pt-5 shadow-[0_10px_35px_rgba(0,0,0,0.14)] ">
        <div className="flex flex-1 flex-col justify-between">

          {/* Topo */}
          <div className="flex flex-col gap-10">
            <header className="flex items-center justify-between">
              <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
                acesso
              </p>
              <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
            </header>

            <div className="flex flex-col tracking-[-1.56px]">
              <p className="font-serif text-[52px] leading-[52px] text-[#1a1a18]">
                sua identidade
              </p>
              <p className="font-editorial italic text-[32px] leading-normal text-[#6a6962]">
                de campo
              </p>
            </div>

            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-3">
                <p className="font-sans text-[10px] uppercase tracking-[2.08px] text-[#84837d]">
                  identidade
                </p>
                <div className="border-b border-[#a7a6a1] pb-[10px]">
                  <input
                    type="text"
                    value={identidade}
                    onChange={(e) => { setIdentidade(e.target.value); setErro(false) }}
                    placeholder="nome de campo"
                    className="w-full bg-transparent font-editorial italic text-[16px] leading-normal text-[#1a1a18] outline-none placeholder:text-[#cac9c5]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-sans text-[10px] uppercase tracking-[2.08px] text-[#84837d]">
                  código
                </p>
                <div className={`border-b pb-[10px] ${erro ? "border-[#c8382a]" : "border-[#a7a6a1]"}`}>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={codigo}
                    onChange={(e) => { setCodigo(e.target.value); setErro(false) }}
                    placeholder="••••••••"
                    className="w-full bg-transparent font-editorial italic text-[16px] leading-normal text-[#1a1a18] outline-none placeholder:text-[#cac9c5]"
                  />
                </div>
                {erro && (
                  <p className="font-sans text-[9px] uppercase tracking-[1.8px] text-[#c8382a]">
                    identidade ou código incorretos.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3">
            {/* Preto — 56px */}
            <button
              onClick={handleEntrar}
              disabled={verificando}
              className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#1a1a18] px-4 font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <span>{verificando ? "verificando..." : "entrar"}</span>
              <ArrowRightIcon className="size-6" />
            </button>

            {/* Vermelho — 40px */}
            <Link
              href="/criar-identidade"
              className="flex h-[40px] w-full items-center justify-between rounded-[2px] bg-[#c8382a] px-4 font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white transition-opacity hover:opacity-90"
            >
              <span>criar nova identidade</span>
              <ArrowRightIcon className="size-6" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
