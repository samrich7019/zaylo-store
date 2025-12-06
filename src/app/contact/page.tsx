"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, MessageCircle, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Form submitted:", formData)
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <p className="text-muted-foreground mb-8">
                            Fill out the form and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                icon: Mail,
                                title: "Email Us",
                                content: "sam.rich7019@gmail.com",
                                subtitle: "We respond within 24 hours"
                            },
                            {
                                icon: Phone,
                                title: "Customer Support",
                                content: "+92 331 8213524",
                                subtitle: "Available 9 AM - 6 PM (Mon-Sat)"
                            },
                            {
                                icon: MapPin,
                                title: "Location",
                                content: "Islamabad, Pakistan",
                                subtitle: "Serving nationwide"
                            },
                            {
                                icon: MessageCircle,
                                title: "Live Chat",
                                content: "Coming Soon",
                                subtitle: "Real-time support"
                            }
                        ].map((item, index) => {
                            const Icon = item.icon
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.content}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-muted/30 to-transparent p-8 rounded-2xl border border-border/40"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium">
                                    First Name *
                                </label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                    className="bg-background"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium">
                                    Last Name *
                                </label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                    className="bg-background"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email *
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="bg-background"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">
                                Message *
                            </label>
                            <Textarea
                                id="message"
                                placeholder="How can we help you?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                className="bg-background min-h-[150px]"
                            />
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button type="submit" size="lg" className="w-full group">
                                Send Message
                                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>

                        <p className="text-xs text-center text-muted-foreground">
                            By submitting this form, you agree to our privacy policy.
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
