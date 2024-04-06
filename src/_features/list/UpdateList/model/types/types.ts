import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/_shared/lib/createSafeAction";

import { UpdateList } from "./schema";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = TActionState<InputType, List>;
