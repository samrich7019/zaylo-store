"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function DualHero() {
    return (
        <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1a2642] to-[#0f1f3d]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Card - Lifestyle */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a2642] to-[#0a1628]"
                    >
                        <Image
                            src="/images/hero-headphones.png"
                            alt="Premium Audio"
                            fill
                            className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                Where <span className="text-orange-500">Excellence</span> Meets<br />
                                Deep Resonance
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Crafted for audiophiles, experience sublime<br />
                                clarity, warmth, and power daily.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Card - Product */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700"
                    >
                        <Image
                            src="/images/hero-earbuds.png"
                            alt="Pure Sound Elite"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute inset-0 p-12 flex flex-col justify-between text-white">
                            <div className="text-right">
                                <h3 className="text-cyan-400 text-2xl font-bold mb-2">Pure Sound Elite</h3>
                                <p className="text-sm text-gray-300">
                                    Redefining modern tech. Starts at<br />
                                    <span className="text-3xl font-bold">$132.99</span>
                                </p>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <Link href="/collections/all">
                                    <Button variant="secondary" className="rounded-full">
                                        Explore
                                    </Button>
                                </Link>
                                <Link href="/collections/all">
                                    <Button variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
                                        Shop now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
