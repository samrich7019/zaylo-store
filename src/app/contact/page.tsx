"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-12"
            >
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-4 font-montserrat">Get in Touch</h1>
                        <p className="text-muted-foreground">
                            We're here to help! Whether you have a question about your order, need product advice, or want to share feedback — we'd love to hear from you.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">Email Us</h3>
                                <p className="text-muted-foreground">support@zaylo.pk</p>
                                <p className="text-xs text-muted-foreground">We respond within 24 hours.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">Customer Support</h3>
                                <p className="text-muted-foreground">Available 9 AM - 6 PM (Mon-Sat)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">Location</h3>
                                <p className="text-muted-foreground">Pakistan</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border/40">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                                <Input id="firstName" placeholder="John" className="bg-background border-border" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                                <Input id="lastName" placeholder="Doe" className="bg-background border-border" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                            <Input id="email" type="email" placeholder="john@example.com" className="bg-background border-border" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                            <Textarea id="message" placeholder="How can we help you?" className="bg-background border-border min-h-[150px]" />
                        </div>
                        <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Send Message
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
