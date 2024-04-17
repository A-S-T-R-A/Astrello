"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { UpdateListSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId: DEMO_ORGANIZATION_ID
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

  revalidatePath(`demo/board/${boardId}`);
  return { data: list };
};

export const demoUpdateListAction = createSafeAction(UpdateListSchema, handler);
