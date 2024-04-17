import { Separator } from "@/_shared/ui/Separator";
import { DemoOrganizationInfoCard } from "@/_entities/Organization";
import { BoardList } from "./BoardList/BoardList";

export async function DemoOrganizationBoardsPage() {
  return (
    <div className="w-full mb-20">
      <DemoOrganizationInfoCard />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
}
