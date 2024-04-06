import { Toaster } from "sonner";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "../providers/modalProvider";
import { QueryProvider } from "../providers/queryProvider";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
}
