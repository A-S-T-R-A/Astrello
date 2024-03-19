import { checkSubscription } from "@/_entities/User"
import { Separator } from "@/_shared/ui/Separator"
import { OrganizationInfoCard } from "@/_entities/Organization/OrganizationInfoCard"
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
