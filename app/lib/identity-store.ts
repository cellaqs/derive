const KEY = "derive_identidades"

interface IdentidadeRegistro {
  nome: string
  // Nunca armazenamos o código em texto puro — apenas o hash SHA-256 (hex).
  hash: string
}

function normalizar(nome: string): string {
  return nome.trim().toLowerCase()
}

/**
 * SHA-256 via Web Crypto (nativo do navegador, sem dependências).
 * Client-side hashing não substitui um backend real, mas garante que o
 * código digitado nunca fique gravado em texto puro no localStorage.
 */
async function hashCodigo(codigo: string): Promise<string> {
  const bytes = new TextEncoder().encode(codigo)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function getRegistros(): IdentidadeRegistro[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // Migra formato antigo (array de strings, sem senha) sem quebrar o app.
    if (Array.isArray(parsed) && typeof parsed[0] === "string") return []
    return parsed
  } catch {
    return []
  }
}

function salvarRegistros(lista: IdentidadeRegistro[]) {
  localStorage.setItem(KEY, JSON.stringify(lista))
}

export function identidadeExiste(nome: string): boolean {
  const alvo = normalizar(nome)
  return getRegistros().some((r) => r.nome === alvo)
}

/** Cria a identidade salvando apenas o hash do código, nunca o texto puro. */
export async function criarIdentidade(nome: string, codigo: string): Promise<void> {
  const lista = getRegistros()
  const alvo = normalizar(nome)
  if (lista.some((r) => r.nome === alvo)) return
  const hash = await hashCodigo(codigo)
  lista.push({ nome: alvo, hash })
  salvarRegistros(lista)
}

/** Verifica identidade + código comparando hashes — nunca compara texto puro. */
export async function verificarLogin(nome: string, codigo: string): Promise<boolean> {
  const alvo = normalizar(nome)
  const registro = getRegistros().find((r) => r.nome === alvo)
  if (!registro) return false
  const hash = await hashCodigo(codigo)
  return hash === registro.hash
}
