import { z } from "zod";
import { Card } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { UpdateCardOrderSchema } from "./updateCardOrderSchema";

export type InputType = z.infer<typeof UpdateCardOrderSchema>;
export type ReturnType = TActionState<InputType, Card[]>;
