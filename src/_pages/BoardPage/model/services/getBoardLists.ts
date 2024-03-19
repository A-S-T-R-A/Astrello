import { db } from "@/_shared/config/db"

type TGetBoardLists = {
    boardId: string
    orgId: string
}

export async function getBoardLists({ boardId, orgId }: TGetBoardLists) {
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

    return lists
}
