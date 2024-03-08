import { checkSubscription } from "@/_shared/lib/subscription"
import { Separator } from "@/_shared/ui/separator"
import { SubscriptionButton } from "./_components/subscription-button"
import { Info } from "../_components/info"

export default async function BillingPage() {
    const isPro = await checkSubscription()

    return (
        <div className="w-full">
            <Info isPro={isPro} />
            <Separator className="my-2" />
            <SubscriptionButton isPro={isPro} />
        </div>
    )
}
