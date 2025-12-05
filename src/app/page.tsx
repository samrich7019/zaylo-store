import { getProducts } from "@/lib/shopify"
import { products as staticProducts } from "@/lib/data"
import HomeView from "@/components/home/home-view"

export default async function Home() {
    const shopifyProducts = await getProducts();
    const products = shopifyProducts && shopifyProducts.length > 0
        ? shopifyProducts.map(p => ({
            id: p.handle,
            title: p.title,
            price: parseFloat(p.priceRange.minVariantPrice.amount),
            image: p.images.edges[0]?.node.url || "/images/product-case.png",
            category: "Accessory"
        }))
        : staticProducts.slice(0, 4);

    return <HomeView products={products} />
}
