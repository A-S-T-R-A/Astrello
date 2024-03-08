import { db } from "@/_shared/lib/db"
import Link from "next/link"

type TBoardCardProps = {
    id: string
    title: string
    imageThumbUrl: string
}

export function BoardCard(props: TBoardCardProps) {
    const { id, imageThumbUrl, title } = props

    return (
        <Link
            key={id}
            href={`/board/${id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${imageThumbUrl})` }}
        >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{title}</p>
        </Link>
    )
}
