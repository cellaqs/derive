"use client"

import { useEffect, useRef } from "react"

export const CANVAS_DRAWING_KEY = "presenca_drawing"
// Fixed logical height — small view clips top portion, expanded shows all
export const FULL_HEIGHT = 600

export function saveDrawing(canvas: HTMLCanvasElement) {
  try {
    localStorage.setItem(CANVAS_DRAWING_KEY, canvas.toDataURL())
  } catch {}
}

export function clearDrawing() {
  try {
    localStorage.removeItem(CANVAS_DRAWING_KEY)
  } catch {}
}

interface DrawingCanvasProps {
  className?: string
}

export default function DrawingCanvas({ className }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Width from rendered element, height always fixed
    const w = canvas.getBoundingClientRect().width
    const h = FULL_HEIGHT
    canvas.width = w * devicePixelRatio
    canvas.height = h * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    ctx.strokeStyle = "#1a1a18"
    ctx.lineWidth = 1.5
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    const saved = localStorage.getItem(CANVAS_DRAWING_KEY)
    if (saved) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, w, h)
      img.src = saved
    }
  }, [])

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault()
    canvasRef.current?.setPointerCapture(e.pointerId)
    drawing.current = true
    lastPos.current = getPos(e)
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx || !lastPos.current) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPos.current = pos
  }

  function onPointerUp() {
    if (!drawing.current) return
    drawing.current = false
    lastPos.current = null
    if (canvasRef.current) saveDrawing(canvasRef.current)
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ touchAction: "none", width: "100%", height: `${FULL_HEIGHT}px` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    />
  )
}
