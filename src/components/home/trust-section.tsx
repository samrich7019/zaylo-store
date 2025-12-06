"use client"

import { motion } from "framer-motion"
import { Shield, Truck, RotateCcw, CreditCard } from "lucide-react"

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

export function TrustSection() {
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
                        Why Choose Zaylo?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your satisfaction is our priority
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    <div>
                        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10K+</div>
                        <div className="text-muted-foreground">Happy Customers</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">500+</div>
                        <div className="text-muted-foreground">Products</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">50+</div>
                        <div className="text-muted-foreground">Cities Covered</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">4.8★</div>
                        <div className="text-muted-foreground">Average Rating</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
