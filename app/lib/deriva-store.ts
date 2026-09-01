export interface DerivaCompletaEntry {
  id: string
  numero: string
  principal: string
  date: string
  location?: string
  mode: "foto" | "desenho"
}

const KEY = "derive_derivas_completas"

export function getDerivasCompletas(): DerivaCompletaEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
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
  localStorage.setItem(KEY, JSON.stringify(list))
  return nova
}
