import { products as staticProducts } from "@/lib/data"
import { Check, Shield, Truck, RotateCcw } from "lucide-react"
import { getProduct } from "@/lib/shopify"
import { AddToCart } from "@/components/product/add-to-cart"
import { VariantSelector } from "@/components/product/variant-selector"

export default async function ProductPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { id } = await params
    const resolvedSearchParams = await searchParams

    let product = null;
    const { product: shopifyProduct } = await getProduct(id);

    if (shopifyProduct) {
        product = {
            id: shopifyProduct.handle,
            title: shopifyProduct.title,
            description: shopifyProduct.description,
            price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
            image: shopifyProduct.images.edges[0]?.node.url || "/images/product-case.png",
            category: "Accessory",
            options: shopifyProduct.options,
            variants: shopifyProduct.variants.edges.map(e => e.node),
            features: ["Premium Quality", "Fast Shipping", "Warranty Included"]
        };
    } else {
        const staticProduct = staticProducts.find(p => p.id === id);
        if (staticProduct) {
            product = {
                ...staticProduct,
                options: [],
                variants: [],
                features: ["Premium Quality", "Fast Shipping", "Warranty Included"]
            }
        }
    }

    if (!product) {
        return <div className="container mx-auto px-4 py-20 text-foreground text-center">Product not found</div>
    }

    // Determine selected variant
    const selectedVariant = product.variants.find(variant => {
        return variant.selectedOptions.every(option => {
            return resolvedSearchParams[option.name] === option.value
        })
    }) || product.variants[0];

    const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : product.price

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="bg-card rounded-2xl p-10 flex items-center justify-center border border-border/40">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full max-w-md object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <p className="text-primary font-medium mb-2">{product.category}</p>
                        <h1 className="text-4xl font-bold text-foreground mb-4 font-montserrat">{product.title}</h1>
                        <p className="text-2xl font-bold text-foreground">PKR {price.toLocaleString()}</p>
                    </div>

                    <VariantSelector options={product.options} variants={product.variants} />

                    <div className="space-y-4">
                        <AddToCart variantId={selectedVariant?.id} price={price} />
                        <p className="text-xs text-center text-muted-foreground">Free shipping on orders over PKR 2,000</p>
                    </div>

                    <div className="border-t border-border/40 pt-8 space-y-4">
                        <p className="text-foreground/80 leading-relaxed">{product.description}</p>
                        <ul className="space-y-2">
                            {product.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-8">
                        <div className="text-center">
                            <Shield className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">7-Day Warranty</p>
                        </div>
                        <div className="text-center">
                            <Truck className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">Fast Shipping</p>
                        </div>
                        <div className="text-center">
                            <RotateCcw className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">Easy Returns</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
