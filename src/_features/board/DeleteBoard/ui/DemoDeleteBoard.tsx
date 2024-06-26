"use client";

import { toast } from "sonner";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { Button } from "@/_shared/ui/Button";
import { demoDeleteBoardAction } from "../model/services/demoDeleteBoardAction";

interface DeleteBoardProps {
  id: string;
}

export function DemoDeleteBoard({ id }: DeleteBoardProps) {
  const { execute, isLoading } = useDatabase(demoDeleteBoardAction, {
    onError: (error) => {
      toast.error(error);
    }
  });

  function onDelete() {
    execute({ id });
  }

  return (
    <Button
      variant="ghost"
      onClick={onDelete}
      disabled={isLoading}
      className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
    >
      Delete this board
    </Button>
  );
}
