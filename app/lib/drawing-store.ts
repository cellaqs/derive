import { chaveDoUsuario } from "./session"
import { lerLista, gravarLista } from "./storage"

export interface DrawingEntry {
  id: string
  dataUrl: string
  createdAt: string
  mode: string
}

export const CANVAS_DRAWING_KEY = "presenca_drawing"

const chave = () => chaveDoUsuario("derive_desenhos")

export function getDesenhos(): DrawingEntry[] {
  return lerLista<DrawingEntry>(chave())
}

export function saveDesenho(entry: Omit<DrawingEntry, "id">): DrawingEntry {
  const list = getDesenhos()
  const novo: DrawingEntry = { ...entry, id: Date.now().toString() }
  list.push(novo)
  gravarLista(chave(), list)
  return novo
}
