"use server";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { DeleteBoardSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { checkSubscription } from "@/_entities/User";
import { decreaseAvailableCount } from "./decreaseAvailableCount";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized"
    };
  }

  const isPro = await checkSubscription();

  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId
      }
    });

    if (!isPro) {
      await decreaseAvailableCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE
    });
  } catch (error) {
    return {
      error: "Failed to delete."
    };
  }

  redirect(`/`);
}

export const deleteBoardAction = createSafeAction(DeleteBoardSchema, handler);
