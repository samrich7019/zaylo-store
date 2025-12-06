import { products as staticProducts } from "@/lib/data"
import { Check, Shield, Truck, RotateCcw, Star, Heart } from "lucide-react"
import { getProduct } from "@/lib/shopify"
import { AddToCart } from "@/components/product/add-to-cart"
import { VariantSelector } from "@/components/product/variant-selector"
import { ProductGallery } from "@/components/product/product-gallery"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default async function ProductPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { id } = await params
    const resolvedSearchParams = await searchParams

    let product = null;
    const { product: shopifyProduct } = await getProduct(id);

    if (shopifyProduct) {
        const allImages = shopifyProduct.images.edges.map(e => e.node.url)
        product = {
            id: shopifyProduct.handle,
            title: shopifyProduct.title,
            description: shopifyProduct.description,
            price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
            images: allImages.length > 0 ? allImages : ["/images/product-case.png"],
            category: "Accessory",
            options: shopifyProduct.options,
            variants: shopifyProduct.variants.edges.map(e => e.node),
            features: ["Premium Quality Materials", "Fast Nationwide Shipping", "7-Day Warranty Included", "100% Authentic Product"]
        };
    } else {
        const staticProduct = staticProducts.find(p => p.id === id);
        if (staticProduct) {
            product = {
                ...staticProduct,
                images: [staticProduct.image],
                options: [],
                variants: [],
                features: ["Premium Quality Materials", "Fast Nationwide Shipping", "7-Day Warranty Included", "100% Authentic Product"]
            }
        }
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            </div>
        )
    }

    const selectedVariant = product.variants.find(variant => {
        return variant.selectedOptions.every(option => {
            return resolvedSearchParams[option.name] === option.value
        })
    }) || product.variants[0];

    const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : product.price

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <ProductGallery images={product.images} title={product.title} />

                {/* Product Info */}
                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <p className="text-primary font-medium mb-2 text-sm uppercase tracking-wide">{product.category}</p>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">(4.8 out of 5)</span>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <p className="text-3xl md:text-4xl font-bold gradient-text">PKR {price.toLocaleString()}</p>
                            <span className="text-sm text-muted-foreground line-through">PKR {(price * 1.2).toLocaleString()}</span>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Save 20%</span>
                        </div>
                    </div>

                    {/* Variant Selector */}
                    <VariantSelector options={product.options} variants={product.variants} />

                    {/* Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <AddToCart variantId={selectedVariant?.id} price={price} />
                            </div>
                            <Button variant="outline" size="lg" className="px-6">
                                <Heart className="w-5 h-5" />
                            </Button>
                        </div>
                        <p className="text-sm text-center text-muted-foreground">
                            ✓ Free shipping on orders over PKR 2,000
                        </p>
                    </div>

                    {/* Description */}
                    <div className="border-t border-border/40 pt-8 space-y-4">
                        <h3 className="font-semibold text-lg">Product Description</h3>
                        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>

                    {/* Features */}
                    <div className="border-t border-border/40 pt-8 space-y-4">
                        <h3 className="font-semibold text-lg">Key Features</h3>
                        <ul className="space-y-3">
                            {product.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-8">
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-xs font-medium">7-Day Warranty</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                            <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-xs font-medium">Fast Shipping</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                            <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-xs font-medium">Easy Returns</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
