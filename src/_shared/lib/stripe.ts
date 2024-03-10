import Stripe from "stripe"

// should be in shared/config or api
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
})
