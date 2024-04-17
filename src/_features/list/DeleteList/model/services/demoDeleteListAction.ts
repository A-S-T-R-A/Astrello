"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { DeleteListSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId } = data;
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId: "111"
        }
      }
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE
    });
  } catch (error) {
    return {
      error: "Failed to delete."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: list };
};

export const demoDeleteListAction = createSafeAction(DeleteListSchema, handler);
