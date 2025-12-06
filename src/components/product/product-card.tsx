"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
    id: string
    title: string
    price: number
    image: string
    category: string
}

export function ProductCard({ id, title, price, image, category }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 hover-lift"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Link href={`/products/${id}`}>
                        <Button size="sm" variant="secondary" className="rounded-full">
                            <Eye className="w-4 h-4 mr-2" />
                            Quick View
                        </Button>
                    </Link>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
                        {category}
                    </span>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                <Link href={`/products/${id}`}>
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <span className="text-2xl font-bold gradient-text">
                            PKR {price.toLocaleString()}
                        </span>
                    </div>
                    <Button
                        size="icon"
                        className="rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
