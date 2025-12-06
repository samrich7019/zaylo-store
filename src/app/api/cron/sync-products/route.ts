// API Route: Cron job for syncing HHC products
// POST /api/cron/sync-products

import { NextRequest, NextResponse } from 'next/server'
import { productSync } from '@/lib/product-sync'
import { ENABLED_CATEGORIES } from '@/lib/hhc-api'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        // Verify cron secret for security
        const authHeader = request.headers.get('authorization')
        const cronSecret = process.env.CRON_SECRET

        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if sync is enabled
        const syncEnabled = process.env.ENABLE_HHC_SYNC === 'true'
        if (!syncEnabled) {
            return NextResponse.json({
                success: false,
                message: 'HHC sync is disabled. Set ENABLE_HHC_SYNC=true to enable.',
            })
        }

        console.log('Starting HHC product sync...')

        const syncResults = {
            timestamp: new Date().toISOString(),
            categories: {} as Record<string, any>,
            totalProducts: 0,
            totalSuccess: 0,
            totalFailed: 0,
        }

        // Sync each enabled category
        for (const category of ENABLED_CATEGORIES) {
            console.log(`Syncing category: ${category}`)

            const result = await productSync.syncByCategory(category, 20) // Limit per category

            syncResults.categories[category] = result
            syncResults.totalProducts += result.total
            syncResults.totalSuccess += result.success
            syncResults.totalFailed += result.failed
        }

        console.log('Sync completed:', syncResults)

        return NextResponse.json({
            success: true,
            message: 'Product sync completed',
            results: syncResults,
        })
    } catch (error) {
        console.error('Sync error:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// Allow manual triggering via GET for testing
export async function GET(request: NextRequest) {
    const isLocal = process.env.NODE_ENV === 'development'

    if (!isLocal) {
        return NextResponse.json({ error: 'Manual sync only available in development' }, { status: 403 })
    }

    return POST(request)
}
