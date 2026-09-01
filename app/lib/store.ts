import { chaveDoUsuario } from "./session"
import { lerLista, gravarLista } from "./storage"

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

// Resolvida a cada chamada: a conta logada pode mudar durante a sessão.
const chave = () => chaveDoUsuario("derive_registros")

export function getRegistros(): RegistroEntry[] {
  return lerLista<RegistroEntry>(chave())
}

export function saveRegistro(entry: Omit<RegistroEntry, "id">): RegistroEntry {
  const registros = getRegistros()
  const novo: RegistroEntry = { ...entry, id: Date.now().toString() }
  registros.push(novo)
  gravarLista(chave(), registros)
  return novo
}

export function clearRegistros() {
  localStorage.removeItem(chave())
}
