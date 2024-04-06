import { z } from "zod";
import { List } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { UpdateListOrderSchema } from "./updateListOrderSchema";

export type InputType = z.infer<typeof UpdateListOrderSchema>;
export type ReturnType = TActionState<InputType, List[]>;
