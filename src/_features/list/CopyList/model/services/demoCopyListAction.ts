"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "@/_shared/config/db";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { CopyListSchema } from "../types/schema";
import { InputType, ReturnType } from "../types/types";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId } = data;
  let list;

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId: DEMO_ORGANIZATION_ID
        }
      },
      include: {
        cards: true
      }
    });

    if (!listToCopy) {
      return { error: "List not found" };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      },
      include: {
        cards: true
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
      error: "Failed to copy."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: list };
};

export const demoCopyListAction = createSafeAction(CopyListSchema, handler);
