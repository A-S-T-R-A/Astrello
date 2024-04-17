"use server";

import { redirect } from "next/navigation";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { DeleteBoardSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { demoDecreaseAvailableCount } from "./demoDecreaseAvailableCount";

async function handler(data: InputType): Promise<ReturnType> {
  const { id } = data;

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId: "111"
      }
    });

    await demoDecreaseAvailableCount();

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

  redirect(`/demo/organization/111`);
}

export const demoDeleteBoardAction = createSafeAction(DeleteBoardSchema, handler);
