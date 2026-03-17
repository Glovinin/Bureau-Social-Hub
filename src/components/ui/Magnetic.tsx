import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const RADIUS = 100
const STRENGTH = 0.35

/**
 * Wrapper que aplica efeito magnético ao cursor - o elemento "atrai" suavemente quando o rato está perto.
 * Desativado em dispositivos touch.
 */
export default function Magnetic({
    children,
    className = "",
}: {
    children: React.ReactNode
    className?: string
}) {
    const ref = useRef<HTMLSpanElement>(null)
    const [isTouch, setIsTouch] = useState(false)

    useEffect(() => {
        setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el || isTouch) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const distX = e.clientX - centerX
            const distY = e.clientY - centerY
            const distance = Math.hypot(distX, distY)

            if (distance < RADIUS) {
                const factor = (1 - distance / RADIUS) * STRENGTH
                const x = distX * factor
                const y = distY * factor
                gsap.to(el, { x, y, duration: 0.35, ease: "power2.out", overwrite: "auto" })
            } else {
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" })
            }
        }

        const handleMouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power2.out" })
        }

        document.addEventListener("mousemove", handleMouseMove)
        el.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            el.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [isTouch])

    if (isTouch) return <>{children}</>

    return (
        <span
            ref={ref}
            className={`inline-block ${className}`}
            style={{ willChange: "transform" }}
        >
            {children}
        </span>
    )
}
