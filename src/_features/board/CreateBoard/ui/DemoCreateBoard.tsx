"use client";

import { ElementRef, ReactNode, useRef } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/_shared/ui/Popover";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { Button } from "@/_shared/ui/Button";
import { FormInput } from "@/_shared/ui/FormInput";
import { FormSubmit } from "@/_shared/ui/FormSubmit";
import { BoardImgPicker } from "./BoardImgPicker/BoardImgPicker";
import { demoCreateBoardAction } from "../model/services/demoCreateBoardAction";

type TCreateBoardProps = {
  children: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

export function DemoCreateBoard(props: TCreateBoardProps) {
  const { children, side = "bottom", align, sideOffset = 0 } = props;

  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute, fieldErrors } = useDatabase(demoCreateBoardAction, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
      // router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">Create board</div>
        <PopoverClose ref={closeRef} asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <BoardImgPicker id="image" errors={fieldErrors} />
            <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
