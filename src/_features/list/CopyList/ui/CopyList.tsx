"use client";

import { toast } from "sonner";
import { List } from "@prisma/client";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { FormSubmit } from "@/_shared/ui/FormSubmit";
import { copyListAction } from "../model/services/copyListAction";

type TListActionsProps = {
  data: List;
  onSuccess: () => void;
};

export function CopyList({ data, onSuccess }: TListActionsProps) {
  const { execute: executeCopy } = useDatabase(copyListAction, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);
      onSuccess();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  function onCopy(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  }

  return (
    <form action={onCopy}>
      <input hidden name="id" id="id" defaultValue={data.id} />
      <input hidden name="boardId" id="boardId" defaultValue={data.boardId} />
      <FormSubmit variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
        Copy list...
      </FormSubmit>
    </form>
  );
}
