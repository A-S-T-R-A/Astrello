import { ReactNode } from "react"
import { Logo } from "@/_shared/ui/Logo"
import { Button } from "@/_shared/ui/Button"
import Link from "next/link"

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-full bg-slate-100 overflow-hidden">
            <header className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
                <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                    <Logo />
                    <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/sign-in">Login</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/sign-up">Get Astrello for free</Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="pt-40 pb-20 bg-slate-100">{children}</main>
            <footer className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
                <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                    <Logo />
                    <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                        <Link className="text-sm" href="/privacy-policy">
                            Privacy Policy
                        </Link>
                        <Link className="text-sm" href="/terms-of-service">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
