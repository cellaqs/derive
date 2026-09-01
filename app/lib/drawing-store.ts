export interface DrawingEntry {
  id: string
  dataUrl: string
  createdAt: string
  mode: string
}

const KEY = "derive_desenhos"
export const CANVAS_DRAWING_KEY = "presenca_drawing"

export function getDesenhos(): DrawingEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveDesenho(entry: Omit<DrawingEntry, "id">): DrawingEntry {
  const list = getDesenhos()
  const novo: DrawingEntry = { ...entry, id: Date.now().toString() }
  list.push(novo)
  localStorage.setItem(KEY, JSON.stringify(list))
  return novo
}
