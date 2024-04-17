import { useRef } from "react";
import { List } from "@prisma/client";
import { ListActions } from "@/_entities/List";
import { DemoUpdateList } from "@/_features/list/UpdateList";
import { DemoCopyList } from "@/_features/list/CopyList";
import { DemoDeleteList } from "@/_features/list/DeleteList";

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
      <DemoUpdateList data={data} />
      <ListActions
        ref={listActionsRef}
        onAddCard={onAddCard}
        actions={[
          <DemoCopyList data={data} key="copy-list-action" onSuccess={successHandler} />,
          <DemoDeleteList data={data} key="delete-list-action" onSuccess={successHandler} />
        ]}
      />
    </div>
  );
}
