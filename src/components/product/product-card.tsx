"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import Link from "next/link"

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
            className="group relative overflow-hidden rounded-xl bg-card border border-border/40 shadow-sm hover:shadow-md transition-all"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className="aspect-square overflow-hidden bg-muted/20 p-6 relative">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">{category}</p>
                <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-1">{title}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">PKR {price.toLocaleString()}</span>
                    <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-primary hover:text-primary-foreground">
                        View
                    </Button>
                </div>
            </div>
            <Link href={`/products/${id}`} className="absolute inset-0" />
        </motion.div>
    )
}
