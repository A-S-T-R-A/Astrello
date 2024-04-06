import { z } from "zod";
import { Card } from "@prisma/client";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { CopyCardSchema } from "./schema";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = TActionState<InputType, Card>;
