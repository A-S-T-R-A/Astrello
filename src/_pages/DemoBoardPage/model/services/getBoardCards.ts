import { db } from "@/_shared/config/db";

type TGetBoardCards = {
  boardId: string;
  orgId: string;
};

export async function getBoardCards({ boardId, orgId }: TGetBoardCards) {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId
    }
  });

  return board;
}
