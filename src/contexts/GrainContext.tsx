import { createContext, useContext, useState, useEffect, ReactNode } from "react"

const STORAGE_KEY = "bureau-grain-enabled"

interface GrainContextType {
    grainEnabled: boolean
    setGrainEnabled: (enabled: boolean) => void
    toggleGrain: () => void
}

const GrainContext = createContext<GrainContextType | undefined>(undefined)

export function GrainProvider({ children }: { children: ReactNode }) {
    const [grainEnabled, setGrainEnabledState] = useState(true)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored !== null) {
                setGrainEnabledState(stored === "true")
            }
        } catch {
            // ignore
        }
    }, [])

    const setGrainEnabled = (enabled: boolean) => {
        setGrainEnabledState(enabled)
        try {
            localStorage.setItem(STORAGE_KEY, String(enabled))
        } catch {
            // ignore
        }
    }

    const toggleGrain = () => {
        setGrainEnabledState(prev => {
            const next = !prev
            try { localStorage.setItem(STORAGE_KEY, String(next)) } catch { /* ignore */ }
            return next
        })
    }

    return (
        <GrainContext.Provider value={{ grainEnabled, setGrainEnabled, toggleGrain }}>
            {children}
        </GrainContext.Provider>
    )
}

export function useGrain() {
    const ctx = useContext(GrainContext)
    if (ctx === undefined) {
        throw new Error("useGrain must be used within GrainProvider")
    }
    return ctx
}
