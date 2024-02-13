"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/shared/lib/db"
import { createSafeAction } from "@/shared/lib/create-safe-action"

import { UpdateList } from "./schema"
import { InputType, ReturnType } from "./types"
import { createAuditLog } from "@/shared/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title, id, boardId } = data
    let list

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            data: {
                title,
            },
        })

        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE,
        })
    } catch (error) {
        return {
            error: "Failed to update.",
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler)
