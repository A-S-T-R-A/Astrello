import { z } from "zod";
import { Card } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { UpdateCardSchema } from "./schema";

export type InputType = z.infer<typeof UpdateCardSchema>;
export type ReturnType = TActionState<InputType, Card>;
