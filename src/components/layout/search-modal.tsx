"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
            setSearchQuery("")
            setSearchResults([])
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    useEffect(() => {
        const searchProducts = async () => {
            if (searchQuery.trim().length < 2) {
                setSearchResults([])
                return
            }

            setIsLoading(true)
            try {
                // Simulate search - in production, this would call Shopify API
                const mockResults = [
                    { id: "1", title: "Wireless Headphones", price: 120, image: "/images/hero-headphones.png", handle: "wireless-headphones" },
                    { id: "2", title: "Phone Case Premium", price: 45, image: "/images/hero-phone-case.png", handle: "phone-case" },
                    { id: "3", title: "Wireless Earbuds", price: 89, image: "/images/hero-earbuds.png", handle: "earbuds" },
                ].filter(product =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase())
                )

                setSearchResults(mockResults)
            } catch (error) {
                console.error("Search error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        const debounce = setTimeout(searchProducts, 300)
        return () => clearTimeout(debounce)
    }, [searchQuery])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Search Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
                    >
                        <div className="bg-background rounded-2xl shadow-2xl border border-border/40 overflow-hidden">
                            {/* Search Input */}
                            <div className="p-6 border-b border-border/40">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for products..."
                                        className="pl-12 pr-12 h-14 text-lg border-border/40 focus:ring-2 focus:ring-primary"
                                        autoFocus
                                    />
                                    <button
                                        onClick={onClose}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Search Results */}
                            <div className="max-h-[60vh] overflow-y-auto">
                                {isLoading && (
                                    <div className="p-8 text-center text-muted-foreground">
                                        Searching...
                                    </div>
                                )}

                                {!isLoading && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                                    <div className="p-8 text-center">
                                        <p className="text-muted-foreground mb-2">No products found</p>
                                        <p className="text-sm text-muted-foreground">Try searching for something else</p>
                                    </div>
                                )}

                                {!isLoading && searchResults.length > 0 && (
                                    <div className="divide-y divide-border/40">
                                        {searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.handle}`}
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-sm mb-1 truncate">{product.title}</h3>
                                                    <p className="text-sm font-bold gradient-text">PKR {product.price.toLocaleString()}</p>
                                                </div>
                                                <div className="text-muted-foreground">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {!isLoading && searchQuery.trim().length < 2 && (
                                    <div className="p-8">
                                        <h3 className="font-medium mb-4">Popular Searches</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {["Headphones", "Phone Cases", "Earbuds", "Chargers", "Accessories"].map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => setSearchQuery(term)}
                                                    className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
