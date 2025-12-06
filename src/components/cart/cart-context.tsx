"use client"

import React, { createContext, useContext, useEffect, useState, useMemo } from "react"
import { ShopifyCart } from "@/lib/shopify"
import { createCartAction, addToCartAction, removeFromCartAction, updateCartLinesAction, getCartAction } from "@/app/actions"

type CartContextType = {
    cart: ShopifyCart | undefined
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    addItem: (variantId: string, quantity: number) => Promise<void>
    removeItem: (lineId: string) => Promise<void>
    updateItem: (lineId: string, quantity: number) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<ShopifyCart | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    useEffect(() => {
        const initializeCart = async () => {
            const existingCartId = localStorage.getItem("cartId")
            if (existingCartId) {
                const existingCart = await getCartAction(existingCartId)
                if (existingCart) {
                    setCart(existingCart)
                    return
                }
            }

            // Create new cart if none exists or fetch failed
            const newCart = await createCartAction()
            if (newCart) {
                setCart(newCart)
                localStorage.setItem("cartId", newCart.id)
            }
        }

        initializeCart()
    }, [])

    const addItem = async (variantId: string, quantity: number) => {
        console.log("Adding item to cart:", variantId, quantity);
        try {
            if (!cart) {
                console.log("No cart found, creating new one...");
                const newCart = await createCartAction()
                console.log("New cart created:", newCart);
                if (newCart) {
                    setCart(newCart)
                    localStorage.setItem("cartId", newCart.id)
                    const updatedCart = await addToCartAction(newCart.id, [{ merchandiseId: variantId, quantity }])
                    console.log("Item added to new cart:", updatedCart);
                    if (updatedCart) setCart(updatedCart)
                }
            } else {
                console.log("Adding to existing cart:", cart.id);
                const updatedCart = await addToCartAction(cart.id, [{ merchandiseId: variantId, quantity }])
                console.log("Item added to existing cart:", updatedCart);
                if (updatedCart) setCart(updatedCart)
            }
            openCart()
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    const removeItem = async (lineId: string) => {
        if (!cart) return
        const updatedCart = await removeFromCartAction(cart.id, [lineId])
        if (updatedCart) setCart(updatedCart)
    }

    const updateItem = async (lineId: string, quantity: number) => {
        if (!cart) return
        const updatedCart = await updateCartLinesAction(cart.id, [{ id: lineId, quantity }])
        if (updatedCart) setCart(updatedCart)
    }

    const value = useMemo(() => ({
        cart,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateItem
    }), [cart, isOpen])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
