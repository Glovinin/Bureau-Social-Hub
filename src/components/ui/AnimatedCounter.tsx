import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
    to: number
    from?: number
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
    format?: (n: number) => string
    className?: string
}

/**
 * Contador que anima de from até to quando entra no viewport.
 */
export default function AnimatedCounter({
    to,
    from = 0,
    duration = 1.5,
    decimals = 0,
    prefix = "",
    suffix = "",
    format,
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const valueRef = useRef({ val: from })
    const formatRef = useRef(format)
    formatRef.current = format

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const ctx = gsap.context(() => {
            gsap.to(valueRef.current, {
                val: to,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                },
                onUpdate: () => {
                    const n = valueRef.current.val
                    const fmt = formatRef.current
                    const display = fmt
                        ? fmt(n)
                        : decimals > 0
                            ? n.toFixed(decimals).replace(".", ",")
                            : Math.round(n).toString()
                    el.textContent = `${prefix}${display}${suffix}`
                },
            })
        }, el)

        return () => ctx.revert()
    }, [to, from, duration, decimals, prefix, suffix])

    // Initial render
    const initialDisplay = format ? format(from) : decimals > 0 ? from.toFixed(decimals).replace(".", ",") : Math.round(from).toString()

    return (
        <span ref={ref} className={className}>
            {prefix}{initialDisplay}{suffix}
        </span>
    )
}
