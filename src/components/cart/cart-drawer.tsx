"use client"

import { Button } from "@/components/ui/button"
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "./cart-context"

export function CartDrawer() {
    const { cart, isOpen, closeCart, removeItem, updateItem } = useCart()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={closeCart}
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-white/10 bg-black p-6 shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Your Cart
                            </h2>
                            <Button variant="ghost" size="icon" onClick={closeCart}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {!cart || cart.lines.edges.length === 0 ? (
                            <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4">
                                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                                    <ShoppingBag className="h-8 w-8 text-gray-500" />
                                </div>
                                <p className="text-gray-400">Your cart is empty</p>
                                <Button variant="default" onClick={closeCart}>
                                    Start Shopping
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                                    {cart.lines.edges.map(({ node: item }) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="h-20 w-20 rounded-md bg-white/5 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.merchandise.product.featuredImage?.url || "/images/product-case.png"}
                                                    alt={item.merchandise.product.featuredImage?.altText || item.merchandise.product.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h3 className="text-sm font-medium text-white">{item.merchandise.product.title}</h3>
                                                <p className="text-xs text-gray-400">
                                                    {item.merchandise.title !== "Default Title" ? item.merchandise.title : ""}
                                                </p>
                                                <p className="text-sm font-medium text-white">
                                                    {item.cost.totalAmount.currencyCode} {parseFloat(item.cost.totalAmount.amount).toLocaleString()}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex items-center gap-1 bg-white/5 rounded-md">
                                                        <button
                                                            className="p-1 hover:text-white text-gray-400"
                                                            onClick={() => updateItem(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            className="p-1 hover:text-white text-gray-400"
                                                            onClick={() => updateItem(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
                                    <div className="flex items-center justify-between text-white">
                                        <span className="font-medium">Subtotal</span>
                                        <span className="font-bold">
                                            {cart.cost.subtotalAmount.currencyCode} {parseFloat(cart.cost.subtotalAmount.amount).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 text-center">
                                        Shipping and taxes calculated at checkout.
                                    </p>
                                    <a href={cart.checkoutUrl} className="block w-full">
                                        <Button className="w-full" size="lg">
                                            Checkout
                                        </Button>
                                    </a>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
