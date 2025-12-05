import { products as staticProducts } from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"
import { motion } from "framer-motion"
import { getCollectionProducts, getProducts } from "@/lib/shopify"

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    let products = [];

    if (slug === "all") {
        const { products: shopifyProducts } = await getProducts();
        products = shopifyProducts && shopifyProducts.length > 0
            ? shopifyProducts.map(p => ({
                id: p.handle,
                title: p.title,
                price: parseFloat(p.priceRange.minVariantPrice.amount),
                image: p.images.edges[0]?.node.url || "/images/product-case.png",
                category: "Accessory"
            }))
            : staticProducts;
    } else {
        const { products: shopifyProducts } = await getCollectionProducts(slug);
        if (shopifyProducts && shopifyProducts.length > 0) {
            products = shopifyProducts.map(p => ({
                id: p.handle,
                title: p.title,
                price: parseFloat(p.priceRange.minVariantPrice.amount),
                image: p.images.edges[0]?.node.url || "/images/product-case.png",
                category: "Accessory"
            }));
        } else {
            // Fallback to static filtering if no Shopify data or collection not found
            products = staticProducts.filter(p => p.device === slug || p.category.toLowerCase().includes(slug.replace("-cases", "")))
        }
    }

    const title = slug === "all" ? "All Products" : `${slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")}`

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4 font-montserrat">{title}</h1>
                <p className="text-muted-foreground">Explore our premium selection of accessories.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        category={product.category}
                    />
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No products found in this collection.
                </div>
            )}
        </div>
    )
}
