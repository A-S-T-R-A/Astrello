import { Board } from "@prisma/client"
import { BoardTitle } from "./BoardTitle"
import { DeleteBoard } from "@/_features/DeleteBoard"

interface BoardNavbarProps {
    data: Board
}

export async function BoardNavbar({ data }: BoardNavbarProps) {
    return (
        <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
            <BoardTitle data={data} />
            <div className="ml-auto">
                <DeleteBoard id={data.id} />
            </div>
        </div>
    )
}
