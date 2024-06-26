import { z } from "zod";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { StripeRedirectSchema } from "./schema";

export type InputType = z.infer<typeof StripeRedirectSchema>;
export type ReturnType = TActionState<InputType, string>;
