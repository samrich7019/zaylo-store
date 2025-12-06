"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Zap, Users, Award, TrendingUp } from "lucide-react"
import { Counter } from "@/components/ui/counter"

const values = [
    {
        icon: Heart,
        title: "Customer First",
        description: "Your satisfaction is our top priority. We go above and beyond to ensure you love your purchase."
    },
    {
        icon: Shield,
        title: "Quality Guaranteed",
        description: "Every product is carefully selected and quality-checked before it reaches you."
    },
    {
        icon: Zap,
        title: "Fast & Reliable",
        description: "Quick shipping across Pakistan with real-time tracking and secure packaging."
    },
    {
        icon: Award,
        title: "Authentic Products",
        description: "100% genuine accessories from trusted brands. No compromises on quality."
    }
]

export default function AboutPage() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold">
                            Welcome to <span className="gradient-text">Zaylo</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground">
                            Pakistan's Trusted Destination for Premium Tech Accessories
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-lg max-w-none"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                At Zaylo, we believe your devices deserve the perfect balance of <strong className="text-foreground">style, protection, and performance</strong> — and that's exactly what we deliver.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Whether you're looking for a sleek phone case, fast charger, or wireless earbuds — <strong className="text-foreground">Zaylo has your back</strong>. We're not just selling products; we're enhancing the way you experience your devices every day.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 md:py-32 bg-muted/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-xl text-muted-foreground">What makes Zaylo different</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-background p-8 rounded-2xl border border-border/40 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { end: 10000, suffix: "+", label: "Happy Customers", icon: Users },
                            { end: 500, suffix: "+", label: "Products", icon: Award },
                            { end: 50, suffix: "+", label: "Cities", icon: TrendingUp },
                            { end: 4.8, suffix: "★", label: "Rating", icon: Heart }
                        ].map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                                        <Counter end={stat.end} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-background p-8 rounded-2xl border border-border/40"
                        >
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To upgrade your everyday digital life with premium accessories that look great and work flawlessly. We're enhancing the way you experience your devices every day.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-background p-8 rounded-2xl border border-border/40"
                        >
                            <h3 className="text-2xl font-bold mb-4">Why Choose Zaylo?</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-500 text-xs">✓</span>
                                    </div>
                                    7-day checking warranty
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-500 text-xs">✓</span>
                                    </div>
                                    Cash on Delivery available
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-500 text-xs">✓</span>
                                    </div>
                                    Secure packaging & handling
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-500 text-xs">✓</span>
                                    </div>
                                    Quality-checked products
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
