import { z } from "zod";
import { Board } from "@prisma/client";

import { TActionState } from "@/_shared/lib/createSafeAction";

import { UpdateBoard } from "./schema";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = TActionState<InputType, Board>;
