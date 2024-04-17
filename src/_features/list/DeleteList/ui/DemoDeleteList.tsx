"use client";

import { toast } from "sonner";
import { List } from "@prisma/client";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { FormSubmit } from "@/_shared/ui/FormSubmit";
import { demoDeleteListAction } from "../model/services/demoDeleteListAction";

type TDeleteListProps = {
  data: List;
  onSuccess: () => void;
};

export function DemoDeleteList({ data, onSuccess }: TDeleteListProps) {
  const { execute: executeDelete } = useDatabase(demoDeleteListAction, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      onSuccess();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  function onDelete(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  }

  return (
    <form action={onDelete}>
      <input hidden name="id" id="id" defaultValue={data.id} />
      <input hidden name="boardId" id="boardId" defaultValue={data.boardId} />
      <FormSubmit variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
        Delete this list
      </FormSubmit>
    </form>
  );
}
