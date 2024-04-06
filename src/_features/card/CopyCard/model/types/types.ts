import { z } from "zod";
import { Card } from "@prisma/client";

import { TActionState } from "@/_shared/lib/createSafeAction";

import { CopyCard } from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = TActionState<InputType, Card>;
