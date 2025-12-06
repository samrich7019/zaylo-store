"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
    {
        id: 1,
        title: "Earbuds",
        subtitle: "Experience sound that",
        subtitle2: "travels with you.",
        image: "/images/hero-earbuds.png",
        bgColor: "from-[#1a2642] to-[#0a1628]",
        products: [
            "/images/hero-earbuds.png",
            "/images/hero-headphones.png",
            "/images/hero-phone-case.png",
            "/images/hero-charger.png",
            "/images/hero-earbuds.png"
        ]
    },
    {
        id: 2,
        title: "Headphones",
        subtitle: "Enjoy seamless audio",
        subtitle2: "anytime, anywhere",
        image: "/images/hero-headphones.png",
        bgColor: "from-gray-300 to-gray-200",
        products: [
            "/images/hero-headphones.png",
            "/images/hero-earbuds.png",
            "/images/hero-phone-case.png",
            "/images/hero-charger.png",
            "/images/hero-headphones.png"
        ]
    },
    {
        id: 3,
        title: "Smart Watch",
        subtitle: "Power on your wrist.",
        subtitle2: "Everywhere you go",
        image: "/images/hero-phone-case.png",
        bgColor: "from-gray-400 to-gray-300",
        products: [
            "/images/hero-phone-case.png",
            "/images/hero-charger.png",
            "/images/hero-earbuds.png",
            "/images/hero-headphones.png",
            "/images/hero-phone-case.png"
        ]
    }
]

export function CategorySlider() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % categories.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length)

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="relative h-[600px] rounded-3xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute inset-0 bg-gradient-to-br ${categories[currentSlide].bgColor}`}
                        >
                            {/* Background Image */}
                            <Image
                                src={categories[currentSlide].image}
                                alt={categories[currentSlide].title}
                                fill
                                className="object-cover opacity-80"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                            {/* Content Card */}
                            <div className="absolute left-12 top-1/2 -translate-y-1/2 max-w-md">
                                <motion.div
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
                                >
                                    {/* Category Badge */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-sm font-medium text-gray-600">
                                            {categories[currentSlide].title}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {currentSlide + 1} / {categories.length}
                                        </span>
                                    </div>

                                    {/* Heading */}
                                    <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                        {categories[currentSlide].subtitle}<br />
                                        {categories[currentSlide].subtitle2}
                                    </h2>

                                    {/* Shop Collection Button */}
                                    <Link href={`/collections/${categories[currentSlide].title.toLowerCase()}`}>
                                        <Button variant="ghost" className="text-gray-700 hover:text-gray-900 px-0 mb-8">
                                            Shop Collection →
                                        </Button>
                                    </Link>

                                    {/* Product Thumbnails */}
                                    <div className="flex gap-3">
                                        {categories[currentSlide].products.map((product, idx) => (
                                            <button
                                                key={idx}
                                                className="relative w-14 h-14 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors overflow-hidden"
                                            >
                                                <Image
                                                    src={product}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>

                            {/* Scroll Button */}
                            <button className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
