import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/_shared/lib/createSafeAction";

import { DeleteList } from "./schema";

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = TActionState<InputType, List>;
