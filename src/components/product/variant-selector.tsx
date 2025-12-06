"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function VariantSelector({ options, variants }: { options: any[], variants: any[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const hasNoOptionsOrJustOneOption = !options.length || (options.length === 1 && options[0]?.values.length === 1)

    if (hasNoOptionsOrJustOneOption) {
        return null
    }

    const createUrl = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        return `${pathname}?${params.toString()}`
    }

    return (
        <div className="space-y-4">
            {options.map((option) => (
                <div key={option.id} className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">{option.name}</h3>
                    <div className="flex flex-wrap gap-2">
                        {option.values.map((value: string) => {
                            const isActive = searchParams.get(option.name) === value

                            return (
                                <button
                                    key={value}
                                    onClick={() => {
                                        router.replace(createUrl(option.name, value), { scroll: false })
                                    }}
                                    className={cn(
                                        "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                                        isActive
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                                    )}
                                >
                                    {value}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
