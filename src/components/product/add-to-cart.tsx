"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"

export function AddToCart({ variantId, price }: { variantId: string | undefined, price: number }) {
    const { addItem } = useCart()
    const [isPending, startTransition] = useTransition()

    if (!variantId) {
        return (
            <Button disabled size="lg" className="w-full h-12 text-lg">
                Select Options
            </Button>
        )
    }

    return (
        <Button
            size="lg"
            className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
                startTransition(async () => {
                    await addItem(variantId, 1)
                })
            }}
            disabled={isPending}
        >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : `Add to Cart - PKR ${price.toLocaleString()}`}
        </Button>
    )
}
