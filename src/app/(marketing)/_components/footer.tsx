import { Logo } from "@/shared/ui/logo"
import { Button } from "@/shared/ui/button"
import Link from "next/link"

export function Footer() {
    return (
        <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
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
        </div>
    )
}
