"use client"

import { toast } from "sonner"
import { useAction } from "@/shared/hooks/use-action"
import { Button } from "@/shared/ui/button"

import { useProModal } from "@/shared/hooks/use-pro-modal"
import { stripeRedirect } from "@/app/actions/stripe-redirect"

interface SubscriptionButtonProps {
    isPro: boolean
}

export function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
    const proModal = useProModal()

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: data => {
            window.location.href = data as string
        },
        onError: error => {
            toast.error(error)
        },
    })

    function onClick() {
        if (isPro) {
            execute({})
        } else {
            proModal.onOpen()
        }
    }

    return (
        <Button variant="primary" onClick={onClick} disabled={isLoading}>
            {isPro ? "Manage subscription" : "Upgrade to pro"}
        </Button>
    )
}
