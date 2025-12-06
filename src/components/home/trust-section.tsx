"use client"

import { motion } from "framer-motion"
import { Shield, Truck, RotateCcw, CreditCard } from "lucide-react"
import { Counter } from "@/components/ui/counter"

const features = [
    {
        icon: CreditCard,
        title: "Cash on Delivery",
        description: "Pay when you receive your order",
    },
    {
        icon: Truck,
        title: "Fast Shipping",
        description: "Nationwide delivery in 2-5 days",
    },
    {
        icon: RotateCcw,
        title: "7-Day Returns",
        description: "Easy returns & exchanges",
    },
    {
        icon: Shield,
        title: "Authentic Products",
        description: "100% genuine accessories",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
}

export function TrustSection() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        whileInView={{ scale: [0.95, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Choose Zaylo?
                    </motion.h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your satisfaction is our priority
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="text-center group"
                            >
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mb-6 group-hover:shadow-lg transition-shadow"
                                >
                                    <Icon className="w-8 h-8" />
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { end: 10000, suffix: "+", label: "Happy Customers" },
                        { end: 500, suffix: "+", label: "Products" },
                        { end: 50, suffix: "+", label: "Cities Covered" },
                        { end: 4.8, suffix: "★", label: "Average Rating" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-transparent border border-border/50"
                        >
                            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                                <Counter end={stat.end} suffix={stat.suffix} />
                            </div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
