"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
    return (
        <section className="py-0 my-20">
            <div className="container mx-auto px-4">
                <Link href="/collections/all">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-2xl overflow-hidden group bg-gradient-to-r from-orange-600 to-red-600"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]" />
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex items-center">
                            <div className="w-full max-w-2xl px-12 text-white">
                                <motion.div
                                    initial={{ x: -30, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-sm font-bold uppercase tracking-wider mb-4 text-yellow-300">⚡ Flash Deals</p>
                                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                                        Save Big Today!
                                    </h2>
                                    <p className="text-xl mb-8 text-white/90">
                                        Up to 50% off on selected items. Limited time offer on premium accessories.
                                    </p>
                                    <Button size="lg" variant="secondary" className="rounded-full bg-white text-black hover:bg-gray-100">
                                        Shop Deals
                                    </Button>
                                </motion.div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
                        </div>
                    </motion.div>
                </Link>
            </div>
        </section>
    )
}
