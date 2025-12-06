"use client"

import { useEffect, useRef, ReactNode } from "react"
import { useInView } from "react-intersection-observer"

interface FadeInProps {
    children: ReactNode
    delay?: number
    direction?: "up" | "down" | "left" | "right" | "none"
    className?: string
    once?: boolean
}

export function FadeIn({
    children,
    delay = 0,
    direction = "up",
    className = "",
    once = true,
}: FadeInProps) {
    const { ref, inView } = useInView({
        triggerOnce: once,
        threshold: 0.1,
    })

    const getInitialTransform = () => {
        switch (direction) {
            case "up":
                return "translateY(30px)"
            case "down":
                return "translateY(-30px)"
            case "left":
                return "translateX(30px)"
            case "right":
                return "translateX(-30px)"
            default:
                return "none"
        }
    }

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : getInitialTransform(),
                transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
            }}
        >
            {children}
        </div>
    )
}
