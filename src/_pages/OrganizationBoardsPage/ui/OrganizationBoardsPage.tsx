import { Separator } from "@/_shared/ui/Separator"
import { checkSubscription } from "@/_entities/User"
import { OrganizationInfoCard } from "@/_entities/Organization"
import { BoardList } from "./BoardList/BoardList"

export async function OrganizationBoardsPage() {
    const isPro = await checkSubscription()

    return (
        <div className="w-full mb-20">
            <OrganizationInfoCard isPro={isPro} />
            <Separator className="my-4" />
            <div className="px-2 md:px-4">
                <BoardList />
            </div>
        </div>
    )
}
