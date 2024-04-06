import { z } from "zod";
import { List } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { CopyListSchema } from "./schema";

export type InputType = z.infer<typeof CopyListSchema>;
export type ReturnType = TActionState<InputType, List>;
