"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

interface CounterProps {
    end: number
    duration?: number
    suffix?: string
    className?: string
}

export function Counter({ end, duration = 2, suffix = "", className = "" }: CounterProps) {
    const [count, setCount] = useState(0)
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

    useEffect(() => {
        if (!inView) return

        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [inView, end, duration])

    return (
        <span ref={ref} className={className}>
            {count.toLocaleString()}{suffix}
        </span>
    )
}
