"use client"

import { Button } from "@/components/ui/button"
import { X, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-white/10 bg-black p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Your Cart
                            </h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-gray-500" />
                            </div>
                            <p className="text-gray-400">Your cart is empty</p>
                            <Button variant="premium" onClick={onClose}>
                                Start Shopping
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
