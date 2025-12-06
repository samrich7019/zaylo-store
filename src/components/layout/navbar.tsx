"use client"

import Link from "next/link"
import { ShoppingBag, Menu, Search, X, Smartphone, Headphones, Battery, Shield, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/components/cart/cart-context"
import { SearchModal } from "./search-modal"

const categories = [
    { name: "Phone Cases", href: "/collections/phone-cases", icon: Smartphone },
    { name: "Wireless Earbuds", href: "/collections/earbuds", icon: Headphones },
    { name: "Chargers", href: "/collections/chargers", icon: Battery },
    { name: "Screen Protectors", href: "/collections/screen-protectors", icon: Shield },
]

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showCategories, setShowCategories] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { openCart, cart } = useCart()

    const cartCount = cart?.lines.edges.reduce((acc, e) => acc + e.node.quantity, 0) || 0

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? "border-b border-border/40 bg-background/95 backdrop-blur-lg shadow-sm"
            : "bg-background/80 backdrop-blur-md"
            }`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-bold tracking-tighter gradient-text">Zaylo</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        Home
                    </Link>

                    {/* Categories Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}
                    >
                        <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                            Shop
                            <ChevronDown className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showCategories && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-background/95 backdrop-blur-lg border border-border/40 rounded-2xl shadow-2xl overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            {categories.map((category) => {
                                                const Icon = category.icon
                                                return (
                                                    <Link
                                                        key={category.name}
                                                        href={category.href}
                                                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                            <Icon className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <span className="font-medium group-hover:text-primary transition-colors">
                                                            {category.name}
                                                        </span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-border/40">
                                            <Link
                                                href="/collections/all"
                                                className="text-sm text-primary hover:underline font-medium"
                                            >
                                                View All Products →
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/pages/track-order" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        Track Order
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        Contact
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground/80 hover:text-primary"
                        onClick={() => setIsSearchOpen(true)}
                    >
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
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                            >
                                {cartCount}
                            </motion.span>
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
                        className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">Categories</div>
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        href={category.href}
                                        className="text-sm font-medium text-foreground/80 hover:text-primary pl-4 block"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                            <Link href="/pages/track-order" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Track Order
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                About
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    )
}
