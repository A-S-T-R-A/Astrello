import { z } from "zod"
import { List } from "@prisma/client"

import { ActionState } from "@/_shared/lib/createSafeAction"

import { UpdateListOrder } from "./updateListOrderSchema"

export type InputType = z.infer<typeof UpdateListOrder>
export type ReturnType = ActionState<InputType, List[]>
