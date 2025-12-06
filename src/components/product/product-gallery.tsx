"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
    images: string[]
    title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border border-border/40"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full flex items-center justify-center p-12"
                    >
                        <Image
                            src={images[selectedImage]}
                            alt={`${title} - Image ${selectedImage + 1}`}
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                            onClick={nextImage}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </>
                )}

                {/* Zoom Button */}
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                    onClick={() => setIsZoomed(true)}
                >
                    <ZoomIn className="w-4 h-4" />
                </Button>
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                    ? "border-primary shadow-lg"
                                    : "border-border/40 hover:border-primary/50"
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${title} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Zoom Modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setIsZoomed(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl w-full aspect-square"
                        >
                            <Image
                                src={images[selectedImage]}
                                alt={title}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
