"use client"

import { toast } from "sonner"
import { useAction } from "@/_shared/hooks/use-action"
import { useStripeModal } from "../../lib/useStripeModal"
import { stripeRedirect } from "@/app/actions/stripe-redirect"
import { Button } from "@/_shared/ui/Button"

interface RedirectToStripeButtonProps {
    isPro: boolean
}

export function RedirectToStripeButton({ isPro }: RedirectToStripeButtonProps) {
    const proModal = useStripeModal()

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
