"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListWithCards, CardWithList } from "@/app/types/types";
import { CardModal, useCardModal } from "@/_entities/Card";
import { useDatabase } from "@/_shared/hooks/useDatabase";
import { ListItem } from "./ListItem";
import { updateListOrderAction } from "../../model/services/updateListOrderAction";
import { updateCardOrderAction } from "../../model/services/updateCardOrderAction";
import { fetcher } from "@/_shared/lib/fetcher";
import { UpdateCard } from "@/_features/card/UpdateCard";
import { CopyCard } from "@/_features/card/CopyCard";
import { DeleteCard } from "@/_features/card/DeleteCard";
import { AddCardDescription } from "@/_features/card/AddCardDescription";
import { CreateList } from "@/_features/list/CreateList";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function ListContainer({ data, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useDatabase(updateListOrderAction, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { execute: executeUpdateCardOrder } = useDatabase(updateCardOrderAction, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  function onDragEnd(result: any) {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
        ...item,
        order: index
      }));

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find((list) => list.id === source.droppableId);
      const destList = newOrderedData.find((list) => list.id === destination.droppableId);

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destList.cards) {
        destList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index);

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards
        });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards
        });
      }
    }
  }

  const { id } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  });

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 h-full">
              {orderedData.map((list, index) => {
                return <ListItem key={list.id} index={index} data={list} />;
              })}
              {provided.placeholder}
              <CreateList />
              <div className="flex-shrink-0 w-1" />
            </ol>
          )}
        </Droppable>
      </DragDropContext>
      {cardData && (
        <CardModal
          header={<UpdateCard data={cardData} />}
          actions={[
            <CopyCard data={cardData} key="copy-card-action" />,
            <DeleteCard data={cardData} key="copy-card-action" />
          ]}
          description={<AddCardDescription data={cardData} />}
        />
      )}
    </>
  );
}
