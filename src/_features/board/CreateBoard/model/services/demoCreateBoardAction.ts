"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { db } from "@/_shared/config/db";
import { createSafeAction } from "@/_shared/lib/createSafeAction";
import { InputType, ReturnType } from "../types/types";
import { CreateBoardSchema } from "../types/schema";
import { createAuditLog } from "@/_shared/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount } from "./incrementAvailableCount";
import { demoHasAvailableCount } from "./demoHasAvailableCount";
import { demoIncrementAvailableCount } from "./demoIncrementAvailableCount";

const handler = async (data: InputType): Promise<ReturnType> => {
  const canCreate = await demoHasAvailableCount();

  if (!canCreate) {
    return {
      error: "You have reached your limit of free boards. Please upgrade to create more."
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|");

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: "Missing fields. Failed to create board."
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId: "111",
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML
      }
    });

    await demoIncrementAvailableCount();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const demoCreateBoardAction = createSafeAction(CreateBoardSchema, handler);
