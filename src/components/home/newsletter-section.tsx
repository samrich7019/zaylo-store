"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useState } from "react"

export function NewsletterSection() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Newsletter signup:", email)
        setEmail("")
    }

    return (
        <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:40px_40px] bg-[position:0_0,20px_20px]" />
            </div>

            {/* Floating Orbs */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center text-white"
                >
                    <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Stay in the Loop
                    </h2>
                    <p className="text-xl mb-8 text-white/90">
                        Subscribe to get exclusive deals, new arrivals, and tech tips delivered to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
                        />
                        <Button type="submit" size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                            Subscribe
                        </Button>
                    </form>

                    <p className="text-sm text-white/70 mt-6">
                        Join 10,000+ subscribers. Unsubscribe anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
