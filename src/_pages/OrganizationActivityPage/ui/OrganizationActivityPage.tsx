import { Suspense } from "react"
import { Separator } from "@/_shared/ui/separator"
import { checkSubscription } from "@/_shared/lib/subscription"
import { OrganizationInfoCard } from "@/_entities/Organization"
import { ActivityList } from "./ActivityList/ActivityList"

export async function OrganizationActivityPage() {
    const isPro = await checkSubscription()

    return (
        <div className="w-full">
            <OrganizationInfoCard isPro={isPro} />
            <Separator className="my-2" />
            <Suspense fallback={<ActivityList.Skeleton />}>
                <ActivityList />
            </Suspense>
        </div>
    )
}
