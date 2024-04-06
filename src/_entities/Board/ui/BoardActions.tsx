import { ReactNode } from "react";
import { MoreHorizontal, X } from "lucide-react";
import { Button } from "@/_shared/ui/Button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/_shared/ui/Popover";

interface TBoardActionsProps {
  actions: ReactNode[];
}

export function BoardActions({ actions }: TBoardActionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">Board actions</div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        {actions}
      </PopoverContent>
    </Popover>
  );
}
