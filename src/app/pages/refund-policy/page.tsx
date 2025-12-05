"use client"

export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground font-montserrat">Refund & Return Policy</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p><strong>Last Updated: January 2025</strong></p>

                    <h3>7-Day Checking Warranty</h3>
                    <p>All products purchased from Zaylo come with a 7-day checking warranty from the date of delivery.</p>

                    <h3>Eligible Returns</h3>
                    <p>You may return a product if:</p>
                    <ul>
                        <li>The product is defective or damaged upon arrival</li>
                        <li>You received the wrong item</li>
                        <li>The product has a manufacturing defect</li>
                    </ul>

                    <h3>Non-Returnable Items</h3>
                    <ul>
                        <li>Products damaged due to misuse or negligence</li>
                        <li>Products with missing accessories or packaging</li>
                        <li>Items used beyond checking period</li>
                    </ul>

                    <h3>Return Process</h3>
                    <ol>
                        <li>Contact us at support@zaylo.pk within 7 days of delivery</li>
                        <li>Provide order number and photos of the defect</li>
                        <li>Our team will review and approve the return</li>
                        <li>Ship the product back to our address (we'll provide details)</li>
                        <li>Once received and inspected, we'll process your refund or replacement</li>
                    </ol>

                    <h3>Refund Methods</h3>
                    <ul>
                        <li>COD orders: Refund via bank transfer or store credit</li>
                        <li>Online payments: Refund to original payment method within 7-10 business days</li>
                    </ul>

                    <h3>Return Shipping</h3>
                    <ul>
                        <li>For defective/wrong items: We cover return shipping</li>
                        <li>For buyer's remorse: Customer pays return shipping (if accepted)</li>
                    </ul>

                    <h3>Exchanges</h3>
                    <p>If you'd like to exchange a product for a different variant, contact us to check availability.</p>

                    <h3>Contact Us</h3>
                    <p>For return requests, email support@zaylo.pk or call our customer service.</p>
                </div>
            </div>
        </div>
    )
}
