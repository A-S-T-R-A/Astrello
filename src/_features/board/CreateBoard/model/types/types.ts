import { z } from "zod";
import { Board } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { CreateBoardSchema } from "./schema";

export type InputType = z.infer<typeof CreateBoardSchema>;
export type ReturnType = TActionState<InputType, Board>;
