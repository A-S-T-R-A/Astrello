import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/_shared/lib/cn";

const headingFont = localFont({
  src: "../../../../../public/fonts/font.woff2"
});

export function Logo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        <p className={cn("text-lg to-neutral-700 pb-0.5", headingFont.className)}>Astrello</p>
      </div>
    </Link>
  );
}
