"use client"

import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { ShoppingCart, Eye, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"

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
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative overflow-hidden rounded-xl bg-card border border-border/40 hover-lift"
        >
            {/* Image Container - Throne Style with smooth transitions */}
            <Link href={`/products/${id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
                    {/* Primary Image */}
                    <div className={`absolute inset-0 image-fade ${isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'}`}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover image-scale group-hover:scale-110"
                        />
                    </div>

                    {/* Secondary Image on Hover - Throne fade effect */}
                    {secondaryImage && (
                        <div className={`absolute inset-0 image-fade ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <Image
                                src={secondaryImage}
                                alt={`${title} - alternate view`}
                                fill
                                className="object-cover image-scale group-hover:scale-110"
                            />
                        </div>
                    )}

                    {/* Overlay - Throne style smooth reveal */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                                y: isHovered ? 0 : 20,
                                opacity: isHovered ? 1 : 0
                            }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <Button
                                size="sm"
                                variant="secondary"
                                className="rounded-full shadow-lg"
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

                    {/* Category Badge - Throne style */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-3 left-3"
                    >
                        <span className="px-3 py-1 text-xs font-medium bg-background/95 backdrop-blur-sm rounded-full border border-border/40 shadow-sm">
                            {category}
                        </span>
                    </motion.div>

                    {/* Wishlist Button - Throne style */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault()
                            setIsWishlisted(!isWishlisted)
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/95 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:bg-background transition-all shadow-sm"
                    >
                        <Heart
                            className={`w-4 h-4 transition-all ${isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-foreground"
                                }`}
                        />
                    </motion.button>
                </div>
            </Link>

            {/* Product Info - Throne slide-up effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4"
            >
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
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.8
                        }}
                        transition={{ duration: 0.2 }}
                        className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Color Swatches - Throne style */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-1.5 mt-3"
                >
                    {["#000000", "#1E40AF", "#DC2626"].map((color, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-5 h-5 rounded-full border border-border hover:border-primary transition-all shadow-sm"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
