// HHC Product Scraper
// Scrapes product details from HHC product pages

import * as cheerio from 'cheerio'

export interface HHCScrapedProduct {
    title: string
    description: string
    price: number
    images: string[]
    category?: string
    sku?: string
    vendor: string
}

export async function scrapeHHCProduct(url: string): Promise<HHCScrapedProduct | null> {
    try {
        // Fetch the product page
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`)
        }

        const html = await response.text()
        const $ = cheerio.load(html)

        // Extract product details
        // Note: These selectors might need adjustment based on actual HHC website structure
        const title = $('h1.product-title, h1[class*="product"], .product-name, h1').first().text().trim()
        const description = $('.product-description, .description, [class*="description"]').first().html() || ''

        // Extract price (remove PKR, Rs, commas, etc.)
        const priceText = $('.price, .product-price, [class*="price"]').first().text()
        const priceMatch = priceText.match(/[\d,]+/)
        const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0

        // Extract images
        const images: string[] = []
        $('img[class*="product"], .product-image img, .gallery img').each((_, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src')
            if (src && !src.includes('placeholder') && !src.includes('logo')) {
                // Convert relative URLs to absolute
                const absoluteUrl = src.startsWith('http') ? src : `https://hhcdropshipping.com${src}`
                images.push(absoluteUrl)
            }
        })

        // Extract category if available
        const category = $('.breadcrumb a, .category-link').last().text().trim() || 'Accessories'

        // Extract SKU if available
        const sku = $('.sku, [class*="sku"]').first().text().replace(/SKU:?\s*/i, '').trim()

        if (!title || !price) {
            throw new Error('Could not extract required product information')
        }

        return {
            title,
            description: description || title,
            price,
            images: images.length > 0 ? images : ['https://via.placeholder.com/500'],
            category,
            sku,
            vendor: 'HHC Dropshipping'
        }
    } catch (error) {
        console.error('Scraping error:', error)
        return null
    }
}

// Categorize product based on title/description
export function categorizeProduct(title: string, description: string): string {
    const text = `${title} ${description}`.toLowerCase()

    if (text.includes('case') || text.includes('cover')) return 'Phone Cases'
    if (text.includes('earbud') || text.includes('airpod')) return 'Earbuds'
    if (text.includes('charger') || text.includes('charging')) return 'Chargers'
    if (text.includes('powerbank') || text.includes('power bank')) return 'Powerbank'
    if (text.includes('headphone') || text.includes('headset')) return 'Headphones'
    if (text.includes('adapter')) return 'Adapters'

    return 'Accessories'
}
