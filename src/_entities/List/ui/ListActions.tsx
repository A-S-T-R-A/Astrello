"use client";

import { ElementRef, ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/_shared/ui/Popover";
import { Button } from "@/_shared/ui/Button";
import { Separator } from "@/_shared/ui/Separator";

type TListActionsProps = {
  onAddCard: () => void;
  actions: ReactNode[];
};

export const ListActions = forwardRef(({ onAddCard, actions }: TListActionsProps, ref) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          closeRef.current?.click();
        }
      };
    },
    []
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">List actions</div>
        <PopoverClose asChild ref={closeRef}>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>

        {actions.map((action, index) => {
          const isLast = index === actions.length - 1;

          return (
            <>
              {isLast && <Separator />}
              {action}
            </>
          );
        })}
      </PopoverContent>
    </Popover>
  );
});

ListActions.displayName = "ListActions";
