"use client"

import { useRouter } from "next/navigation"
import { SettingsIcon } from "./icons"
import { encerrarSessao } from "../../lib/session"

/** Encerra a sessão e volta ao acesso — é o caminho para trocar de conta. */
export function LogoutButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        encerrarSessao()
        router.push("/login")
      }}
      className="mt-1 p-1 transition-opacity hover:opacity-60"
      aria-label="Sair da conta"
      title="sair da conta"
    >
      <SettingsIcon />
    </button>
  )
}
