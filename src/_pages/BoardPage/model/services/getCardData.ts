// import { useCardModal } from "@/_entities/card/CardModal"
// import { CardWithList } from "@/app/types"
// import { useQuery } from "@tanstack/react-query"

// export function getCardData(){
//     const { id } = useCardModal()

//     const { data: cardData } = useQuery<CardWithList>({
//         queryKey: ["card", id],
//         queryFn: () => fetcher(`/api/cards/${id}`),
//     })

//     return cardData
// }
