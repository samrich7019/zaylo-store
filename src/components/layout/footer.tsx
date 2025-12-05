import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background py-12 text-muted-foreground">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold tracking-tighter text-primary font-montserrat">Zaylo</span>
                        </Link>
                        <p className="text-sm">
                            Smart Gear for Your Everyday Life. Premium protection and accessories for your devices.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/collections/iphone-cases" className="hover:text-primary transition-colors">iPhone Cases</Link></li>
                            <li><Link href="/collections/samsung-cases" className="hover:text-primary transition-colors">Samsung Cases</Link></li>
                            <li><Link href="/collections/earbuds" className="hover:text-primary transition-colors">Earbuds</Link></li>
                            <li><Link href="/collections/chargers" className="hover:text-primary transition-colors">Chargers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/pages/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/pages/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/pages/refund-policy" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/pages/warranty" className="hover:text-primary transition-colors">Warranty</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Connect</h3>
                        <div className="flex gap-4 mb-4">
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-xs font-semibold text-foreground mb-2">Subscribe for 10% off</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-muted border border-border rounded px-3 py-1 text-sm w-full focus:outline-none focus:border-primary"
                                />
                                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-border/40 pt-8 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Zaylo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
