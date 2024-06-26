"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "@/_shared/config/db";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { CopyCardSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId } = data;
  let card;

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId: DEMO_ORGANIZATION_ID
          }
        }
      }
    });

    if (!cardToCopy) {
      return { error: "Card not found" };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId
      }
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: "Failed to copy."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: card };
};

export const demoCopyCardAction = createSafeAction(CopyCardSchema, handler);
