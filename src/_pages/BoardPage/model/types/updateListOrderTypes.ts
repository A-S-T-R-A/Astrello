import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/_shared/lib/createSafeAction";

import { UpdateListOrder } from "./updateListOrderSchema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = TActionState<InputType, List[]>;
