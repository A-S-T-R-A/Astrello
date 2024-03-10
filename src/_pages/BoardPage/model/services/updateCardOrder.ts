"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { db } from "@/_shared/lib/db"
import { createSafeAction } from "@/_shared/lib/create-safe-action"
import { UpdateCardOrder } from "../types/updateCardOrderSchema"
import { InputType, ReturnType } from "../types/updateCardOrderTypes"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { items, boardId } = data
    let updatedCards

    try {
        const transaction = items.map(card =>
            db.card.update({
                where: {
                    id: card.id,
                    list: {
                        board: {
                            orgId,
                        },
                    },
                },
                data: {
                    order: card.order,
                    listId: card.listId,
                },
            })
        )

        updatedCards = await db.$transaction(transaction)
    } catch (error) {
        return {
            error: "Failed to reorder.",
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
