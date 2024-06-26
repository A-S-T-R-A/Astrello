"use client";

import Image from "next/image";
import { Button } from "@/_shared/ui/Button";
import { useStripeModal } from "../../lib/useStripeModal";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { toast } from "sonner";
import { redirectToStripeAction } from "../../model/services/redirectToStripeAction";
import { Modal } from "@/_shared/ui/Modal";

export function RedirectToStripeModal() {
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
    execute({});
  }

  return (
    <Modal isOpen={proModal.isOpen} onClose={proModal.onClose} contentClassName="max-w-md p-0 overflow-hidden">
      <div className="aspect-video relative flex items-center justify-center">
        <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
      </div>
      <div className="text-neutral-700 mx-auto space-y-6 p-6">
        <h2 className="font-semibold text-xl">Upgrade to Astrello Pro Today!</h2>
        <p className="text-xs font-semibold text-neutral-600">Explore the best of Astrello</p>
        <div className="pl-3">
          <ul className="text-sm list-disc">
            <li>Unlimited boards</li>
            <li>Advanced checklists</li>
            <li>Admin and security features</li>
            <li>And more!</li>
          </ul>
        </div>
        <Button disabled={isLoading} onClick={onClick} className="w-full" variant="primary">
          Upgrade
        </Button>
      </div>
    </Modal>
  );
}
