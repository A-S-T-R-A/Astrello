"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { UpdateCardOrderSchema } from "../types/updateCardOrderSchema";
import { InputType, ReturnType } from "../types/updateCardOrderTypes";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { items, boardId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId: "111"
            }
          }
        },
        data: {
          order: card.order,
          listId: card.listId
        }
      })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrderAction = createSafeAction(UpdateCardOrderSchema, handler);
