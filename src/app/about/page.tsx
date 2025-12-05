"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
            >
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground font-montserrat">Welcome to Zaylo</h1>
                    <p className="text-xl text-primary font-medium">Pakistan's Trusted Destination for Modern Phone Accessories</p>
                </div>

                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                        At Zaylo, we believe your devices deserve the perfect balance of <strong>style, protection, and performance</strong> — and that's exactly what we deliver.
                        Whether you're looking for a sleek phone case, fast charger, or wireless earbuds — <strong>Zaylo has your back</strong>.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-card p-8 rounded-2xl border border-border/40">
                        <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
                        <p className="text-muted-foreground">
                            To upgrade your everyday digital life with premium accessories that look great and work flawlessly.
                            We're not just selling products—we're enhancing the way you experience your devices every day.
                        </p>
                    </div>
                    <div className="bg-card p-8 rounded-2xl border border-border/40">
                        <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Zaylo?</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>✅ 7-day checking warranty on all products</li>
                            <li>✅ Cash on Delivery (COD) available</li>
                            <li>✅ Secure packaging and careful handling</li>
                            <li>✅ Quality-checked products before dispatch</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
