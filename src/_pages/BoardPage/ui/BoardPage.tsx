import { ReactNode } from "react"
import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"
import { db } from "@/_shared/lib/db"
import { BoardNavbar } from "./BoardNavbar/BoardNavbar"
import { ListContainer } from "./ListContainer/ListContainer"

interface BoardPageProps {
    boardId: string
}

export async function BoardPage({ boardId }: BoardPageProps) {
    const { orgId } = auth()

    if (!orgId) {
        redirect("/select-org")
    }

    const board = await db.board.findUnique({
        where: {
            id: boardId,
            orgId,
        },
    })

    if (!board) {
        notFound()
    }

    const lists = await db.list.findMany({
        where: {
            boardId: boardId,
            board: {
                orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc",
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    })

    return (
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
    )
}
