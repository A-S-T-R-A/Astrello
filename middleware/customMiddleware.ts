import { NextFetchEvent, NextRequest } from "next/server"
import { MiddlewareFactory } from "./stackMiddlewares"

export const customMiddleware: MiddlewareFactory = next => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        console.log("fired")
        return next(request, _next)
    }
}
