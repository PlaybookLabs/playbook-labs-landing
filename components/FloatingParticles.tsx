"use client"

import { memo, useEffect, useRef } from "react"

const FloatingParticles = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      bounce: boolean
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const colors = [
      "rgba(96, 165, 250, 0.4)",
      "rgba(147, 51, 234, 0.4)",
      "rgba(236, 72, 153, 0.4)",
    ]

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 5 : 10
    const bounceCount = isMobile ? 2 : 3

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 6 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      bounce: i < bounceCount,
    }))

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.bounce) {
          if (particle.x < particle.size / 2 || particle.x > canvas.width - particle.size / 2) {
            particle.vx = -particle.vx * 0.95
          }
          if (particle.y < particle.size / 2 || particle.y > canvas.height - particle.size / 2) {
            particle.vy = -particle.vy * 0.95
          }
        } else {
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
})

FloatingParticles.displayName = "FloatingParticles"

export default FloatingParticles
