import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { HelpCircle, User2 } from "lucide-react"
import { db } from "@/_shared/lib/db"
import { Hint } from "@/_shared/ui/Hint"
import { Skeleton } from "@/_shared/ui/skeleton"
import { MAX_FREE_BOARDS } from "@/_shared/const/boards"
import { getAvailableCount } from "@/_shared/lib/org-limit"
import { checkSubscription } from "@/_shared/lib/subscription"
import { BoardCard } from "@/_entities/Board"
import { CreateBoard } from "@/_features/CreateBoard/ui/CreateBoard"

export async function BoardList() {
    const { orgId } = auth()

    if (!orgId) {
        return redirect("/select-org")
    }

    const boards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const availableCount = await getAvailableCount()
    const isPro = await checkSubscription()

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2" />
                Your boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map(board => (
                    <BoardCard
                        key={board.id}
                        id={board.id}
                        imageThumbUrl={board.imageThumbUrl}
                        title={board.title}
                    />
                ))}
                <CreateBoard sideOffset={10} side="bottom">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                    >
                        <p className="text-sm">Create new board</p>
                        <span className="text-xs">
                            {isPro ? "Unlimited" : `${MAX_FREE_BOARDS - availableCount} remaining`}
                        </span>
                        <Hint
                            sideOffset={40}
                            description={`Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.`}
                        >
                            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </CreateBoard>
            </div>
        </div>
    )
}

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    )
}
