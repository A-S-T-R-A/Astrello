"use client";

import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { useState, useRef, ElementRef } from "react";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { updateListAction } from "../model/services/updateListAction";
import { FormInput } from "@/_shared/ui/FormInput";
import { List } from "@prisma/client";

type TUpdateListProps = {
  data: List;
};

export function UpdateList({ data }: TUpdateListProps) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  const { execute } = useDatabase(updateListAction, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId
    });
  }

  function onBlur() {
    formRef.current?.requestSubmit();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  }

  useEventListener("keydown", onKeyDown);

  if (isEditing) {
    return (
      <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
        <input hidden id="id" name="id" defaultValue={data.id} />
        <input hidden id="boardId" name="boardId" defaultValue={data.boardId} />
        <FormInput
          ref={inputRef}
          onBlur={onBlur}
          id="title"
          placeholder="Enter list title.."
          defaultValue={title}
          className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
        />
        <button type="submit" hidden />
      </form>
    );
  }

  return (
    <div onClick={enableEditing} className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
      {title}
    </div>
  );
}
