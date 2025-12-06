"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function DiscoverSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-[#1a2948] to-[#0f1f3d]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 text-white"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Discover smart devices, powerful gadgets,<br />
                        and sleek accessories, built to keep you<br />
                        connected and entertained.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { title: "Headphones", image: "/images/hero-headphones.png", href: "/collections/headphones" },
                        { title: "Assistant", image: "/images/hero-earbuds.png", href: "/collections/assistant" },
                        { title: "Earbuds", image: "/images/hero-earbuds.png", href: "/collections/earbuds" },
                        { title: "Smart", image: "/images/hero-phone-case.png", href: "/collections/smart" }
                    ].map((category, index) => (
                        <motion.a
                            key={category.title}
                            href={category.href}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative h-64 rounded-2xl overflow-hidden group bg-gradient-to-br from-gray-200 to-gray-100"
                        >
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-2xl font-bold">{category.title}</h3>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
