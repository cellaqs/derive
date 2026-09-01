export interface RegistroEntry {
  id: string
  photoBase64: string
  text: string
  location: string
  time: string
  date: string
  derivaNumero?: string
  derivaPrincipal?: string
}

const STORAGE_KEY = "derive_registros"

export function getRegistros(): RegistroEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveRegistro(entry: Omit<RegistroEntry, "id">): RegistroEntry {
  const registros = getRegistros()
  const novo: RegistroEntry = { ...entry, id: Date.now().toString() }
  registros.push(novo)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registros))
  return novo
}

export function clearRegistros() {
  localStorage.removeItem(STORAGE_KEY)
}
