import { Toaster } from "sonner"
import { ModalProvider } from "@/shared/providers/modal-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"
import { QueryProvider } from "@/shared/providers/query-provider"

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
