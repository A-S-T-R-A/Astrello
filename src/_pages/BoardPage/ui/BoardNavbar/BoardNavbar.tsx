import { Board } from "@prisma/client";
import { DeleteBoard } from "@/_features/board/DeleteBoard";
import { BoardActions } from "@/_entities/Board";
import { UpdateBoard } from "@/_features/board/UpdateBoard";

interface BoardNavbarProps {
  data: Board;
}

export async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <UpdateBoard data={data} />
      <div className="ml-auto">
        <BoardActions actions={[<DeleteBoard key={data.id} id={data.id} />]} />
      </div>
    </div>
  );
}
