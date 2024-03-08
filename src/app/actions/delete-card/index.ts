"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { db } from "@/_shared/lib/db"
import { createSafeAction } from "@/_shared/lib/create-safe-action"
import { DeleteCard } from "./schema"
import { InputType, ReturnType } from "./types"
import { createAuditLog } from "@/_shared/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id, boardId } = data
    let card

    try {
        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        })

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE,
        })
    } catch (error) {
        return {
            error: "Failed to delete.",
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
