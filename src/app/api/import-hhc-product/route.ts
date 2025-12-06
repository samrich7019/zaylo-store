// API Route: Import HHC product by URL
// POST /api/import-hhc-product

import { NextRequest, NextResponse } from 'next/server'
import { scrapeHHCProduct, categorizeProduct } from '@/lib/hhc-scraper'

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2024-01'

export async function POST(request: NextRequest) {
    try {
        const { url, markup } = await request.json()

        if (!url) {
            return NextResponse.json({ error: 'Product URL is required' }, { status: 400 })
        }

        // Validate URL
        if (!url.includes('hhcdropshipping.com')) {
            return NextResponse.json({ error: 'Invalid HHC product URL' }, { status: 400 })
        }

        console.log('Scraping product from:', url)

        // Scrape product details
        const scrapedProduct = await scrapeHHCProduct(url)

        if (!scrapedProduct) {
            return NextResponse.json({ error: 'Failed to scrape product details' }, { status: 500 })
        }

        // Apply markup (default 30% if not specified)
        const markupPercent = markup || 30
        const sellingPrice = Math.round(scrapedProduct.price * (1 + markupPercent / 100))

        // Categorize product
        const productType = categorizeProduct(scrapedProduct.title, scrapedProduct.description)

        // Create product in Shopify
        const shopify Product = {
            title: scrapedProduct.title,
            body_html: scrapedProduct.description,
            vendor: scrapedProduct.vendor,
            product_type: productType,
            tags: 'HHC, Imported, Dropshipping',
            variants: [{
                price: sellingPrice.toString(),
                sku: scrapedProduct.sku || `HHC-${Date.now()}`,
                inventory_management: null,
                inventory_policy: 'continue',
            }],
            images: scrapedProduct.images.map((url, index) => ({
                src: url,
                position: index + 1
            }))
        }

        // Create in Shopify
        const shopifyUrl = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/products.json`
        const response = await fetch(shopifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ADMIN_TOKEN!,
            },
            body: JSON.stringify({ product: shopifyProduct })
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Shopify API error: ${error}`)
        }

        const data = await response.json()
        const storeDomain = SHOPIFY_DOMAIN?.replace('.myshopify.com', '') || 'zaylo-store.one'

        return NextResponse.json({
            success: true,
            message: 'Product imported successfully',
            product: {
                id: data.product.id,
                title: data.product.title,
                shopifyUrl: `https://${SHOPIFY_DOMAIN}/admin/products/${data.product.id}`,
                storeUrl: `https://${storeDomain}/products/${data.product.handle}`,
                hhcPrice: scrapedProduct.price,
                sellingPrice: sellingPrice,
                profit: sellingPrice - scrapedProduct.price,
                category: productType
            }
        })
    } catch (error) {
        console.error('Import error:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
