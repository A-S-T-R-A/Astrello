"use client";

import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { Button } from "@/_shared/ui/Button";
import { FormInput } from "@/_shared/ui/FormInput";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { demoUpdateBoardAction } from "../../model/services/demoUpdateBoardAction";

interface UpdateBoardProps {
  data: Board;
}

export function DemoUpdateBoard({ data }: UpdateBoardProps) {
  const { execute } = useDatabase(demoUpdateBoardAction, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

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

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;

    if (data.title === title) return;

    execute({
      title,
      id: data.id
    });
  }

  function onBlur() {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button onClick={enableEditing} variant="transparent" className="font-bold text-lg h-auto w-auto p-1 px-2">
      {title}
    </Button>
  );
}
