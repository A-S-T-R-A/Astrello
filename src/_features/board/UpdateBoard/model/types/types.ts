import { z } from "zod";
import { Board } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { UpdateBoardSchema } from "./schema";

export type InputType = z.infer<typeof UpdateBoardSchema>;
export type ReturnType = TActionState<InputType, Board>;
