import { ReactNode } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">Zaylo Admin</h1>
                        <nav className="flex gap-4">
                            <Link href="/admin/hhc-sync" className="text-sm hover:text-primary">
                                HHC Sync
                            </Link>
                            <Link href="/admin/import-hhc" className="text-sm hover:text-primary">
                                Import HHC
                            </Link>
                            <Link href="/" className="text-sm hover:text-primary">
                                Back to Store
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
