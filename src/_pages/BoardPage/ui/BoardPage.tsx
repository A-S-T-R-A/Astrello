import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"
import { db } from "@/_shared/lib/db"
import { BoardNavbar } from "./BoardNavbar/BoardNavbar"
import { ListContainer } from "./ListContainer/ListContainer"
import { CardModal } from "@/_entities/card/CardModal/ui/CardModal"
import { useQuery } from "@tanstack/react-query"
import { CardWithList } from "@/app/types"
import { useCardModal } from "@/_entities/card/CardModal/lib/useCardModal"
import { fetcher } from "@/_shared/lib/fetcher"
import { UpdateCard } from "@/_features/cardActions/UpdateCard"
import { CopyCard } from "@/_features/cardActions/CopyCard"
import { DeleteCard } from "@/_features/cardActions/DeleteCard"
import { AddCardDescription } from "@/_features/cardActions/AddCardDescription"
import { getBoardCards } from "../model/services/getBoardCards"
import { getBoardLists } from "../model/services/getBoardLists"

interface BoardPageProps {
    boardId: string
}

export async function BoardPage({ boardId }: BoardPageProps) {
    const { orgId } = auth()

    if (!orgId) {
        redirect("/select-org")
    }

    const board = await getBoardCards({ boardId, orgId })

    if (!board) {
        notFound()
    }

    const lists = await getBoardLists({ boardId, orgId })

    return (
        <>
            <div
                className="relative h-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${board.imageFullUrl})` }}
            >
                <div className="absolute inset-0 bg-black/10" />
                <main className="relative pt-28 h-full">
                    <BoardNavbar data={board} />
                    <div className="p-4 h-full overflow-x-auto">
                        <ListContainer boardId={boardId} data={lists} />
                    </div>
                </main>
            </div>
            {/* {cardData && (
                <CardModal
                    header={<UpdateCard data={cardData} />}
                    actions={[
                        <CopyCard data={cardData} key="copy-card-action" />,
                        <DeleteCard data={cardData} key="copy-card-action" />,
                    ]}
                    description={<AddCardDescription data={cardData} />}
                />
            )} */}
        </>
    )
}
