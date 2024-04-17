"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { UpdateListOrderSchema } from "../types/updateListOrderSchema";
import { InputType, ReturnType } from "../types/updateListOrderTypes";
import { DEMO_ORGANIZATION_ID } from "@/_shared/const/orgId";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId: DEMO_ORGANIZATION_ID
          }
        },
        data: {
          order: list.order
        }
      })
    );

    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder."
    };
  }

  revalidatePath(`demo/board/${boardId}`);
  return { data: lists };
};

export const updateListOrderAction = createSafeAction(UpdateListOrderSchema, handler);
