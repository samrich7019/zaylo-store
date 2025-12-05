export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl text-gray-300 space-y-6">
            <h1 className="text-3xl font-bold text-white">Shipping Policy</h1>
            <p>Free standard shipping on all orders over $50.</p>
            <h2 className="text-xl font-bold text-white">Processing Time</h2>
            <p>Orders are processed within 1-2 business days.</p>
            <h2 className="text-xl font-bold text-white">Delivery Estimates</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>Standard Shipping: 3-5 business days</li>
                <li>Express Shipping: 1-2 business days</li>
            </ul>
        </div>
    )
}
