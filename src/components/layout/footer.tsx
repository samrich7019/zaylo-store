"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Footer() {
    const [email, setEmail] = useState("")

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter subscription
        console.log("Subscribe:", email)
        setEmail("")
    }

    return (
        <footer className="border-t border-border/40 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 py-16">
                {/* Main Footer Content */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold gradient-text">Zaylo</span>
                        </Link>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Premium accessories for your lifestyle. Quality products, fast delivery, and exceptional customer service across Pakistan.
                        </p>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-3">Get 10% off your first order</h4>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                                <Button type="submit" className="rounded-lg">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Shop</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/collections/phone-cases" className="hover:text-primary transition-colors">Phone Cases</Link></li>
                            <li><Link href="/collections/earbuds" className="hover:text-primary transition-colors">Wireless Earbuds</Link></li>
                            <li><Link href="/collections/chargers" className="hover:text-primary transition-colors">Chargers</Link></li>
                            <li><Link href="/collections/screen-protectors" className="hover:text-primary transition-colors">Screen Protectors</Link></li>
                            <li><Link href="/collections/all" className="hover:text-primary transition-colors">All Products</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/pages/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/pages/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/pages/refund-policy" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/pages/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/pages/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/40">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Zaylo. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>We accept:</span>
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-muted rounded text-foreground font-medium">COD</div>
                                <div className="px-2 py-1 bg-muted rounded text-foreground font-medium">Card</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
