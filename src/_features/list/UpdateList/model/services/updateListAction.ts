"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { UpdateListSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized"
    };
  }

  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      data: {
        title
      }
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE
    });
  } catch (error) {
    return {
      error: "Failed to update."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateListAction = createSafeAction(UpdateListSchema, handler);
