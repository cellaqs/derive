"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { identidadeExiste, criarIdentidade } from "../lib/identity-store"
import { ArrowRightIcon } from "../components/ui/icons"

const CODIGO_MIN = 4

export default function Cadastro() {
  const router = useRouter()
  const [identidade, setIdentidade] = useState("")
  const [codigo, setCodigo] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [erroSenha, setErroSenha] = useState(false)
  const [erroIdentidade, setErroIdentidade] = useState(false)
  const [erroTamanho, setErroTamanho] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleContinuar = async () => {
    if (!identidade.trim() || !codigo.trim() || enviando) return
    if (identidadeExiste(identidade)) {
      setErroIdentidade(true)
      return
    }
    setErroIdentidade(false)
    if (codigo.length < CODIGO_MIN) {
      setErroTamanho(true)
      return
    }
    setErroTamanho(false)
    if (codigo !== confirmar) {
      setErroSenha(true)
      return
    }
    setErroSenha(false)
    setEnviando(true)
    await criarIdentidade(identidade, codigo)
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

            <div className="flex flex-col gap-8">
              <div className="flex flex-col tracking-[-1.56px]">
                <p className="font-serif text-[52px] leading-[52px] text-[#1a1a18]">escolha</p>
                <p className="font-editorial italic text-[32px] leading-normal text-[#6a6962]">quem você é</p>
              </div>

              <div className="flex flex-col gap-[30px]">
                {/* Identidade */}
                <div className="flex flex-col gap-3">
                  <p className="font-sans text-[10px] uppercase tracking-[2.08px] text-[#84837d]">identidade</p>
                  <div className={`border-b pb-[10px] ${erroIdentidade ? "border-[#c8382a]" : "border-[#a7a6a1]"}`}>
                    <input
                      type="text"
                      value={identidade}
                      onChange={(e) => { setIdentidade(e.target.value); setErroIdentidade(false) }}
                      placeholder="nome de campo"
                      className="w-full bg-transparent font-editorial italic text-[16px] leading-normal text-[#1a1a18] outline-none placeholder:text-[#cac9c5]"
                    />
                  </div>
                  {erroIdentidade && (
                    <p className="font-sans text-[9px] uppercase tracking-[1.8px] text-[#c8382a]">
                      esse nome de campo já existe.
                    </p>
                  )}
                </div>

                {/* Código */}
                <div className="flex flex-col gap-3">
                  <p className="font-sans text-[10px] uppercase tracking-[2.08px] text-[#84837d]">código</p>
                  <div className="border-b border-[#a7a6a1] pb-[10px]">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={codigo}
                      onChange={(e) => { setCodigo(e.target.value); setErroSenha(false); setErroTamanho(false) }}
                      placeholder="••••••••"
                      className="w-full bg-transparent font-editorial italic text-[16px] leading-normal text-[#1a1a18] outline-none placeholder:text-[#cac9c5]"
                    />
                  </div>
                  {erroTamanho && (
                    <p className="font-sans text-[9px] uppercase tracking-[1.8px] text-[#c8382a]">
                      mínimo de {CODIGO_MIN} caracteres.
                    </p>
                  )}
                </div>

                {/* Confirmar código */}
                <div className="flex flex-col gap-3">
                  <p className="font-sans text-[10px] uppercase tracking-[2.08px] text-[#84837d]">confirmar código</p>
                  <div className={`border-b pb-[10px] ${erroSenha ? "border-[#c8382a]" : "border-[#a7a6a1]"}`}>
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={confirmar}
                      onChange={(e) => { setConfirmar(e.target.value); setErroSenha(false) }}
                      placeholder="••••••••"
                      className="w-full bg-transparent font-editorial italic text-[16px] leading-normal text-[#1a1a18] outline-none placeholder:text-[#cac9c5]"
                    />
                  </div>
                  {erroSenha && (
                    <p className="font-sans text-[9px] uppercase tracking-[1.8px] text-[#c8382a]">
                      os códigos não coincidem.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3">
            {/* Preto — 56px */}
            <button
              onClick={handleContinuar}
              disabled={enviando}
              className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#1a1a18] px-4 font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <span>{enviando ? "criando..." : "continuar"}</span>
              <ArrowRightIcon className="size-6" />
            </button>

            {/* Vermelho — 40px */}
            <Link
              href="/login"
              className="flex h-[40px] w-full items-center justify-between rounded-[2px] bg-[#c8382a] px-4 font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white transition-opacity hover:opacity-90"
            >
              <span>já tenho uma identidade</span>
              <ArrowRightIcon className="size-6" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
