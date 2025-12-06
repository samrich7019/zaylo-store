"use client"

import { motion } from "framer-motion"

const messages = [
    "POWERFUL SOUND",
    "FLASH DEALS",
    "SAVE BIG TODAY!",
    "HOT PICKS",
    "UPGRADE TODAY",
    "POWERFUL SOUND",
    "FLASH DEALS"
]

export function ScrollingMarquee() {
    return (
        <div className="bg-black text-white py-3 overflow-hidden border-y border-orange-500/30">
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...messages, ...messages, ...messages].map((msg, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                        <span>{msg}</span>
                        <span className="text-orange-500">⚡</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
