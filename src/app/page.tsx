import { getProducts } from "@/lib/shopify"
import { products as staticProducts } from "@/lib/data"
import HomeView from "@/components/home/home-view"

export default async function Home() {
    const shopifyProducts = await getProducts();
    const isError = shopifyProducts === null;

    const products = shopifyProducts && shopifyProducts.length > 0
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
            {isError && (
                <div className="bg-red-500 text-white p-4 text-center font-bold">
                    ⚠️ Connection Error: Could not fetch products from Shopify. Showing static data.
                    <br />
                    <span className="text-sm font-normal opacity-90">
                        Check Vercel logs for "Shopify API Error". Verify SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.
                    </span>
                </div>
            )}
            <HomeView products={products} />
        </>
    )
}
