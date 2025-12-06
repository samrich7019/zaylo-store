"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const products = [
    { title: "StreamLine Pro Cam", price: "$7,384.00", image: "/images/hero-phone-case.png" },
    { title: "NovaWatch 360 Cam", price: "$5,689.00", image: "/images/hero-earbuds.png" },
    { title: "SphereCam Smart Assistant", price: "$7,238.00", image: "/images/hero-charger.png" },
    { title: "FluxWear Smartwatch", price: "$5,627.00", image: "/images/hero-headphones.png" }
]

export function DiscoverYourEdge() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-12"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">
                            <span className="text-orange-500">Discover</span> Your Edge
                        </h2>
                        <p className="text-muted-foreground">
                            Upgrade every day with connected devices delivering effortless performance,<br />
                            style, and convenience.
                        </p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-border hover:bg-muted flex items-center justify-center">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-border hover:bg-muted flex items-center justify-center">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="font-semibold mb-1">{product.title}</h3>
                            <p className="text-sm text-muted-foreground">{product.price}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Full-width lifestyle banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative h-96 rounded-2xl overflow-hidden"
                >
                    <Image
                        src="/images/hero-headphones.png"
                        alt="Lifestyle"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </motion.div>
            </div>
        </section>
    )
}
