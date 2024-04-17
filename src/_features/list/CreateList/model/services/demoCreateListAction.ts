"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { CreateListSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, boardId } = data;
  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId: DEMO_ORGANIZATION_ID
      }
    });

    if (!board) {
      return {
        error: "Board not found"
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder
      }
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: list };
};

export const demoCreateListAction = createSafeAction(CreateListSchema, handler);
