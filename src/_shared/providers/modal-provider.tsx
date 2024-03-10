"use client"

import { useEffect, useState } from "react"
import { RedirectToStripeModal } from "@/_features/RedirectToStripe"

// move to app/provides
export function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <RedirectToStripeModal />
        </>
    )
}
