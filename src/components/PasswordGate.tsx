import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LucideLock, LucideShield, LucideArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PasswordGateProps {
    password: string
    children: React.ReactNode
    storageKey?: string
}

export default function PasswordGate({ password, children, storageKey = "assessoria_auth" }: PasswordGateProps) {
    const [inputPassword, setInputPassword] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(storageKey) === "true"
    })
    const [error, setError] = useState("")
    const [isShaking, setIsShaking] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputPassword === password) {
            setIsAuthenticated(true)
            sessionStorage.setItem(storageKey, "true")
            setError("")
        } else {
            setError("Senha incorreta")
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 500)
            setInputPassword("")
        }
    }

    if (isAuthenticated) {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-mesh opacity-30 dark:opacity-10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-heritage-terracotta/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-heritage-ocean/10 rounded-full blur-[150px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="glass-card p-12 rounded-[48px] border-none shadow-2xl text-center space-y-8">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-heritage-navy/5 dark:bg-white/5 flex items-center justify-center">
                        <LucideShield className="w-10 h-10 text-heritage-navy dark:text-white" />
                    </div>

                    {/* Title */}
                    <div className="space-y-3">
                        <h1 className="text-3xl font-black text-heritage-navy dark:text-white tracking-tight">
                            Área Restrita
                        </h1>
                        <p className="text-heritage-navy/50 dark:text-white/40 font-medium">
                            Acesso exclusivo para a família
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="relative">
                                <LucideLock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-heritage-navy/30 dark:text-white/30" />
                                <Input
                                    type="password"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    placeholder="Insira a senha de acesso"
                                    className="h-16 pl-14 pr-6 rounded-2xl text-lg bg-heritage-sand/50 dark:bg-black/20 border-heritage-navy/10 dark:border-white/10 focus:ring-heritage-terracotta/50"
                                />
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-500 text-sm font-bold"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            className="w-full h-16 rounded-2xl bg-heritage-terracotta hover:bg-heritage-terracotta/90 text-white text-lg font-black shadow-xl shadow-heritage-terracotta/20 transition-apple hover:-translate-y-1"
                        >
                            Aceder <LucideArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </form>

                    {/* Footer */}
                    <p className="text-[10px] uppercase tracking-widest text-heritage-navy/20 dark:text-white/20 font-bold">
                        Instituto Português de Negócios Sociais
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
