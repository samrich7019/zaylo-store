"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@/components/product/product-card"
import { useState } from "react"
import { QuickView } from "@/components/product/quick-view"

interface Product {
    id: string
    title: string
    price: number
    image: string
    category: string
    description?: string
}

interface ProductShowcaseProps {
    products: any[]
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

    const formattedProducts = products && products.length > 0
        ? products.slice(0, 3).map(p => ({
            id: p.handle,
            title: p.title,
            price: parseFloat(p.priceRange.minVariantPrice.amount),
            image: p.images.edges[0]?.node.url || "/images/product-case.png",
            category: "Tech",
            description: p.description
        }))
        : [
            { id: "1", title: "Ultra Wireless Headphones", price: 120, image: "/images/hero-headphones.png", category: "Audio" },
            { id: "2", title: "Voice Assistant Speaker", price: 246, image: "/images/hero-earbuds.png", category: "Smart Home" },
            { id: "3", title: "BassSync Pro Earbuds", price: 89, image: "/images/hero-phone-case.png", category: "Audio" }
        ]

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-orange-500">Tech You'll</span> Truly Love
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Upgrade every day with connected devices delivering effortless performance
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {formattedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                onQuickView={() => setQuickViewProduct(product)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <QuickView
                product={quickViewProduct || { id: "", title: "", price: 0, image: "", category: "" }}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </section>
    )
}
