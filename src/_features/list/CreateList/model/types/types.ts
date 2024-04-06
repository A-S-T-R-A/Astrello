import { z } from "zod";
import { List } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { CreateListSchema } from "./schema";

export type InputType = z.infer<typeof CreateListSchema>;
export type ReturnType = TActionState<InputType, List>;
