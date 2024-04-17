import { notFound } from "next/navigation";
import { BoardNavbar } from "./BoardNavbar/BoardNavbar";
import { ListContainer } from "./ListContainer/ListContainer";
import { getBoardCards } from "../model/services/getBoardCards";
import { getBoardLists } from "../model/services/getBoardLists";

interface BoardPageProps {
  boardId: string;
}

export async function DemoBoardPage({ boardId }: BoardPageProps) {
  const board = await getBoardCards({ boardId, orgId: "111" });

  if (!board) {
    notFound();
  }

  const lists = await getBoardLists({ boardId, orgId: "111" });

  return (
    <>
      <div
        className="relative h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <main className="relative pt-28 h-full">
          <BoardNavbar data={board} />
          <div className="p-4 h-full overflow-x-auto">
            <ListContainer boardId={boardId} data={lists} />
          </div>
        </main>
      </div>
    </>
  );
}
