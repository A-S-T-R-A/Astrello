import { z } from "zod";
import { TActionState } from "@/_shared/lib/createSafeAction";
import { StripeRedirect } from "./schema";

export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = TActionState<InputType, string>;
