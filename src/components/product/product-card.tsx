"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShoppingCart, Eye, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
    id: string
    title: string
    price: number
    image: string
    secondaryImage?: string
    category: string
    onQuickView?: () => void
}

export function ProductCard({ id, title, price, image, secondaryImage, category, onQuickView }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isWishlisted, setIsWishlisted] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative overflow-hidden rounded-xl bg-card border border-border/40 hover-lift"
        >
            {/* Image Container - Throne Style */}
            <Link href={`/products/${id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
                    {/* Primary Image */}
                    <motion.div
                        animate={{ opacity: isHovered && secondaryImage ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Secondary Image on Hover */}
                    {secondaryImage && (
                        <motion.div
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={secondaryImage}
                                alt={`${title} - alternate view`}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Overlay Actions - Throne Style */}
                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2"
                    >
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Button
                                size="sm"
                                variant="secondary"
                                className="rounded-full"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onQuickView?.()
                                }}
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                Quick View
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full border border-border/40">
                            {category}
                        </span>
                    </div>

                    {/* Wishlist Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault()
                            setIsWishlisted(!isWishlisted)
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:bg-background transition-colors"
                    >
                        <Heart
                            className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"
                                }`}
                        />
                    </motion.button>
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <Link href={`/products/${id}`}>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[40px]">
                        {title}
                    </h3>
                </Link>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold gradient-text">
                            PKR {price.toLocaleString()}
                        </span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Color Swatches */}
                <div className="flex gap-1.5 mt-3">
                    {["#000000", "#1E40AF", "#DC2626"].map((color, idx) => (
                        <button
                            key={idx}
                            className="w-5 h-5 rounded-full border border-border hover:border-primary transition-colors"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
