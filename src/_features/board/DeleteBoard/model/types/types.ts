import { z } from "zod";
import { Board } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { DeleteBoard } from "./schema";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = TActionState<InputType, Board>;
