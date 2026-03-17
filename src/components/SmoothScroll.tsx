import { createContext, useContext, useEffect, useState } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
    return useContext(LenisContext)
}

interface SmoothScrollProps {
    children: React.ReactNode
}

/**
 * Provider que inicializa Lenis para smooth scroll e sincroniza com GSAP ScrollTrigger.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
    const [lenis, setLenis] = useState<Lenis | null>(null)

    useEffect(() => {
        const instance = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            touchMultiplier: 1.5,
            allowNestedScroll: true,
        })

        setLenis(instance)

        // Sincronizar Lenis com GSAP ScrollTrigger
        instance.on("scroll", ScrollTrigger.update)

        const raf = (time: number) => {
            instance.raf(time * 1000)
        }
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(raf)
            instance.destroy()
            setLenis(null)
        }
    }, [])

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    )
}
