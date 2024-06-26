import { List } from "@prisma/client";
import { ListActions } from "@/_entities/List";
import { UpdateList } from "@/_features/list/UpdateList";
import { CopyList } from "@/_features/list/CopyList";
import { DeleteList } from "@/_features/list/DeleteList";
import { useRef } from "react";

type TListActionsRef = {
  close: () => void;
};

type TListHeaderProps = {
  data: List;
  onAddCard: () => void;
};

export function ListHeader({ data, onAddCard }: TListHeaderProps) {
  const listActionsRef = useRef<TListActionsRef | null>(null);

  function successHandler() {
    listActionsRef.current?.close();
  }

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      <UpdateList data={data} />
      <ListActions
        ref={listActionsRef}
        onAddCard={onAddCard}
        actions={[
          <CopyList data={data} key="copy-list-action" onSuccess={successHandler} />,
          <DeleteList data={data} key="delete-list-action" onSuccess={successHandler} />
        ]}
      />
    </div>
  );
}
