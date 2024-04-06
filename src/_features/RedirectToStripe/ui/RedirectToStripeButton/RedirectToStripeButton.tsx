"use client";

import { toast } from "sonner";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { Button } from "@/_shared/ui/Button";
import { useStripeModal } from "../../lib/useStripeModal";
import { redirectToStripeAction } from "../../model/services/redirectToStripeAction";

interface RedirectToStripeButtonProps {
  isPro: boolean;
}

export function RedirectToStripeButton({ isPro }: RedirectToStripeButtonProps) {
  const proModal = useStripeModal();

  const { execute, isLoading } = useDatabase(redirectToStripeAction, {
    onSuccess: (data) => {
      window.location.href = data as string;
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  function onClick() {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  }

  return (
    <Button variant="primary" onClick={onClick} disabled={isLoading}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
}
