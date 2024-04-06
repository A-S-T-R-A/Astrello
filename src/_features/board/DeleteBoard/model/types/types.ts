import { z } from "zod";
import { Board } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { DeleteBoardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteBoardSchema>;
export type ReturnType = TActionState<InputType, Board>;
