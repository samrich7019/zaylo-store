"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
    {
        title: "Wireless Earbuds",
        subtitle: "Pure Sound Elite",
        description: "Experience sublime clarity",
        image: "/images/hero-earbuds.png",
        href: "/collections/earbuds",
        bgColor: "from-blue-900 to-blue-700"
    },
    {
        title: "Phone Cases",
        subtitle: "Ultimate Protection",
        description: "Style meets durability",
        image: "/images/hero-phone-case.png",
        href: "/collections/phone-cases",
        bgColor: "from-purple-900 to-purple-700"
    },
    {
        title: "Fast Chargers",
        subtitle: "Power Up Quick",
        description: "Lightning fast charging",
        image: "/images/hero-charger.png",
        href: "/collections/chargers",
        bgColor: "from-indigo-900 to-indigo-700"
    }
]

export function CategoryShowcase() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={category.href}>
                                <div className={`relative h-[500px] rounded-2xl overflow-hidden group bg-gradient-to-br ${category.bgColor}`}>
                                    {/* Background Image */}
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                        >
                                            <p className="text-cyan-400 text-sm font-medium mb-2">{category.subtitle}</p>
                                            <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                                            <p className="text-gray-300 mb-6">{category.description}</p>
                                            <Button variant="secondary" className="rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                                                Shop Now
                                            </Button>
                                        </motion.div>
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
