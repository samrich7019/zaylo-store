import { getProducts } from "@/lib/shopify"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { ProductShowcase } from "@/components/home/product-showcase"
import { TrustSection } from "@/components/home/trust-section"

export default async function Home() {
    const { products: shopifyProducts, error } = await getProducts();

    const products = shopifyProducts.length > 0
        ? shopifyProducts.map(p => ({
            id: p.handle,
            title: p.title,
            price: parseFloat(p.priceRange.minVariantPrice.amount),
            image: p.images.edges[0]?.node.url || "/images/product-case.png",
            category: "Accessory",
            handle: p.handle,
        }))
        : [];

    return (
        <>
            {error && (
                <div className="bg-destructive text-destructive-foreground p-4 text-center font-bold">
                    ⚠️ Connection Error: {error}
                    <br />
                    <span className="text-sm font-normal opacity-90">
                        Please check your Vercel Environment Variables.
                    </span>
                </div>
            )}

            <HeroSection />
            <FeaturedCategories />
            <ProductShowcase products={products} />
            <TrustSection />
        </>
    )
}
