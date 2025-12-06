"use server"

import { addToCart, createCart, getCart, removeFromCart, updateCartLines } from "@/lib/shopify"

export async function createCartAction() {
    return await createCart()
}

export async function addToCartAction(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
    return await addToCart(cartId, lines)
}

export async function removeFromCartAction(cartId: string, lineIds: string[]) {
    return await removeFromCart(cartId, lineIds)
}

export async function updateCartLinesAction(cartId: string, lines: { id: string; quantity: number }[]) {
    return await updateCartLines(cartId, lines)
}

export async function getCartAction(cartId: string) {
    return await getCart(cartId)
}
