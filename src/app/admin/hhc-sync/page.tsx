"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface SyncResult {
    success: boolean
    message?: string
    results?: {
        timestamp: string
        categories: Record<string, {
            total: number
            success: number
            failed: number
            errors: string[]
        }>
        totalProducts: number
        totalSuccess: number
        totalFailed: number
    }
    error?: string
}

export default function HHCSyncDashboard() {
    const [syncing, setSyncing] = useState(false)
    const [lastSync, setLastSync] = useState<SyncResult | null>(null)

    const triggerSync = async () => {
        setSyncing(true)
        try {
            const response = await fetch('/api/cron/sync-products', {
                method: 'POST',
            })
            const data = await response.json()
            setLastSync(data)
        } catch (error) {
            setLastSync({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        } finally {
            setSyncing(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">HHC Product Sync</h1>
                <p className="text-muted-foreground mb-8">
                    Manage automatic product imports from HHC Dropshipping
                </p>

                {/* Sync Control */}
                <div className="bg-card rounded-xl border border-border p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-1">Manual Sync</h2>
                            <p className="text-sm text-muted-foreground">
                                Trigger product sync immediately
                            </p>
                        </div>
                        <Button
                            onClick={triggerSync}
                            disabled={syncing}
                            size="lg"
                            className="gap-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                            {syncing ? 'Syncing...' : 'Sync Now'}
                        </Button>
                    </div>

                    {/* Sync Status */}
                    {lastSync && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 p-4 rounded-lg border ${lastSync.success
                                    ? 'bg-green-500/10 border-green-500/20'
                                    : 'bg-red-500/10 border-red-500/20'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                {lastSync.success ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                )}
                                <span className="font-medium">
                                    {lastSync.success ? 'Sync Completed' : 'Sync Failed'}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {lastSync.message || lastSync.error}
                            </p>

                            {/* Sync Results */}
                            {lastSync.results && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">{lastSync.results.totalProducts}</div>
                                        <div className="text-xs text-muted-foreground">Total Products</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-500">{lastSync.results.totalSuccess}</div>
                                        <div className="text-xs text-muted-foreground">Successful</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-500">{lastSync.results.totalFailed}</div>
                                        <div className="text-xs text-muted-foreground">Failed</div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Category Results */}
                {lastSync?.results && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Category Breakdown</h2>
                        {Object.entries(lastSync.results.categories).map(([category, result]) => (
                            <div key={category} className="bg-card rounded-lg border border-border p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium capitalize">{category.replace('-', ' ')}</h3>
                                    <div className="flex gap-2 text-sm">
                                        <span className="text-green-500">✓ {result.success}</span>
                                        {result.failed > 0 && (
                                            <span className="text-red-500">✕ {result.failed}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {result.total} products processed
                                </div>
                                {result.errors.length > 0 && (
                                    <div className="mt-2 text-xs text-red-500">
                                        {result.errors.slice(0, 3).map((error, i) => (
                                            <div key={i}>• {error}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Configuration Info */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium mb-1">Configuration Required</p>
                            <p className="text-muted-foreground">
                                Before syncing, ensure you've added HHC_API_KEY, HHC_API_SECRET, and SHOPIFY_ADMIN_API_TOKEN to your environment variables.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Enabled Categories */}
                <div className="mt-8">
                    <h3 className="font-semibold mb-3">Enabled Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Phone Cases', 'Earbuds', 'Chargers', 'Powerbank', 'Headphones', 'Adapters', 'Accessories'].map((cat) => (
                            <div key={cat} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
