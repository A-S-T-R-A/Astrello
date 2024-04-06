import { z } from "zod"
import { Card } from "@prisma/client"
import { ActionState } from "@/_shared/lib/createSafeAction"
import { UpdateCardOrder } from "./updateCardOrderSchema"

export type InputType = z.infer<typeof UpdateCardOrder>
export type ReturnType = ActionState<InputType, Card[]>
