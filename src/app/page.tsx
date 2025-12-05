import { getProducts } from "@/lib/shopify"
import { products as staticProducts } from "@/lib/data"
import HomeView from "@/components/home/home-view"

export default async function Home() {
    const { products: shopifyProducts, error } = await getProducts();

    const products = shopifyProducts.length > 0
        ? shopifyProducts.map(p => ({
            id: p.handle,
            title: p.title,
            price: parseFloat(p.priceRange.minVariantPrice.amount),
            image: p.images.edges[0]?.node.url || "/images/product-case.png",
            category: "Accessory"
        }))
        : staticProducts.slice(0, 4);

    return (
        <>
            {error && (
                <div className="bg-red-500 text-white p-4 text-center font-bold">
                    ⚠️ Connection Error: {error}
                    <br />
                    <span className="text-sm font-normal opacity-90">
                        Please check your Vercel Environment Variables.
                    </span>
                </div>
            )}
            <HomeView products={products} />
        </>
    )
}
