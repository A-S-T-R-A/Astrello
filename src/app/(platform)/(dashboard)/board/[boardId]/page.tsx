import { BoardPage } from "@/_pages/BoardPage"

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
    return <BoardPage boardId={params.boardId} />
}
