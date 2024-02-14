import { ReactNode } from "react"
import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-full bg-slate-100 overflow-hidden">
            <Navbar />
            <main className="pt-40 pb-20 bg-slate-100">{children}</main>
            <Footer />
        </div>
    )
}
