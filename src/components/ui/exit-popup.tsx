"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasShown, setHasShown] = useState(false)

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true)
                setHasShown(true)
            }
        }

        document.addEventListener("mouseleave", handleMouseLeave)
        return () => document.removeEventListener("mouseleave", handleMouseLeave)
    }, [hasShown])

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-black p-8 text-center shadow-2xl"
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-3xl">
                            🎁
                        </div>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-white">Wait! Don't Go Yet</h2>
                    <p className="mb-8 text-gray-400">
                        Get <span className="font-bold text-blue-500">10% OFF</span> your first order with code <span className="font-mono font-bold text-white">WELCOME10</span>
                    </p>

                    <div className="space-y-4">
                        <Button className="w-full h-12 text-lg" variant="premium" onClick={() => setIsVisible(false)}>
                            Claim My Discount
                        </Button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-sm text-gray-500 hover:text-white hover:underline"
                        >
                            No thanks, I hate saving money
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
