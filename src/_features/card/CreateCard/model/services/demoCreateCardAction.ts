"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "@/_shared/config/db";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { CreateCardSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, boardId, listId } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId: DEMO_ORGANIZATION_ID
        }
      }
    });

    if (!list) {
      return {
        error: "List not found"
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder
      }
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: card };
};

export const demoCreateCardAction = createSafeAction(CreateCardSchema, handler);
