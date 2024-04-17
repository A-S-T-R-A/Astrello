"use client";

import { toast } from "sonner";
import { Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { CardWithList } from "@/app/types/types";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { Button } from "@/_shared/ui/Button";
import { useCardModal } from "@/_entities/Card";
import { demoCopyCardAction } from "../model/services/demoCopyCardAction";

type TCopyCardProps = {
  data: CardWithList;
};

export function DemoCopyCard({ data }: TCopyCardProps) {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useDatabase(demoCopyCardAction, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  function onCopy() {
    const boardId = params?.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId
    });
  }

  return (
    <Button onClick={onCopy} disabled={isLoadingCopy} variant="gray" className="w-full justify-start" size="inline">
      <Copy className="h-4 w-4 mr-2" />
      Copy
    </Button>
  );
}
