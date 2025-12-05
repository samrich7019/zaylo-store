"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function TrackOrderPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-2xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 text-center"
            >
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-4 font-montserrat">Track Your Order</h1>
                    <p className="text-muted-foreground">Enter your order number and phone number to check the status of your delivery.</p>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border/40 space-y-6 text-left">
                    <div className="space-y-2">
                        <label htmlFor="orderNumber" className="text-sm font-medium text-foreground">Order Number</label>
                        <Input id="orderNumber" placeholder="e.g. #1001" className="bg-background border-border" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                        <Input id="phone" placeholder="e.g. 03001234567" className="bg-background border-border" />
                    </div>
                    <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Track Order
                    </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                    <p>Having trouble?</p>
                    <p>Contact us at <a href="mailto:support@zaylo.pk" className="text-primary hover:underline">support@zaylo.pk</a></p>
                </div>
            </motion.div>
        </div>
    )
}
