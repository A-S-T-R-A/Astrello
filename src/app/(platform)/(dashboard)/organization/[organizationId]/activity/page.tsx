import { Suspense } from "react"
import { Separator } from "@/_shared/ui/separator"
import { Info } from "../_components/info"
import { ActivityList } from "./_components/activity-list"
import { checkSubscription } from "@/_shared/lib/subscription"

export default async function ActivityPage() {
    const isPro = await checkSubscription()

    return (
        <div className="w-full">
            <Info isPro={isPro} />
            <Separator className="my-2" />
            <Suspense fallback={<ActivityList.Skeleton />}>
                <ActivityList />
            </Suspense>
        </div>
    )
}
