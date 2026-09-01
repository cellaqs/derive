"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { saveRegistro } from "../lib/store"
import { saveDerivaCompleta, DERIVA_INDICE_KEY } from "../lib/deriva-store"
import { formatTime } from "../lib/utils"
import { getLocationLabel } from "../lib/geo"
import { comprimirImagem } from "../lib/image"
import { ArmazenamentoCheioError } from "../lib/storage"
import { CameraIcon, ArrowRightIcon, ArrowLeftIcon } from "../components/ui/icons"

export default function RegistroClient() {
  const router = useRouter()
  const [photo, setPhoto] = useState<string | null>(null)
  const [time, setTime] = useState("")
  const [text, setText] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [saving, setSaving] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [location, setLocation] = useState<string | null>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const arquivoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTime(formatTime(new Date()))
  }, [])

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    setErro(null)
    setTime(formatTime(new Date()))
    setLocation(null)
    getLocationLabel().then(setLocation)

    try {
      // Comprime já na seleção: o que fica em memória é o mesmo que será salvo.
      setPhoto(await comprimirImagem(file))
    } catch {
      setErro("não foi possível ler essa imagem. tente outra.")
    }
  }

  const handleSalvar = async () => {
    if (!photo) return
    setSaving(true)
    setErro(null)
    try {
      const local = location ?? (await getLocationLabel())
      const derivaPrincipal = sessionStorage.getItem("deriva_principal") ?? undefined
      saveRegistro({
        photoBase64: photo,
        text: text || "sem descrição",
        location: local,
        time,
        date: new Date().toISOString(),
        derivaNumero: sessionStorage.getItem("deriva_numero") ?? undefined,
        derivaPrincipal,
      })
      if (derivaPrincipal) {
        saveDerivaCompleta({
          principal: derivaPrincipal,
          date: new Date().toISOString(),
          location: local,
          mode: "foto",
        })
      }
      // deriva concluída: libera o sorteio da próxima
      sessionStorage.removeItem(DERIVA_INDICE_KEY)
      sessionStorage.removeItem("deriva_numero")
      sessionStorage.removeItem("deriva_principal")
      router.push("/arquivo")
    } catch (e) {
      setSaving(false)
      setErro(
        e instanceof ArmazenamentoCheioError
          ? "sem espaço no navegador. apague alguns registros antigos."
          : "não foi possível salvar. tente de novo."
      )
    }
  }

  const handleRefazer = () => {
    cameraRef.current?.click()
  }

  return (
    <>
      <style>{`
        @keyframes charIn {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex flex-1 flex-col">

        {/* Image box */}
        {photo ? (
          <div className="relative mx-[4px]">
            {/* Imagem */}
            <div className="relative overflow-hidden" style={{ height: "298px" }}>
              <Image
                src={photo}
                alt="Foto registrada"
                fill
                className="object-cover"
                style={{ filter: "grayscale(100%)" }}
              />
              {/* Tag refazer — vermelha, top-right */}
              <button
                onClick={handleRefazer}
                className="absolute right-[14px] top-[14px] font-sans uppercase text-white transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#c8382a",
                  fontSize: "9.2px",
                  letterSpacing: "1.84px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                refazer
              </button>
            </div>

            {/* Corner brackets — 4 cantos fora da imagem */}
            <span className="pointer-events-none absolute -left-[4px] -top-[4px] h-[10px] w-[10px] border-l border-t border-[#1a1a18]" />
            <span className="pointer-events-none absolute -right-[4px] -top-[4px] h-[10px] w-[10px] border-r border-t border-[#1a1a18]" />
            <span className="pointer-events-none absolute -bottom-[4px] -left-[4px] h-[10px] w-[10px] border-b border-l border-[#1a1a18]" />
            <span className="pointer-events-none absolute -bottom-[4px] -right-[4px] h-[10px] w-[10px] border-b border-r border-[#1a1a18]" />
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden"
            style={{
              height: "298px",
              backgroundColor: "#eeede9",
              border: "1px solid #676360",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
              <CameraIcon />
              <p className="font-sans uppercase text-[#403f3b]" style={{ fontSize: "10px", letterSpacing: "3px" }}>
                registrar a imagem
              </p>
              <p className="font-editorial italic text-[#403f3b]" style={{ fontSize: "12px", lineHeight: "18px" }}>
                use a câmera ou escolha do celular
              </p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => cameraRef.current?.click()}
                  className="border border-[#c8382a] bg-[#faf6f2] px-[14px] py-[6px] font-sans text-[9px] font-semibold uppercase tracking-[2.16px] text-[#c8382a] transition-opacity hover:opacity-80"
                >
                  câmera
                </button>
                <button
                  onClick={() => arquivoRef.current?.click()}
                  className="border border-[#676360] bg-transparent px-[14px] py-[6px] font-sans text-[9px] font-semibold uppercase tracking-[2.16px] text-[#403f3b] transition-opacity hover:opacity-80"
                >
                  arquivos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Câmera: `capture` abre direto a câmera traseira no celular */}
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFile}
        />
        {/* Arquivos: sem `capture`, abre a galeria / gerenciador de arquivos */}
        <input
          ref={arquivoRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

        {erro && (
          <p className="mt-[10px] font-sans text-[9px] uppercase tracking-[1.8px] text-[#c8382a]">
            {erro}
          </p>
        )}

        {/* Rua row — 10px below image, only when photo exists */}
        {photo && (
          <div className="mt-[10px] flex items-center justify-between">
            <p className="font-sans uppercase text-[#c8382a]" style={{ fontSize: "9px", letterSpacing: "2.16px" }}>
              {location ?? "localizando..."}
            </p>
            <p className="font-sans uppercase text-[#1a1a18]/55" style={{ fontSize: "9px", letterSpacing: "2.16px" }}>
              {time}
            </p>
          </div>
        )}

        {/* Text section — always 36px below whatever is above it */}
        <div
          className="mt-9 flex flex-col gap-[10px] border-b pb-[30px]"
          style={{ borderColor: "#9b9898" }}
        >
          <p className="font-editorial italic text-[#1a1a18]" style={{ fontSize: "15px", lineHeight: "22.5px" }}>
            o que você viu
          </p>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={photo ? "escreva o que você viu..." : "registre a imagem primeiro."}
              rows={3}
              className="w-full resize-none bg-transparent font-serif italic text-[#1a1a18] outline-none placeholder:text-[#1a1a18]/40 placeholder:not-italic"
              style={{ fontSize: "15px", lineHeight: "22.5px" }}
              disabled={!photo}
            />
            {/* Typing cursor when focused */}
            {isFocused && (
              <span className="pointer-events-none absolute bottom-0 right-0 animate-pulse text-[#c8382a]">|</span>
            )}
          </div>
        </div>

        {/* Buttons — pushed to bottom */}
        <div className="mt-auto flex flex-col gap-[10px] pt-9">
          {photo ? (
            /* ── State: photo uploaded — show salvar + voltar ── */
            <>
              <button
                onClick={handleSalvar}
                disabled={saving}
                className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#1a1a18] px-4 transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <span className="font-sans uppercase font-semibold text-white" style={{ fontSize: "12px", letterSpacing: "3.36px" }}>
                  salvar registro
                </span>
                <ArrowRightIcon className="size-6 text-white" />
              </button>

              <Link
                href="/deriva"
                className="flex h-[40px] w-full items-center justify-between rounded-[2px] bg-[#c8382a] px-4 transition-opacity hover:opacity-90"
              >
                <span className="font-sans uppercase font-semibold text-white" style={{ fontSize: "12px", letterSpacing: "3.36px" }}>
                  voltar
                </span>
                <ArrowLeftIcon className="size-6 text-white" />
              </Link>
            </>
          ) : (
            /* ── State: empty — show registrar + voltar ── */
            <>
              <button
                onClick={() => cameraRef.current?.click()}
                className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#1a1a18] px-4 transition-opacity hover:opacity-90"
              >
                <span className="font-sans uppercase font-semibold text-white" style={{ fontSize: "12px", letterSpacing: "3.36px" }}>
                  registrar imagem
                </span>
                <ArrowRightIcon className="size-6 text-white" />
              </button>

              <Link
                href="/deriva"
                className="flex h-[40px] w-full items-center justify-between rounded-[2px] bg-[#c8382a] px-4 transition-opacity hover:opacity-90"
              >
                <span className="font-sans uppercase font-semibold text-white" style={{ fontSize: "12px", letterSpacing: "3.36px" }}>
                  voltar
                </span>
                <ArrowLeftIcon className="size-6 text-white" />
              </Link>
            </>
          )}
        </div>

      </div>
    </>
  )
}
