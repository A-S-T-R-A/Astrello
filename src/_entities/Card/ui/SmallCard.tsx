"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

type TSmallCardProps = {
  data: Card;
  index: number;
  onClick: () => void;
};

export function SmallCard({ data, index, onClick }: TSmallCardProps) {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={onClick}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 mb-2 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
}
