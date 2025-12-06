"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@/components/product/product-card"
import { QuickView } from "@/components/product/quick-view"
import { Filter, Grid, List, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import * as Tabs from "@radix-ui/react-tabs"

interface Product {
    id: string
    title: string
    price: number
    image: string
    category: string
    description?: string
}

interface CollectionViewProps {
    products: Product[]
    title: string
}

const categories = [
    { id: "all", label: "All Products" },
    { id: "phone-cases", label: "Phone Cases" },
    { id: "earbuds", label: "Earbuds" },
    { id: "chargers", label: "Chargers" },
    { id: "accessories", label: "Accessories" }
]

export function CollectionView({ products, title }: CollectionViewProps) {
    const [sortBy, setSortBy] = useState("featured")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [showFilters, setShowFilters] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(p => p.category.toLowerCase().includes(selectedCategory))

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            case "name":
                return a.title.localeCompare(b.title)
            default:
                return 0
        }
    })

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                <p className="text-muted-foreground">
                    {sortedProducts.length} products
                </p>
            </motion.div>

            {/* Throne-Style Tab Navigation */}
            <Tabs.Root value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
                <Tabs.List className="flex gap-2 border-b border-border/40 overflow-x-auto pb-px">
                    {categories.map((cat) => (
                        <Tabs.Trigger
                            key={cat.id}
                            value={cat.id}
                            className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary whitespace-nowrap"
                        >
                            {cat.label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </Tabs.Root>

            {/* Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-muted/30 rounded-xl border border-border/40"
            >
                <div className="flex items-center gap-2">
                    <Button
                        variant={showFilters ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="gap-2"
                    >
                        {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
                        {showFilters ? "Hide" : "Filters"}
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A-Z</option>
                    </select>

                    {/* View Mode */}
                    <div className="flex gap-1 p-1 bg-background rounded-lg border border-border">
                        <Button
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Filters Sidebar */}
            {showFilters && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-6 bg-muted/30 rounded-xl border border-border/40"
                >
                    <h3 className="font-semibold mb-4">Filters</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Price Range */}
                        <div>
                            <h4 className="text-sm font-medium mb-3">Price Range</h4>
                            <div className="space-y-2">
                                {["Under PKR 1,000", "PKR 1,000 - 2,000", "PKR 2,000 - 5,000", "Over PKR 5,000"].map((range) => (
                                    <label key={range} className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" className="rounded" />
                                        <span>{range}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div>
                            <h4 className="text-sm font-medium mb-3">Colors</h4>
                            <div className="flex flex-wrap gap-2">
                                {["#000000", "#FFFFFF", "#1E40AF", "#DC2626", "#059669", "#F59E0B"].map((color) => (
                                    <button
                                        key={color}
                                        className="w-8 h-8 rounded-full border-2 border-border hover:border-primary transition-colors"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h4 className="text-sm font-medium mb-3">Availability</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="rounded" defaultChecked />
                                    <span>In Stock</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="rounded" />
                                    <span>Out of Stock</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Products Grid - Throne Style (5-6 items per row on desktop) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={
                    viewMode === "grid"
                        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
                        : "flex flex-col gap-4"
                }
            >
                {sortedProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                    >
                        <ProductCard
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            secondaryImage={product.image} // In real app, use different image
                            category={product.category}
                            onQuickView={() => setQuickViewProduct(product)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                        <Filter className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your filters or check back later
                    </p>
                </motion.div>
            )}

            {/* Quick View Modal */}
            <QuickView
                product={quickViewProduct || { id: "", title: "", price: 0, image: "", category: "" }}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    )
}
