"use client";

import { toast } from "sonner";
import { Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { CardWithList } from "@/app/types/types";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { Button } from "@/_shared/ui/Button";
import { Skeleton } from "@/_shared/ui/Skeleton";
import { useCardModal } from "@/_entities/Card";
import { copyCardAction } from "../model/services/copyCardAction";

type TCopyCardProps = {
  data: CardWithList;
};

export function CopyCard({ data }: TCopyCardProps) {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useDatabase(copyCardAction, {
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

CopyCard.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
