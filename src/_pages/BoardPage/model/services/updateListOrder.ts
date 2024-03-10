"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/_shared/lib/db"
import { createSafeAction } from "@/_shared/lib/create-safe-action"

import { UpdateListOrder } from "../types/updateListOrderSchema"
import { InputType, ReturnType } from "../types/updateListOrderTypes"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { items, boardId } = data
    let lists

    try {
        const transaction = items.map(list =>
            db.list.update({
                where: {
                    id: list.id,
                    board: {
                        orgId,
                    },
                },
                data: {
                    order: list.order,
                },
            })
        )

        lists = await db.$transaction(transaction)
    } catch (error) {
        return {
            error: "Failed to reorder.",
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
