import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]

export function formatDate(iso: string, location?: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  const stamp = `${d.getDate()}.${ROMAN[d.getMonth()]}`
  return location ? `${location} ${stamp}` : stamp
}

export function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
}
