"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/shared/lib/db"
import { createSafeAction } from "@/shared/lib/create-safe-action"
import { DeleteBoard } from "./schema"
import { InputType, ReturnType } from "./types"
import { createAuditLog } from "@/shared/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { decreaseAvailableCount } from "@/shared/lib/org-limit"
import { checkSubscription } from "@/shared/lib/subscription"

const handler = async (data: InputType): Promise<ReturnType> => {
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

    // revalidatePath(`/organization/${orgId}`)
    redirect(`/`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
