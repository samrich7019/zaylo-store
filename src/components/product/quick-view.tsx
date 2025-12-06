"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

interface QuickViewProps {
    product: {
        id: string
        title: string
        price: number
        image: string
        category: string
        description?: string
    }
    isOpen: boolean
    onClose: () => void
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const images = [product.image, product.image] // In real app, use multiple images

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image Section */}
                                <div className="relative bg-muted/30 p-8">
                                    <div className="relative aspect-square">
                                        <Image
                                            src={images[selectedImage]}
                                            alt={product.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Thumbnails */}
                                    {images.length > 1 && (
                                        <div className="flex gap-2 mt-4">
                                            {images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedImage(idx)}
                                                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-primary" : "border-transparent"
                                                        }`}
                                                >
                                                    <Image src={img} alt="" fill className="object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Info Section */}
                                <div className="p-8 flex flex-col">
                                    {/* Close Button */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>

                                    <div className="flex-1">
                                        <p className="text-sm text-primary font-medium mb-2">{product.category}</p>
                                        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                                        <p className="text-3xl font-bold gradient-text mb-6">
                                            PKR {product.price.toLocaleString()}
                                        </p>

                                        {product.description && (
                                            <p className="text-muted-foreground mb-6 line-clamp-3">
                                                {product.description}
                                            </p>
                                        )}

                                        {/* Color Swatches (Example) */}
                                        <div className="mb-6">
                                            <p className="text-sm font-medium mb-3">Color</p>
                                            <div className="flex gap-2">
                                                {["#000000", "#1E40AF", "#DC2626", "#059669"].map((color) => (
                                                    <button
                                                        key={color}
                                                        className="w-8 h-8 rounded-full border-2 border-border hover:border-primary transition-colors"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <Button className="flex-1" size="lg">
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Add to Cart
                                            </Button>
                                            <Button variant="outline" size="lg">
                                                <Heart className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <Button variant="outline" className="w-full" onClick={onClose}>
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Full Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
