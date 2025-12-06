"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Smartphone, Headphones, Battery, Shield } from "lucide-react"

const categories = [
    {
        title: "Phone Cases",
        description: "Premium protection with style",
        icon: Smartphone,
        href: "/collections/phone-cases",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Wireless Earbuds",
        description: "Crystal clear audio experience",
        icon: Headphones,
        href: "/collections/earbuds",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "Charging Solutions",
        description: "Fast & reliable power",
        icon: Battery,
        href: "/collections/chargers",
        gradient: "from-orange-500 to-red-500",
    },
    {
        title: "Screen Protectors",
        description: "Ultimate display protection",
        icon: Shield,
        href: "/collections/screen-protectors",
        gradient: "from-green-500 to-emerald-500",
    },
]

export function FeaturedCategories() {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated collection of premium accessories
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => {
                        const Icon = category.icon
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link href={category.href}>
                                    <div className="group relative overflow-hidden rounded-2xl p-8 h-64 flex flex-col justify-end cursor-pointer transition-all hover:scale-105 hover:shadow-2xl">
                                        {/* Gradient Background */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />

                                        {/* Grid Pattern */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />

                                        {/* Icon */}
                                        <div className="relative z-10 mb-4">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 text-white">
                                            <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                                            <p className="text-white/90 text-sm">{category.description}</p>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
