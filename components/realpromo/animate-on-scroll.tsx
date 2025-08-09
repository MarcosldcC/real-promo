"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import styles from "./animations.module.css"

type Variant = "fadeInUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn"

export default function AnimateOnScroll({
  children,
  className = "",
  variant = "fadeInUp",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  variant?: Variant
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setInView(true), delay)
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  const animClass = (styles as any)[variant]
  return (
    <div ref={ref} className={`${animClass} ${inView ? "inView" : ""} ${className}`}>
      {children}
    </div>
  )
}
