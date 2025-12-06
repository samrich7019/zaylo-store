// Product Sync Service
// Syncs HHC products to Shopify store

import { hhcAPI, HHCProduct, CATEGORY_MAPPING } from './hhc-api'

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2024-01'

interface ShopifyProduct {
    title: string
    body_html: string
    vendor: string
    product_type: string
    tags: string
    variants: {
        price: string
        compare_at_price?: string
        sku: string
        inventory_quantity: number
        option1?: string
        option2?: string
    }[]
    images: {
        src: string
        position: number
    }[]
}

export class ProductSyncService {
    private adminApiUrl: string

    constructor() {
        if (!SHOPIFY_DOMAIN || !ADMIN_TOKEN) {
            throw new Error('Shopify Admin API not configured')
        }
        this.adminApiUrl = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}`
    }

    // Sync a single HHC product to Shopify
    async syncProduct(hhcProduct: HHCProduct): Promise<{ success: boolean; productId?: string; error?: string }> {
        try {
            // Check if product already exists
            const existingProduct = await this.findProductBySKU(hhcProduct.id)

            if (existingProduct) {
                // Update existing product
                return await this.updateProduct(existingProduct.id, hhcProduct)
            } else {
                // Create new product
                return await this.createProduct(hhcProduct)
            }
        } catch (error) {
            console.error('Sync error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    }

    // Create new product in Shopify
    private async createProduct(hhcProduct: HHCProduct): Promise<{ success: boolean; productId?: string }> {
        const shopifyProduct = this.mapToShopifyProduct(hhcProduct)

        const response = await fetch(`${this.adminApiUrl}/products.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ADMIN_TOKEN!,
            },
            body: JSON.stringify({ product: shopifyProduct }),
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Failed to create product: ${error}`)
        }

        const data = await response.json()
        return {
            success: true,
            productId: data.product.id,
        }
    }

    // Update existing product in Shopify
    private async updateProduct(shopifyProductId: string, hhcProduct: HHCProduct): Promise<{ success: boolean; productId?: string }> {
        const updates = {
            variants: hhcProduct.variants.map(v => ({
                price: v.price.toString(),
                inventory_quantity: v.inventory_quantity,
                sku: v.sku,
            })),
            tags: hhcProduct.tags.join(', '),
        }

        const response = await fetch(`${this.adminApiUrl}/products/${shopifyProductId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ADMIN_TOKEN!,
            },
            body: JSON.stringify({ product: updates }),
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Failed to update product: ${error}`)
        }

        return {
            success: true,
            productId: shopifyProductId,
        }
    }

    // Find product by SKU
    private async findProductBySKU(sku: string): Promise<{ id: string } | null> {
        const response = await fetch(`${this.adminApiUrl}/products.json?fields=id,variants&limit=1`, {
            headers: {
                'X-Shopify-Access-Token': ADMIN_TOKEN!,
            },
        })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        const product = data.products?.find((p: any) =>
            p.variants?.some((v: any) => v.sku === sku)
        )

        return product ? { id: product.id } : null
    }

    // Map HHC product to Shopify format
    private mapToShopifyProduct(hhcProduct: HHCProduct): ShopifyProduct {
        return {
            title: hhcProduct.title,
            body_html: hhcProduct.description,
            vendor: hhcProduct.vendor || 'HHC Dropshipping',
            product_type: CATEGORY_MAPPING[hhcProduct.category] || hhcProduct.product_type || 'Accessories',
            tags: [...hhcProduct.tags, 'HHC', 'Winning Product'].join(', '),
            variants: hhcProduct.variants.map(variant => ({
                price: variant.price.toString(),
                compare_at_price: hhcProduct.compare_at_price?.toString(),
                sku: variant.sku || hhcProduct.id,
                inventory_quantity: variant.inventory_quantity,
                option1: variant.option1,
                option2: variant.option2,
            })),
            images: hhcProduct.images.map((url, index) => ({
                src: url,
                position: index + 1,
            })),
        }
    }

    // Sync multiple products by category
    async syncByCategory(category: string, limit = 50): Promise<{
        total: number
        success: number
        failed: number
        errors: string[]
    }> {
        const results = {
            total: 0,
            success: 0,
            failed: 0,
            errors: [] as string[],
        }

        try {
            const products = await hhcAPI.getWinningProducts(category, limit)
            results.total = products.length

            for (const product of products) {
                const result = await this.syncProduct(product)
                if (result.success) {
                    results.success++
                } else {
                    results.failed++
                    if (result.error) {
                        results.errors.push(`${product.title}: ${result.error}`)
                    }
                }

                // Add delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500))
            }
        } catch (error) {
            results.errors.push(error instanceof Error ? error.message : 'Unknown error')
        }

        return results
    }
}

export const productSync = new ProductSyncService()
