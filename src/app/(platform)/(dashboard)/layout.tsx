import { Navbar } from "@/_widgets/Navbar"
import { MobileSidebar } from "@/_widgets/Sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-full">
            <Navbar slot={<MobileSidebar />} />
            {children}
        </div>
    )
}
