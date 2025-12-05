"use client"

export default function ShippingPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground font-montserrat">Shipping Policy</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p><strong>Last Updated: January 2025</strong></p>

                    <h3>Shipping Coverage</h3>
                    <p>We deliver nationwide across Pakistan.</p>

                    <h3>Delivery Timeframe</h3>
                    <ul>
                        <li><strong>Standard Delivery</strong>: 2-5 working days</li>
                        <li>Major cities (Karachi, Lahore, Islamabad): 2-3 days</li>
                        <li>Remote areas: 4-5 days</li>
                    </ul>

                    <h3>Shipping Charges</h3>
                    <ul>
                        <li><strong>Free shipping</strong> on orders above PKR 2,000</li>
                        <li>Orders below PKR 2,000: Flat shipping fee of PKR 150</li>
                    </ul>

                    <h3>Order Processing</h3>
                    <ul>
                        <li>Orders are processed within 1 business day</li>
                        <li>Orders placed on weekends/holidays are processed the next working day</li>
                    </ul>

                    <h3>Tracking</h3>
                    <ul>
                        <li>You will receive a tracking number via SMS/email once your order is dispatched</li>
                        <li>Track your order using the "Track Order" page on our website</li>
                    </ul>

                    <h3>Failed Delivery Attempts</h3>
                    <ul>
                        <li>If delivery fails due to incorrect address or unavailability, re-delivery fees may apply</li>
                        <li>After 3 failed attempts, the order may be returned to our warehouse</li>
                    </ul>

                    <h3>COD Verification</h3>
                    <ul>
                        <li>COD orders may require phone verification before dispatch</li>
                        <li>Please ensure your contact number is correct</li>
                    </ul>

                    <h3>Delays</h3>
                    <p>While we strive for timely delivery, delays may occur due to:</p>
                    <ul>
                        <li>Natural disasters</li>
                        <li>Political unrest</li>
                        <li>Courier partner issues</li>
                    </ul>
                    <p>We are not liable for delays beyond our control.</p>

                    <h3>Contact Us</h3>
                    <p>For shipping queries, contact support@zaylo.pk</p>
                </div>
            </div>
        </div>
    )
}
