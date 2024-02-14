// import { NextResponse } from "next/server"
// import { redirectToSignIn } from "@clerk/nextjs"
// import { authMiddleware } from "@clerk/nextjs/server"

// export default authMiddleware({
//     publicRoutes: ["/", "/api/webhook", "/terms-of-service", "/privacy-policy"],
//     afterAuth(auth, req) {
//         if (auth.userId && auth.isPublicRoute) {
//             let path = "/select-org"

//             if (auth.orgId) {
//                 path = `/organization/${auth.orgId}`
//             }

//             const orgSelection = new URL(path, req.url)
//             return NextResponse.redirect(orgSelection)
//         }

//         if (!auth.userId && !auth.isPublicRoute) {
//             return redirectToSignIn({ returnBackUrl: req.url })
//         }

//         if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
//             const orgSelection = new URL("/select-org", req.url)
//             return NextResponse.redirect(orgSelection)
//         }
//     },
// })

import { auth } from "./middleware/authMiddleware"
import { customMiddleware } from "./middleware/customMiddleware"
import { stackMiddlewares } from "./middleware/stackMiddlewares"

const middlewares = [customMiddleware, auth]
export default stackMiddlewares(middlewares)

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
