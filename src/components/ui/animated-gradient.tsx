"use client"

import { useEffect, useRef } from "react"

interface AnimatedGradientProps {
    className?: string
    colors?: string[]
    speed?: number
}

export function AnimatedGradient({
    className = "",
    colors = [
        "hsl(221, 83%, 53%)", // Primary blue
        "hsl(262, 52%, 47%)", // Purple
        "hsl(340, 82%, 52%)", // Pink
    ],
    speed = 0.001,
}: AnimatedGradientProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let time = 0

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        const hslToRgb = (h: number, s: number, l: number) => {
            s /= 100
            l /= 100
            const k = (n: number) => (n + h / 30) % 12
            const a = s * Math.min(l, 1 - l)
            const f = (n: number) =>
                l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
            return [255 * f(0), 255 * f(8), 255 * f(4)]
        }

        const parseHsl = (hslString: string) => {
            const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
            if (!match) return [0, 0, 0]
            return hslToRgb(
                parseInt(match[1]),
                parseInt(match[2]),
                parseInt(match[3])
            )
        }

        const rgbColors = colors.map(parseHsl)

        const animate = () => {
            time += speed

            const width = canvas.offsetWidth
            const height = canvas.offsetHeight

            // Create gradient
            const gradient = ctx.createLinearGradient(
                0,
                0,
                width,
                height
            )

            // Animate color stops
            const stops = [
                { pos: 0, colorIndex: 0 },
                { pos: 0.5, colorIndex: 1 },
                { pos: 1, colorIndex: 2 },
            ]

            stops.forEach(({ pos, colorIndex }) => {
                const offset = (Math.sin(time + pos * Math.PI * 2) + 1) / 2
                const nextIndex = (colorIndex + 1) % rgbColors.length
                const color1 = rgbColors[colorIndex]
                const color2 = rgbColors[nextIndex]

                const r = Math.round(color1[0] + (color2[0] - color1[0]) * offset)
                const g = Math.round(color1[1] + (color2[1] - color1[1]) * offset)
                const b = Math.round(color1[2] + (color2[2] - color1[2]) * offset)

                gradient.addColorStop(pos, `rgb(${r}, ${g}, ${b})`)
            })

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            animationFrameId = requestAnimationFrame(animate)
        }

        resize()
        animate()

        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [colors, speed])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 ${className}`}
            style={{ width: "100%", height: "100%" }}
        />
    )
}
