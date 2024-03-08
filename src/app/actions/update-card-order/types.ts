import { z } from "zod"
import { Card } from "@prisma/client"

import { ActionState } from "@/_shared/lib/create-safe-action"

import { UpdateCardOrder } from "./schema"

export type InputType = z.infer<typeof UpdateCardOrder>
export type ReturnType = ActionState<InputType, Card[]>
