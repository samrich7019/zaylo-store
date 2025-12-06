import { DualHero } from "@/components/home/dual-hero"
import { ScrollingMarquee } from "@/components/home/scrolling-marquee"
import { ProductShowcase } from "@/components/home/product-showcase"
import { CategorySlider } from "@/components/home/category-slider"
import { DiscoverSection } from "@/components/home/discover-section"
import { DiscoverYourEdge } from "@/components/home/discover-your-edge"
import { TrustSection } from "@/components/home/trust-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { getProducts } from "@/lib/shopify"

export default async function HomePage() {
    const { products } = await getProducts()

    return (
        <main className="min-h-screen">
            <DualHero />
            <ScrollingMarquee />
            <ProductShowcase products={products} />
            <CategorySlider />
            <DiscoverSection />
            <DiscoverYourEdge />
            <TrustSection />
            <NewsletterSection />
        </main>
    )
}
