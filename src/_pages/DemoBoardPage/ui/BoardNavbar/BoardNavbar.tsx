import { Board } from "@prisma/client";
import { BoardActions } from "@/_entities/Board";
import { DemoUpdateBoard } from "@/_features/board/UpdateBoard";
import { DemoDeleteBoard } from "@/_features/board/DeleteBoard";

interface BoardNavbarProps {
  data: Board;
}

export async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <DemoUpdateBoard data={data} />
      <div className="ml-auto">
        <BoardActions actions={[<DemoDeleteBoard key={data.id} id={data.id} />]} />
      </div>
    </div>
  );
}
