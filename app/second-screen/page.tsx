import { redirect } from "next/navigation"

// Rota renomeada para /intro
export default function SecondScreen() {
  redirect("/intro")
}
