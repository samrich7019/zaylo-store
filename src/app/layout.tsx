import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ExitIntentPopup } from "@/components/ui/exit-popup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
    title: "Zaylo | Premium Phone Accessories",
    description: "Shop iPhone cases, earbuds, chargers & more at Zaylo. Fast delivery, COD available, 7-day warranty.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <ExitIntentPopup />
            </body>
        </html>
    );
}
