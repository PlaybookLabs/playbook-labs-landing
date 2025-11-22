"use client"

import { useState, useEffect, memo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Star, Mic, ChevronDown } from "lucide-react" // Added Check and ChevronDown
import Link from "next/link" // Added Link import for footer navigation
import Image from "next/image" // Added Image import

const StackedLayersIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="layersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="50%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path
      d="M32 12L8 24L32 36L56 24L32 12Z"
      fill="url(#layersGradient)"
      fillOpacity="0.3"
      stroke="url(#layersGradient)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M8 32L32 44L56 32"
      fill="none"
      stroke="url(#layersGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 40L32 52L56 40"
      fill="none"
      stroke="url(#layersGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MagnifyingGlassIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="magnifyingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="50%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* Magnifying glass circle */}
    <circle
      cx="28"
      cy="28"
      r="16"
      fill="none"
      stroke="url(#magnifyingGradient)"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Inner circle for depth */}
    <circle cx="28" cy="28" r="10" fill="url(#magnifyingGradient)" fillOpacity="0.2" />
    {/* Handle */}
    <path d="M40 40L52 52" stroke="url(#magnifyingGradient)" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

const CheckmarkIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="50%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path
      d="M16 32L28 44L48 20"
      fill="none"
      stroke="url(#checkGradient)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

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

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const colors = ["rgba(96, 165, 250, 0.4)", "rgba(147, 51, 234, 0.4)", "rgba(236, 72, 153, 0.4)"]

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
      bounce: i < bounceCount, // First 2 on mobile, first 3 on desktop will bounce
    }))

    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position with stable velocity
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.bounce) {
          // Bounce off edges with slight damping
          if (particle.x < particle.size / 2 || particle.x > canvas.width - particle.size / 2) {
            particle.vx = -particle.vx * 0.95
            particle.x = Math.max(particle.size / 2, Math.min(canvas.width - particle.size / 2, particle.x))
          }

          if (particle.y < particle.size / 2 || particle.y > canvas.height - particle.size / 2) {
            particle.vy = -particle.vy * 0.95
            particle.y = Math.max(particle.size / 2, Math.min(canvas.height - particle.size / 2, particle.y))
          }
        } else {
          // Wrap particles around screen edges
          if (particle.x < -particle.size) {
            particle.x = canvas.width + particle.size
          } else if (particle.x > canvas.width + particle.size) {
            particle.x = -particle.size
          }

          if (particle.y < -particle.size) {
            particle.y = canvas.height + particle.size
          } else if (particle.y > canvas.height + particle.size) {
            particle.y = -particle.size
          }
        }

        // Draw particle
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

const CardParticles = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Reinitialize particles when canvas resizes
      if (particlesRef.current.length === 0) {
        const colors = ["rgba(96, 165, 250, 0.2)", "rgba(147, 51, 234, 0.2)", "rgba(236, 72, 153, 0.2)"]
        particlesRef.current = Array.from({ length: 3 }, (_, i) => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          bounce: i === 0,
        }))
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    let animationFrameId: number
    const animate = () => {
      const rect = container.getBoundingClientRect()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const containerWidth = rect.width
      const containerHeight = rect.height

      particlesRef.current.forEach((particle) => {
        // Update position with stable velocity
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.bounce) {
          // Bounce off edges with slight damping
          if (particle.x < particle.size / 2 || particle.x > containerWidth - particle.size / 2) {
            particle.vx = -particle.vx * 0.95
            particle.x = Math.max(particle.size / 2, Math.min(containerWidth - particle.size / 2, particle.x))
          }

          if (particle.y < particle.size / 2 || particle.y > containerHeight - particle.size / 2) {
            particle.vy = -particle.vy * 0.95
            particle.y = Math.max(particle.size / 2, Math.min(containerHeight - particle.size / 2, particle.y))
          }
        } else {
          // Wrap particles around container edges
          if (particle.x < -particle.size) {
            particle.x = containerWidth + particle.size
          } else if (particle.x > containerWidth + particle.size) {
            particle.x = -particle.size
          }

          if (particle.y < -particle.size) {
            particle.y = containerHeight + particle.size
          } else if (particle.y > containerHeight + particle.size) {
            particle.y = -particle.size
          }
        }

        // Draw particle
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

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
})

CardParticles.displayName = "CardParticles"

const ScrollingScreenAnimation = memo(() => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="relative w-[320px] h-[380px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
        </div>

        {/* Scrolling content */}
        <div className="space-y-3 animate-scroll-up">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-300 rounded-full w-3/4"></div>
                <div className="h-3 bg-slate-300 rounded-full w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

ScrollingScreenAnimation.displayName = "ScrollingScreenAnimation"

const DataAnalysisAnimation = memo(() => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="relative w-[320px] h-[380px] bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-2xl p-8 overflow-hidden">
        {/* Animated charts and graphs */}
        <div className="space-y-6">
          {/* Bar chart */}
          <div className="flex items-end gap-2 h-24">
            {[60, 80, 45, 90, 70].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg animate-bar-grow"
                style={{
                  height: `${height}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Line graph */}
          <div className="relative h-20">
            <svg className="w-full h-full" viewBox="0 0 200 80">
              <path
                d="M 0 60 Q 50 20, 100 40 T 200 20"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                className="animate-draw-line"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Pie chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E0E7FF" strokeWidth="20" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  className="animate-pie-fill"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

DataAnalysisAnimation.displayName = "DataAnalysisAnimation"

const DocumentAnalysisAnimation = memo(() => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="relative w-[380px] h-[380px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-2xl p-8 overflow-hidden">
        {/* Floating icons */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float">
          <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>

        <div
          className="absolute top-8 right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>

        <div
          className="absolute bottom-8 left-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float"
          style={{ animationDelay: "1s" }}
        >
          <svg className="w-10 h-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        </div>

        <div
          className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
        </div>

        {/* Central document */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-56 bg-white rounded-2xl shadow-2xl p-4 space-y-3">
            {/* Document header */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"></div>
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                <div className="h-2 bg-slate-200 rounded-full w-1/2"></div>
              </div>
            </div>

            {/* Document content with location pins */}
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full bg-blue-400 flex-shrink-0 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 bg-slate-200 rounded-full"></div>
                    <div className="h-2 bg-slate-200 rounded-full w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clock icon */}
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

DocumentAnalysisAnimation.displayName = "DocumentAnalysisAnimation"

const RocketAnimation = memo(() => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-star-pass"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Rocket */}
      <div className="relative z-10 animate-rocket-launch">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          {/* Rocket body */}
          <path
            d="M50 10 L60 40 L60 70 L50 80 L40 70 L40 40 Z"
            fill="url(#rocketGradient)"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          {/* Window */}
          <circle cx="50" cy="30" r="8" fill="#60A5FA" />
          {/* Fins */}
          <path d="M40 50 L30 70 L40 70 Z" fill="#3B82F6" />
          <path d="M60 50 L70 70 L60 70 Z" fill="#3B82F6" />
          {/* Flame */}
          <path d="M45 80 L50 95 L55 80 Z" fill="#F59E0B" className="animate-pulse" />
          <defs>
            <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
})

RocketAnimation.displayName = "RocketAnimation"

const SolarSystemVisualization = memo(() => {
  const [hoveredOrbit, setHoveredOrbit] = useState<number | null>(null)
  const [clickedOrbit, setClickedOrbit] = useState<number | null>(null)

  const orbits = [
    {
      name: "Relationships",
      color: "#EC4899", // Pink (warmest)
      radius: 70,
      speed: 30,
      tags: ["romance", "family", "parenting", "friendship"],
    },
    {
      name: "Work",
      color: "#C026D3", // Fuchsia
      radius: 110,
      speed: 36,
      tags: ["career", "leadership", "workplace", "productivity"],
    },
    {
      name: "Personal Growth",
      color: "#8B5CF6", // Violet
      radius: 150,
      speed: 42,
      tags: ["goals", "discipline & habits", "decision-making", "life transitions"],
    },
    {
      name: "Wellbeing",
      color: "#3B82F6", // Blue (coolest)
      radius: 190,
      speed: 48,
      tags: ["balance", "self-esteem", "belonging", "purpose", "identity"],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-orbit-interactive]")) {
        setClickedOrbit(null)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const activeOrbit = clickedOrbit !== null ? clickedOrbit : hoveredOrbit

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
      <div
        className="relative w-full max-w-[450px] h-[400px] flex items-center justify-center"
        onMouseLeave={() => setHoveredOrbit(null)}
      >
        <div className="absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute rounded-full animate-pulse"
            style={{
              width: "40px",
              height: "40px",
              left: "0px",
              top: "0px",
              background: `radial-gradient(circle, #EC489960, #A855F740, #3B82F620)`,
              boxShadow: `0 0 60px #EC489940, 0 0 80px #A855F730, 0 0 100px #3B82F620`,
            }}
          />

          <div
            className="relative flex items-center justify-center z-10"
            style={{
              width: "40px",
              height: "40px",
              background:
                "linear-gradient(to right, rgba(37, 99, 235, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))",
              borderRadius: "50%",
            }}
          >
            <img src="/images/white-logo.png" alt="Playbook Labs" className="size-6 object-contain" />
          </div>
        </div>

        {orbits.map((orbit, orbitIndex) => (
          <div key={orbit.name} className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute rounded-full border-2 transition-all duration-300"
              style={{
                width: `${orbit.radius * 2}px`,
                height: `${orbit.radius * 2}px`,
                borderColor: activeOrbit === orbitIndex ? orbit.color : `${orbit.color}60`,
                zIndex: 10 + orbitIndex,
              }}
            />

            {orbit.tags.map((tag, tagIndex) => {
              const isActive = activeOrbit === orbitIndex
              return (
                <div
                  key={tag}
                  className="absolute"
                  style={{
                    animation: `orbit-refined-${orbitIndex + 1} ${orbit.speed}s linear infinite`,
                    animationDelay: `${-(orbit.speed / orbit.tags.length) * tagIndex}s`,
                    zIndex: 20 + orbitIndex,
                  }}
                >
                  <div
                    data-orbit-interactive
                    className="px-2.5 py-1 rounded-full text-xs font-light shadow-md transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? orbit.color : `${orbit.color}40`,
                      color: isActive ? "white" : orbit.color,
                      backdropFilter: "blur(8px)",
                      opacity: isActive ? 1 : 0.9,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setClickedOrbit(orbitIndex)
                    }}
                  >
                    {tag}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="z-40 bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 border border-slate-200">
        <div className="flex flex-col space-y-3">
          {orbits.map((orbit, index) => (
            <div
              key={orbit.name}
              data-orbit-interactive
              className="flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:scale-105"
              onMouseEnter={() => setHoveredOrbit(index)}
              onMouseLeave={() => setHoveredOrbit(null)}
              onClick={(e) => {
                e.stopPropagation()
                setClickedOrbit(index)
              }}
            >
              <div
                className="w-3 h-3 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: activeOrbit === index ? orbit.color : `${orbit.color}BF`,
                  boxShadow: activeOrbit === index ? `0 0 12px ${orbit.color}` : "none",
                }}
              />
              <span
                className="text-xs font-light transition-colors duration-200 whitespace-nowrap"
                style={{
                  color: activeOrbit === index ? orbit.color : "#475569",
                  fontWeight: activeOrbit === index ? "500" : "300",
                }}
              >
                {orbit.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

SolarSystemVisualization.displayName = "SolarSystemVisualization"

const knowledgeCycles = [
  {
    disciplines: [
      {
        name: "Psychology",
        color: "#3B82F6", // swapped from pink to blue
        subs: ["Cognitive\nScience", "Behavioral\nEconomics"],
      },
      {
        name: "History",
        color: "#A855F7",
        subs: ["Event\nAnalysis", "Temporal\nTrends"],
      },
      {
        name: "Business\nStrategy",
        color: "#EC4899", // swapped from blue to pink
        subs: ["Choice\nModels", "Risk\nMapping"],
      },
    ],
    paths: [
      { disciplineIndex: 0, subIndex: 0 }, // Cognitive Science → Psychology
      { disciplineIndex: 0, subIndex: 1 }, // Behavioral Economics → Psychology
      { disciplineIndex: 1, subIndex: 1 }, // Temporal Trends → History
      { disciplineIndex: 2, subIndex: 0 }, // Choice Models → Business Strategy
    ],
  },
  {
    disciplines: [
      {
        name: "Data\nScience",
        color: "#3B82F6", // swapped from pink to blue
        subs: ["Statistical\nAnalysis", "Predictive\nModeling"],
      },
      {
        name: "Philosophy",
        color: "#A855F7",
        subs: ["Ethics", "Logic"],
      },
      {
        name: "Neuroscience",
        color: "#EC4899", // swapped from blue to pink
        subs: ["Brain\nFunction", "Habit\nFormation"],
      },
    ],
    paths: [
      { disciplineIndex: 0, subIndex: 0 }, // Statistical Analysis → Data Science
      { disciplineIndex: 1, subIndex: 1 }, // Logic → Philosophy
      { disciplineIndex: 2, subIndex: 1 }, // Habit Formation → Neuroscience
    ],
  },
  {
    disciplines: [
      {
        name: "Anthropology",
        color: "#3B82F6", // swapped from pink to blue
        subs: ["Cultural\nNorms", "Social\nDynamics"],
      },
      {
        name: "Game\nTheory",
        color: "#A855F7",
        subs: ["Strategic\nThinking", "Incentive\nDesign"],
      },
      {
        name: "Design\nThinking",
        color: "#EC4899", // swapped from blue to pink
        subs: ["Problem\nFraming", "Systems\nDesign"],
      },
    ],
    paths: [
      { disciplineIndex: 0, subIndex: 0 }, // Cultural Norms → Anthropology
      { disciplineIndex: 1, subIndex: 0 }, // Strategic Thinking → Game Theory
      { disciplineIndex: 2, subIndex: 0 }, // Problem Framing → Design Thinking
    ],
  },
]

const KnowledgeSynthesisVisualization = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const disciplineRefs = useRef<(HTMLDivElement | null)[]>([])
  const subRefs = useRef<(HTMLDivElement | null)[]>([])

  const [currentCycle, setCurrentCycle] = useState(0)
  const [litBoxes, setLitBoxes] = useState<Set<string>>(new Set())
  const [boxPositions, setBoxPositions] = useState<any>(null)

  useEffect(() => {
    const calculatePositions = () => {
      if (!logoRef.current || !containerRef.current) return

      const logoRect = logoRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      // Calculate logo center-bottom point
      const logoX = logoRect.left + logoRect.width / 2 - containerRect.left
      const logoY = logoRect.bottom - containerRect.top

      // Calculate discipline box positions and find max dimensions
      const disciplinePositions: any[] = []
      let maxDiscWidth = 0
      let maxDiscHeight = 0

      disciplineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          maxDiscWidth = Math.max(maxDiscWidth, rect.width)
          maxDiscHeight = Math.max(maxDiscHeight, rect.height)
          disciplinePositions.push({
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height,
          })
        }
      })

      // Calculate sub-category box positions and find max dimensions
      const subPositions: any[] = []
      let maxSubWidth = 0
      let maxSubHeight = 0

      subRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          maxSubWidth = Math.max(maxSubWidth, rect.width)
          maxSubHeight = Math.max(maxSubHeight, rect.height)
          subPositions.push({
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height,
          })
        }
      })

      setBoxPositions({
        logo: { x: logoX, y: logoY },
        disciplines: disciplinePositions,
        subs: subPositions,
        maxDiscWidth,
        maxDiscHeight,
        maxSubWidth,
        maxSubHeight,
      })
    }

    calculatePositions()
    window.addEventListener("resize", calculatePositions)
    return () => window.removeEventListener("resize", calculatePositions)
  }, [currentCycle])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !boxPositions) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // High-resolution canvas setup
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const currentDisciplines = knowledgeCycles[currentCycle].disciplines
    const cyclePaths = knowledgeCycles[currentCycle].paths

    const drawDottedPaths = () => {
      ctx.setLineDash([4, 4])
      ctx.lineWidth = 1.5
      ctx.lineCap = "round"

      currentDisciplines.forEach((disc, discIndex) => {
        disc.subs.forEach((sub, subIndex) => {
          const subPos = boxPositions.subs[discIndex * 2 + subIndex]
          const discPos = boxPositions.disciplines[discIndex]

          if (!subPos || !discPos) return

          // Path from sub to discipline
          ctx.strokeStyle = disc.color
          ctx.globalAlpha = 0.3
          ctx.beginPath()
          ctx.moveTo(subPos.x, subPos.y) // Center-top of sub box
          ctx.lineTo(discPos.x, discPos.y + discPos.height) // Center-bottom of discipline box
          ctx.stroke()

          // Path from discipline to logo
          ctx.beginPath()
          ctx.moveTo(discPos.x, discPos.y) // Center-top of discipline box
          ctx.lineTo(boxPositions.logo.x, boxPositions.logo.y) // Bottom-center of logo
          ctx.stroke()
        })
      })

      ctx.globalAlpha = 1
      ctx.setLineDash([])
    }

    drawDottedPaths()

    let animationFrame: number
    const paths: any[] = cyclePaths.map((pathDef, index) => ({
      disciplineIndex: pathDef.disciplineIndex,
      subIndex: pathDef.subIndex,
      progress: 0,
      delay: index * 800,
      startTime: Date.now() + index * 800,
      hasStarted: false,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Redraw dotted paths
      drawDottedPaths()

      const now = Date.now()
      let allComplete = true
      const newLitBoxes = new Set<string>()

      paths.forEach((path) => {
        if (now < path.startTime) {
          allComplete = false
          return
        }

        if (!path.hasStarted) {
          path.hasStarted = true
        }

        const elapsed = now - path.startTime
        path.progress = Math.min(elapsed / 2000, 1)

        if (path.progress < 1) allComplete = false

        const subPos = boxPositions.subs[path.disciplineIndex * 2 + path.subIndex]
        const discPos = boxPositions.disciplines[path.disciplineIndex]

        if (!subPos || !discPos) return

        // Calculate exact positions
        const subX = subPos.x // Center-top of sub box
        const subY = subPos.y
        const discX = discPos.x // Center of discipline box
        const discBottomY = discPos.y + discPos.height // Center-bottom of discipline box
        const discTopY = discPos.y // Center-top of discipline box
        const logoX = boxPositions.logo.x // Bottom-center of logo
        const logoY = boxPositions.logo.y

        const disciplineColor = currentDisciplines[path.disciplineIndex].color

        ctx.strokeStyle = disciplineColor
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.setLineDash([])

        if (path.progress < 0.33) {
          // Sub to Discipline - light up sub box
          const segmentProgress = path.progress / 0.33
          const currentX = subX + (discX - subX) * segmentProgress
          const currentY = subY + (discBottomY - subY) * segmentProgress

          ctx.beginPath()
          ctx.moveTo(subX, subY)
          ctx.lineTo(currentX, currentY)
          ctx.stroke()

          // Draw comet head
          ctx.beginPath()
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
          ctx.fillStyle = disciplineColor
          ctx.fill()

          newLitBoxes.add(`sub-${path.disciplineIndex}-${path.subIndex}`)
        } else if (path.progress < 0.66) {
          // Discipline to Logo - light up both sub and discipline boxes
          const segmentProgress = (path.progress - 0.33) / 0.33
          const currentX = discX + (logoX - discX) * segmentProgress
          const currentY = discTopY + (logoY - discTopY) * segmentProgress

          // Draw complete first segment
          ctx.beginPath()
          ctx.moveTo(subX, subY)
          ctx.lineTo(discX, discBottomY)
          ctx.stroke()

          // Draw current segment
          ctx.beginPath()
          ctx.moveTo(discX, discTopY)
          ctx.lineTo(currentX, currentY)
          ctx.stroke()

          // Draw comet head
          ctx.beginPath()
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
          ctx.fillStyle = disciplineColor
          ctx.fill()

          newLitBoxes.add(`sub-${path.disciplineIndex}-${path.subIndex}`)
          newLitBoxes.add(`disc-${path.disciplineIndex}`)
        } else {
          // Complete path - light up all boxes
          ctx.beginPath()
          ctx.moveTo(subX, subY)
          ctx.lineTo(discX, discBottomY)
          ctx.lineTo(discX, discTopY)
          ctx.lineTo(logoX, logoY)
          ctx.stroke()

          newLitBoxes.add(`sub-${path.disciplineIndex}-${path.subIndex}`)
          newLitBoxes.add(`disc-${path.disciplineIndex}`)
          newLitBoxes.add("logo")
        }
      })

      setLitBoxes(newLitBoxes)

      if (!allComplete) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setLitBoxes(new Set())
          setCurrentCycle((prev) => (prev + 1) % 3)
        }, 2000)
      }
    }

    animate()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [currentCycle, boxPositions])

  const currentDisciplines = knowledgeCycles[currentCycle].disciplines

  return (
    <div ref={containerRef} className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute top-[10%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            width: "80px",
            height: "80px",
            left: "0px",
            top: "0px",
            background: `radial-gradient(circle, #EC489960, #A855F740, #3B82F620, transparent 70%)`,
            boxShadow: `0 0 60px #EC489940, 0 0 80px #A855F730, 0 0 100px #3B82F620`,
          }}
        />

        <div
          ref={logoRef}
          className="relative flex items-center justify-center z-10"
          style={{
            width: "80px",
            height: "80px",
            background:
              "linear-gradient(to right, rgba(37, 99, 235, 1.0), rgba(147, 51, 234, 1.0), rgba(236, 72, 153, 1.0))",
            borderRadius: "50%",
          }}
        >
          <img src="/images/white-logo.png" alt="Playbook Labs" className="size-11 object-contain" />
        </div>
      </div>

      {/* Middle row: Disciplines */}
      <div className="absolute top-[45%] left-0 right-0 flex justify-around px-4 md:px-12 z-10">
        {currentDisciplines.map((disc, index) => {
          const isLit = litBoxes.has(`disc-${index}`)
          return (
            <div
              key={disc.name}
              ref={(el) => (disciplineRefs.current[index] = el)}
              className="rounded-lg text-xs md:text-sm font-light transition-all duration-300 flex items-center justify-center text-center whitespace-pre-line"
              style={{
                width: boxPositions ? `${boxPositions.maxDiscWidth}px` : "auto",
                height: boxPositions ? `${boxPositions.maxDiscHeight}px` : "auto",
                padding: "12px 16px",
                backgroundColor: isLit ? disc.color : `${disc.color}40`,
                color: isLit ? "white" : disc.color,
                fontWeight: isLit ? "600" : "300",
                opacity: isLit ? 1 : 0.4,
                textTransform: "capitalize",
              }}
            >
              {disc.name}
            </div>
          )
        })}
      </div>

      {/* Bottom row: Sub-categories */}
      <div className="absolute bottom-[10%] left-0 right-0 grid grid-cols-6 gap-1 md:gap-2 px-4 md:px-8 z-10">
        {currentDisciplines.flatMap((disc, discIndex) =>
          disc.subs.map((sub, subIndex) => {
            const isLit = litBoxes.has(`sub-${discIndex}-${subIndex}`)
            const lightColor = disc.color + "66"
            return (
              <div
                key={`${disc.name}-${sub}`}
                ref={(el) => (subRefs.current[discIndex * 2 + subIndex] = el)}
                className="rounded-lg text-[10px] md:text-xs font-light transition-all duration-300 flex items-center justify-center text-center whitespace-pre-line"
                style={{
                  width: boxPositions ? `${boxPositions.maxSubWidth}px` : "auto",
                  height: boxPositions ? `${boxPositions.maxSubHeight}px` : "auto",
                  padding: "8px 4px",
                  backgroundColor: isLit ? disc.color : lightColor,
                  color: isLit ? "white" : disc.color,
                  fontWeight: isLit ? "600" : "300",
                  opacity: isLit ? 1 : 0.4,
                  textTransform: "capitalize",
                }}
              >
                {sub}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
})

KnowledgeSynthesisVisualization.displayName = "KnowledgeSynthesisVisualization"

const ScrollingTestimonials = memo(() => {
  const testimonials = [
    {
      name: "F, 29, Austin, USA",
      text: "I kept putting off launching my business for two years. My playbook showed me three real cases of people who broke through similar paralysis. Seeing that someone with my exact fear pattern succeeded by doing the opposite of what I thought I needed (starting messy instead of waiting for perfect) changed everything. I launched within two weeks.",
      avatar: "AK",
      struggle: "Procrastination on starting a business",
    },
    {
      name: "F, 52, Chicago, USA",
      text: "My son and I hadn't had a real conversation in months. Everything was a fight. The strategy document broke down exactly why our communication pattern had spiraled (with references to actual family therapy cases) and outlined a week-by-week approach to rebuild trust. What hit hardest was the podcast explaining how my generation's parenting instincts often backfire with Gen Z kids. We had dinner together yesterday and he actually opened up. First time in over a year.",
      avatar: "RJ",
      struggle: "Relationship with teenage son",
    },
    {
      name: "M, 41, Singapore",
      text: "I was skeptical about this kind of service, but the depth of analysis was incredible, and the podcast touch was really cool. They pulled insights from career psychology, industry research, and real cases of people who made similar pivots in their 40s. I expected general advice but got a 7-step roadmap with specific month by month actions. Worth every penny.",
      avatar: "SM",
      struggle: "Career transition from finance to tech",
    },
    {
      name: "F, 27, Brooklyn, USA",
      text: "The scripts for saying no felt awkward at first but they actually worked!!! I've turned down three unreasonable requests this month without guilt. Already recommended this to two coworkers.",
      avatar: "TL",
      struggle: "Constant people-pleasing at work",
    },
    {
      name: "M, 38, Toronto, Canada",
      text: "This was the darkest time of my life and I was drowning. My playbook gave me something I didn't know I needed: proof that other people survived this exact situation and came out okay. The emotional relief from the podcast was unexpected and it got me through some really hard nights.",
      avatar: "DM",
      struggle: "Caring for aging parent with dementia",
    },
    {
      name: "F, 31, Portland, USA",
      text: 'We were about to start couples therapy when I found Playbook Labs. The playbook identified the exact dynamic we were stuck in (they called it a "pursue-withdraw pattern around financial control") and showed me real couples who broke the cycle. The solution came from negotiation research and conflict resolution studies... they even pulled insights from behavioral economics about decision fatigue. We implemented the communication structure and had our first productive money conversation in maybe a year. For a fraction of therapy costs!',
      avatar: "KW",
      struggle: "Recurring money disputes with partner",
    },
    {
      name: "M, 45, Seattle, USA",
      text: "My boss was micromanaging everything and undermining me in meetings. I was stressed, couldn't sleep, and seriously considering quitting. The playbook analyzed workplace power dynamics, primate social hierarchy research, and real cases of people who navigated similar situations. The strategy was counterintuitive: instead of avoiding him, I started sending brief end-of-day updates proactively. Within two weeks, the micromanaging dropped by half. He felt in the loop and I got my autonomy back. I'm not dreading work anymore.",
      avatar: "JH",
      struggle: "Managing conflict with a difficult boss",
    },
    {
      name: "F, 25, Tokyo, Japan",
      text: "The comparison thing was killing me. Everyone seemed ahead. My playbook made me realize the solution wasn't mindset work or affirmations but actually reframing and owning my timeline. The part about how cultural expectations (especially in Japan) create artificial pressure around age and achievement really helped me understand. I have a plan now instead of just anxiety.",
      avatar: "MC",
      struggle: "Feeling behind peers in career and life",
    },
    {
      name: "F, 34, Seattle, USA",
      text: "A colleague told me about this service after I mentioned I was heading toward a breakdown. The interdisciplinary synthesis was eye-opening. They pulled from chronobiology, neuroscience, and case studies of executives who burned out and rebuilt. What shocked me was learning my solution wasn't working less but restructuring my work rhythm completely. The specific recovery protocols are the only thing that's worked in three years.",
      avatar: "LP",
      struggle: "Chronic overwork and burnout prevention",
    },
    {
      name: "F, 33, Melbourne, Australia",
      text: "I was stuck in analysis paralysis for months. Couldn't decide if I was being too picky or ignoring red flags. The playbook introduced me to decision-making frameworks from philosophy and psychology, plus real relationship cases with similar dynamics. What helped most was realizing my situation mapped to a specific pattern where people who stayed ended up resentful. That clarity let me finally make the call. Hard but right.",
      avatar: "NB",
      struggle: "Whether to end a 6-year relationship",
    },
    {
      name: "M, 28, Denver, USA",
      text: "Best money I've spent this year! A friend told me I should use Playbook Labs and I'm sooo glad I listened. My playbook connected my situation to research on social connection patterns, urban sociology on friendship formation, and real cases of people who rebuilt social lives in new cities. I have three solid friendships now and a weekly game night. Thank you PL!!",
      avatar: "BR",
      struggle: "Social anxiety & making friends post-move",
    },
    {
      name: "F, 42, London, UK",
      text: "We've been together 12 years and I love him but I was so lonely. The strategy document helped me understand why he shuts down and gave me specific communication approaches based on attachment research and actual couples who solved this exact dynamic. He's trying now. We're actually talking about feelings without him walking away. I've told three friends about this already.",
      avatar: "EW",
      struggle: "Partner's emotional unavailability",
    },
    {
      name: "M, 39, Dubai, UAE",
      text: "My wife and I were barely speaking. I was working 70-hour weeks and she was drowning with the baby. I submitted my problem and received my playbook six days later. The concrete schedule restructuring in the document honestly saved our relationship. I actually see my daughter now.",
      avatar: "VK",
      struggle: "Work-life balance with newborn",
    },
    {
      name: "F, 36, São Paulo, Brazil",
      text: "I got promoted to director and immediately felt like an imposter. The combination of the written playbook and the podcast was GENIUS. I could study the document before big meetings and listen during my commute to internalize the strategies. Here's what blew my mind: they incorporated findings from elite athlete performance routines and applied them to my meeting anxiety!! I never would have connected those dots. The 30-day action plan is on my desk every day.",
      avatar: "CS",
      struggle: "Confidence in leadership role",
    },
    {
      name: "F, 42, Boston, USA",
      text: "This is embarrassing to admit but it was destroying me. My younger brother has the career and life I thought I'd have. My playbook helped me understand the specific cognitive distortions I was stuck in and showed me cases of people who transformed sibling rivalry into something healthier. Less than three therapy sessions cost and honestly more targeted. I called my brother last week. We're okay now.",
      avatar: "HG",
      struggle: "Resentment toward successful sibling",
    },
    {
      name: "F, 29, Madrid, Spain",
      text: 'Talk about thinking outside the box! I thought this was just going to be pros and cons lists but they brought in decision science research and showed me actual data on how people evaluate career moves. The numbers were eye-opening. Turns out the factors I was weighing heavily (salary, title) mattered way less than new skill acquisition and future market value of those skills. And with a podcast about myself?! I picked the "riskier" offer and six months in, best decision I\'ve made.',
      avatar: "IM",
      struggle: "Choosing between two job offers",
    },
    {
      name: "F, 38, Berlin, Germany",
      text: "The first time I used Playbook Labs was for this family situation that was really affecting my marriage. My playbook was so helpful that when I had a completely different problem three months later (struggling with motivation at work), I came back immediately. Both times they found patterns I couldn't see. Can't recommend enough!",
      avatar: "ZT",
      struggle: "Conflict with mother-in-law",
    },
  ]

  // Split testimonials into 3 columns
  const column1 = testimonials.slice(0, 6)
  const column2 = testimonials.slice(6, 12)
  const column3 = testimonials.slice(12, 17)

  const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
    <Card className="bg-white border-slate-200 shadow-md">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-purple-600 text-purple-600" />
          ))}
        </div>
        <p className="text-slate-600 leading-relaxed">{testimonial.text}</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
          </div>
          <div>
            <p className="font-semibold text-slate-900">{testimonial.name}</p>
            <p className="text-sm text-slate-500">Struggled with:</p>
            <p className="text-sm text-slate-500 italic">{testimonial.struggle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const TestimonialColumn = ({
    testimonials,
    columnIndex,
    animationClass,
  }: {
    testimonials: typeof column1
    columnIndex: number
    animationClass: string
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isTouching, setIsTouching] = useState(false)

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const handleTouchStart = () => {
      setIsTouching(true)
    }

    const handleTouchEnd = () => {
      setIsTouching(false)
    }

    const isPaused = isHovered || isTouching

    return (
      <div
        className="relative h-full overflow-hidden select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`${animationClass} space-y-6`}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Column 1 */}
        <TestimonialColumn testimonials={column1} columnIndex={0} animationClass="animate-scroll-slow" />

        {/* Column 2 - Hidden on mobile */}
        <div className="hidden md:block">
          <TestimonialColumn testimonials={column2} columnIndex={1} animationClass="animate-scroll-medium" />
        </div>

        {/* Column 3 - Hidden on mobile */}
        <div className="hidden md:block">
          <TestimonialColumn testimonials={column3} columnIndex={2} animationClass="animate-scroll-fast" />
        </div>
      </div>
    </div>
  )
})

ScrollingTestimonials.displayName = "ScrollingTestimonials"

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Updated background gradient */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            linear-gradient(180deg,
              #f3f7fe 0%,
              #f6f9fe 15%,
              #f3f0ff 30%,
              #ffffff 50%,
              #f3f0ff 70%,
              #f5f7ff 85%,
              #ede9ff 100%
            )`,
          animation: "gradientShift 8s ease-in-out infinite",
        }}
      />

      <div className="relative z-10">
        <div className="absolute top-0 left-0 right-0 h-16 bg-white z-0" />

        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 pt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="#top" className="flex items-center -ml-11.5 md:ml-0 cursor-pointer">
                <Image
                  src="/images/playbook-labs-logo-black.png"
                  alt="Playbook Labs"
                  width={200}
                  height={80}
                  className="w-auto h-36"
                  priority
                />
              </a>

              <nav className="hidden md:flex items-center space-x-8 mx-0 px-2.5 pl-0">
                <a
                  href="#approach"
                  className="text-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent font-normal0 transition-all cursor-pointer"
                >
                  What We Do
                </a>
                <a
                  href="#how-it-works"
                  className="text-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent font0 transition-all cursor-pointer"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className="text-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent font0 transition-all cursor-pointer"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="text-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent font0 transition-all cursor-pointer"
                >
                  FAQ
                </a>
              </nav>

              <Button className="bg-slate-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 text-white font-semibold cursor-pointer">
                Submit Your Problem
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 md:pt-36 pb-12 md:pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <FloatingParticles />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="font-playfair text-5xl lg:text-7xl leading-[1.1] text-slate-900 text-balance text-center mb-6 font-extrabold md:text-6xl tracking-[-0.035em]">
              We solve your{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                life
              </span>{" "}
              problems.
            </h1>

            <p className="font-normal tracking-[-0.01em] leading-[1.5] text-slate-600 mb-8 max-w-3xl mx-auto text-pretty text-lg md:text-xl">
              {"Playbook Labs builds tailored solutions for your most complex challenges."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 cursor-pointer"
              >
                Get Your Playbook
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section
          id="approach"
          className="pt-10 lg:pt-18 pb-6 md:pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white/92"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-3 order-1 lg:order-1">
                <Badge className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 px-4 py-1.5 text-sm font-semibold">
                  REAL CASES
                </Badge>

                <h2 className="font-playfair md:text-5xl tracking-[-0.02em] leading-[1.2] text-slate-900 font-extrabold text-4xl whitespace-normal md:whitespace-nowrap">
                  Dealing with something?
                </h2>

                <p className="tracking-[-0.01em] leading-[1.5] md:text-lg text-slate-800 font-bold text-lg">
                  {"Someone has already been exactly where you are, faced the same problem, and solved it."}
                </p>

                <p className="tracking-[-0.01em] leading-[1.5] font-normal text-slate-700 text-base lg:text-lg">
                  {
                    "Collective intelligence is an extremely powerful concept. For any challenge, big or small, practical or emotional, we can draw on what others have figured out before us. Your situation is no different. Someone has navigated what you're facing and found a way through. At Playbook Labs, we use an "
                  }
                  <em>evidence-based</em>
                  {
                    " approach to find real-life cases similar to yours, extract what worked (and what didn't), and deliver not simple advice, but concrete, actionable solutions."
                  }
                </p>
              </div>

              <div className="relative order-2 lg:order-2">
                <SolarSystemVisualization />
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Synthesis Section */}
        <section className="pt-10 md:pt-6 lg:pt-12 pb-6 md:pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white/92">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-[9fr_11fr] gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <KnowledgeSynthesisVisualization />
              </div>

              <div className="space-y-3 order-1 lg:order-2">
                <Badge className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 px-4 py-1.5 text-sm font-semibold">
                  PATTERNS
                </Badge>

                <h2 className="font-playfair md:text-5xl tracking-[-0.02em] leading-[1.2] text-slate-900 font-extrabold text-4xl">
                  There&#39;s a playbook for that.
                </h2>

                <p className="md:text-lg tracking-[-0.01em] leading-[1.5] text-slate-800 font-bold text-lg">
                  There are many paths to a solution. We find yours.
                </p>

                <p className="tracking-[-0.01em] leading-[1.5] font-normal text-slate-700 text-base lg:text-lg">
                  {
                    "Countless methods exist to solve all kinds of problems. Different disciplines tackle specific challenges: psychology explores behavior, history examines precedents, business strategy optimizes decisions. But there is never a one-size-fits-all solution. The answer might come from sociology, data analysis, philosophy, or any number of other domains, and most often, it draws from multiple at once. To build your Playbook, we assess your challenge, uncover patterns "
                  }
                  <em>across relevant fields</em>
                  {
                    ", and piece these insights together in order to determine which actions are most likely to yield results for your situation."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="pt-4 lg:pt-6 pb-13 md:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white/92">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[4fr_1fr] gap-12 items-center">
              <div className="space-y-3 self-center">
                <Badge className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 px-4 py-1.5 text-sm font-semibold">
                  STRATEGY + PODCAST
                </Badge>

                <h2 className="font-playfair md:text-5xl tracking-[-0.02em] leading-[1.2] text-slate-900 font-extrabold text-4xl">
                  {"Your personalized problem-solving show"}
                </h2>

                <p className="md:text-lg tracking-[-0.01em] leading-[1.5] text-slate-800 font-bold text-lg">
                  A strategy document with clear instructions. A podcast that brings it to life.
                </p>

                <p className="tracking-[-0.01em] leading-[1.5] font-normal text-slate-700 text-base lg:text-lg">
  No vague concepts or general theory. Your Playbook dissects your specific challenge and provides step-by-step actions you can implement immediately. The strategy document gives you a comprehensive roadmap, while the podcast walks you through the solution in an engaging, thought-provoking format.{" "}
  <em>Read it, listen to it, or both.</em>
</p>

              </div>

              {/* Start of updates */}
              <div className="relative flex items-center justify-center gap-0 md:translate-y-10">
                {/* Tailored Playbook Logo */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 -rotate-12 md:scale-100 scale-90"
                    style={{
                      background: "black",
                    }}
                  >
                    <img src="/images/white-logo.png" alt="Playbook Labs" className="w-14 h-14 object-contain" />
                  </div>
                </div>

                {/* Custom Podcast Logo */}
                <div className="flex flex-col items-center -ml-2 md:ml-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl transition-all duration-300 rotate-12 md:scale-100 scale-90">
                    <Mic className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              {/* End of updates */}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="pt-14 pb-8 md:pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-playfair text-3xl md:text-5xl tracking-[-0.02em] leading-[1.2] text-slate-900 text-balance font-extrabold">
                Feeling stuck?
              </h2>
              <p className="md:text-lg tracking-[-0.01em] leading-[1.5] text-slate-600 text-pretty max-w-2xl mx-auto font-normal text-lg">
                Let&#39;s get you out of there.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1: Submit Your Case */}
              <Card className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-slate-200 hover:shadow-xl transition-all duration-300">
                <CardParticles />
                <CardContent className="pt-8 pb-8 px-6 text-center space-y-6 relative z-10">
                  <div className="flex justify-center">
                    <StackedLayersIcon />
                  </div>
                  <div className="space-y-3">
                    <h3 className="md:text-xl text-slate-900 font-bold text-xl">Submit Your Case</h3>
                    <p className="md:text-base text-slate-600 leading-relaxed text-base">
                      Share your situation in detail. The more context you provide, the better we can tailor your
                      solution.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Deep Analysis & Research */}
              <Card className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-slate-200 hover:shadow-xl transition-all duration-300">
                <CardParticles />
                <CardContent className="pt-8 pb-8 px-6 text-center space-y-6 relative z-10">
                  <div className="flex justify-center">
                    <MagnifyingGlassIcon />
                  </div>
                  <div className="space-y-3">
                    <h3 className="md:text-xl text-slate-900 text-xl font-bold">We Build Your Solution</h3>
                    <p className="md:text-base text-slate-600 leading-relaxed text-base">
                      Our team finds similar real-life cases and bridges the gap across multiple disciplines to craft a
                      strategy unique to your situation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Receive Your Solution */}
              <Card className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-slate-200 hover:shadow-xl transition-all duration-300">
                <CardParticles />
                <CardContent className="pt-8 pb-8 px-6 text-center space-y-6 relative z-10">
                  <div className="flex justify-center">
                    <CheckmarkIcon />
                  </div>
                  <div className="space-y-3">
                    <h3 className="md:text-xl text-slate-900 text-xl font-bold">Receive Your Playbook</h3>
                    <p className="md:text-base text-slate-600 leading-relaxed text-base">
                      Get your detailed strategy document and custom podcast episode with practical next steps to move
                      forward.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="pt-10 md:pt-12 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl tracking-[-0.02em] leading-[1.2] text-slate-900 mb-4 text-balance font-extrabold">
                Real problems. Real solutions. Real results.
              </h2>
              <p className="md:text-lg tracking-[-0.01em] leading-[1.5] text-slate-600 max-w-2xl mx-auto text-pretty font-normal text-lg">
                See how our method has helped others find clarity and move forward.
              </p>
            </div>

            <ScrollingTestimonials />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl tracking-[-0.02em] leading-[1.2] text-slate-900 mb-4 text-balance font-extrabold">
                From problem to solution in days, not months
              </h2>
              <p className="tracking-[-0.01em] leading-[1.5] text-slate-600 max-w-2xl mx-auto text-pretty md:text-lg font-normal text-lg">
                Other approaches are slow and cost thousands. Get results now.
              </p>
            </div>

            <div className="flex justify-center max-w-md mx-auto">
              {/* Playbook */}
              <Card className="border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg rounded-3xl relative overflow-visible flex flex-col w-full">
                <CardHeader className="text-center pb-8 pt-6">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-2">Playbook</CardTitle>
                  <CardDescription className="text-slate-300 text-sm md:text-base">
                    Comprehensive solutions for complex challenges
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl md:text-6xl text-white font-extrabold">$499</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pb-8 flex-1 flex flex-col">
                  <div className="space-y-5 flex-1">
                    <div className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white md:text-base text-base">
                        Strategy document (10-15 pages)
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white md:text-base text-base">Custom podcast episode (45 min)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white md:text-base text-base">Real case studies from your situation</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white md:text-base text-base">Actionable roadmap with next steps</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white md:text-base text-base">Delivered in 5-7 business days</span>
                    </div>
                  </div>
                  <Button className="w-full mt-8 bg-white hover:bg-slate-50 text-slate-900 py-6 text-base md:text-lg rounded-full font-semibold cursor-pointer">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="pt-12 pb-6 px-4 base:px-6 lg:px-8 relative overflow-hidden scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-5xl tracking-[-0.02em] leading-[1.2] text-slate-900 mb-12 text-balance font-extrabold text-center">
              Frequently asked questions
            </h2>

            <div className="space-y-0">
              {[
                {
                  question: "Is this therapy or coaching?",
                  answer:
                    "No. Playbook Labs is not a healthcare or mental health service. We do not diagnose or treat; we analyze, strategize, and advise. Think of it as research-backed consulting for your life. Your Playbook is meant to guide reflection and action, not replace professional care or legal, medical, or financial advice.",
                },
                {
                  question: "What kinds of problems can I submit?",
                  answer:
                    "Anything that feels complex or unresolved: romantic, family, work-related, personal, or existential. If humans have faced it, we can study it and build a Playbook for it.",
                },
                {
                  question: "How much does a Playbook cost, and what's included?",
                  answer:
                    "A Playbook costs $499. This includes a comprehensive strategy document (10-15 pages) and a personalized podcast (45 min). Traditional, time-intensive guidance models that rely on open-ended sessions typically cost anywhere from $1,000 to $6,000 and take months. We deliver a complete, evidence-based strategy in days, for a fraction of the cost. Our pricing reflects the research, analysis, and expertise that goes into every Playbook, while remaining accessible compared to other options.",
                },
                {
                  question: "What happens after I submit my case?",
                  answer:
                    "You describe your situation through our form. We research analogous real-life cases, extract insights across disciplines, and craft a strategy unique to your context. You then receive a personalized document and podcast episode explaining the solution.",
                },
                {
                  question: "How long does it take?",
                  answer:
                    "Timelines vary depending on complexity, but we deliver every Playbook within 7 business days.",
                },
                {
                  question: "Can I ask follow-up questions or get revisions?",
                  answer:
                    "Each Playbook is designed as a complete, one-time deliverable. Because it is carefully built from the information you provide, we do not offer revisions or extended back-and-forth once the process begins. This approach allows us to stay focused on producing high-quality, insightful work in a fraction of the time and cost of traditional methods. If you would like to explore your case further or request a new perspective, you can always submit a new request or contact us for special follow-up options.",
                },
                {
                  question: "Will my information stay private?",
                  answer:
                    "Yes. Everything you share is treated as confidential and used only to create your Playbook. Any examples reused for research or media are fully anonymized.",
                },
                {
                  question: "Are submissions refundable?",
                  answer: "Because every Playbook is custom-built, all submissions are final once received.",
                },
              ].map((faq, index) => (
                <div key={index} className={`border-b border-slate-200 py-8 ${index === 7 ? "border-b-0" : ""}`}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-start justify-between gap-8 w-full text-left cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4 leading-7 cursor-pointer">
                        {faq.question}
                      </h3>
                      {openFaqIndex === index && (
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">{faq.answer}</p>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 text-slate-900 flex-shrink-0 mt-1 transition-transform duration-200 cursor-pointer ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-playfair text-4xl lg:text-6xl leading-[1.2] text-white font-extrabold mb-6 text-balance md:text-6xl tracking-[-0.03em]">
              Need a breakthrough?
            </h2>
            <p className="text-xl text-white/90 mb-12 font-normal leading-6 tracking-[-0.01em] md:text-2xl">
              Find your next best move.
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-slate-50 text-slate-900 text-lg px-8 py-6 font-semibold cursor-pointer"
            >
              Submit Your Problem
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-slate-400 text-center md:text-left">
                <p>© 2025 Playbook Labs. All rights reserved</p>
              </div>

              <div className="flex gap-6">
                <a href="mailto:contact@playbooklabs.co" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </a>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
