import { DemoBoardPage } from "@/_pages/DemoBoardPage";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
  return <DemoBoardPage boardId={params.boardId} />;
}
