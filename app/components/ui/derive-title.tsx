"use client"

import { useState, useCallback, useRef, useEffect } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
const ORIGINAL = "Dérive"
const INTERVAL_MS = 10000
const FRAME_MS = 30
const FRAMES_PER_CHAR = 4

export function DeriveTitle() {
  const [displayText, setDisplayText] = useState(ORIGINAL)
  const [progress, setProgress] = useState(0) // 0–100
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const repeatRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef(0)
  const duration = ORIGINAL.length * FRAMES_PER_CHAR

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    frameRef.current = 0
    setIsScrambling(true)
    setProgress(0)

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const pct = frameRef.current / duration
      const revealedLength = Math.floor(pct * ORIGINAL.length)

      const newText = ORIGINAL.split("").map((char, i) => {
        if (i < revealedLength) return ORIGINAL[i]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join("")

      setDisplayText(newText)
      setProgress(Math.min(pct * 100, 100))

      if (frameRef.current >= duration) {
        clearInterval(intervalRef.current!)
        setDisplayText(ORIGINAL)
        setProgress(100)
        setIsScrambling(false)
        // reset bar after short pause
        setTimeout(() => setProgress(0), 600)
      }
    }, FRAME_MS)
  }, [duration])

  // Auto-trigger: first run + every 10s
  useEffect(() => {
    scramble()
    repeatRef.current = setInterval(scramble, INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (repeatRef.current) clearInterval(repeatRef.current)
    }
  }, [scramble])

  return (
    <div className="w-full">
      <h1
        className="font-display leading-[0.9] text-[#2a2a31] cursor-default select-none whitespace-nowrap"
        style={{ fontSize: "clamp(44px, 24vw, 100px)", fontWeight: 600 }}
      >
        {displayText.split("").map((char, i) => (
          <span
            key={i}
            className={
              isScrambling && char !== ORIGINAL[i]
                ? "text-[#c83a30]"
                : "text-[#2a2a31]"
            }
          >
            {char}
          </span>
        ))}
        <span className="text-[#c83a30]">.</span>
      </h1>

      {/* Progress bar — 1px, red fill over muted base */}
      <div className="relative mt-5 h-px w-full bg-[#3a3b40]/45 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-px bg-[#c83a30] transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
