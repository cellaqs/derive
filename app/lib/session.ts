const SESSION_KEY = "derive_sessao"

/** Chaves globais antigas, de antes dos dados serem separados por conta. */
const CHAVES_LEGADAS = [
  "derive_registros",
  "derive_desenhos",
  "derive_derivas_completas",
]

export function getUsuarioAtual(): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

export function iniciarSessao(nome: string) {
  localStorage.setItem(SESSION_KEY, nome.trim().toLowerCase())
  limparDadosLegados()
}

export function encerrarSessao() {
  localStorage.removeItem(SESSION_KEY)
}

/**
 * Prefixa a chave de armazenamento com a identidade logada, para que os dados
 * de uma conta nunca apareçam em outra. Cada conta nova começa vazia porque
 * seu namespace ainda não existe.
 */
export function chaveDoUsuario(base: string): string {
  return `${base}::${getUsuarioAtual() ?? "__sem_conta__"}`
}

/**
 * Remove o acervo global antigo (sem dono), que virou órfão ao separarmos os
 * dados por conta — e que ocupava a cota do localStorage à toa.
 */
function limparDadosLegados() {
  for (const chave of CHAVES_LEGADAS) {
    try {
      localStorage.removeItem(chave)
    } catch {
      // ignora: limpeza é best-effort
    }
  }
}
