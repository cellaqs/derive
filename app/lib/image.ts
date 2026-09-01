const LADO_MAXIMO = 1400
const QUALIDADE = 0.72

/**
 * Reduz e recomprime a foto antes de guardar. Uma foto de celular crua vira
 * ~3–8 MB em base64 e estoura sozinha a cota do localStorage (~5 MB), que era
 * exatamente o motivo de "salvar registro" falhar em silêncio.
 */
export function comprimirImagem(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)

      const escala = Math.min(1, LADO_MAXIMO / Math.max(img.width, img.height))
      const largura = Math.round(img.width * escala)
      const altura = Math.round(img.height * escala)

      const canvas = document.createElement("canvas")
      canvas.width = largura
      canvas.height = altura

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Não foi possível processar a imagem."))
        return
      }

      ctx.drawImage(img, 0, 0, largura, altura)
      resolve(canvas.toDataURL("image/jpeg", QUALIDADE))
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Não foi possível ler a imagem."))
    }

    img.src = url
  })
}
