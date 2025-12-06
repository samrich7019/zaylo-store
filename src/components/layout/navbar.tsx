"use client"

import Link from "next/link"
import { ShoppingBag, Menu, Search, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/components/cart/cart-context"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { openCart, cart } = useCart()

    const cartCount = cart?.lines.edges.reduce((acc, e) => acc + e.node.quantity, 0) || 0

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tighter text-primary font-montserrat">Zaylo</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/collections/all" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        Shop
                    </Link>
                    <Link href="/pages/track-order" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        Track Order
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        Contact Us
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground/80 hover:text-primary relative"
                        onClick={openCart}
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-foreground/80 hover:text-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border/40 bg-background"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link href="/collections/all" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Shop
                            </Link>
                            <Link href="/pages/track-order" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Track Order
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
