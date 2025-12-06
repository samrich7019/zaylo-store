"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
    id: string
    title: string
    price: number
    image: string
    handle: string
}

interface ProductShowcaseProps {
    products: Product[]
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
    const displayProducts = products.slice(0, 6)

    return (
        <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-between items-end mb-16"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Best Sellers
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Our most loved products
                        </p>
                    </div>
                    <Link href="/collections/all">
                        <Button variant="outline" className="group">
                            View All
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={`/products/${product.handle}`}>
                                <div className="group relative bg-card rounded-2xl overflow-hidden hover-lift border border-border">
                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden bg-muted">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Quick View Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="secondary" size="sm">
                                                Quick View
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold">
                                                PKR {product.price.toLocaleString()}
                                            </span>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="w-5 h-5 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
