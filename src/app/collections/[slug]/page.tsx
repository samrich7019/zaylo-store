import { products as staticProducts } from "@/lib/data"
import { getCollectionProducts, getProducts } from "@/lib/shopify"
import { CollectionView } from "@/components/collection/collection-view"

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
            products = staticProducts.filter(p => p.device === slug || p.category.toLowerCase().includes(slug.replace("-cases", "")))
        }
    }

    const title = slug === "all"
        ? "All Products"
        : `${slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")}`

    return <CollectionView products={products} title={title} />
}
