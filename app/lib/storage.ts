/** Erro lançado quando o localStorage estoura a cota do navegador. */
export class ArmazenamentoCheioError extends Error {
  constructor() {
    super("Espaço de armazenamento do navegador esgotado.")
    this.name = "ArmazenamentoCheioError"
  }
}

export function lerLista<T>(chave: string): T[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(chave)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Grava e propaga a falha em vez de engolir — sem isso, estourar a cota
 * fazia o "salvar registro" não fazer nada, sem nenhum aviso ao usuário.
 */
export function gravarLista<T>(chave: string, lista: T[]) {
  try {
    localStorage.setItem(chave, JSON.stringify(lista))
  } catch {
    throw new ArmazenamentoCheioError()
  }
}
