"use server"

import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { db } from "@/_shared/lib/db"
import { createSafeAction } from "@/_shared/lib/create-safe-action"
import { DeleteBoard } from "../types/schema"
import { InputType, ReturnType } from "../types/types"
import { createAuditLog } from "@/_shared/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { decreaseAvailableCount } from "@/_shared/lib/org-limit"
import { checkSubscription } from "@/_entities/User/model/services/checkSubscription"

async function handler(data: InputType): Promise<ReturnType> {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const isPro = await checkSubscription()

    const { id } = data
    let board

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        })

        if (!isPro) {
            await decreaseAvailableCount()
        }

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
        })
    } catch (error) {
        return {
            error: "Failed to delete.",
        }
    }

    redirect(`/`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
