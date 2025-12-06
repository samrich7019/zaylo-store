import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { ProductShowcase } from "@/components/home/product-showcase"
import { TrustSection } from "@/components/home/trust-section"
import { PromoBanner } from "@/components/home/promo-banner"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { InstagramFeed } from "@/components/home/instagram-feed"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { getProducts } from "@/lib/shopify"

export default async function HomePage() {
    const { products } = await getProducts()

    return (
        <main className="min-h-screen">
            <HeroSection />
            <FeaturedCategories />
            <CategoryShowcase />
            <ProductShowcase products={products} />
            <PromoBanner />
            <TrustSection />
            <InstagramFeed />
            <NewsletterSection />
        </main>
    )
}
