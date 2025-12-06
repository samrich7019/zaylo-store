// HHC Dropshipping API Client
// Handles authentication and product fetching from HHC API

const HHC_API_URL = process.env.HHC_API_URL || 'https://api.hhcdropshipping.com'
const HHC_API_KEY = process.env.HHC_API_KEY
const HHC_API_SECRET = process.env.HHC_API_SECRET

export interface HHCProduct {
    id: string
    title: string
    description: string
    price: number
    compare_at_price?: number
    currency: string
    category: string
    images: string[]
    variants: {
        id: string
        title: string
        price: number
        sku: string
        inventory_quantity: number
        option1?: string
        option2?: string
    }[]
    inventory_quantity: number
    tags: string[]
    vendor: string
    product_type: string
}

export interface HHCCategory {
    id: string
    name: string
    slug: string
}

class HHCDropshippingAPI {
    private apiKey: string
    private apiSecret: string
    private baseUrl: string
    private token: string | null = null

    constructor() {
        if (!HHC_API_KEY || !HHC_API_SECRET) {
            throw new Error('HHC API credentials not configured')
        }
        this.apiKey = HHC_API_KEY
        this.apiSecret = HHC_API_SECRET
        this.baseUrl = HHC_API_URL
    }

    // Authenticate with HHC API
    async authenticate(): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: this.apiKey,
                    api_secret: this.apiSecret,
                }),
            })

            if (!response.ok) {
                throw new Error(`Authentication failed: ${response.statusText}`)
            }

            const data = await response.json()
            this.token = data.access_token
        } catch (error) {
            console.error('HHC Authentication error:', error)
            throw error
        }
    }

    // Get winning products by category
    async getWinningProducts(category?: string, limit = 50): Promise<HHCProduct[]> {
        if (!this.token) {
            await this.authenticate()
        }

        try {
            const params = new URLSearchParams({
                limit: limit.toString(),
                type: 'winning',
            })

            if (category) {
                params.append('category', category)
            }

            const response = await fetch(`${this.baseUrl}/products?${params}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`)
            }

            const data = await response.json()
            return data.products || []
        } catch (error) {
            console.error('HHC Get Products error:', error)
            throw error
        }
    }

    // Get product details
    async getProductDetails(productId: string): Promise<HHCProduct | null> {
        if (!this.token) {
            await this.authenticate()
        }

        try {
            const response = await fetch(`${this.baseUrl}/products/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch product: ${response.statusText}`)
            }

            const data = await response.json()
            return data.product
        } catch (error) {
            console.error('HHC Get Product Details error:', error)
            return null
        }
    }

    // Get inventory for a product
    async getInventory(productId: string): Promise<number> {
        if (!this.token) {
            await this.authenticate()
        }

        try {
            const response = await fetch(`${this.baseUrl}/inventory/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch inventory: ${response.statusText}`)
            }

            const data = await response.json()
            return data.quantity || 0
        } catch (error) {
            console.error('HHC Get Inventory error:', error)
            return 0
        }
    }

    // Get categories
    async getCategories(): Promise<HHCCategory[]> {
        if (!this.token) {
            await this.authenticate()
        }

        try {
            const response = await fetch(`${this.baseUrl}/categories`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.statusText}`)
            }

            const data = await response.json()
            return data.categories || []
        } catch (error) {
            console.error('HHC Get Categories error:', error)
            return []
        }
    }
}

// Export singleton instance
export const hhcAPI = new HHCDropshippingAPI()

// Category mapping for your store
export const CATEGORY_MAPPING: Record<string, string> = {
    'phone-cases': 'Phone Cases',
    'earbuds': 'Earbuds',
    'chargers': 'Chargers',
    'powerbank': 'Powerbank',
    'headphones': 'Headphones',
    'adapters': 'Adapters',
    'accessories': 'Accessories',
}

export const ENABLED_CATEGORIES = [
    'phone-cases',
    'earbuds',
    'chargers',
    'powerbank',
    'headphones',
    'adapters',
    'accessories',
]
