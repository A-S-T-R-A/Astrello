import { z } from "zod";
import { List } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { CopyList } from "./schema";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = TActionState<InputType, List>;
