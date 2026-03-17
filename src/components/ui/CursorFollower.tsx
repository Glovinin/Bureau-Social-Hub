import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

const SIZE = 28
const CENTER = SIZE / 2
const HOVER_SELECTOR = "a, button, [role='button'], [data-cursor-hover]"

/**
 * Cursor follower - círculo que segue o ponteiro com easing suave.
 * Expande em hover sobre links e botões. Oculta em mobile/touch.
 */
export default function CursorFollower() {
    const circleRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const hasMovedRef = useRef(false)

    useEffect(() => {
        const circle = circleRef.current
        if (!circle) return

        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
        if (isTouch) return

        let mouseX = 0
        let mouseY = 0
        let posX = 0
        let posY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (!hasMovedRef.current) {
                hasMovedRef.current = true
                setIsVisible(true)
            }
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest(HOVER_SELECTOR)) setIsHovering(true)
        }

        const handleMouseOut = (e: MouseEvent) => {
            const related = e.relatedTarget as HTMLElement | null
            if (!related?.closest(HOVER_SELECTOR)) setIsHovering(false)
        }

        const handleMouseLeave = () => setIsVisible(false)

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseover", handleMouseOver)
        document.addEventListener("mouseout", handleMouseOut)
        document.documentElement.addEventListener("mouseleave", handleMouseLeave)

        // Lerp suave no ticker do GSAP
        const tickerId = gsap.ticker.add(() => {
            posX += (mouseX - CENTER - posX) * 0.12
            posY += (mouseY - CENTER - posY) * 0.12
            gsap.set(circle, { x: posX, y: posY })
        })

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseout", handleMouseOut)
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
            gsap.ticker.remove(tickerId)
        }
    }, [])

    // Animação de escala ao hover
    useEffect(() => {
        const circle = circleRef.current
        if (!circle) return
        gsap.to(circle, {
            scale: isHovering ? 1.65 : 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
        })
    }, [isHovering])

    const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null)
    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }, [])

    if (isTouchDevice === true) return null

    return (
        <div
            ref={circleRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform origin-center"
            style={{
                width: SIZE,
                height: SIZE,
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.25s ease-out",
            }}
            aria-hidden
        >
            <div
                className="h-full w-full rounded-full border-2 border-heritage-terracotta/80 dark:border-heritage-gold/80 transition-colors duration-300"
                style={{ backgroundColor: "transparent" }}
            />
        </div>
    )
}
