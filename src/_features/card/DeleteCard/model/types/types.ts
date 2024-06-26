import { z } from "zod";
import { Card } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { DeleteCardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = TActionState<InputType, Card>;
