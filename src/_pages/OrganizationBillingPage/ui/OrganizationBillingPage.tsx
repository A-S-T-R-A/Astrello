import { checkSubscription } from "@/_shared/lib/subscription"
import { Separator } from "@/_shared/ui/Separator"
import { OrganizationInfoCard } from "@/_entities/Organization"
import { RedirectToStripeButton } from "@/_features/RedirectToStripe"

export async function OrganizationBillingPage() {
    const isPro = await checkSubscription()

    return (
        <div className="w-full">
            <OrganizationInfoCard isPro={isPro} />
            <Separator className="my-2" />
            <RedirectToStripeButton isPro={isPro} />
        </div>
    )
}
