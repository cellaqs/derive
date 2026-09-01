import { chaveDoUsuario } from "./session"
import { lerLista, gravarLista } from "./storage"

/** Índice da deriva em andamento nesta sessão — mantém a mesma instrução ao voltar. */
export const DERIVA_INDICE_KEY = "deriva_indice"

export interface DerivaCompletaEntry {
  id: string
  numero: string
  principal: string
  date: string
  location?: string
  mode: "foto" | "desenho"
}

const chave = () => chaveDoUsuario("derive_derivas_completas")

export function getDerivasCompletas(): DerivaCompletaEntry[] {
  return lerLista<DerivaCompletaEntry>(chave())
}

export function saveDerivaCompleta(
  entry: Omit<DerivaCompletaEntry, "id" | "numero">
): DerivaCompletaEntry {
  const list = getDerivasCompletas()
  const nova: DerivaCompletaEntry = {
    ...entry,
    id: Date.now().toString(),
    numero: String(list.length + 1).padStart(2, "0"),
  }
  list.push(nova)
  gravarLista(chave(), list)
  return nova
}
