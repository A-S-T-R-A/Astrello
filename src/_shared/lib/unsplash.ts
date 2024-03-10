import { createApi } from "unsplash-js"

// shared/config or api
export const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
    fetch: fetch,
})
