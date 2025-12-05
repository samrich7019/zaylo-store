"use client"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { motion } from "framer-motion"
import { ArrowRight, Star, Shield, Zap, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Product {
    id: string
    title: string
    price: number
    image: string
    category: string
}

interface HomeViewProps {
    products: Product[]
}

export default function HomeView({ products }: HomeViewProps) {
    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
                <div className="container mx-auto h-full px-4 flex flex-col md:flex-row items-center justify-center gap-10 relative z-10">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground font-montserrat"
                        >
                            Welcome to <span className="text-primary">Zaylo</span> <br />
                            Your Device, Upgraded.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
                        >
                            Discover premium phone accessories designed for style, protection, and performance.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        >
                            <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                                Shop Accessories
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 border-border hover:bg-muted text-foreground">
                                View Collections
                            </Button>
                        </motion.div>
                    </div>
                    <div className="flex-1 relative h-full w-full flex items-center justify-center">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            src="/images/hero-iphone.png"
                            alt="iPhone 16 Pro Max Case"
                            className="max-h-[600px] w-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: Truck, title: "Fast Delivery", desc: "2-5 working days nationwide." },
                        { icon: Shield, title: "7-Day Warranty", desc: "Shop with confidence." },
                        { icon: Zap, title: "COD Available", desc: "Pay when you receive." },
                        { icon: CheckCircle, title: "Quality Checked", desc: "Inspected before dispatch." },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Collections */}
            <section className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold text-foreground font-montserrat">Featured Collections</h2>
                    <Link href="/collections/all" className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { name: "iPhone Cases", image: "/images/hero-iphone.png", link: "iphone-cases" },
                        { name: "Samsung Cases", image: "/images/hero-samsung.png", link: "samsung-cases" },
                        { name: "Earbuds", image: "/images/product-charger.png", link: "earbuds" },
                        { name: "Chargers", image: "/images/product-charger.png", link: "chargers" },
                    ].map((collection, i) => (
                        <Link key={i} href={`/collections/${collection.link}`} className="group relative h-64 overflow-hidden rounded-2xl border border-border bg-muted">
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-foreground mb-10 font-montserrat">Best Sellers</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            category={product.category}
                        />
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section className="container mx-auto px-4 py-20 border-t border-border/40">
                <h2 className="text-3xl font-bold text-center text-foreground mb-16 font-montserrat">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Ali K.", text: "Best case I've ever owned. The buttons are clicky and the grip is perfect.", rating: 5 },
                        { name: "Sara M.", text: "Love the minimal design. It protects my phone without adding bulk.", rating: 5 },
                        { name: "Ahmed R.", text: "Shipping was super fast to Lahore and the packaging felt very premium.", rating: 5 },
                    ].map((review, i) => (
                        <div key={i} className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                            <div className="flex gap-1 text-yellow-500 mb-4">
                                {[...Array(review.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                            </div>
                            <p className="text-muted-foreground mb-6">"{review.text}"</p>
                            <p className="font-bold text-foreground">{review.name}</p>
                            <p className="text-xs text-muted-foreground">Verified Buyer</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
