import { z } from "zod";
import { List } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { DeleteListSchema } from "./schema";

export type InputType = z.infer<typeof DeleteListSchema>;
export type ReturnType = TActionState<InputType, List>;
