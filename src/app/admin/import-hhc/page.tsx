"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Download, CheckCircle, XCircle, DollarSign, Package, ExternalLink } from "lucide-react"

interface ImportResult {
    success: boolean
    message?: string
    product?: {
        id: string
        title: string
        shopifyUrl: string
        storeUrl: string
        hhcPrice: number
        sellingPrice: number
        profit: number
        category: string
    }
    error?: string
}

export default function HHCImportTool() {
    const [productUrl, setProductUrl] = useState("")
    const [markup, setMarkup] = useState(30)
    const [importing, setImporting] = useState(false)
    const [result, setResult] = useState<ImportResult | null>(null)

    const handleImport = async () => {
        if (!productUrl.trim()) {
            alert('Please enter a product URL')
            return
        }

        setImporting(true)
        setResult(null)

        try {
            const response = await fetch('/api/import-hhc-product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: productUrl, markup })
            })

            const data = await response.json()
            setResult(data)

            if (data.success) {
                setProductUrl('') // Clear input on success
            }
        } catch (error) {
            setResult({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        } finally {
            setImporting(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">HHC Product Importer</h1>
                <p className="text-muted-foreground mb-8">
                    Paste HHC product URL to auto-import to your Shopify store
                </p>

                {/* Import Form */}
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                    <div className="space-y-4">
                        {/* Product URL Input */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                HHC Product URL
                            </label>
                            <Input
                                type="url"
                                value={productUrl}
                                onChange={(e) => setProductUrl(e.target.value)}
                                placeholder="https://hhcdropshipping.com/product/..."
                                className="text-base"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Example: https://hhcdropshipping.com/product/wireless-earbuds
                            </p>
                        </div>

                        {/* Markup Percentage */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Markup Percentage (%)
                            </label>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="number"
                                    value={markup}
                                    onChange={(e) => setMarkup(parseInt(e.target.value) || 30)}
                                    min="0"
                                    max="200"
                                    className="w-32"
                                />
                                <span className="text-sm text-muted-foreground">
                                    Your profit margin on this product
                                </span>
                            </div>
                        </div>

                        {/* Import Button */}
                        <Button
                            onClick={handleImport}
                            disabled={importing || !productUrl.trim()}
                            size="lg"
                            className="w-full gap-2"
                        >
                            <Download className={`w-4 h-4 ${importing ? 'animate-bounce' : ''}`} />
                            {importing ? 'Importing...' : 'Import Product'}
                        </Button>
                    </div>
                </div>

                {/* Import Result */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`rounded-xl border p-6 ${result.success
                                    ? 'bg-green-500/10 border-green-500/20'
                                    : 'bg-red-500/10 border-red-500/20'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                {result.success ? (
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-500" />
                                )}
                                <span className="font-semibold text-lg">
                                    {result.success ? 'Product Imported!' : 'Import Failed'}
                                </span>
                            </div>

                            {result.success && result.product && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">{result.product.title}</h3>
                                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                            {result.product.category}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 p-4 bg-background/50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-sm text-muted-foreground mb-1">HHC Cost</div>
                                            <div className="text-xl font-bold">PKR {result.product.hhcPrice}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-muted-foreground mb-1">Your Price</div>
                                            <div className="text-xl font-bold text-primary">PKR {result.product.sellingPrice}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-muted-foreground mb-1">Profit</div>
                                            <div className="text-xl font-bold text-green-500">PKR {result.product.profit}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <a
                                            href={result.product.shopifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <Button variant="outline" className="w-full gap-2">
                                                <Package className="w-4 h-4" />
                                                Edit in Shopify
                                            </Button>
                                        </a>
                                        <a
                                            href={result.product.storeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <Button variant="default" className="w-full gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                View on Store
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            )}

                            {!result.success && (
                                <p className="text-sm text-red-500">{result.error || result.message}</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Instructions */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="font-medium mb-2">How to Use:</h3>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Browse products on HHC Dropshipping website</li>
                        <li>Copy the product URL</li>
                        <li>Paste it above and set your markup percentage</li>
                        <li>Click "Import Product"</li>
                        <li>Product auto-creates in your Shopify store!</li>
                    </ol>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg border border-border p-4 text-center">
                        <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold">90%</div>
                        <div className="text-sm text-muted-foreground">Time Saved</div>
                    </div>
                    <div className="bg-card rounded-lg border border-border p-4 text-center">
                        <Package className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <div className="text-2xl font-bold">1-Click</div>
                        <div className="text-sm text-muted-foreground">Import</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
