"use client"

import { cva } from "class-variance-authority"
import { type HTMLMotionProps, motion } from "motion/react"
import { cn } from "@/app/lib/utils"

const waveLoaderVariants = cva("flex gap-2 items-center justify-center", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
})

export interface WaveLoaderProps {
  bars?: number
  message?: string
  messagePlacement?: "bottom" | "left" | "right"
}

export function WaveLoader({
  bars = 5,
  message,
  messagePlacement,
  className,
  ...props
}: HTMLMotionProps<"div"> & WaveLoaderProps) {
  return (
    <div className={cn(waveLoaderVariants({ messagePlacement }))}>
      <div className="flex gap-[3px] items-start justify-start w-full">
        {Array(bars)
          .fill(undefined)
          .map((_, index) => {
            // Vary heights to match Figma's irregular waveform
            const heights = [44, 16, 25, 44, 25, 16, 44, 16, 25, 44, 25, 16, 44, 16, 25, 44, 25, 16, 44, 16, 25, 44, 25, 16, 44, 16, 25, 44]
            const h = heights[index % heights.length]
            return (
              <motion.div
                key={index}
                className={cn("w-[10px] bg-[rgba(245,240,232,0.1)] origin-top", className)}
                style={{ height: `${h}px` }}
                animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: index * 0.07,
                  ease: "easeInOut",
                }}
                {...props}
              />
            )
          })}
      </div>
      {message && (
        <p className="font-sans text-[9px] uppercase tracking-[2px] text-[rgba(245,240,232,0.4)]">
          {message}
        </p>
      )}
    </div>
  )
}
