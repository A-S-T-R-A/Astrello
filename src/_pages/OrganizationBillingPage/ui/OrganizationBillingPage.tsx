import { checkSubscription } from "@/_shared/lib/subscription"
import { Separator } from "@/_shared/ui/separator"
import { OrganizationInfoCard } from "@/_entities/Organization"
import { SubscriptionButton } from "@/_features/Stripe"

export async function OrganizationBillingPage() {
    const isPro = await checkSubscription()

    return (
        <div className="w-full">
            <OrganizationInfoCard isPro={isPro} />
            <Separator className="my-2" />
            <SubscriptionButton isPro={isPro} />
        </div>
    )
}
