import { useEffect, useRef, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
    children: ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right"
    opacity?: boolean
    once?: boolean
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    direction = "up",
    opacity = true,
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const yFrom = direction === "up" ? 60 : direction === "down" ? -60 : 0
        const xFrom = direction === "left" ? 60 : direction === "right" ? -60 : 0

        gsap.set(el, { y: yFrom, x: xFrom, opacity: opacity ? 0 : 1 })

        const ctx = gsap.context(() => {
            gsap.to(el, {
                y: 0,
                x: 0,
                opacity: 1,
                duration,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: once ? "play none none none" : "play none none reverse",
                    },
                }
            )
        }, el)

        return () => ctx.revert()
    }, [delay, direction, duration, opacity, once])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}
