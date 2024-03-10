import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//cn
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

//shared/api
export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
