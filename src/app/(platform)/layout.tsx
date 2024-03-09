import { Toaster } from "sonner"
import { ModalProvider } from "@/_shared/providers/modal-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"
import { QueryProvider } from "@/_shared/providers/queryProvider"

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
