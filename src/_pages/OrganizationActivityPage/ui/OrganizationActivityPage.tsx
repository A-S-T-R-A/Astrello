import { Suspense } from "react"
import { Separator } from "@/_shared/ui/Separator"
import { checkSubscription } from "@/_entities/User"
import { ActivityList } from "./ActivityList/ActivityList"
import { OrganizationInfoCard } from "@/_entities/Organization"

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
