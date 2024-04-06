"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { Button } from "@/_shared/ui/Button";
import { FormTextarea } from "@/_shared/ui/FormTextarea";
import { createCardAction } from "../model/services/createCardAction";
import { FormSubmit } from "@/_shared/ui/FormSubmit";

type TCreateCardProps = {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
};

export const CreateCard = forwardRef<HTMLTextAreaElement, TCreateCardProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useDatabase(createCardAction, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      }
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        disableEditing();
      }
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    function onSubmit(formData: FormData) {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params?.boardId as string;

      execute({ title, listId, boardId });
    }

    if (isEditing) {
      return (
        <form ref={formRef} action={onSubmit} className="m-1 py-0.5 px-1 space-y-2 -mt-1">
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" defaultValue={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 pb-2 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CreateCard.displayName = "CreateCard";
