import { z } from "zod";
import { List } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { UpdateListSchema } from "./schema";

export type InputType = z.infer<typeof UpdateListSchema>;
export type ReturnType = TActionState<InputType, List>;
