"use client";

import { useCardModal } from "@/_entities/Card/lib/useCardModal";
import { Modal } from "@/_shared/ui/Modal";
import { ReactNode } from "react";

type TCardModal = {
  header: ReactNode;
  description: ReactNode;
  actions: ReactNode[];
};

export function DemoCardModal(props: TCardModal) {
  const { header, description, actions } = props;
  const { isOpen, onClose } = useCardModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {header}
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <div className="col-span-3">
          <div className="w-full space-y-6">{description}</div>
        </div>

        <div className="space-y-2 mt-2">
          <p className="text-xs font-semibold">Actions</p>
          {actions}
        </div>
      </div>
    </Modal>
  );
}
