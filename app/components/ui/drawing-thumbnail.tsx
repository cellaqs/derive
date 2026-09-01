"use client"

import { useEffect, useRef } from "react"

// Background color of the canvas #f0e9df
const BG = [240, 233, 223]
const THRESHOLD = 18

export default function DrawingThumbnail({
  dataUrl,
  className,
}: {
  dataUrl: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      // 1. Read pixel data to find drawing bounds
      const tmp = document.createElement("canvas")
      tmp.width = img.width
      tmp.height = img.height
      const tc = tmp.getContext("2d")!
      tc.drawImage(img, 0, 0)

      const { data } = tc.getImageData(0, 0, img.width, img.height)
      let minX = img.width, maxX = 0, minY = img.height, maxY = 0
      let hasDrawing = false

      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const i = (y * img.width + x) * 4
          const diff =
            Math.abs(data[i] - BG[0]) +
            Math.abs(data[i + 1] - BG[1]) +
            Math.abs(data[i + 2] - BG[2])
          if (diff > THRESHOLD) {
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
            hasDrawing = true
          }
        }
      }

      // Fallback: no drawing detected — show full canvas
      if (!hasDrawing) {
        minX = 0; maxX = img.width; minY = 0; maxY = img.height
      }

      // 2. Set up display canvas
      const rect = canvas.getBoundingClientRect()
      const dw = rect.width
      const dh = rect.height
      canvas.width = dw * devicePixelRatio
      canvas.height = dh * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)

      // 3. Compute source crop centered on drawing — cover/zoom behavior
      const drawingW = maxX - minX
      const drawingH = maxY - minY
      const padX = drawingW * 0.2
      const padY = drawingH * 0.2
      const srcW = drawingW + padX * 2
      const srcH = drawingH + padY * 2
      const centerX = (minX + maxX) / 2
      const centerY = (minY + maxY) / 2

      // Math.max → cover: drawing fills (and is cropped by) the display canvas
      const scale = Math.max(dw / srcW, dh / srcH)
      const sw = dw / scale
      const sh = dh / scale
      const sx = Math.max(0, Math.min(centerX - sw / 2, img.width - sw))
      const sy = Math.max(0, Math.min(centerY - sh / 2, img.height - sh))

      // 4. Draw: background + image (B&W via CSS filter on the element)
      ctx.fillStyle = "#f0e9df"
      ctx.fillRect(0, 0, dw, dh)
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh)
    }

    img.src = dataUrl
  }, [dataUrl])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", filter: "grayscale(100%)" }}
    />
  )
}
