"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { DeleteCardSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId } = data;
  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId: DEMO_ORGANIZATION_ID
          }
        }
      }
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE
    });
  } catch (error) {
    return {
      error: "Failed to delete."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: card };
};

export const demoDeleteCardAction = createSafeAction(DeleteCardSchema, handler);
