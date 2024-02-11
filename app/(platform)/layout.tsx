import { Toaster } from "sonner"
import { ModalProvider } from "@/components/providers/modal-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"
import { QueryProvider } from "@/components/providers/query-provider"

export default function PlatformLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <QueryProvider>
                <Toaster />
                <ModalProvider />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}
